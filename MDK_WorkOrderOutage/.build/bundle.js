/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8024:
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/i18n/i18n.properties ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ 7561:
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Rules/AppUpdateFailure.js ***!
  \*************************************************************************/
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
    "Name": "/MDK_WorkOrderOutage/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ 329:
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Rules/AppUpdateSuccess.js ***!
  \*************************************************************************/
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
        "Name": "/MDK_WorkOrderOutage/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK_WorkOrderOutage/Actions/AppUpdateSuccessMessage.action",
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

/***/ 5934:
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \****************************************************************************************************/
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
  context.count('/MDK_WorkOrderOutage/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/MDK_WorkOrderOutage/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ 4178:
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Rules/OnWillUpdate.js ***!
  \*********************************************************************/
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
  return clientAPI.executeAction('/MDK_WorkOrderOutage/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_WorkOrderOutage/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ 6675:
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Rules/OpenWorkCofirmation.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenWorkCofirmation)
/* harmony export */ });
function OpenWorkCofirmation(context) {
  var wrStatusVal = context.evaluateTargetPath('#Page:Work_Request_Details/#Control:FCWRStatus/#SelectedValue');
  if (wrStatusVal == "Completed") {
    context.executeAction('/MDK_WorkOrderOutage/Actions/NavToWork_Confirmation.action');
  } else {
    return true;
  }
}

/***/ }),

/***/ 9104:
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Rules/ResetAppSettingsAndLogout.js ***!
  \**********************************************************************************/
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
    return context.getPageProxy().executeAction('/MDK_WorkOrderOutage/Actions/Logout.action');
  }
}

/***/ }),

/***/ 9240:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Rules/ShowInputTime.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowInputTime)
/* harmony export */ });
function ShowInputTime(context) {
  var timeToStoreVal = context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCTimeToRestore/#SelectedValue');
  if (timeToStoreVal == "Other") {
    context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCSPTime').setVisible(true);
  } else {
    context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCSPTime').setVisible(false);
  }
}

/***/ }),

/***/ 7845:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Rules/TimeToRestore.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TimeToRestore)
/* harmony export */ });
function TimeToRestore(context) {
  var restoreServiceVal = context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCRestoreService/#SelectedValue');
  if (restoreServiceVal == "Yes") {
    context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCTimeToRestore').setVisible(true);
  } else {
    context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCTimeToRestore').setVisible(false);
    context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCSPTime').setVisible(false);
  }
}

/***/ }),

/***/ 2715:
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Styles/Styles.css ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n.objectTitleBG {\n  background-color: yellow;\n}\n.objectTitleVal {\n  color: orange !important;\n}\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_WorkOrderOutage/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC;AACD;EACE,wBAAwB;AAC1B;AACA;EACE,wBAAwB;AAC1B","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n.objectTitleBG {\n  background-color: yellow;\n}\n.objectTitleVal {\n  color: orange !important;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 3754:
/*!******************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Styles/Styles.less ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n\n.objectTitleBG {\n    background-color: yellow;\n}\n\n.objectTitleVal {\n    color: orange !important;\n}", "",{"version":3,"sources":["webpack://./build.definitions/MDK_WorkOrderOutage/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC;;AAED;IACI,wBAAwB;AAC5B;;AAEA;IACI,wBAAwB;AAC5B","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n\n.objectTitleBG {\n    background-color: yellow;\n}\n\n.objectTitleVal {\n    color: orange !important;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 9145:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Styles/Styles.light.css ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ns-light .objectTitleBG {\n\tbackground-color: yellow;\n}\n.ns-light .objectTitleVal {\n\tcolor: orange !important;\n}\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_WorkOrderOutage/Styles/Styles.light.css"],"names":[],"mappings":"AAAA;CACC,wBAAwB;AACzB;AACA;CACC,wBAAwB;AACzB","sourcesContent":[".ns-light .objectTitleBG {\n\tbackground-color: yellow;\n}\n.ns-light .objectTitleVal {\n\tcolor: orange !important;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 8246:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Styles/Styles.light.nss ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "objectTitleBG {\n\tbackground-color: yellow;\n}\nobjectTitleVal {\n\tfont-color: orange !important;\n}\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_WorkOrderOutage/Styles/Styles.light.nss"],"names":[],"mappings":"AAAA;CACC,wBAAwB;AACzB;AACA;CACC,6BAA6B;AAC9B","sourcesContent":["objectTitleBG {\n\tbackground-color: yellow;\n}\nobjectTitleVal {\n\tfont-color: orange !important;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 4308:
/*!***********************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js ***!
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

/***/ 8899:
/*!******************************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
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

/***/ 5487:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Customers/Customers_Detail.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customer Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{FirstName}","Subhead":"{City}","BodyText":"","Footnote":"{CustomerId}","Description":"{Country}","StatusText":"{DateOfBirth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{EmailAddress}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"City","Value":"{City}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"CustomerId","Value":"{CustomerId}"},{"KeyName":"DateOfBirth","Value":"{DateOfBirth}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"FirstName","Value":"{FirstName}"},{"KeyName":"HouseNumber","Value":"{HouseNumber}"},{"KeyName":"LastName","Value":"{LastName}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"PostalCode","Value":"{PostalCode}"},{"KeyName":"Street","Value":"{Street}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Address"},"KeyAndValues":[{"KeyName":"HouseNumber","Value":"{Address/HouseNumber}"},{"KeyName":"Street","Value":"{Address/Street}"},{"KeyName":"City","Value":"{Address/City}"},{"KeyName":"Country","Value":"{Address/Country}"},{"KeyName":"PostalCode","Value":"{Address/PostalCode}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValueAddress","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"SalesOrders"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}","OnPress":"/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/SalesOrders","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderHeaders"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ 837:
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Customers/Customers_List.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customers","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Country}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_Detail.action","StatusImage":"","Title":"{FirstName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{DateOfBirth}","Subhead":"{City}","SubstatusText":"{EmailAddress}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Customers","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_List","PrefersLargeCaption":true}

/***/ }),

/***/ 2330:
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ 4549:
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ 1143:
/*!***************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Main.page ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Work Request Details","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDK_WorkOrderOutage/Actions/NavToWork_Request_Details.action"},{"_Name":"SectionButton1","Title":"Work Confirmation","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDK_WorkOrderOutage/Actions/NavToWorkConfirmation.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MDK_WorkOrderOutage/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_WorkOrderOutage/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_WorkOrderOutage/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ 6098:
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Products/Products_Detail.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Product Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service/{@odata.readLink}/$value","HeadlineText":"{Name}","Subhead":"{Category}","BodyText":"","Footnote":"{CurrencyCode}","Description":"{CategoryName}","StatusText":"{DimensionDepth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{DimensionHeight}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DimensionDepth","Value":"{DimensionDepth}"},{"KeyName":"DimensionHeight","Value":"{DimensionHeight}"},{"KeyName":"DimensionUnit","Value":"{DimensionUnit}"},{"KeyName":"DimensionWidth","Value":"{DimensionWidth}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"PictureUrl","Value":"{PictureUrl}"},{"KeyName":"Price","Value":"{Price}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"},{"KeyName":"Weight","Value":"{Weight}"},{"KeyName":"WeightUnit","Value":"{WeightUnit}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ 3759:
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Products/Products_List.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Products","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CategoryName}","AvatarStack":{"Avatars":[{"Image":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service/{@odata.readLink}/$value"}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/Products/NavToProducts_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{CurrencyCode}","PreserveIconStackSpacing":false,"StatusText":"{DimensionDepth}","Subhead":"{Category}","SubstatusText":"{DimensionHeight}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Products","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_List","PrefersLargeCaption":true}

/***/ }),

/***/ 797:
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderHeader Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{PurchaseOrderId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{NetAmount}","Description":"{GrossAmount}","StatusText":"{SupplierId}","StatusImage":"","SubstatusImage":"","SubstatusText":"{TaxAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"PurchaseOrderId","Value":"{PurchaseOrderId}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductId}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderId}","OnPress":"/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["PurchaseOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ 2688:
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderHeaders","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action","StatusImage":"","Title":"{PurchaseOrderId}","Footnote":"{NetAmount}","PreserveIconStackSpacing":false,"StatusText":"{SupplierId}","Subhead":"{CurrencyCode}","SubstatusText":"{TaxAmount}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ 3472:
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItem Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{ItemNumber}","Description":"{GrossAmount}","StatusText":"{NetAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{PurchaseOrderId}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"PurchaseOrderId","Value":"{PurchaseOrderId}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ 8649:
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItems","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action","StatusImage":"","Title":"{ProductId}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderId}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_List","PrefersLargeCaption":true}

/***/ }),

/***/ 218:
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeader Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{LifeCycleStatusName}","Subhead":"{CreatedAt}","BodyText":"","Footnote":"{CustomerId}","Description":"{CurrencyCode}","StatusText":"{GrossAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{LifeCycleStatus}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CreatedAt","Value":"{CreatedAt}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"CustomerId","Value":"{CustomerId}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"LifeCycleStatus","Value":"{LifeCycleStatus}"},{"KeyName":"LifeCycleStatusName","Value":"{LifeCycleStatusName}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"SalesOrderId","Value":"{SalesOrderId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductId}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}","OnPress":"/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ 7754:
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeaders","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action","StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ 8184:
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_Detail.page ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderItem Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"SalesOrderItems","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{GrossAmount}","Description":"{DeliveryDate}","StatusText":"{ItemNumber}","StatusImage":"","SubstatusImage":"","SubstatusText":"{NetAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DeliveryDate","Value":"{DeliveryDate}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"SalesOrderId","Value":"{SalesOrderId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ 2844:
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_List.page ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderItems","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action","StatusImage":"","Title":"{ProductId}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SalesOrderItems","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_List","PrefersLargeCaption":true}

/***/ }),

/***/ 2118:
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Work_Confirmation.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"XXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Request Number","Enabled":true},{"Value":"Transformer Outage","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Request Type","Enabled":true},{"Value":"13","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Customers Out","Enabled":true},{"Value":"XXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Device","Enabled":true},{"Value":["C"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Phase(s)","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["A","B","C"]},{"Value":"XXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Grid","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"_Name":"SectionButton0","Title":"ETR has expired, contact the office","Alignment":"Center","ButtonType":"Text","Semantic":"Normal","ImagePosition":"Leading","FullWidth":false,"Visible":true}],"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":12,"_Type":"Control.Type.FormCell.DurationPicker","_Name":"FormCellDurationPicker0","IsEditable":false,"IsVisible":true,"Separator":true,"Caption":"Time Remaining to Restore Service","MinuteInterval":5,"Unit":"H"},{"_Type":"Control.Type.FormCell.Button","_Name":"FormCellButton0","IsVisible":true,"Separator":true,"Title":"Refresh","Alignment":"Center","ButtonType":"Secondary","Semantic":"Normal","ImagePosition":"Leading"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCRestoreService","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Do you want to change the \"Time Remaining\"?","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"OnValueChange":"/MDK_WorkOrderOutage/Rules/TimeToRestore.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCTimeToRestore","IsEditable":true,"IsVisible":false,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"How long will it take to restore service?","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","OnValueChange":"/MDK_WorkOrderOutage/Rules/ShowInputTime.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["1 Hour","2 Hours","3 Hours","4 Hours","5 Hours","6 Hours","Other"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCSPTime","IsEditable":true,"IsVisible":false,"Separator":true,"Caption":"Input Time Remaining to Restore Service","Enabled":true}],"Visible":false,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"OH Primary","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Broken Pole","Line Fuse Blown","Repairing OH Lines","Replacing OH Txf","Txf Fuse Blown","Tree On Line","Vehicle Accident","Wire Down"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker2","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"OH Service","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Repairing OH Lines","Tree On Line","Vehicle Accident","Wire Down"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker3","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"UG Primary","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Cut Cable","Installing Temp to Restore","Isolating Trbl/Switch to Alt","Primary Cable Failure","Repairing UG Lines","Replacing UG Txf","Vehicle Accident"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker4","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"UG Service","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Cut Cable","Installing Temp to Restore","Repairing Secondary Fault","Repairing Service Fault"]}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"}]}],"_Type":"Page","_Name":"Work_Confirmation","Caption":"Work Confirmation","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true}],"_Name":"ActionBar1"}}

/***/ }),

/***/ 2259:
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Work_Request_Details.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"TAG! - TEST! - GROUND!","_Type":"Control.Type.FormCell.Title","_Name":"FormCellTitle0","IsEditable":true,"IsVisible":true,"Separator":true,"Styles":{"Background":"objectTitleBG","Value":"objectTitleVal"},"Enabled":true},{"Value":"XXXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Request Number","Enabled":true},{"Value":"Transformer Outage","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Request Type","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Secondary Assignment","Enabled":true},{"Value":["Issued"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCWRStatus","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"WR Status","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Issued","Completed"]},{"Value":["UG"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Construction Type","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["OH","UG"]},{"Value":"XXXXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Number","Enabled":true},{"Value":"XXXXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Device","Enabled":true},{"Value":"XXXXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Grid","Enabled":true},{"Value":["C"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Phase(s)","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["A","B","C"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty7","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Confirmed Open","Enabled":true},{"Value":"14","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty8","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Priorty Score","Enabled":true},{"Value":"14","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty9","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Customers Out","Enabled":true},{"Value":"14","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty10","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Customers Assigned","Enabled":true},{"Value":"0","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty11","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Special Condition","Enabled":true},{"Value":"0","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty12","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Military","Enabled":true},{"Value":"0","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty14","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Life Support","Enabled":true},{"Value":"0","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty13","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Medical Certificates","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"XXXXXXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty15","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Customer","Enabled":true},{"Value":"XXXXXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty16","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Business","Enabled":true},{"Value":"XXXXXXXXXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty17","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Address","Enabled":true},{"Value":"XXXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty18","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Phone No.","Enabled":true},{"Value":"XXXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty19","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Alt Phone No.","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"ETR Range","Mode":"Datetime"},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"To","Mode":"Datetime"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty20","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"ETR Updated By","Enabled":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"At","Mode":"Datetime"}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote0","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader0","AccessoryType":"none","UseTopPadding":true,"Caption":"Work Description"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell3"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote1","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader1","AccessoryType":"none","UseTopPadding":true,"Caption":"ROC Information"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell4"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote2","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader2","AccessoryType":"none","UseTopPadding":true,"Caption":"Field Information"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell5"}]}],"_Type":"Page","_Name":"Work_Request_Details","Caption":"Work Request Details","PrefersLargeCaption":true}

/***/ }),

/***/ 3768:
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK_WorkOrderOutage","Version":"/MDK_WorkOrderOutage/Globals/AppDefinition_Version.global","MainPage":"/MDK_WorkOrderOutage/Pages/Main.page","OnLaunch":["/MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MDK_WorkOrderOutage/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action","Styles":"/MDK_WorkOrderOutage/Styles/Styles.css","Localization":"/MDK_WorkOrderOutage/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDK_WorkOrderOutage/Styles/Styles.light.css","ios":"/MDK_WorkOrderOutage/Styles/Styles.light.nss","android":"/MDK_WorkOrderOutage/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/MDK_WorkOrderOutage/Styles/Styles.light.nss","android":"/MDK_WorkOrderOutage/Styles/Styles.light.json"}}

/***/ }),

/***/ 4736:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdate.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK_WorkOrderOutage/Rules/AppUpdateFailure.js","OnSuccess":"/MDK_WorkOrderOutage/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ 9338:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 8203:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateProgressBanner.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK_WorkOrderOutage/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 7379:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateSuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 8923:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/CloseModalPage_Cancel.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ 4146:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/CloseModalPage_Complete.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ 1793:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/ClosePage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ 4880:
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_Detail.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/Customers/Customers_Detail.page"}

/***/ }),

/***/ 390:
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_List.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/Customers/Customers_List.page"}

/***/ }),

/***/ 3403:
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ 2152:
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ 6282:
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ 116:
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Logout.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ 3379:
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/LogoutMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK_WorkOrderOutage/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ 1082:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/NavToWorkConfirmation.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToWorkConfirmation"},"PageToOpen":"/MDK_WorkOrderOutage/Pages/Work_Confirmation.page"}

/***/ }),

/***/ 9404:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/NavToWork_Confirmation.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToWork_Confirmation"},"PageToOpen":"/MDK_WorkOrderOutage/Pages/Work_Confirmation.page","ModalPage":true}

/***/ }),

/***/ 3861:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/NavToWork_Request_Details.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToWork_Request_Details"},"PageToOpen":"/MDK_WorkOrderOutage/Pages/Work_Request_Details.page"}

/***/ }),

/***/ 1802:
/*!***************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/OnWillUpdate.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ 6032:
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Products/NavToProducts_Detail.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/Products/Products_Detail.page"}

/***/ }),

/***/ 914:
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Products/NavToProducts_List.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/Products/Products_List.page"}

/***/ }),

/***/ 397:
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page"}

/***/ }),

/***/ 2188:
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page"}

/***/ }),

/***/ 1874:
/*!****************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action ***!
  \****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page"}

/***/ }),

/***/ 4781:
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page"}

/***/ }),

/***/ 5174:
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page"}

/***/ }),

/***/ 7017:
/*!************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page"}

/***/ }),

/***/ 7123:
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_Detail.page"}

/***/ }),

/***/ 5479:
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_List.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_List.page"}

/***/ }),

/***/ 9909:
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOffline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDK_WorkOrderOutage/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDK_WorkOrderOutage/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ 2145:
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOfflineFailureMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 3774:
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 228:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/DownloadOffline.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"},{"Name":"Products","Query":"Products"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MDK_WorkOrderOutage/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ 2370:
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/DownloadStartedMessage.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDK_WorkOrderOutage/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 394:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"},{"Name":"Products","Query":"Products"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ 9544:
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 6485:
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 1952:
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 2012:
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncStartedMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDK_WorkOrderOutage/Actions/Service/UploadOffline.action","OnFailure":"/MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 1290:
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncSuccessMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 8757:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/UploadOffline.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDK_WorkOrderOutage/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ 6470:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Globals/AppDefinition_Version.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ 6915:
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Services/SampleServiceV2.service ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV2","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ 3405:
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ 6280:
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ 3768)
let mdk_workorderoutage_actions_appupdate_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/AppUpdate.action */ 4736)
let mdk_workorderoutage_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/AppUpdateFailureMessage.action */ 9338)
let mdk_workorderoutage_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/AppUpdateProgressBanner.action */ 8203)
let mdk_workorderoutage_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/AppUpdateSuccessMessage.action */ 7379)
let mdk_workorderoutage_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/CloseModalPage_Cancel.action */ 8923)
let mdk_workorderoutage_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/CloseModalPage_Complete.action */ 4146)
let mdk_workorderoutage_actions_closepage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/ClosePage.action */ 1793)
let mdk_workorderoutage_actions_customers_navtocustomers_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_Detail.action */ 4880)
let mdk_workorderoutage_actions_customers_navtocustomers_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_List.action */ 390)
let mdk_workorderoutage_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ 3403)
let mdk_workorderoutage_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ 2152)
let mdk_workorderoutage_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_List.action */ 6282)
let mdk_workorderoutage_actions_logout_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Logout.action */ 116)
let mdk_workorderoutage_actions_logoutmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/LogoutMessage.action */ 3379)
let mdk_workorderoutage_actions_navtowork_confirmation_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/NavToWork_Confirmation.action */ 9404)
let mdk_workorderoutage_actions_navtowork_request_details_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/NavToWork_Request_Details.action */ 3861)
let mdk_workorderoutage_actions_navtoworkconfirmation_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/NavToWorkConfirmation.action */ 1082)
let mdk_workorderoutage_actions_onwillupdate_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/OnWillUpdate.action */ 1802)
let mdk_workorderoutage_actions_products_navtoproducts_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Products/NavToProducts_Detail.action */ 6032)
let mdk_workorderoutage_actions_products_navtoproducts_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Products/NavToProducts_List.action */ 914)
let mdk_workorderoutage_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action */ 397)
let mdk_workorderoutage_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action */ 2188)
let mdk_workorderoutage_actions_purchaseorderitems_navtopurchaseorderitems_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action */ 1874)
let mdk_workorderoutage_actions_purchaseorderitems_navtopurchaseorderitems_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action */ 4781)
let mdk_workorderoutage_actions_salesorderheaders_navtosalesorderheaders_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action */ 5174)
let mdk_workorderoutage_actions_salesorderheaders_navtosalesorderheaders_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action */ 7017)
let mdk_workorderoutage_actions_salesorderitems_navtosalesorderitems_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action */ 7123)
let mdk_workorderoutage_actions_salesorderitems_navtosalesorderitems_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_List.action */ 5479)
let mdk_workorderoutage_actions_service_closeoffline_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/CloseOffline.action */ 9909)
let mdk_workorderoutage_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/CloseOfflineFailureMessage.action */ 2145)
let mdk_workorderoutage_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/CloseOfflineSuccessMessage.action */ 3774)
let mdk_workorderoutage_actions_service_downloadoffline_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/DownloadOffline.action */ 228)
let mdk_workorderoutage_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/DownloadStartedMessage.action */ 2370)
let mdk_workorderoutage_actions_service_initializeoffline_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action */ 394)
let mdk_workorderoutage_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/InitializeOfflineFailureMessage.action */ 9544)
let mdk_workorderoutage_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/InitializeOfflineSuccessMessage.action */ 6485)
let mdk_workorderoutage_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action */ 1952)
let mdk_workorderoutage_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/SyncStartedMessage.action */ 2012)
let mdk_workorderoutage_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/SyncSuccessMessage.action */ 1290)
let mdk_workorderoutage_actions_service_uploadoffline_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/UploadOffline.action */ 8757)
let mdk_workorderoutage_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK_WorkOrderOutage/Globals/AppDefinition_Version.global */ 6470)
let mdk_workorderoutage_i18n_i18n_properties = __webpack_require__(/*! ./MDK_WorkOrderOutage/i18n/i18n.properties */ 8024)
let mdk_workorderoutage_jsconfig_json = __webpack_require__(/*! ./MDK_WorkOrderOutage/jsconfig.json */ 3095)
let mdk_workorderoutage_pages_customers_customers_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Customers/Customers_Detail.page */ 5487)
let mdk_workorderoutage_pages_customers_customers_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Customers/Customers_List.page */ 837)
let mdk_workorderoutage_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_Detail.page */ 2330)
let mdk_workorderoutage_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_List.page */ 4549)
let mdk_workorderoutage_pages_main_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Main.page */ 1143)
let mdk_workorderoutage_pages_products_products_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Products/Products_Detail.page */ 6098)
let mdk_workorderoutage_pages_products_products_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Products/Products_List.page */ 3759)
let mdk_workorderoutage_pages_purchaseorderheaders_purchaseorderheaders_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page */ 797)
let mdk_workorderoutage_pages_purchaseorderheaders_purchaseorderheaders_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page */ 2688)
let mdk_workorderoutage_pages_purchaseorderitems_purchaseorderitems_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page */ 3472)
let mdk_workorderoutage_pages_purchaseorderitems_purchaseorderitems_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page */ 8649)
let mdk_workorderoutage_pages_salesorderheaders_salesorderheaders_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page */ 218)
let mdk_workorderoutage_pages_salesorderheaders_salesorderheaders_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page */ 7754)
let mdk_workorderoutage_pages_salesorderitems_salesorderitems_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_Detail.page */ 8184)
let mdk_workorderoutage_pages_salesorderitems_salesorderitems_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_List.page */ 2844)
let mdk_workorderoutage_pages_work_confirmation_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Work_Confirmation.page */ 2118)
let mdk_workorderoutage_pages_work_request_details_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Work_Request_Details.page */ 2259)
let mdk_workorderoutage_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/AppUpdateFailure.js */ 7561)
let mdk_workorderoutage_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/AppUpdateSuccess.js */ 329)
let mdk_workorderoutage_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ 5934)
let mdk_workorderoutage_rules_onwillupdate_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/OnWillUpdate.js */ 4178)
let mdk_workorderoutage_rules_openworkcofirmation_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/OpenWorkCofirmation.js */ 6675)
let mdk_workorderoutage_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/ResetAppSettingsAndLogout.js */ 9104)
let mdk_workorderoutage_rules_showinputtime_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/ShowInputTime.js */ 9240)
let mdk_workorderoutage_rules_timetorestore_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/TimeToRestore.js */ 7845)
let mdk_workorderoutage_services_sampleservicev2_service = __webpack_require__(/*! ./MDK_WorkOrderOutage/Services/SampleServiceV2.service */ 6915)
let mdk_workorderoutage_styles_styles_css = __webpack_require__(/*! ./MDK_WorkOrderOutage/Styles/Styles.css */ 2715)
let mdk_workorderoutage_styles_styles_less = __webpack_require__(/*! ./MDK_WorkOrderOutage/Styles/Styles.less */ 3754)
let mdk_workorderoutage_styles_styles_light_css = __webpack_require__(/*! ./MDK_WorkOrderOutage/Styles/Styles.light.css */ 9145)
let mdk_workorderoutage_styles_styles_light_json = __webpack_require__(/*! ./MDK_WorkOrderOutage/Styles/Styles.light.json */ 1417)
let mdk_workorderoutage_styles_styles_light_nss = __webpack_require__(/*! ./MDK_WorkOrderOutage/Styles/Styles.light.nss */ 8246)
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ 7775)
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ 3405)

module.exports = {
	application_app : application_app,
	mdk_workorderoutage_actions_appupdate_action : mdk_workorderoutage_actions_appupdate_action,
	mdk_workorderoutage_actions_appupdatefailuremessage_action : mdk_workorderoutage_actions_appupdatefailuremessage_action,
	mdk_workorderoutage_actions_appupdateprogressbanner_action : mdk_workorderoutage_actions_appupdateprogressbanner_action,
	mdk_workorderoutage_actions_appupdatesuccessmessage_action : mdk_workorderoutage_actions_appupdatesuccessmessage_action,
	mdk_workorderoutage_actions_closemodalpage_cancel_action : mdk_workorderoutage_actions_closemodalpage_cancel_action,
	mdk_workorderoutage_actions_closemodalpage_complete_action : mdk_workorderoutage_actions_closemodalpage_complete_action,
	mdk_workorderoutage_actions_closepage_action : mdk_workorderoutage_actions_closepage_action,
	mdk_workorderoutage_actions_customers_navtocustomers_detail_action : mdk_workorderoutage_actions_customers_navtocustomers_detail_action,
	mdk_workorderoutage_actions_customers_navtocustomers_list_action : mdk_workorderoutage_actions_customers_navtocustomers_list_action,
	mdk_workorderoutage_actions_errorarchive_errorarchive_syncfailure_action : mdk_workorderoutage_actions_errorarchive_errorarchive_syncfailure_action,
	mdk_workorderoutage_actions_errorarchive_navtoerrorarchive_detail_action : mdk_workorderoutage_actions_errorarchive_navtoerrorarchive_detail_action,
	mdk_workorderoutage_actions_errorarchive_navtoerrorarchive_list_action : mdk_workorderoutage_actions_errorarchive_navtoerrorarchive_list_action,
	mdk_workorderoutage_actions_logout_action : mdk_workorderoutage_actions_logout_action,
	mdk_workorderoutage_actions_logoutmessage_action : mdk_workorderoutage_actions_logoutmessage_action,
	mdk_workorderoutage_actions_navtowork_confirmation_action : mdk_workorderoutage_actions_navtowork_confirmation_action,
	mdk_workorderoutage_actions_navtowork_request_details_action : mdk_workorderoutage_actions_navtowork_request_details_action,
	mdk_workorderoutage_actions_navtoworkconfirmation_action : mdk_workorderoutage_actions_navtoworkconfirmation_action,
	mdk_workorderoutage_actions_onwillupdate_action : mdk_workorderoutage_actions_onwillupdate_action,
	mdk_workorderoutage_actions_products_navtoproducts_detail_action : mdk_workorderoutage_actions_products_navtoproducts_detail_action,
	mdk_workorderoutage_actions_products_navtoproducts_list_action : mdk_workorderoutage_actions_products_navtoproducts_list_action,
	mdk_workorderoutage_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action : mdk_workorderoutage_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action,
	mdk_workorderoutage_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action : mdk_workorderoutage_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action,
	mdk_workorderoutage_actions_purchaseorderitems_navtopurchaseorderitems_detail_action : mdk_workorderoutage_actions_purchaseorderitems_navtopurchaseorderitems_detail_action,
	mdk_workorderoutage_actions_purchaseorderitems_navtopurchaseorderitems_list_action : mdk_workorderoutage_actions_purchaseorderitems_navtopurchaseorderitems_list_action,
	mdk_workorderoutage_actions_salesorderheaders_navtosalesorderheaders_detail_action : mdk_workorderoutage_actions_salesorderheaders_navtosalesorderheaders_detail_action,
	mdk_workorderoutage_actions_salesorderheaders_navtosalesorderheaders_list_action : mdk_workorderoutage_actions_salesorderheaders_navtosalesorderheaders_list_action,
	mdk_workorderoutage_actions_salesorderitems_navtosalesorderitems_detail_action : mdk_workorderoutage_actions_salesorderitems_navtosalesorderitems_detail_action,
	mdk_workorderoutage_actions_salesorderitems_navtosalesorderitems_list_action : mdk_workorderoutage_actions_salesorderitems_navtosalesorderitems_list_action,
	mdk_workorderoutage_actions_service_closeoffline_action : mdk_workorderoutage_actions_service_closeoffline_action,
	mdk_workorderoutage_actions_service_closeofflinefailuremessage_action : mdk_workorderoutage_actions_service_closeofflinefailuremessage_action,
	mdk_workorderoutage_actions_service_closeofflinesuccessmessage_action : mdk_workorderoutage_actions_service_closeofflinesuccessmessage_action,
	mdk_workorderoutage_actions_service_downloadoffline_action : mdk_workorderoutage_actions_service_downloadoffline_action,
	mdk_workorderoutage_actions_service_downloadstartedmessage_action : mdk_workorderoutage_actions_service_downloadstartedmessage_action,
	mdk_workorderoutage_actions_service_initializeoffline_action : mdk_workorderoutage_actions_service_initializeoffline_action,
	mdk_workorderoutage_actions_service_initializeofflinefailuremessage_action : mdk_workorderoutage_actions_service_initializeofflinefailuremessage_action,
	mdk_workorderoutage_actions_service_initializeofflinesuccessmessage_action : mdk_workorderoutage_actions_service_initializeofflinesuccessmessage_action,
	mdk_workorderoutage_actions_service_syncfailuremessage_action : mdk_workorderoutage_actions_service_syncfailuremessage_action,
	mdk_workorderoutage_actions_service_syncstartedmessage_action : mdk_workorderoutage_actions_service_syncstartedmessage_action,
	mdk_workorderoutage_actions_service_syncsuccessmessage_action : mdk_workorderoutage_actions_service_syncsuccessmessage_action,
	mdk_workorderoutage_actions_service_uploadoffline_action : mdk_workorderoutage_actions_service_uploadoffline_action,
	mdk_workorderoutage_globals_appdefinition_version_global : mdk_workorderoutage_globals_appdefinition_version_global,
	mdk_workorderoutage_i18n_i18n_properties : mdk_workorderoutage_i18n_i18n_properties,
	mdk_workorderoutage_jsconfig_json : mdk_workorderoutage_jsconfig_json,
	mdk_workorderoutage_pages_customers_customers_detail_page : mdk_workorderoutage_pages_customers_customers_detail_page,
	mdk_workorderoutage_pages_customers_customers_list_page : mdk_workorderoutage_pages_customers_customers_list_page,
	mdk_workorderoutage_pages_errorarchive_errorarchive_detail_page : mdk_workorderoutage_pages_errorarchive_errorarchive_detail_page,
	mdk_workorderoutage_pages_errorarchive_errorarchive_list_page : mdk_workorderoutage_pages_errorarchive_errorarchive_list_page,
	mdk_workorderoutage_pages_main_page : mdk_workorderoutage_pages_main_page,
	mdk_workorderoutage_pages_products_products_detail_page : mdk_workorderoutage_pages_products_products_detail_page,
	mdk_workorderoutage_pages_products_products_list_page : mdk_workorderoutage_pages_products_products_list_page,
	mdk_workorderoutage_pages_purchaseorderheaders_purchaseorderheaders_detail_page : mdk_workorderoutage_pages_purchaseorderheaders_purchaseorderheaders_detail_page,
	mdk_workorderoutage_pages_purchaseorderheaders_purchaseorderheaders_list_page : mdk_workorderoutage_pages_purchaseorderheaders_purchaseorderheaders_list_page,
	mdk_workorderoutage_pages_purchaseorderitems_purchaseorderitems_detail_page : mdk_workorderoutage_pages_purchaseorderitems_purchaseorderitems_detail_page,
	mdk_workorderoutage_pages_purchaseorderitems_purchaseorderitems_list_page : mdk_workorderoutage_pages_purchaseorderitems_purchaseorderitems_list_page,
	mdk_workorderoutage_pages_salesorderheaders_salesorderheaders_detail_page : mdk_workorderoutage_pages_salesorderheaders_salesorderheaders_detail_page,
	mdk_workorderoutage_pages_salesorderheaders_salesorderheaders_list_page : mdk_workorderoutage_pages_salesorderheaders_salesorderheaders_list_page,
	mdk_workorderoutage_pages_salesorderitems_salesorderitems_detail_page : mdk_workorderoutage_pages_salesorderitems_salesorderitems_detail_page,
	mdk_workorderoutage_pages_salesorderitems_salesorderitems_list_page : mdk_workorderoutage_pages_salesorderitems_salesorderitems_list_page,
	mdk_workorderoutage_pages_work_confirmation_page : mdk_workorderoutage_pages_work_confirmation_page,
	mdk_workorderoutage_pages_work_request_details_page : mdk_workorderoutage_pages_work_request_details_page,
	mdk_workorderoutage_rules_appupdatefailure_js : mdk_workorderoutage_rules_appupdatefailure_js,
	mdk_workorderoutage_rules_appupdatesuccess_js : mdk_workorderoutage_rules_appupdatesuccess_js,
	mdk_workorderoutage_rules_errorarchive_errorarchive_checkforsyncerror_js : mdk_workorderoutage_rules_errorarchive_errorarchive_checkforsyncerror_js,
	mdk_workorderoutage_rules_onwillupdate_js : mdk_workorderoutage_rules_onwillupdate_js,
	mdk_workorderoutage_rules_openworkcofirmation_js : mdk_workorderoutage_rules_openworkcofirmation_js,
	mdk_workorderoutage_rules_resetappsettingsandlogout_js : mdk_workorderoutage_rules_resetappsettingsandlogout_js,
	mdk_workorderoutage_rules_showinputtime_js : mdk_workorderoutage_rules_showinputtime_js,
	mdk_workorderoutage_rules_timetorestore_js : mdk_workorderoutage_rules_timetorestore_js,
	mdk_workorderoutage_services_sampleservicev2_service : mdk_workorderoutage_services_sampleservicev2_service,
	mdk_workorderoutage_styles_styles_css : mdk_workorderoutage_styles_styles_css,
	mdk_workorderoutage_styles_styles_less : mdk_workorderoutage_styles_styles_less,
	mdk_workorderoutage_styles_styles_light_css : mdk_workorderoutage_styles_styles_light_css,
	mdk_workorderoutage_styles_styles_light_json : mdk_workorderoutage_styles_styles_light_json,
	mdk_workorderoutage_styles_styles_light_nss : mdk_workorderoutage_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ 9568:
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ 6280)))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ }),

/***/ 1417:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Styles/Styles.light.json ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"objectTitleBG":{"background-color":"yellow"},"objectTitleVal":{"font-color":"orange !important"}}');

/***/ }),

/***/ 3095:
/*!*************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/jsconfig.json ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ 7775:
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
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
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => (typeof console !== "undefined" && console.warn && console.warn(msg));
/******/ 			var uniqueName = undefined;
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(9568);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map