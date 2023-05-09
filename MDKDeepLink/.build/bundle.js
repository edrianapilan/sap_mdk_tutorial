(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MDKDeepLink/i18n/i18n.properties":
/*!************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/i18n/i18n.properties ***!
  \************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/AppUpdateFailure.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/AppUpdateFailure.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/MDKDeepLink/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/AppUpdateSuccess.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/AppUpdateSuccess.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDKDeepLink/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDKDeepLink/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/OnWillUpdate.js":
/*!*************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/OnWillUpdate.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/MDKDeepLink/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return Promise.resolve();
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/OpenSAPMobileCards.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/OpenSAPMobileCards.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenSAPMobileCards)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OpenSAPMobileCards(context) {
  // Get the Nativescript Utils Module
  const utilsModule = context.nativescript.utilsModule;
  // Get the Nativescript Platform Module
  const platformModule = context.nativescript.platformModule;
  return context.executeAction('/MDKDeepLink/Actions/Confirmation.action').then(result => {
    if (result.data) {
      //This will open SAP Mobile Cards app
      if (platformModule.isIOS) {
        return utilsModule.openUrl("com.sap.content2go://");
      } else if (platformModule.isAndroid) {
        return utilsModule.openUrl("https://mobileservices.cloud.sap/mobilecards");
      }
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/OpenSAPcom.js":
/*!***********************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/OpenSAPcom.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenSAPcom)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OpenSAPcom(context) {
  // Get the Nativescript Utils Module
  const utilsModule = context.nativescript.utilsModule;
  return context.executeAction('/MDKDeepLink/Actions/Confirmation.action').then(result => {
    if (result.data) {
      //This will open SAP.com website
      return utilsModule.openUrl("https://www.sap.com");
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/ResetAppSettingsAndLogout.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/ResetAppSettingsAndLogout.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
  let logger = context.getLogger();
  let platform = context.nativescript.platformModule;
  let appSettings = context.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return context.getPageProxy().executeAction('/MDKDeepLink/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Styles/Styles.css":
/*!*********************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Styles/Styles.css ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDKDeepLink/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKDeepLink/Styles/Styles.less":
/*!**********************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Styles/Styles.less ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDKDeepLink/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKDeepLink/Styles/Styles.nss":
/*!*********************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Styles/Styles.nss ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js":
/*!***********************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js ***!
  \***********************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!******************************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \******************************************************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Pages/Main.page":
/*!*******************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Pages/Main.page ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"_Name":"SectionButton1","Title":"Open SAP Mobile Cards","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDKDeepLink/Rules/OpenSAPMobileCards.js"},{"_Name":"SectionButton0","Title":"Open sap.com page","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDKDeepLink/Rules/OpenSAPcom.js"}],"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"}}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MDKDeepLink/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDKDeepLink/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/MDKDeepLink/Pages/Main.page","OnWillUpdate":"/MDKDeepLink/Rules/OnWillUpdate.js","Styles":"/MDKDeepLink/Styles/Styles.less","Localization":"/MDKDeepLink/i18n/i18n.properties","_Name":"MDKDeepLink","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDKDeepLink/Styles/Styles.css","ios":"/MDKDeepLink/Styles/Styles.nss","android":"/MDKDeepLink/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/AppUpdate.action":
/*!****************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/AppUpdate.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDKDeepLink/Rules/AppUpdateFailure.js","OnSuccess":"/MDKDeepLink/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/AppUpdateFailureMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/AppUpdateFailureMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/AppUpdateProgressBanner.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/AppUpdateProgressBanner.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDKDeepLink/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/AppUpdateSuccessMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/AppUpdateSuccessMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/ClosePage.action":
/*!****************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/ClosePage.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Confirmation.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Confirmation.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"Confirmation"},"Message":"Do you want to leave the current app?","Title":"Confirm","OKCaption":"OK","CancelCaption":"Cancel"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Logout.action":
/*!*************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Logout.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/LogoutMessage.action":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/LogoutMessage.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDKDeepLink/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/OnWillUpdate.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/OnWillUpdate.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let mdkdeeplink_actions_appupdate_action = __webpack_require__(/*! ./MDKDeepLink/Actions/AppUpdate.action */ "./build.definitions/MDKDeepLink/Actions/AppUpdate.action")
let mdkdeeplink_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDKDeepLink/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MDKDeepLink/Actions/AppUpdateFailureMessage.action")
let mdkdeeplink_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDKDeepLink/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MDKDeepLink/Actions/AppUpdateProgressBanner.action")
let mdkdeeplink_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDKDeepLink/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MDKDeepLink/Actions/AppUpdateSuccessMessage.action")
let mdkdeeplink_actions_closepage_action = __webpack_require__(/*! ./MDKDeepLink/Actions/ClosePage.action */ "./build.definitions/MDKDeepLink/Actions/ClosePage.action")
let mdkdeeplink_actions_confirmation_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Confirmation.action */ "./build.definitions/MDKDeepLink/Actions/Confirmation.action")
let mdkdeeplink_actions_logout_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Logout.action */ "./build.definitions/MDKDeepLink/Actions/Logout.action")
let mdkdeeplink_actions_logoutmessage_action = __webpack_require__(/*! ./MDKDeepLink/Actions/LogoutMessage.action */ "./build.definitions/MDKDeepLink/Actions/LogoutMessage.action")
let mdkdeeplink_actions_onwillupdate_action = __webpack_require__(/*! ./MDKDeepLink/Actions/OnWillUpdate.action */ "./build.definitions/MDKDeepLink/Actions/OnWillUpdate.action")
let mdkdeeplink_i18n_i18n_properties = __webpack_require__(/*! ./MDKDeepLink/i18n/i18n.properties */ "./build.definitions/MDKDeepLink/i18n/i18n.properties")
let mdkdeeplink_jsconfig_json = __webpack_require__(/*! ./MDKDeepLink/jsconfig.json */ "./build.definitions/MDKDeepLink/jsconfig.json")
let mdkdeeplink_pages_main_page = __webpack_require__(/*! ./MDKDeepLink/Pages/Main.page */ "./build.definitions/MDKDeepLink/Pages/Main.page")
let mdkdeeplink_rules_appupdatefailure_js = __webpack_require__(/*! ./MDKDeepLink/Rules/AppUpdateFailure.js */ "./build.definitions/MDKDeepLink/Rules/AppUpdateFailure.js")
let mdkdeeplink_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDKDeepLink/Rules/AppUpdateSuccess.js */ "./build.definitions/MDKDeepLink/Rules/AppUpdateSuccess.js")
let mdkdeeplink_rules_onwillupdate_js = __webpack_require__(/*! ./MDKDeepLink/Rules/OnWillUpdate.js */ "./build.definitions/MDKDeepLink/Rules/OnWillUpdate.js")
let mdkdeeplink_rules_opensapcom_js = __webpack_require__(/*! ./MDKDeepLink/Rules/OpenSAPcom.js */ "./build.definitions/MDKDeepLink/Rules/OpenSAPcom.js")
let mdkdeeplink_rules_opensapmobilecards_js = __webpack_require__(/*! ./MDKDeepLink/Rules/OpenSAPMobileCards.js */ "./build.definitions/MDKDeepLink/Rules/OpenSAPMobileCards.js")
let mdkdeeplink_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDKDeepLink/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MDKDeepLink/Rules/ResetAppSettingsAndLogout.js")
let mdkdeeplink_styles_styles_css = __webpack_require__(/*! ./MDKDeepLink/Styles/Styles.css */ "./build.definitions/MDKDeepLink/Styles/Styles.css")
let mdkdeeplink_styles_styles_json = __webpack_require__(/*! ./MDKDeepLink/Styles/Styles.json */ "./build.definitions/MDKDeepLink/Styles/Styles.json")
let mdkdeeplink_styles_styles_less = __webpack_require__(/*! ./MDKDeepLink/Styles/Styles.less */ "./build.definitions/MDKDeepLink/Styles/Styles.less")
let mdkdeeplink_styles_styles_nss = __webpack_require__(/*! ./MDKDeepLink/Styles/Styles.nss */ "./build.definitions/MDKDeepLink/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mdkdeeplink_actions_appupdate_action : mdkdeeplink_actions_appupdate_action,
	mdkdeeplink_actions_appupdatefailuremessage_action : mdkdeeplink_actions_appupdatefailuremessage_action,
	mdkdeeplink_actions_appupdateprogressbanner_action : mdkdeeplink_actions_appupdateprogressbanner_action,
	mdkdeeplink_actions_appupdatesuccessmessage_action : mdkdeeplink_actions_appupdatesuccessmessage_action,
	mdkdeeplink_actions_closepage_action : mdkdeeplink_actions_closepage_action,
	mdkdeeplink_actions_confirmation_action : mdkdeeplink_actions_confirmation_action,
	mdkdeeplink_actions_logout_action : mdkdeeplink_actions_logout_action,
	mdkdeeplink_actions_logoutmessage_action : mdkdeeplink_actions_logoutmessage_action,
	mdkdeeplink_actions_onwillupdate_action : mdkdeeplink_actions_onwillupdate_action,
	mdkdeeplink_i18n_i18n_properties : mdkdeeplink_i18n_i18n_properties,
	mdkdeeplink_jsconfig_json : mdkdeeplink_jsconfig_json,
	mdkdeeplink_pages_main_page : mdkdeeplink_pages_main_page,
	mdkdeeplink_rules_appupdatefailure_js : mdkdeeplink_rules_appupdatefailure_js,
	mdkdeeplink_rules_appupdatesuccess_js : mdkdeeplink_rules_appupdatesuccess_js,
	mdkdeeplink_rules_onwillupdate_js : mdkdeeplink_rules_onwillupdate_js,
	mdkdeeplink_rules_opensapcom_js : mdkdeeplink_rules_opensapcom_js,
	mdkdeeplink_rules_opensapmobilecards_js : mdkdeeplink_rules_opensapmobilecards_js,
	mdkdeeplink_rules_resetappsettingsandlogout_js : mdkdeeplink_rules_resetappsettingsandlogout_js,
	mdkdeeplink_styles_styles_css : mdkdeeplink_styles_styles_css,
	mdkdeeplink_styles_styles_json : mdkdeeplink_styles_styles_json,
	mdkdeeplink_styles_styles_less : mdkdeeplink_styles_styles_less,
	mdkdeeplink_styles_styles_nss : mdkdeeplink_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Styles/Styles.json":
/*!**********************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Styles/Styles.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MDKDeepLink/jsconfig.json":
/*!*****************************************************!*\
  !*** ./build.definitions/MDKDeepLink/jsconfig.json ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map