'use strict';

var validator = require('validator'),
    http      = require('http'),
    request   = require('request'),
    fs        = require('fs'),
    ExifImage = require('exif').ExifImage,
    // ImageHeaders = require('image-headers'),
    // reader = require('buffered-reader'),
    // DataReader = reader.DataReader, // @todo this is a legacy unmaintained NPM module, we must update our code to use the latest instead.
    xml2js    = require('xml2js'),
    parser = new xml2js.Parser();

module.exports = function (S3Images) {
  /**
   * Import S3 Data (XML) from URL
   * @param {string} urlEnpoint Amazon S3 URL endpoint.
   * @param {Function(Error, number, number)} callback
   */

  S3Images.importS3Data = function(urlEnpoint, callback) {
    var totalRecordsImported, totalRecordsFound,
        baseURL = 'http://s3.amazonaws.com/',
        whitelistChars = /[^a-z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]/gi, // @TODO Quick and dirty URL character filter. Let's deal with RFC 3986 another day...
        whitelistKey = /[^0-9a-z\.\-]/gi,
        whitelistLastModified = /[^0-9\-\:\.TZ]/gi, // @TODO Quick whitelist filter. We can update this to validate formate some other time.
        whitelistETag = /[^0-9a-f]/gi, // @TODO Quick whitelist filter... We can whitelist filter for tag char length another time.
        whitelistSize = /^\d+/g, // @TODO Quick whitelist filter for digits.
        whitelistStorageClass = /[^a-z0-9]/gi, // @TODO alphanumeric whitelist. Perhaps we want to limit to a certain storage class only?
        whitelistInput = urlEnpoint.replace(whitelistChars, ''),
        userInput = baseURL + whitelistInput;
    // @TODO retrieve data feed XML from Amazon S3 server endpoint.

    // Is this a chicken? Yes, it's a chicken. Why is there a chicken in my code.
    //    M
    //  <0 )
    //   u(  )3
    //    .||.
    //

    // ... Let's check the user input. Validate, and format.

    userInput = validator.isURL( userInput ) ? userInput : false;

    console.log("s-3-images.js::importS3Data, User input is: ", userInput);
    totalRecordsImported = 0;
    totalRecordsFound = 0;

    if (false !== userInput) {
      // Try reading this data...
      var data = '',
          xml,
          content,
          cleanKey,
          cleanLastModified,
          cleanETag,
          cleanSize,
          cleanStorageClass,
          image_headers,

          findOrCreateIndex = 0,
          newModel,
          model;

      http.get(userInput, function (res) {
        if (res.statusCode >= 200 && res.statusCode <= 400) {
          res.on('data', function (rx_data) {
            data += rx_data.toString();
          });

          res.on('end', function () {
            console.log("s-3-images.js::importS3Data, Read data from %s", userInput);

            parser.on('error', function (err) {
              console.log("s-3-images.js::importS3Data, XML Parse Error!", err);
            });
            parser.parseString(data, function (err, result) {
              
              totalRecordsFound = result.ListBucketResult.Contents.length;
              console.log("s-3-images.js::importS3Data, Parse complete! Total records found: %d", totalRecordsFound);

              for (var i = 0; i < totalRecordsFound; i++) {
                // @TODO create record for each content item, check object.Key value against DB.
                // If we don't have a record, grab image, parse exif data!
                content = result.ListBucketResult.Contents[i];
                // console.log("content is ", content);

                cleanKey          = content.Key[0].replace(whitelistKey, '');
                cleanLastModified = content.LastModified[0].replace(whitelistLastModified, '');
                cleanETag         = content.ETag[0].replace(whitelistETag, '');
                cleanSize         = content.Size[0].replace(whitelistSize, '');
                cleanStorageClass = content.StorageClass[0].replace(whitelistStorageClass, '');

                // if (!cleanKey.match(/\.(jpg|jpeg|raw|tiff|png|gif)$/i)) {
                //   continue; // Skip this record, it's not an image we can handle.
                // }

                console.log("Input Key is ", content.Key[0],  "Whitelisted Key is ", cleanKey);

                newModel = {
                  "Name": "none", // Update Name and EXIF data as needed
                  "Key": cleanKey,
                  "LastModified": cleanLastModified,
                  "ETag": cleanETag,
                  "Size": cleanSize,
                  "StorageClass": cleanStorageClass
                };



                // findOrCreate BOF
                model = S3Images.findOrCreate({where: {"Key": cleanKey}}, newModel, function (err, s3images, created) {
                  console.log("Err?", err, "Instance:", s3images, "Created: ", created);
                  ++findOrCreateIndex;

                  if (true === created) {
                    ++totalRecordsImported;
                    // New record. Grab the image, import EXIF data
                    try {
                      // @TODO Download the image, since we don't have a working way of reading EXIF data from a URL stream yet...
                      // @TODO Implement path check to assert we ARE NOT writting somewhere we shouldn't on the file system...

                      http.get(userInput + "/" + s3images.Key, function (res) {
                        var imageData = '';
                        res.setEncoding('binary');

                        res.on('data', function (chunk) {
                          imageData += chunk;
                        });

                        res.on('end', function () {
                          fs.writeFile("/tmp/" + s3images.Key, imageData, 'binary', function (err) {
                            if (err) {
                              console.log("s-3-images.js::importS3Data, Error writing file to disk.", err);
                            } else {

                              // Ok, attempt to get EXIF data
                              new ExifImage({ image: "/tmp/" + s3images.Key}, function (exifError, exifData) {
                                if (exifError) {
                                  console.log("s-3-images.js::importS3Data, Error during ExifImage callback. of ", "/tmp/" + s3images.Key, exifError);
                                } else {
                                  // Got some EXIF data
                                  // model.ExifApertureValue
                                  console.log("Imported ", userInput + "/" + s3images.Key , "EXIF Data is ", exifData);

                                }
                              });

                            }
                          });
                        });
                      });
                      // request(userInput + "/" + s3images.Key).pipe(fs.createWriteStream("/tmp/" + S3Images.Key).pipe(function (err, resp, bod) {
                      //   console.log("request complete, err:", err, "response: ", resp);
                      //   new ExifImage({ image: "/tmp/" + s3images.Key}, function (exifError, exifData) {
                      //     if (exifError) {
                      //       console.log("s-3-images.js::importS3Data, Error during ExifImage callback.", exifError);
                      //     } else {
                      //       // Got some EXIF data
                      //       // model.ExifApertureValue
                      //       console.log("Imported ", userInput + "/" + S3Images.Key , "EXIF Data is ", exifData);

                      //     }
                      //   });
                      // });


                    } catch (error) {
                      console.log("s-3-images.js::importS3Data, Error when using ExifImage.", error);
                    }
                    
                  }

                  if (findOrCreateIndex >= totalRecordsFound) {
                    // Ok, all records accounted for. Run the callback.
                    callback(null, totalRecordsImported, totalRecordsFound);
                  }
                });

                // findOrCreate EOF
                

              }
              
            });
          });
        }
      }).end();


    }

  };


};
