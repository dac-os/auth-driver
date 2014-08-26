var VError, httpRequest, async, uri;
VError = require('verror');
httpRequest = require('request');
async = require('async');

exports.configUri = function (newUri) {
  'use strict';

  uri = newUri;
};

exports.session = function authSession() {
  'use strict';

  return function authSessionMiddleware(request, response, next) {
    var token;
    token = request.get('csrf-token');
    httpRequest({
      'url'     : uri + '/users/me',
      'headers' : {'csrf-token' : token},
      'json'    : true
    }, function (error, res, body) {
      next(error, body);
    });
  };
};

exports.can = function authCan(permission) {
  'use strict';

  return function authPermissionMiddleware(request, response, next) {
    var session;
    session = request.session;
    if (!session || session.profile.permissions.lastIndexOf(permission) === -1) {
      return response.status(403).end();
    }
    return next();
  };
};
