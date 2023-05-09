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

/***/ "./build.definitions/MDK_Styling/i18n/i18n.properties":
/*!************************************************************!*\
  !*** ./build.definitions/MDK_Styling/i18n/i18n.properties ***!
  \************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MDK_Styling/Rules/AppUpdateFailure.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Rules/AppUpdateFailure.js ***!
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
    "Name": "/MDK_Styling/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Rules/AppUpdateSuccess.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Rules/AppUpdateSuccess.js ***!
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
        "Name": "/MDK_Styling/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK_Styling/Actions/AppUpdateSuccessMessage.action",
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

/***/ "./build.definitions/MDK_Styling/Rules/Customers/Customers_DeleteConfirmation.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Rules/Customers/Customers_DeleteConfirmation.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDK_Styling/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_Styling/Actions/Customers/Customers_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
  context.count('/MDK_Styling/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/MDK_Styling/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Rules/OnWillUpdate.js":
/*!*************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Rules/OnWillUpdate.js ***!
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
  return clientAPI.executeAction('/MDK_Styling/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_Styling/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Rules/Products/Products_DeleteConfirmation.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Rules/Products/Products_DeleteConfirmation.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDK_Styling/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_Styling/Actions/Products/Products_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Rules/ResetAppSettingsAndLogout.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Rules/ResetAppSettingsAndLogout.js ***!
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
    return context.getPageProxy().executeAction('/MDK_Styling/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDK_Styling/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Styles/Styles.css":
/*!*********************************************************!*\
  !*** ./build.definitions/MDK_Styling/Styles/Styles.css ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "ui5-mdk-bar.actionbar {\n  color: white;\n  background-color: red;\n}\nui5-mdk-overflow-toolbar.toolbar {\n  color: white;\n  background-color: gray;\n  /* Android */\n  bartintcolor: gray;\n  /* iOS */\n}\n#LogoutToolbarItem {\n  color: brown;\n}\n#UploadToolbarItem {\n  color: blue;\n}\n.MyCustomerButton {\n  font-color: #ff0000;\n  background-color: cyan;\n}\n.ObjectTableTitle {\n  color: #ffbb33;\n}\n/* Object Header - BodyText */\n.span.ohBodyText {\n  color: red;\n}\n/* Object Header - Description */\n.span.ohDescription {\n  color: blue;\n}\n/* Object Header - Footnote */\n.span.ohFootnote {\n  color: green;\n}\n/* Object Header - Headline */\n.objectHeaderHeadline {\n  color: #ff00ff;\n}\n/* Object Header - Background */\n.objectHeaderBackground {\n  background-color: #DC143C;\n}\n/* Object Header - StatusText */\n.objectHeaderStatus {\n  color: red;\n  font-style: italic;\n  font-size: 18;\n}\n/* Object Header - Subhead */\n.span.ohSubhead {\n  color: yellow;\n}\n/* Object Header - SubstatusText */\n.objectHeaderSubStatus {\n  color: blue;\n  font-style: italic;\n  font-size: 18;\n}\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_Styling/Styles/Styles.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,qBAAqB;AACvB;AACA;EACE,YAAY;EACZ,sBAAsB;EACtB,YAAY;EACZ,kBAAkB;EAClB,QAAQ;AACV;AACA;EACE,YAAY;AACd;AACA;EACE,WAAW;AACb;AACA;EACE,mBAAmB;EACnB,sBAAsB;AACxB;AACA;EACE,cAAc;AAChB;AACA,6BAA6B;AAC7B;EACE,UAAU;AACZ;AACA,gCAAgC;AAChC;EACE,WAAW;AACb;AACA,6BAA6B;AAC7B;EACE,YAAY;AACd;AACA,6BAA6B;AAC7B;EACE,cAAc;AAChB;AACA,+BAA+B;AAC/B;EACE,yBAAyB;AAC3B;AACA,+BAA+B;AAC/B;EACE,UAAU;EACV,kBAAkB;EAClB,aAAa;AACf;AACA,4BAA4B;AAC5B;EACE,aAAa;AACf;AACA,kCAAkC;AAClC;EACE,WAAW;EACX,kBAAkB;EAClB,aAAa;AACf","sourcesContent":["ui5-mdk-bar.actionbar {\n  color: white;\n  background-color: red;\n}\nui5-mdk-overflow-toolbar.toolbar {\n  color: white;\n  background-color: gray;\n  /* Android */\n  bartintcolor: gray;\n  /* iOS */\n}\n#LogoutToolbarItem {\n  color: brown;\n}\n#UploadToolbarItem {\n  color: blue;\n}\n.MyCustomerButton {\n  font-color: #ff0000;\n  background-color: cyan;\n}\n.ObjectTableTitle {\n  color: #ffbb33;\n}\n/* Object Header - BodyText */\n.span.ohBodyText {\n  color: red;\n}\n/* Object Header - Description */\n.span.ohDescription {\n  color: blue;\n}\n/* Object Header - Footnote */\n.span.ohFootnote {\n  color: green;\n}\n/* Object Header - Headline */\n.objectHeaderHeadline {\n  color: #ff00ff;\n}\n/* Object Header - Background */\n.objectHeaderBackground {\n  background-color: #DC143C;\n}\n/* Object Header - StatusText */\n.objectHeaderStatus {\n  color: red;\n  font-style: italic;\n  font-size: 18;\n}\n/* Object Header - Subhead */\n.span.ohSubhead {\n  color: yellow;\n}\n/* Object Header - SubstatusText */\n.objectHeaderSubStatus {\n  color: blue;\n  font-style: italic;\n  font-size: 18;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK_Styling/Styles/Styles.less":
/*!**********************************************************!*\
  !*** ./build.definitions/MDK_Styling/Styles/Styles.less ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n\n//// This style applies to all the ActionBars in the application\nActionBar {\n    color: white;\n    background-color: red;\n}\n\n//// This style applies to all the ToolBars in the application\nToolBar {\n    color: white;\n    background-color: gray; /* Android */\n    bartintcolor: gray;     /* iOS */\n}\n\n//// LogoutToolbarItem is tool bar item for Logout in Main.page\n#LogoutToolbarItem  {\n    color: brown;\n}\n\n//// UploadToolbarItem is tool bar item for Sync in Main.page\n#UploadToolbarItem  {\n    color: blue;\n}\n\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n//// below snippet is to style Customers button on Main.page\n.MyCustomerButton{\n  font-color: @mdkRed1;\n  background-color: cyan;\n}\n\n//// below snippet is to style Title property of an Object Table control in Customers_List.page\n.ObjectTableTitle {\n color: @mdkYellow1;\n}\n\n\n//// below snippet is to style Object Header control in Customers_Detail.page\n\n/* Object Header - BodyText */\n.objectHeaderBodyText {\n  color: red;\n}\n\n/* Object Header - Description */\n.objectHeaderDescription {\n  color: blue;\n}\n\n/* Object Header - Footnote */\n.objectHeaderFootNote {\n  color: green;\n}\n\n/* Object Header - Headline */\n.objectHeaderHeadline {\n  color: #ff00ff;\n}\n\n/* Object Header - Background */\n.objectHeaderBackground {\nbackground-color: #DC143C;\n}\n\n/* Object Header - StatusText */\n.objectHeaderStatus {\n  color: red;\n  font-style: italic;\n  font-size: 18;\n}\n\n/* Object Header - Subhead */\n.objectHeaderSubhead {\n  color: yellow;\n}\n\n/* Object Header - SubstatusText */\n.objectHeaderSubStatus {\n  color: blue;\n  font-style: italic;\n  font-size: 18;\n}\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_Styling/Styles/Styles.less"],"names":[],"mappings":"AAAA,oBAAoB;AACpB,iBAAiB;;;AAGjB;;IAEI,YAAY;IACZ,qBAAqB;AACzB;;AAEA;;IAEI,YAAY;IACZ,sBAAsB,EAAE,YAAY;IACpC,kBAAkB,MAAM,QAAQ;AACpC;;AAEA;;IAEI,YAAY;AAChB;;AAEA;;IAEI,WAAW;AACf;;AAEA;;;EAGE,oBAAoB;EACpB,sBAAsB;AACxB;;AAEA;;CAEC,kBAAkB;AACnB;;;AAGA;;;;EAIE,UAAU;AACZ;;AAEA,gCAAgC;AAChC;EACE,WAAW;AACb;;AAEA,6BAA6B;AAC7B;EACE,YAAY;AACd;;AAEA,6BAA6B;AAC7B;EACE,cAAc;AAChB;;AAEA,+BAA+B;AAC/B;AACA,yBAAyB;AACzB;;AAEA,+BAA+B;AAC/B;EACE,UAAU;EACV,kBAAkB;EAClB,aAAa;AACf;;AAEA,4BAA4B;AAC5B;EACE,aAAa;AACf;;AAEA,kCAAkC;AAClC;EACE,WAAW;EACX,kBAAkB;EAClB,aAAa;AACf","sourcesContent":["@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n\n//// This style applies to all the ActionBars in the application\nActionBar {\n    color: white;\n    background-color: red;\n}\n\n//// This style applies to all the ToolBars in the application\nToolBar {\n    color: white;\n    background-color: gray; /* Android */\n    bartintcolor: gray;     /* iOS */\n}\n\n//// LogoutToolbarItem is tool bar item for Logout in Main.page\n#LogoutToolbarItem  {\n    color: brown;\n}\n\n//// UploadToolbarItem is tool bar item for Sync in Main.page\n#UploadToolbarItem  {\n    color: blue;\n}\n\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n//// below snippet is to style Customers button on Main.page\n.MyCustomerButton{\n  font-color: @mdkRed1;\n  background-color: cyan;\n}\n\n//// below snippet is to style Title property of an Object Table control in Customers_List.page\n.ObjectTableTitle {\n color: @mdkYellow1;\n}\n\n\n//// below snippet is to style Object Header control in Customers_Detail.page\n\n/* Object Header - BodyText */\n.objectHeaderBodyText {\n  color: red;\n}\n\n/* Object Header - Description */\n.objectHeaderDescription {\n  color: blue;\n}\n\n/* Object Header - Footnote */\n.objectHeaderFootNote {\n  color: green;\n}\n\n/* Object Header - Headline */\n.objectHeaderHeadline {\n  color: #ff00ff;\n}\n\n/* Object Header - Background */\n.objectHeaderBackground {\nbackground-color: #DC143C;\n}\n\n/* Object Header - StatusText */\n.objectHeaderStatus {\n  color: red;\n  font-style: italic;\n  font-size: 18;\n}\n\n/* Object Header - Subhead */\n.objectHeaderSubhead {\n  color: yellow;\n}\n\n/* Object Header - SubstatusText */\n.objectHeaderSubStatus {\n  color: blue;\n  font-style: italic;\n  font-size: 18;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK_Styling/Styles/Styles.nss":
/*!*********************************************************!*\
  !*** ./build.definitions/MDK_Styling/Styles/Styles.nss ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\nActionBar {\n\tfont-color: white;\n\tbackground-color: red;\n}\nMyCustomerButton {\n\tfont-color: #ff0000;\n\tbackground-color: cyan;\n}\nObjectTableTitle {\n\tfont-color: #ffbb33;\n}\nobjectHeaderBodyText {\n\tfont-color: red;\n}\nobjectHeaderDescription {\n\tfont-color: blue;\n}\nobjectHeaderFootNote {\n\tfont-color: green;\n}\nobjectHeaderHeadline {\n\tfont-color: #ff00ff;\n}\nobjectHeaderBackground {\n\tbackground-color: #DC143C;\n}\nobjectHeaderStatus {\n\tfont-color: red;\n\tfont-style: italic;\n\tfont-size: 18;\n}\nobjectHeaderSubhead {\n\tfont-color: yellow;\n}\nobjectHeaderSubStatus {\n\tfont-color: blue;\n\tfont-style: italic;\n\tfont-size: 18;\n}\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_Styling/Styles/Styles.nss"],"names":[],"mappings":"AAAA,oBAAoB;AACpB,iBAAiB;AACjB;CACC,iBAAiB;CACjB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,sBAAsB;AACvB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,eAAe;AAChB;AACA;CACC,gBAAgB;AACjB;AACA;CACC,iBAAiB;AAClB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,eAAe;CACf,kBAAkB;CAClB,aAAa;AACd;AACA;CACC,kBAAkB;AACnB;AACA;CACC,gBAAgB;CAChB,kBAAkB;CAClB,aAAa;AACd","sourcesContent":["@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\nActionBar {\n\tfont-color: white;\n\tbackground-color: red;\n}\nMyCustomerButton {\n\tfont-color: #ff0000;\n\tbackground-color: cyan;\n}\nObjectTableTitle {\n\tfont-color: #ffbb33;\n}\nobjectHeaderBodyText {\n\tfont-color: red;\n}\nobjectHeaderDescription {\n\tfont-color: blue;\n}\nobjectHeaderFootNote {\n\tfont-color: green;\n}\nobjectHeaderHeadline {\n\tfont-color: #ff00ff;\n}\nobjectHeaderBackground {\n\tbackground-color: #DC143C;\n}\nobjectHeaderStatus {\n\tfont-color: red;\n\tfont-style: italic;\n\tfont-size: 18;\n}\nobjectHeaderSubhead {\n\tfont-color: yellow;\n}\nobjectHeaderSubStatus {\n\tfont-color: blue;\n\tfont-style: italic;\n\tfont-size: 18;\n}\n"],"sourceRoot":""}]);
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

/***/ "./build.definitions/MDK_Styling/Pages/Customers/Customers_Create.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/Customers/Customers_Create.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_Styling/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK_Styling/Actions/Customers/Customers_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Customer Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"City","_Name":"City","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerId","_Name":"CustomerId","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"DateOfBirth","Caption":"DateOfBirth","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"EmailAddress","_Name":"EmailAddress","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"FirstName","_Name":"FirstName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"HouseNumber","_Name":"HouseNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LastName","_Name":"LastName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PhoneNumber","_Name":"PhoneNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PostalCode","_Name":"PostalCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Street","_Name":"Street","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Customers_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/Customers/Customers_CreateSalesOrderHeader.page":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/Customers/Customers_CreateSalesOrderHeader.page ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_Styling/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK_Styling/Actions/Customers/Customers_CreateSalesOrderHeader.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create SalesOrderHeader","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"CreatedAt","Caption":"CreatedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{CustomerId}","ReturnValue":"{CustomerId}","Target":{"EntitySet":"Customers","Service":"/MDK_Styling/Services/SampleServiceV2.service"}},"_Name":"CustomerId","_Type":"Control.Type.FormCell.ListPicker","Value":"{CustomerId}"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatus","_Name":"LifeCycleStatus","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatusName","_Name":"LifeCycleStatusName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderId","_Name":"SalesOrderId","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Customers_CreateSalesOrderHeader","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/Customers/Customers_Detail.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/Customers/Customers_Detail.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/MDK_Styling/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":""},"Controls":[{"DataSubscriptions":["SalesOrderHeaders"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"ObjectHeader":{"Subhead":"{City}","Footnote":"{CustomerId}","Description":"{Country}","StatusText":"{DateOfBirth}","SubstatusText":"{EmailAddress}","Tags":[],"HeadlineText":"{FirstName}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading","Styles":{"ObjectHeader":"objectHeaderBackground","BodyText":"objectHeaderBodyText","Description":"objectHeaderDescription","Footnote":"objectHeaderFootNote","HeadlineText":"objectHeaderHeadline","StatusText":"objectHeaderStatus","Subhead":"objectHeaderSubhead","SubstatusText":"objectHeaderSubStatus"}},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0"},{"KeyAndValues":[{"Value":"{City}","_Name":"KeyValue0","KeyName":"City"},{"Value":"{Country}","_Name":"KeyValue1","KeyName":"Country"},{"Value":"{CustomerId}","_Name":"KeyValue2","KeyName":"CustomerId"},{"Value":"{DateOfBirth}","_Name":"KeyValue3","KeyName":"DateOfBirth"},{"Value":"{EmailAddress}","_Name":"KeyValue4","KeyName":"EmailAddress"},{"Value":"{FirstName}","_Name":"KeyValue5","KeyName":"FirstName"},{"Value":"{HouseNumber}","_Name":"KeyValue6","KeyName":"HouseNumber"},{"Value":"{LastName}","_Name":"KeyValue7","KeyName":"LastName"},{"Value":"{PhoneNumber}","_Name":"KeyValue8","KeyName":"PhoneNumber"},{"Value":"{PostalCode}","_Name":"KeyValue9","KeyName":"PostalCode"},{"Value":"{Street}","_Name":"KeyValue10","KeyName":"Street"},{"Value":"{UpdatedTimestamp}","_Name":"KeyValue11","KeyName":"UpdatedTimestamp"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}},{"KeyAndValues":[{"Value":"{Address/HouseNumber}","_Name":"KeyValue12","KeyName":"HouseNumber"},{"Value":"{Address/Street}","_Name":"KeyValue13","KeyName":"Street"},{"Value":"{Address/City}","_Name":"KeyValue14","KeyName":"City"},{"Value":"{Address/Country}","_Name":"KeyValue15","KeyName":"Country"},{"Value":"{Address/PostalCode}","_Name":"KeyValue16","KeyName":"PostalCode"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValueAddress","Header":{"_Name":"SectionHeader0","UseTopPadding":true,"Caption":"Address"},"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}},{"Header":{"_Name":"SectionHeader1","UseTopPadding":true,"Caption":"SalesOrders"},"_Type":"Section.Type.ObjectTable","Target":{"EntitySet":"{@odata.readLink}/SalesOrders","Service":"/MDK_Styling/Services/SampleServiceV2.service"},"_Name":"SectionObjectTable0","EmptySection":{"Caption":"No record found!","FooterVisible":false},"ObjectCell":{"Title":"{LifeCycleStatusName}","Subhead":"{CreatedAt}","Footnote":"{CustomerId}","Description":"{CurrencyCode}","StatusText":"{GrossAmount}","SubstatusText":"{LifeCycleStatus}","PreserveIconStackSpacing":false,"AccessoryType":"disclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"OnPress":"/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action","ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true}}}]}],"_Type":"Page","_Name":"Customers_Detail","Caption":"Customer Detail","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"OnPress":"/MDK_Styling/Actions/Customers/NavToCustomers_Edit.action"},{"_Name":"ActionBarItem1","Caption":"More","Position":"Right","IsIconCircular":false,"OnPress":"/MDK_Styling/Actions/Customers/Customers_DetailPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/Customers/Customers_Edit.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/Customers/Customers_Edit.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Customer Detail","DesignTimeTarget":{"Service":"/MDK_Styling/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDK_Styling/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDK_Styling/Actions/Customers/Customers_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"City","_Name":"City","Value":"{City}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","Value":"{Country}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerId","_Name":"CustomerId","Value":"{CustomerId}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Mode":"Datetime","_Name":"DateOfBirth","Value":"{DateOfBirth}","Caption":"DateOfBirth","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"EmailAddress","_Name":"EmailAddress","Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"FirstName","_Name":"FirstName","Value":"{FirstName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"HouseNumber","_Name":"HouseNumber","Value":"{HouseNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LastName","_Name":"LastName","Value":"{LastName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PhoneNumber","_Name":"PhoneNumber","Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PostalCode","_Name":"PostalCode","Value":"{PostalCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Street","_Name":"Street","Value":"{Street}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Value":"{UpdatedTimestamp}","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Customers_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/Customers/Customers_List.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/Customers/Customers_List.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Header":{"_Name":"SectionHeader0","AccessoryType":"none","UseTopPadding":false},"_Type":"Section.Type.ObjectTable","Target":{"EntitySet":"Customers","Service":"/MDK_Styling/Services/SampleServiceV2.service","QueryOptions":""},"_Name":"SectionObjectTable0","EmptySection":{"Caption":"No record found!","FooterVisible":false},"ObjectCell":{"Title":"{FirstName}","Subhead":"{City}","Footnote":"{CustomerId}","Description":"{Country}","StatusText":"{DateOfBirth}","SubstatusText":"{EmailAddress}","PreserveIconStackSpacing":false,"AccessoryType":"disclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"OnPress":"/MDK_Styling/Actions/Customers/NavToCustomers_Detail.action","Styles":{"Title":"ObjectTableTitle"},"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true}},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."}}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."}}],"_Type":"Page","_Name":"Customers_List","Caption":"Customers","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"","SystemItem":"Add","Position":"Right","IsIconCircular":false,"OnPress":"/MDK_Styling/Actions/Customers/NavToCustomers_Create.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/ErrorArchive/ErrorArchive_List.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDK_Styling/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MDK_Styling/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/Main.page":
/*!*******************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/Main.page ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Customers","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Styles":{"Button":"MyCustomerButton"},"OnPress":"/MDK_Styling/Actions/Customers/NavToCustomers_List.action"},{"_Name":"SectionButton1","Title":"Products","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","OnPress":"/MDK_Styling/Actions/Products/NavToProducts_List.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MDK_Styling/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_Styling/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_Styling/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/Products/Products_Create.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/Products/Products_Create.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_Styling/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK_Styling/Actions/Products/Products_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Product Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Category","_Name":"Category","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","KeyboardType":"Number","_Name":"DimensionDepth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","KeyboardType":"Number","_Name":"DimensionHeight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","KeyboardType":"Number","_Name":"DimensionWidth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","KeyboardType":"Number","_Name":"Price","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ProductId}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Stock","Service":"/MDK_Styling/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDK_Styling/Services/SampleServiceV2.service"}},"_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Weight","KeyboardType":"Number","_Name":"Weight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"AttachmentTitle":"Media","AttachmentAddTitle":"Browse","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":["jpg","png","gif"],"_Name":"Attachment","_Type":"Control.Type.FormCell.Attachment"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/Products/Products_Detail.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/Products/Products_Detail.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Product Detail","DesignTimeTarget":{"Service":"/MDK_Styling/Services/SampleServiceV2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDK_Styling/Actions/Products/NavToProducts_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDK_Styling/Actions/Products/Products_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/MDK_Styling/Services/SampleServiceV2.service/{@odata.readLink}/$value","HeadlineText":"{Name}","Subhead":"{Category}","BodyText":"","Footnote":"{CurrencyCode}","Description":"{CategoryName}","StatusText":"{DimensionDepth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{DimensionHeight}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DimensionDepth","Value":"{DimensionDepth}"},{"KeyName":"DimensionHeight","Value":"{DimensionHeight}"},{"KeyName":"DimensionUnit","Value":"{DimensionUnit}"},{"KeyName":"DimensionWidth","Value":"{DimensionWidth}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"PictureUrl","Value":"{PictureUrl}"},{"KeyName":"Price","Value":"{Price}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"},{"KeyName":"Weight","Value":"{Weight}"},{"KeyName":"WeightUnit","Value":"{WeightUnit}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/Products/Products_Edit.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/Products/Products_Edit.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Product Detail","DesignTimeTarget":{"Service":"/MDK_Styling/Services/SampleServiceV2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDK_Styling/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDK_Styling/Actions/Products/Products_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Category","_Name":"Category","Value":"{Category}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","Value":"{CategoryName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","_Name":"DimensionDepth","Value":"{DimensionDepth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","_Name":"DimensionHeight","Value":"{DimensionHeight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","Value":"{DimensionUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","_Name":"DimensionWidth","Value":"{DimensionWidth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","Value":"{LongDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","Value":"{PictureUrl}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","_Name":"Price","Value":"{Price}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ProductId}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Stock","Service":"/MDK_Styling/Services/SampleServiceV2.service"}},"Value":"{ProductId}","_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","Value":"{ShortDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDK_Styling/Services/SampleServiceV2.service"}},"Value":"{SupplierId}","_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Value":"{UpdatedTimestamp}","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Weight","_Name":"Weight","Value":"{Weight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","Value":"{WeightUnit}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/Products/Products_List.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/Products/Products_List.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Products","ActionBar":{"Items":[{"OnPress":"/MDK_Styling/Actions/Products/NavToProducts_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CategoryName}","AvatarStack":{"Avatars":[{"Image":"/MDK_Styling/Services/SampleServiceV2.service/{@odata.readLink}/$value"}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_Styling/Actions/Products/NavToProducts_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{CurrencyCode}","PreserveIconStackSpacing":false,"StatusText":"{DimensionDepth}","Subhead":"{Category}","SubstatusText":"{DimensionHeight}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Products","Service":"/MDK_Styling/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_Styling/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create SalesOrderItem","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"DeliveryDate","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Products","Service":"/MDK_Styling/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderId}","ReturnValue":"{SalesOrderId}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDK_Styling/Services/SampleServiceV2.service"}},"_Name":"SalesOrderId","_Type":"Control.Type.FormCell.ListPicker","Value":"{SalesOrderId}"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_CreateSalesOrderItem","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeader Detail","DesignTimeTarget":{"Service":"/MDK_Styling/Services/SampleServiceV2.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{LifeCycleStatusName}","Subhead":"{CreatedAt}","BodyText":"","Footnote":"{CustomerId}","Description":"{CurrencyCode}","StatusText":"{GrossAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{LifeCycleStatus}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CreatedAt","Value":"{CreatedAt}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"CustomerId","Value":"{CustomerId}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"LifeCycleStatus","Value":"{LifeCycleStatus}"},{"KeyName":"LifeCycleStatusName","Value":"{LifeCycleStatusName}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"SalesOrderId","Value":"{SalesOrderId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductId}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MDK_Styling/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update SalesOrderHeader Detail","DesignTimeTarget":{"Service":"/MDK_Styling/Services/SampleServiceV2.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDK_Styling/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"CreatedAt","Value":"{CreatedAt}","Caption":"CreatedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{CustomerId}","ReturnValue":"{CustomerId}","Target":{"EntitySet":"Customers","Service":"/MDK_Styling/Services/SampleServiceV2.service"}},"Value":"{CustomerId}","_Name":"CustomerId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatus","_Name":"LifeCycleStatus","Value":"{LifeCycleStatus}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatusName","_Name":"LifeCycleStatusName","Value":"{LifeCycleStatusName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderId","_Name":"SalesOrderId","Value":"{SalesOrderId}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK_Styling","Version":"/MDK_Styling/Globals/AppDefinition_Version.global","MainPage":"/MDK_Styling/Pages/Main.page","OnLaunch":["/MDK_Styling/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MDK_Styling/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK_Styling/Actions/Service/InitializeOffline.action","Styles":"/MDK_Styling/Styles/Styles.less","Localization":"/MDK_Styling/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDK_Styling/Styles/Styles.css","ios":"/MDK_Styling/Styles/Styles.nss","android":"/MDK_Styling/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/AppUpdate.action":
/*!****************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/AppUpdate.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK_Styling/Rules/AppUpdateFailure.js","OnSuccess":"/MDK_Styling/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/AppUpdateFailureMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/AppUpdateFailureMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/AppUpdateProgressBanner.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/AppUpdateProgressBanner.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK_Styling/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/AppUpdateSuccessMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/AppUpdateSuccessMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/CloseModalPage_Cancel.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/CloseModalPage_Cancel.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/CloseModalPage_Complete.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/CloseModalPage_Complete.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/ClosePage.action":
/*!****************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/ClosePage.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/CreateEntityFailureMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/CreateEntityFailureMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/CreateEntitySuccessMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/CreateEntitySuccessMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/MDK_Styling/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Customers/Customers_CreateEntity.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Customers/Customers_CreateEntity.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDK_Styling/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_Styling/Actions/CreateEntitySuccessMessage.action","Properties":{"City":"#Control:City/#Value","Country":"#Control:Country/#Value","CustomerId":"#Control:CustomerId/#Value","DateOfBirth":"#Control:DateOfBirth/#Value","EmailAddress":"#Control:EmailAddress/#Value","FirstName":"#Control:FirstName/#Value","HouseNumber":"#Control:HouseNumber/#Value","LastName":"#Control:LastName/#Value","PhoneNumber":"#Control:PhoneNumber/#Value","PostalCode":"#Control:PostalCode/#Value","Street":"#Control:Street/#Value","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value"},"Target":{"EntitySet":"Customers","Service":"/MDK_Styling/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Customers/Customers_CreateSalesOrderHeader.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Customers/Customers_CreateSalesOrderHeader.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"SalesOrders","Target":{"EntitySet":"Customers","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDK_Styling/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_Styling/Actions/CreateEntitySuccessMessage.action","Properties":{"CreatedAt":"#Control:CreatedAt/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","CustomerId":"#Control:CustomerId/#SelectedValue","GrossAmount":"#Control:GrossAmount/#Value","LifeCycleStatus":"#Control:LifeCycleStatus/#Value","LifeCycleStatusName":"#Control:LifeCycleStatusName/#Value","NetAmount":"#Control:NetAmount/#Value","SalesOrderId":"#Control:SalesOrderId/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDK_Styling/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Customers/Customers_DeleteEntity.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Customers/Customers_DeleteEntity.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Customers","Service":"/MDK_Styling/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDK_Styling/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDK_Styling/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Customers/Customers_DetailPopover.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Customers/Customers_DetailPopover.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add SalesOrderHeader","OnPress":"/MDK_Styling/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action"},{"Title":"Delete","OnPress":"/MDK_Styling/Rules/Customers/Customers_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Customers/Customers_UpdateEntity.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Customers/Customers_UpdateEntity.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Customers","Service":"/MDK_Styling/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"City":"#Control:City/#Value","Country":"#Control:Country/#Value","CustomerId":"#Control:CustomerId/#Value","DateOfBirth":"#Control:DateOfBirth/#Value","EmailAddress":"#Control:EmailAddress/#Value","FirstName":"#Control:FirstName/#Value","HouseNumber":"#Control:HouseNumber/#Value","LastName":"#Control:LastName/#Value","PhoneNumber":"#Control:PhoneNumber/#Value","PostalCode":"#Control:PostalCode/#Value","Street":"#Control:Street/#Value","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDK_Styling/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDK_Styling/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_Create.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_Create.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_Styling/Pages/Customers/Customers_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_Styling/Pages/Customers/Customers_CreateSalesOrderHeader.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_Detail.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_Detail.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_Styling/Pages/Customers/Customers_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_Edit.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_Edit.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_Styling/Pages/Customers/Customers_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_List.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_List.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_Styling/Pages/Customers/Customers_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/DeleteConfirmation.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/DeleteConfirmation.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/DeleteEntityFailureMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/DeleteEntityFailureMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/DeleteEntitySuccessMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/DeleteEntitySuccessMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDK_Styling/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDK_Styling/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_Styling/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_Styling/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Logout.action":
/*!*************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Logout.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/LogoutMessage.action":
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/LogoutMessage.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK_Styling/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/OnWillUpdate.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/OnWillUpdate.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Products/NavToProducts_Create.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Products/NavToProducts_Create.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_Styling/Pages/Products/Products_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Products/NavToProducts_Detail.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Products/NavToProducts_Detail.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_Styling/Pages/Products/Products_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Products/NavToProducts_Edit.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Products/NavToProducts_Edit.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_Styling/Pages/Products/Products_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Products/NavToProducts_List.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Products/NavToProducts_List.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_Styling/Pages/Products/Products_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Products/Products_CreateEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Products/Products_CreateEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"OnFailure":"/MDK_Styling/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_Styling/Actions/CreateEntitySuccessMessage.action","Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductId":"#Control:ProductId/#SelectedValue","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"Media":"#Control:Attachment/#Value","Target":{"EntitySet":"Products","Service":"/MDK_Styling/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateMedia"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Products/Products_DeleteEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Products/Products_DeleteEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Products","Service":"/MDK_Styling/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDK_Styling/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDK_Styling/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Products/Products_DetailPopover.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Products/Products_DetailPopover.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Open Document","OnPress":"/MDK_Styling/Actions/Products/Products_OpenDocument.action"},{"Title":"Delete","OnPress":"/MDK_Styling/Rules/Products/Products_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Products/Products_OpenDocument.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Products/Products_OpenDocument.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OpenDocument","Path":"/MDK_Styling/Services/SampleServiceV2.service/{@odata.readLink}/$value","MimeType":"image/jpeg"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Products/Products_UpdateEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Products/Products_UpdateEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Products","Service":"/MDK_Styling/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductId":"#Control:ProductId/#SelectedValue","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDK_Styling/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDK_Styling/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action":
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"Items","Target":{"EntitySet":"SalesOrderHeaders","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDK_Styling/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_Styling/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductId":"#Control:ProductId/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderId":"#Control:SalesOrderId/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderItems","Service":"/MDK_Styling/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDK_Styling/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDK_Styling/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDK_Styling/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add SalesOrderItem","OnPress":"/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action"},{"Title":"Delete","OnPress":"/MDK_Styling/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDK_Styling/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"CreatedAt":"#Control:CreatedAt/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","CustomerId":"#Control:CustomerId/#SelectedValue","GrossAmount":"#Control:GrossAmount/#Value","LifeCycleStatus":"#Control:LifeCycleStatus/#Value","LifeCycleStatusName":"#Control:LifeCycleStatusName/#Value","NetAmount":"#Control:NetAmount/#Value","SalesOrderId":"#Control:SalesOrderId/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDK_Styling/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDK_Styling/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/CloseOffline.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/CloseOffline.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDK_Styling/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDK_Styling/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDK_Styling/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/CloseOfflineFailureMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/CloseOfflineFailureMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/CloseOfflineSuccessMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/DownloadOffline.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/DownloadOffline.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_Styling/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDK_Styling/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MDK_Styling/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/DownloadStartedMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/DownloadStartedMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDK_Styling/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/InitializeOffline.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/InitializeOffline.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_Styling/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MDK_Styling/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MDK_Styling/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/InitializeOfflineFailureMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/SyncFailureMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/SyncFailureMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/SyncStartedMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/SyncStartedMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDK_Styling/Actions/Service/UploadOffline.action","OnFailure":"/MDK_Styling/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/SyncSuccessMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/SyncSuccessMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/Service/UploadOffline.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/Service/UploadOffline.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_Styling/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDK_Styling/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MDK_Styling/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/UpdateEntityFailureMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/UpdateEntityFailureMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Actions/UpdateEntitySuccessMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Actions/UpdateEntitySuccessMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDK_Styling/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Globals/AppDefinition_Version.global":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Globals/AppDefinition_Version.global ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Services/SampleServiceV2.service":
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_Styling/Services/SampleServiceV2.service ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV2","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

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
let mdk_styling_actions_appupdate_action = __webpack_require__(/*! ./MDK_Styling/Actions/AppUpdate.action */ "./build.definitions/MDK_Styling/Actions/AppUpdate.action")
let mdk_styling_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MDK_Styling/Actions/AppUpdateFailureMessage.action")
let mdk_styling_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK_Styling/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MDK_Styling/Actions/AppUpdateProgressBanner.action")
let mdk_styling_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MDK_Styling/Actions/AppUpdateSuccessMessage.action")
let mdk_styling_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDK_Styling/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MDK_Styling/Actions/CloseModalPage_Cancel.action")
let mdk_styling_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDK_Styling/Actions/CloseModalPage_Complete.action */ "./build.definitions/MDK_Styling/Actions/CloseModalPage_Complete.action")
let mdk_styling_actions_closepage_action = __webpack_require__(/*! ./MDK_Styling/Actions/ClosePage.action */ "./build.definitions/MDK_Styling/Actions/ClosePage.action")
let mdk_styling_actions_createentityfailuremessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/CreateEntityFailureMessage.action */ "./build.definitions/MDK_Styling/Actions/CreateEntityFailureMessage.action")
let mdk_styling_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/MDK_Styling/Actions/CreateEntitySuccessMessage.action")
let mdk_styling_actions_customers_customers_createentity_action = __webpack_require__(/*! ./MDK_Styling/Actions/Customers/Customers_CreateEntity.action */ "./build.definitions/MDK_Styling/Actions/Customers/Customers_CreateEntity.action")
let mdk_styling_actions_customers_customers_createsalesorderheader_action = __webpack_require__(/*! ./MDK_Styling/Actions/Customers/Customers_CreateSalesOrderHeader.action */ "./build.definitions/MDK_Styling/Actions/Customers/Customers_CreateSalesOrderHeader.action")
let mdk_styling_actions_customers_customers_deleteentity_action = __webpack_require__(/*! ./MDK_Styling/Actions/Customers/Customers_DeleteEntity.action */ "./build.definitions/MDK_Styling/Actions/Customers/Customers_DeleteEntity.action")
let mdk_styling_actions_customers_customers_detailpopover_action = __webpack_require__(/*! ./MDK_Styling/Actions/Customers/Customers_DetailPopover.action */ "./build.definitions/MDK_Styling/Actions/Customers/Customers_DetailPopover.action")
let mdk_styling_actions_customers_customers_updateentity_action = __webpack_require__(/*! ./MDK_Styling/Actions/Customers/Customers_UpdateEntity.action */ "./build.definitions/MDK_Styling/Actions/Customers/Customers_UpdateEntity.action")
let mdk_styling_actions_customers_navtocustomers_create_action = __webpack_require__(/*! ./MDK_Styling/Actions/Customers/NavToCustomers_Create.action */ "./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_Create.action")
let mdk_styling_actions_customers_navtocustomers_createsalesorderheader_action = __webpack_require__(/*! ./MDK_Styling/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action */ "./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action")
let mdk_styling_actions_customers_navtocustomers_detail_action = __webpack_require__(/*! ./MDK_Styling/Actions/Customers/NavToCustomers_Detail.action */ "./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_Detail.action")
let mdk_styling_actions_customers_navtocustomers_edit_action = __webpack_require__(/*! ./MDK_Styling/Actions/Customers/NavToCustomers_Edit.action */ "./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_Edit.action")
let mdk_styling_actions_customers_navtocustomers_list_action = __webpack_require__(/*! ./MDK_Styling/Actions/Customers/NavToCustomers_List.action */ "./build.definitions/MDK_Styling/Actions/Customers/NavToCustomers_List.action")
let mdk_styling_actions_deleteconfirmation_action = __webpack_require__(/*! ./MDK_Styling/Actions/DeleteConfirmation.action */ "./build.definitions/MDK_Styling/Actions/DeleteConfirmation.action")
let mdk_styling_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/MDK_Styling/Actions/DeleteEntityFailureMessage.action")
let mdk_styling_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/MDK_Styling/Actions/DeleteEntitySuccessMessage.action")
let mdk_styling_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDK_Styling/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/MDK_Styling/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let mdk_styling_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDK_Styling/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/MDK_Styling/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let mdk_styling_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDK_Styling/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/MDK_Styling/Actions/ErrorArchive/NavToErrorArchive_List.action")
let mdk_styling_actions_logout_action = __webpack_require__(/*! ./MDK_Styling/Actions/Logout.action */ "./build.definitions/MDK_Styling/Actions/Logout.action")
let mdk_styling_actions_logoutmessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/LogoutMessage.action */ "./build.definitions/MDK_Styling/Actions/LogoutMessage.action")
let mdk_styling_actions_onwillupdate_action = __webpack_require__(/*! ./MDK_Styling/Actions/OnWillUpdate.action */ "./build.definitions/MDK_Styling/Actions/OnWillUpdate.action")
let mdk_styling_actions_products_navtoproducts_create_action = __webpack_require__(/*! ./MDK_Styling/Actions/Products/NavToProducts_Create.action */ "./build.definitions/MDK_Styling/Actions/Products/NavToProducts_Create.action")
let mdk_styling_actions_products_navtoproducts_detail_action = __webpack_require__(/*! ./MDK_Styling/Actions/Products/NavToProducts_Detail.action */ "./build.definitions/MDK_Styling/Actions/Products/NavToProducts_Detail.action")
let mdk_styling_actions_products_navtoproducts_edit_action = __webpack_require__(/*! ./MDK_Styling/Actions/Products/NavToProducts_Edit.action */ "./build.definitions/MDK_Styling/Actions/Products/NavToProducts_Edit.action")
let mdk_styling_actions_products_navtoproducts_list_action = __webpack_require__(/*! ./MDK_Styling/Actions/Products/NavToProducts_List.action */ "./build.definitions/MDK_Styling/Actions/Products/NavToProducts_List.action")
let mdk_styling_actions_products_products_createentity_action = __webpack_require__(/*! ./MDK_Styling/Actions/Products/Products_CreateEntity.action */ "./build.definitions/MDK_Styling/Actions/Products/Products_CreateEntity.action")
let mdk_styling_actions_products_products_deleteentity_action = __webpack_require__(/*! ./MDK_Styling/Actions/Products/Products_DeleteEntity.action */ "./build.definitions/MDK_Styling/Actions/Products/Products_DeleteEntity.action")
let mdk_styling_actions_products_products_detailpopover_action = __webpack_require__(/*! ./MDK_Styling/Actions/Products/Products_DetailPopover.action */ "./build.definitions/MDK_Styling/Actions/Products/Products_DetailPopover.action")
let mdk_styling_actions_products_products_opendocument_action = __webpack_require__(/*! ./MDK_Styling/Actions/Products/Products_OpenDocument.action */ "./build.definitions/MDK_Styling/Actions/Products/Products_OpenDocument.action")
let mdk_styling_actions_products_products_updateentity_action = __webpack_require__(/*! ./MDK_Styling/Actions/Products/Products_UpdateEntity.action */ "./build.definitions/MDK_Styling/Actions/Products/Products_UpdateEntity.action")
let mdk_styling_actions_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action = __webpack_require__(/*! ./MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action */ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action")
let mdk_styling_actions_salesorderheaders_navtosalesorderheaders_detail_action = __webpack_require__(/*! ./MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action */ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action")
let mdk_styling_actions_salesorderheaders_navtosalesorderheaders_edit_action = __webpack_require__(/*! ./MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action */ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action")
let mdk_styling_actions_salesorderheaders_salesorderheaders_createsalesorderitem_action = __webpack_require__(/*! ./MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action */ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action")
let mdk_styling_actions_salesorderheaders_salesorderheaders_deleteentity_action = __webpack_require__(/*! ./MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action */ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action")
let mdk_styling_actions_salesorderheaders_salesorderheaders_detailpopover_action = __webpack_require__(/*! ./MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action */ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action")
let mdk_styling_actions_salesorderheaders_salesorderheaders_updateentity_action = __webpack_require__(/*! ./MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action */ "./build.definitions/MDK_Styling/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action")
let mdk_styling_actions_service_closeoffline_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/CloseOffline.action */ "./build.definitions/MDK_Styling/Actions/Service/CloseOffline.action")
let mdk_styling_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/MDK_Styling/Actions/Service/CloseOfflineFailureMessage.action")
let mdk_styling_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/MDK_Styling/Actions/Service/CloseOfflineSuccessMessage.action")
let mdk_styling_actions_service_downloadoffline_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/DownloadOffline.action */ "./build.definitions/MDK_Styling/Actions/Service/DownloadOffline.action")
let mdk_styling_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/MDK_Styling/Actions/Service/DownloadStartedMessage.action")
let mdk_styling_actions_service_initializeoffline_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/InitializeOffline.action */ "./build.definitions/MDK_Styling/Actions/Service/InitializeOffline.action")
let mdk_styling_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/MDK_Styling/Actions/Service/InitializeOfflineFailureMessage.action")
let mdk_styling_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/MDK_Styling/Actions/Service/InitializeOfflineSuccessMessage.action")
let mdk_styling_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/SyncFailureMessage.action */ "./build.definitions/MDK_Styling/Actions/Service/SyncFailureMessage.action")
let mdk_styling_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/SyncStartedMessage.action */ "./build.definitions/MDK_Styling/Actions/Service/SyncStartedMessage.action")
let mdk_styling_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/SyncSuccessMessage.action */ "./build.definitions/MDK_Styling/Actions/Service/SyncSuccessMessage.action")
let mdk_styling_actions_service_uploadoffline_action = __webpack_require__(/*! ./MDK_Styling/Actions/Service/UploadOffline.action */ "./build.definitions/MDK_Styling/Actions/Service/UploadOffline.action")
let mdk_styling_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/MDK_Styling/Actions/UpdateEntityFailureMessage.action")
let mdk_styling_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./MDK_Styling/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/MDK_Styling/Actions/UpdateEntitySuccessMessage.action")
let mdk_styling_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK_Styling/Globals/AppDefinition_Version.global */ "./build.definitions/MDK_Styling/Globals/AppDefinition_Version.global")
let mdk_styling_i18n_i18n_properties = __webpack_require__(/*! ./MDK_Styling/i18n/i18n.properties */ "./build.definitions/MDK_Styling/i18n/i18n.properties")
let mdk_styling_jsconfig_json = __webpack_require__(/*! ./MDK_Styling/jsconfig.json */ "./build.definitions/MDK_Styling/jsconfig.json")
let mdk_styling_pages_customers_customers_create_page = __webpack_require__(/*! ./MDK_Styling/Pages/Customers/Customers_Create.page */ "./build.definitions/MDK_Styling/Pages/Customers/Customers_Create.page")
let mdk_styling_pages_customers_customers_createsalesorderheader_page = __webpack_require__(/*! ./MDK_Styling/Pages/Customers/Customers_CreateSalesOrderHeader.page */ "./build.definitions/MDK_Styling/Pages/Customers/Customers_CreateSalesOrderHeader.page")
let mdk_styling_pages_customers_customers_detail_page = __webpack_require__(/*! ./MDK_Styling/Pages/Customers/Customers_Detail.page */ "./build.definitions/MDK_Styling/Pages/Customers/Customers_Detail.page")
let mdk_styling_pages_customers_customers_edit_page = __webpack_require__(/*! ./MDK_Styling/Pages/Customers/Customers_Edit.page */ "./build.definitions/MDK_Styling/Pages/Customers/Customers_Edit.page")
let mdk_styling_pages_customers_customers_list_page = __webpack_require__(/*! ./MDK_Styling/Pages/Customers/Customers_List.page */ "./build.definitions/MDK_Styling/Pages/Customers/Customers_List.page")
let mdk_styling_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDK_Styling/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/MDK_Styling/Pages/ErrorArchive/ErrorArchive_Detail.page")
let mdk_styling_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDK_Styling/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/MDK_Styling/Pages/ErrorArchive/ErrorArchive_List.page")
let mdk_styling_pages_main_page = __webpack_require__(/*! ./MDK_Styling/Pages/Main.page */ "./build.definitions/MDK_Styling/Pages/Main.page")
let mdk_styling_pages_products_products_create_page = __webpack_require__(/*! ./MDK_Styling/Pages/Products/Products_Create.page */ "./build.definitions/MDK_Styling/Pages/Products/Products_Create.page")
let mdk_styling_pages_products_products_detail_page = __webpack_require__(/*! ./MDK_Styling/Pages/Products/Products_Detail.page */ "./build.definitions/MDK_Styling/Pages/Products/Products_Detail.page")
let mdk_styling_pages_products_products_edit_page = __webpack_require__(/*! ./MDK_Styling/Pages/Products/Products_Edit.page */ "./build.definitions/MDK_Styling/Pages/Products/Products_Edit.page")
let mdk_styling_pages_products_products_list_page = __webpack_require__(/*! ./MDK_Styling/Pages/Products/Products_List.page */ "./build.definitions/MDK_Styling/Pages/Products/Products_List.page")
let mdk_styling_pages_salesorderheaders_salesorderheaders_createsalesorderitem_page = __webpack_require__(/*! ./MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page */ "./build.definitions/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page")
let mdk_styling_pages_salesorderheaders_salesorderheaders_detail_page = __webpack_require__(/*! ./MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page */ "./build.definitions/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page")
let mdk_styling_pages_salesorderheaders_salesorderheaders_edit_page = __webpack_require__(/*! ./MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page */ "./build.definitions/MDK_Styling/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page")
let mdk_styling_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK_Styling/Rules/AppUpdateFailure.js */ "./build.definitions/MDK_Styling/Rules/AppUpdateFailure.js")
let mdk_styling_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK_Styling/Rules/AppUpdateSuccess.js */ "./build.definitions/MDK_Styling/Rules/AppUpdateSuccess.js")
let mdk_styling_rules_customers_customers_deleteconfirmation_js = __webpack_require__(/*! ./MDK_Styling/Rules/Customers/Customers_DeleteConfirmation.js */ "./build.definitions/MDK_Styling/Rules/Customers/Customers_DeleteConfirmation.js")
let mdk_styling_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDK_Styling/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/MDK_Styling/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let mdk_styling_rules_onwillupdate_js = __webpack_require__(/*! ./MDK_Styling/Rules/OnWillUpdate.js */ "./build.definitions/MDK_Styling/Rules/OnWillUpdate.js")
let mdk_styling_rules_products_products_deleteconfirmation_js = __webpack_require__(/*! ./MDK_Styling/Rules/Products/Products_DeleteConfirmation.js */ "./build.definitions/MDK_Styling/Rules/Products/Products_DeleteConfirmation.js")
let mdk_styling_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK_Styling/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MDK_Styling/Rules/ResetAppSettingsAndLogout.js")
let mdk_styling_rules_salesorderheaders_salesorderheaders_deleteconfirmation_js = __webpack_require__(/*! ./MDK_Styling/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js */ "./build.definitions/MDK_Styling/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js")
let mdk_styling_services_sampleservicev2_service = __webpack_require__(/*! ./MDK_Styling/Services/SampleServiceV2.service */ "./build.definitions/MDK_Styling/Services/SampleServiceV2.service")
let mdk_styling_styles_styles_css = __webpack_require__(/*! ./MDK_Styling/Styles/Styles.css */ "./build.definitions/MDK_Styling/Styles/Styles.css")
let mdk_styling_styles_styles_json = __webpack_require__(/*! ./MDK_Styling/Styles/Styles.json */ "./build.definitions/MDK_Styling/Styles/Styles.json")
let mdk_styling_styles_styles_less = __webpack_require__(/*! ./MDK_Styling/Styles/Styles.less */ "./build.definitions/MDK_Styling/Styles/Styles.less")
let mdk_styling_styles_styles_nss = __webpack_require__(/*! ./MDK_Styling/Styles/Styles.nss */ "./build.definitions/MDK_Styling/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mdk_styling_actions_appupdate_action : mdk_styling_actions_appupdate_action,
	mdk_styling_actions_appupdatefailuremessage_action : mdk_styling_actions_appupdatefailuremessage_action,
	mdk_styling_actions_appupdateprogressbanner_action : mdk_styling_actions_appupdateprogressbanner_action,
	mdk_styling_actions_appupdatesuccessmessage_action : mdk_styling_actions_appupdatesuccessmessage_action,
	mdk_styling_actions_closemodalpage_cancel_action : mdk_styling_actions_closemodalpage_cancel_action,
	mdk_styling_actions_closemodalpage_complete_action : mdk_styling_actions_closemodalpage_complete_action,
	mdk_styling_actions_closepage_action : mdk_styling_actions_closepage_action,
	mdk_styling_actions_createentityfailuremessage_action : mdk_styling_actions_createentityfailuremessage_action,
	mdk_styling_actions_createentitysuccessmessage_action : mdk_styling_actions_createentitysuccessmessage_action,
	mdk_styling_actions_customers_customers_createentity_action : mdk_styling_actions_customers_customers_createentity_action,
	mdk_styling_actions_customers_customers_createsalesorderheader_action : mdk_styling_actions_customers_customers_createsalesorderheader_action,
	mdk_styling_actions_customers_customers_deleteentity_action : mdk_styling_actions_customers_customers_deleteentity_action,
	mdk_styling_actions_customers_customers_detailpopover_action : mdk_styling_actions_customers_customers_detailpopover_action,
	mdk_styling_actions_customers_customers_updateentity_action : mdk_styling_actions_customers_customers_updateentity_action,
	mdk_styling_actions_customers_navtocustomers_create_action : mdk_styling_actions_customers_navtocustomers_create_action,
	mdk_styling_actions_customers_navtocustomers_createsalesorderheader_action : mdk_styling_actions_customers_navtocustomers_createsalesorderheader_action,
	mdk_styling_actions_customers_navtocustomers_detail_action : mdk_styling_actions_customers_navtocustomers_detail_action,
	mdk_styling_actions_customers_navtocustomers_edit_action : mdk_styling_actions_customers_navtocustomers_edit_action,
	mdk_styling_actions_customers_navtocustomers_list_action : mdk_styling_actions_customers_navtocustomers_list_action,
	mdk_styling_actions_deleteconfirmation_action : mdk_styling_actions_deleteconfirmation_action,
	mdk_styling_actions_deleteentityfailuremessage_action : mdk_styling_actions_deleteentityfailuremessage_action,
	mdk_styling_actions_deleteentitysuccessmessage_action : mdk_styling_actions_deleteentitysuccessmessage_action,
	mdk_styling_actions_errorarchive_errorarchive_syncfailure_action : mdk_styling_actions_errorarchive_errorarchive_syncfailure_action,
	mdk_styling_actions_errorarchive_navtoerrorarchive_detail_action : mdk_styling_actions_errorarchive_navtoerrorarchive_detail_action,
	mdk_styling_actions_errorarchive_navtoerrorarchive_list_action : mdk_styling_actions_errorarchive_navtoerrorarchive_list_action,
	mdk_styling_actions_logout_action : mdk_styling_actions_logout_action,
	mdk_styling_actions_logoutmessage_action : mdk_styling_actions_logoutmessage_action,
	mdk_styling_actions_onwillupdate_action : mdk_styling_actions_onwillupdate_action,
	mdk_styling_actions_products_navtoproducts_create_action : mdk_styling_actions_products_navtoproducts_create_action,
	mdk_styling_actions_products_navtoproducts_detail_action : mdk_styling_actions_products_navtoproducts_detail_action,
	mdk_styling_actions_products_navtoproducts_edit_action : mdk_styling_actions_products_navtoproducts_edit_action,
	mdk_styling_actions_products_navtoproducts_list_action : mdk_styling_actions_products_navtoproducts_list_action,
	mdk_styling_actions_products_products_createentity_action : mdk_styling_actions_products_products_createentity_action,
	mdk_styling_actions_products_products_deleteentity_action : mdk_styling_actions_products_products_deleteentity_action,
	mdk_styling_actions_products_products_detailpopover_action : mdk_styling_actions_products_products_detailpopover_action,
	mdk_styling_actions_products_products_opendocument_action : mdk_styling_actions_products_products_opendocument_action,
	mdk_styling_actions_products_products_updateentity_action : mdk_styling_actions_products_products_updateentity_action,
	mdk_styling_actions_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action : mdk_styling_actions_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action,
	mdk_styling_actions_salesorderheaders_navtosalesorderheaders_detail_action : mdk_styling_actions_salesorderheaders_navtosalesorderheaders_detail_action,
	mdk_styling_actions_salesorderheaders_navtosalesorderheaders_edit_action : mdk_styling_actions_salesorderheaders_navtosalesorderheaders_edit_action,
	mdk_styling_actions_salesorderheaders_salesorderheaders_createsalesorderitem_action : mdk_styling_actions_salesorderheaders_salesorderheaders_createsalesorderitem_action,
	mdk_styling_actions_salesorderheaders_salesorderheaders_deleteentity_action : mdk_styling_actions_salesorderheaders_salesorderheaders_deleteentity_action,
	mdk_styling_actions_salesorderheaders_salesorderheaders_detailpopover_action : mdk_styling_actions_salesorderheaders_salesorderheaders_detailpopover_action,
	mdk_styling_actions_salesorderheaders_salesorderheaders_updateentity_action : mdk_styling_actions_salesorderheaders_salesorderheaders_updateentity_action,
	mdk_styling_actions_service_closeoffline_action : mdk_styling_actions_service_closeoffline_action,
	mdk_styling_actions_service_closeofflinefailuremessage_action : mdk_styling_actions_service_closeofflinefailuremessage_action,
	mdk_styling_actions_service_closeofflinesuccessmessage_action : mdk_styling_actions_service_closeofflinesuccessmessage_action,
	mdk_styling_actions_service_downloadoffline_action : mdk_styling_actions_service_downloadoffline_action,
	mdk_styling_actions_service_downloadstartedmessage_action : mdk_styling_actions_service_downloadstartedmessage_action,
	mdk_styling_actions_service_initializeoffline_action : mdk_styling_actions_service_initializeoffline_action,
	mdk_styling_actions_service_initializeofflinefailuremessage_action : mdk_styling_actions_service_initializeofflinefailuremessage_action,
	mdk_styling_actions_service_initializeofflinesuccessmessage_action : mdk_styling_actions_service_initializeofflinesuccessmessage_action,
	mdk_styling_actions_service_syncfailuremessage_action : mdk_styling_actions_service_syncfailuremessage_action,
	mdk_styling_actions_service_syncstartedmessage_action : mdk_styling_actions_service_syncstartedmessage_action,
	mdk_styling_actions_service_syncsuccessmessage_action : mdk_styling_actions_service_syncsuccessmessage_action,
	mdk_styling_actions_service_uploadoffline_action : mdk_styling_actions_service_uploadoffline_action,
	mdk_styling_actions_updateentityfailuremessage_action : mdk_styling_actions_updateentityfailuremessage_action,
	mdk_styling_actions_updateentitysuccessmessage_action : mdk_styling_actions_updateentitysuccessmessage_action,
	mdk_styling_globals_appdefinition_version_global : mdk_styling_globals_appdefinition_version_global,
	mdk_styling_i18n_i18n_properties : mdk_styling_i18n_i18n_properties,
	mdk_styling_jsconfig_json : mdk_styling_jsconfig_json,
	mdk_styling_pages_customers_customers_create_page : mdk_styling_pages_customers_customers_create_page,
	mdk_styling_pages_customers_customers_createsalesorderheader_page : mdk_styling_pages_customers_customers_createsalesorderheader_page,
	mdk_styling_pages_customers_customers_detail_page : mdk_styling_pages_customers_customers_detail_page,
	mdk_styling_pages_customers_customers_edit_page : mdk_styling_pages_customers_customers_edit_page,
	mdk_styling_pages_customers_customers_list_page : mdk_styling_pages_customers_customers_list_page,
	mdk_styling_pages_errorarchive_errorarchive_detail_page : mdk_styling_pages_errorarchive_errorarchive_detail_page,
	mdk_styling_pages_errorarchive_errorarchive_list_page : mdk_styling_pages_errorarchive_errorarchive_list_page,
	mdk_styling_pages_main_page : mdk_styling_pages_main_page,
	mdk_styling_pages_products_products_create_page : mdk_styling_pages_products_products_create_page,
	mdk_styling_pages_products_products_detail_page : mdk_styling_pages_products_products_detail_page,
	mdk_styling_pages_products_products_edit_page : mdk_styling_pages_products_products_edit_page,
	mdk_styling_pages_products_products_list_page : mdk_styling_pages_products_products_list_page,
	mdk_styling_pages_salesorderheaders_salesorderheaders_createsalesorderitem_page : mdk_styling_pages_salesorderheaders_salesorderheaders_createsalesorderitem_page,
	mdk_styling_pages_salesorderheaders_salesorderheaders_detail_page : mdk_styling_pages_salesorderheaders_salesorderheaders_detail_page,
	mdk_styling_pages_salesorderheaders_salesorderheaders_edit_page : mdk_styling_pages_salesorderheaders_salesorderheaders_edit_page,
	mdk_styling_rules_appupdatefailure_js : mdk_styling_rules_appupdatefailure_js,
	mdk_styling_rules_appupdatesuccess_js : mdk_styling_rules_appupdatesuccess_js,
	mdk_styling_rules_customers_customers_deleteconfirmation_js : mdk_styling_rules_customers_customers_deleteconfirmation_js,
	mdk_styling_rules_errorarchive_errorarchive_checkforsyncerror_js : mdk_styling_rules_errorarchive_errorarchive_checkforsyncerror_js,
	mdk_styling_rules_onwillupdate_js : mdk_styling_rules_onwillupdate_js,
	mdk_styling_rules_products_products_deleteconfirmation_js : mdk_styling_rules_products_products_deleteconfirmation_js,
	mdk_styling_rules_resetappsettingsandlogout_js : mdk_styling_rules_resetappsettingsandlogout_js,
	mdk_styling_rules_salesorderheaders_salesorderheaders_deleteconfirmation_js : mdk_styling_rules_salesorderheaders_salesorderheaders_deleteconfirmation_js,
	mdk_styling_services_sampleservicev2_service : mdk_styling_services_sampleservicev2_service,
	mdk_styling_styles_styles_css : mdk_styling_styles_styles_css,
	mdk_styling_styles_styles_json : mdk_styling_styles_styles_json,
	mdk_styling_styles_styles_less : mdk_styling_styles_styles_less,
	mdk_styling_styles_styles_nss : mdk_styling_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/MDK_Styling/Styles/Styles.json":
/*!**********************************************************!*\
  !*** ./build.definitions/MDK_Styling/Styles/Styles.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"ActionBar":{"font-color":"white","background-color":"red"},"MyCustomerButton":{"font-color":"#ff0000","background-color":"cyan"},"ObjectTableTitle":{"font-color":"#ffbb33"},"objectHeaderBodyText":{"font-color":"red"},"objectHeaderDescription":{"font-color":"blue"},"objectHeaderFootNote":{"font-color":"green"},"objectHeaderHeadline":{"font-color":"#ff00ff"},"objectHeaderBackground":{"background-color":"#DC143C"},"objectHeaderStatus":{"font-color":"red","font-style":"italic","font-size":"18"},"objectHeaderSubhead":{"font-color":"yellow"},"objectHeaderSubStatus":{"font-color":"blue","font-style":"italic","font-size":"18"}}');

/***/ }),

/***/ "./build.definitions/MDK_Styling/jsconfig.json":
/*!*****************************************************!*\
  !*** ./build.definitions/MDK_Styling/jsconfig.json ***!
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