var VError, request, async, uri;

VError = require('verror');
request = require('request');
async = require('async');

/**
 * @method
 * @summary Setups default base uri
 *
 * @param {String} newUri
 */
exports.configUri = function (newUri) {
  'use strict';
  
  uri = newUri;
};
