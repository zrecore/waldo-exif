'use strict';

var validator = require('validator'),
    http      = require('http'),
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
        whitelistInput = urlEnpoint.replace(whitelistChars, ''),
        userInput = baseURL + whitelistInput;
    // @TODO retrieve data feed XML from Amazon S3 server endpoint.

    // Is this a chicken.
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
          xml;

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
              }
              callback(null, totalRecordsImported, totalRecordsFound);
            });
          });
        }
      }).end();


    }

  };


};
