'use strict';

var validator = require('validator');

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

    console.log("User input is: ", userInput);
    totalRecordsImported = 0;
    totalRecordsFound = 0;

    callback(null, totalRecordsImported, totalRecordsFound);
  };


  S3Images.remoteMethod(
    'importS3Data',
    {
      "isStatic": true,
      "accepts": [
        {
          "arg": "urlEnpoint",
          "type": "string",
          "required": true,
          "description": "Amazon S3 URL endpoint."
        }
      ],
      "returns": [
        {
          "arg": "totalRecordsImported",
          "type": "number",
          "root": false,
          "description": "Total amount of records imported"
        },
        {
          "arg": "totalRecordsFound",
          "type": "number",
          "root": false,
          "description": "Total amount of records found"
        }
      ],
      "description": "Import S3 Data (XML) from URL",
      "http": [
        {
          "path": "/imports3data",
          "verb": "post"
        }
      ]
    }
  );

};
