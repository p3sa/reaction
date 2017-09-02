//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Accounts = Package['accounts-base'].Accounts;
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var Template = Package['templating-runtime'].Template;
var Random = Package.random.Random;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Instagram;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/bozhao_accounts-instagram/instagram_client.js                                              //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
Instagram = {};                                                                                        // 1
                                                                                                       // 2
Instagram.requestCredential = function (options, credentialRequestCompleteCallback) {                  // 3
  if (!credentialRequestCompleteCallback && typeof options === 'function') {                           // 4
    credentialRequestCompleteCallback = options;                                                       // 5
    options = {};                                                                                      // 6
  }                                                                                                    // 7
                                                                                                       // 8
  var config = ServiceConfiguration.configurations.findOne({service: 'instagram'});                    // 9
  if (!config) {                                                                                       // 10
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(                            // 11
      new ServiceConfiguration.ConfigError());                                                         // 12
    return;                                                                                            // 13
  }                                                                                                    // 14
  var credentialToken = Random.secret();                                                               // 15
  var loginStyle = OAuth._loginStyle('instagram', config, options);                                    // 16
  var scope = (config.scope) || ['basic', 'likes', 'relationships', 'comments'];                       // 17
  var flatScope = _.map(scope, encodeURIComponent).join('+');                                          // 18
                                                                                                       // 19
  var loginUrl =                                                                                       // 20
    'https://instagram.com/oauth/authorize' +                                                          // 21
      '?client_id=' + config.clientId +                                                                // 22
      '&response_type=code' +                                                                          // 23
      '&scope=' + flatScope +                                                                          // 24
      '&redirect_uri=' + OAuth._redirectUri('instagram', config) +                                     // 25
      '&state=' + OAuth._stateParam(loginStyle, credentialToken);                                      // 26
                                                                                                       // 27
  OAuth.launchLogin({                                                                                  // 28
    loginService: "instagram"                                                                          // 29
    , loginStyle: loginStyle                                                                           // 30
    , loginUrl: loginUrl                                                                               // 31
    , credentialRequestCompleteCallback: credentialRequestCompleteCallback                             // 32
    , credentialToken: credentialToken                                                                 // 33
  });                                                                                                  // 34
};                                                                                                     // 35
                                                                                                       // 36
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/bozhao_accounts-instagram/instagram.js                                                     //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
Accounts.oauth.registerService('instagram');                                                           // 1
                                                                                                       // 2
if (Meteor.isClient) {                                                                                 // 3
  Meteor.loginWithInstagram = function(options, callback) {                                            // 4
    // support a callback without options                                                              // 5
    if (! callback && typeof options === "function") {                                                 // 6
      callback = options;                                                                              // 7
      options = null;                                                                                  // 8
    }                                                                                                  // 9
                                                                                                       // 10
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Instagram.requestCredential(options, credentialRequestCompleteCallback);                           // 12
  };                                                                                                   // 13
} else {                                                                                               // 14
  Accounts.addAutopublishFields({                                                                      // 15
    forLoggedInUser: ['services.instagram'],                                                           // 16
    forOtherUsers: [                                                                                   // 17
      'services.instagram.username',                                                                   // 18
      'services.instagram.full_name',                                                                  // 19
      'services.instagram.profile_picture'                                                             // 20
    ]                                                                                                  // 21
  });                                                                                                  // 22
}                                                                                                      // 23
                                                                                                       // 24
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/bozhao_accounts-instagram/template.instagram_configuration.js                              //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
                                                                                                       // 1
Template.__checkName("configureLoginServiceDialogForInstagram");                                       // 2
Template["configureLoginServiceDialogForInstagram"] = new Template("Template.configureLoginServiceDialogForInstagram", (function() {
  var view = this;                                                                                     // 4
  return [ HTML.Raw("<p>\n        Follow these steps to configure your Instagram client:\n    </p>\n    "), HTML.OL("\n        ", HTML.Raw('<li>\n            Visit <a href="http://instagram.com/developer/clients/register/" target="_blank">http://instagram.com/developer/clients/register/</a>\n        </li>'), "\n        ", HTML.LI("\n            Set Callback URL to: ", HTML.SPAN({
    class: "url"                                                                                       // 6
  }, Blaze.View("lookup:siteUrl", function() {                                                         // 7
    return Spacebars.mustache(view.lookup("siteUrl"));                                                 // 8
  }), "_oauth/instagram"), "\n        "), "\n    ") ];                                                 // 9
}));                                                                                                   // 10
                                                                                                       // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/bozhao_accounts-instagram/instagram_configuration.js                                       //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
Template.configureLoginServiceDialogForInstagram.helpers({                                             // 1
  siteUrl: function () {                                                                               // 2
    return Meteor.absoluteUrl();                                                                       // 3
  }                                                                                                    // 4
});                                                                                                    // 5
                                                                                                       // 6
Template.configureLoginServiceDialogForInstagram.fields = function () {                                // 7
  return [                                                                                             // 8
    {property: 'clientId', label: 'Client Id'},                                                        // 9
    {property: 'secret', label: 'Client Secret'}                                                       // 10
  ];                                                                                                   // 11
};                                                                                                     // 12
                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['bozhao:accounts-instagram'] = {}, {
  Instagram: Instagram
});

})();
