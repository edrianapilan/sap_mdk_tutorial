/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7291:
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/i18n/i18n.properties ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ 6835:
/*!**************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Rules/AppUpdateFailure.js ***!
  \**************************************************************************/
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
    "Name": "/MDK_MeterInformation/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ 8480:
/*!**************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Rules/AppUpdateSuccess.js ***!
  \**************************************************************************/
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
        "Name": "/MDK_MeterInformation/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK_MeterInformation/Actions/AppUpdateSuccessMessage.action",
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

/***/ 8448:
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \*****************************************************************************************************/
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
  context.count('/MDK_MeterInformation/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/MDK_MeterInformation/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ 798:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Rules/NavToServiceOrderCompletion.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenWorkCofirmation)
/* harmony export */ });
function OpenWorkCofirmation(context) {
  context.executeAction('/MDK_MeterInformation/Actions/NavToService_Order_Completion.action');
}

/***/ }),

/***/ 1416:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Rules/OnWillUpdate.js ***!
  \**********************************************************************/
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
  return clientAPI.executeAction('/MDK_MeterInformation/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_MeterInformation/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ 5504:
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Rules/ResetAppSettingsAndLogout.js ***!
  \***********************************************************************************/
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
    return context.getPageProxy().executeAction('/MDK_MeterInformation/Actions/Logout.action');
  }
}

/***/ }),

/***/ 5998:
/*!******************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Styles/Styles.css ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n.objectTitleBG {\n  background-color: yellow;\n}\n.objectTitleVal {\n  color: orange !important;\n}\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_MeterInformation/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC;AACD;EACE,wBAAwB;AAC1B;AACA;EACE,wBAAwB;AAC1B","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n.objectTitleBG {\n  background-color: yellow;\n}\n.objectTitleVal {\n  color: orange !important;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 6202:
/*!*******************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Styles/Styles.less ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n\n.objectTitleBG {\n    background-color: yellow;\n}\n\n.objectTitleVal {\n    color: orange !important;\n}", "",{"version":3,"sources":["webpack://./build.definitions/MDK_MeterInformation/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC;;AAED;IACI,wBAAwB;AAC5B;;AAEA;IACI,wBAAwB;AAC5B","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n\n.objectTitleBG {\n    background-color: yellow;\n}\n\n.objectTitleVal {\n    color: orange !important;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 3913:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Styles/Styles.light.css ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ns-light .objectTitleBG {\n\tbackground-color: yellow;\n}\n.ns-light .objectTitleVal {\n\tcolor: orange !important;\n}\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_MeterInformation/Styles/Styles.light.css"],"names":[],"mappings":"AAAA;CACC,wBAAwB;AACzB;AACA;CACC,wBAAwB;AACzB","sourcesContent":[".ns-light .objectTitleBG {\n\tbackground-color: yellow;\n}\n.ns-light .objectTitleVal {\n\tcolor: orange !important;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 5576:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Styles/Styles.light.nss ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "objectTitleBG {\n\tbackground-color: yellow;\n}\nobjectTitleVal {\n\tfont-color: orange !important;\n}\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_MeterInformation/Styles/Styles.light.nss"],"names":[],"mappings":"AAAA;CACC,wBAAwB;AACzB;AACA;CACC,6BAA6B;AAC9B","sourcesContent":["objectTitleBG {\n\tbackground-color: yellow;\n}\nobjectTitleVal {\n\tfont-color: orange !important;\n}\n"],"sourceRoot":""}]);
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

/***/ 6932:
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ 3031:
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDK_MeterInformation/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MDK_MeterInformation/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ 6041:
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Pages/History_Information.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Order Type","Enabled":true},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Date Completed","Mode":"Date"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Completed By","Enabled":true},{"Value":"Comments","_Type":"Control.Type.FormCell.Title","_Name":"FormCellTitle0","IsEditable":false,"IsVisible":true,"Separator":true,"Enabled":true},{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote0","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Order Number","Enabled":true}],"Header":{"_Name":"SectionHeader0","AccessoryType":"none","UseTopPadding":true,"Caption":"Order History"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Last Pay Date","Mode":"Date"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Total Reconnect","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"No. Broken Arrangements","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Disconnect Notice Expirations","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty7","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Amount Due","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty8","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"12 Month History","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Last Pay Amount","Enabled":true}],"Header":{"_Name":"SectionHeader1","AccessoryType":"none","UseTopPadding":true,"Caption":"Credit History"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[]}]}],"_Type":"Page","_Name":"History_Information","Caption":"History Information","PrefersLargeCaption":true}

/***/ }),

/***/ 326:
/*!****************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Pages/Main.page ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"_Name":"SectionButton0","Title":"Service Order","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDK_MeterInformation/Actions/NavToService_Order_Details.action"}],"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"}}]}],"_Type":"Page","_Name":"Main","Caption":"Service Order List","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MDK_MeterInformation/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_MeterInformation/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_MeterInformation/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ 7588:
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Pages/Meter_Information.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"Meter: 1 of 1","_Type":"Control.Type.FormCell.Title","_Name":"FormCellTitle0","IsEditable":false,"IsVisible":true,"Separator":true,"Enabled":false}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Number","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Meter Location","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["00-Unknown","01-Basement","02-Furnace Room","10-First Floor","16-First Floor Closet/Cabinet","20-Second Floor","26-Second Floor Closet/Cabinet","30-Third Floor","36-Third Floor Closet/Cabinet","40-Back","41-Front","42-Left","43-Right","45-Under House/Step","46-On Pole","47-Meter Pedestal","50-Barn","60-Garage Inside","61-Garage Outside","99-Special Instructions"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Read Instr","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Meter Mfr","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["(A) Lands & Gyr/Duncan/Siemens","(D) General Electric","(F) Sangamo/Schlumberger/Sentinel/Itron","(G) Westinghouse/ABB/Elster","(S) Sensus"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Stock Number","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Phase","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Dial","Enabled":true},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Install Date","Mode":"Date"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Constant","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Rate","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Read Date","Mode":"Date"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty7","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Actual/ Estimate","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty8","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"KHW Usage","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty9","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Readings","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty10","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"KWH Demand","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[]}]}],"_Type":"Page","_Name":"Meter_Information","Caption":"Meter Information","PrefersLargeCaption":true}

/***/ }),

/***/ 1361:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Pages/Service_Order_Completion.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"Meter: 1 of 1","_Type":"Control.Type.FormCell.Title","_Name":"FormCellTitle0","IsEditable":false,"IsVisible":true,"Separator":true,"Enabled":false},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"New Action","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Check Read","Connect Meter","Disconnect Meter","Exchange Meter","Install or Incorrect Meter","Read Meter","Remove Meter"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Reason","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Broken Glass","Damaged Meter","Demand Reset Broken","Energy Diversion","Failed Meter Test","Found Active","Hazardous Condition","Meter Removed","New Tenant in House","No Dial Display","Non-Recording","Out of Calibration","Removed Service","Stolen Meter","Switched Meters","Unable to Read"]}],"Header":{"_Name":"SectionHeader0","AccessoryType":"none","UseTopPadding":true,"Caption":"Meter Order Data"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Number","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker2","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Program ID","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["00 STANDARD METER","10 STD DEMAND METER","06 IDR - TOU/SURVEY","20 TOU - GS2T VA","21 PUMPING STATION","22 TOU - 1S/1T VA","23 TOU - 1P VA","24 TOU - 5P CHURCH","25 TOU - NC ONLY","26 LIGHTING NC ONLY","40 IDR - PROMPTS 04 &","44 IDR - KWH"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker3","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Dials","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Four","Five","Six","Seven"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker4","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Manufacturer","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["(A) Lands & Gur/Duncan/Siemens","(D) General Electric","(F) Sangamo/Schlumberer/Sentinel/Itron","(G) Westinghouse/ABB/Elster","(S) Sensus"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker5","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Location","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["00-Unknown","01-Basement","03-Furnace Room","10-First Floor","16-First Floor Closet/Cabinet","20-Second Floor","26-Second Floor Closet/Cabinet","30-Third Floor","36-Third Floor Closet/Cabinet","40-Back","41-Front","42-Left","43-Right","45-Under House/Step","46-On Pole","47-Meter Pedestal","50-Barn","60-Garage Inside","61-Garage Outside","99-Special Instructions"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Prev Read","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Read","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Prev Demand","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Demand","Enabled":true}],"Header":{"_Name":"SectionHeader1","AccessoryType":"none","UseTopPadding":true,"Caption":"Existing Meter"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Header":{"_Name":"SectionHeader2","AccessoryType":"none","UseTopPadding":true,"Caption":"New Meter"},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2","Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Number","Enabled":true},{"Value":["Two"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker7","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Dials","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Four","Five","Six","Seven"]},{"Value":["Two"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker8","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Manufacturer","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["(A) Lands & Gur/Duncan/Siemens","(D) General Electric","(F) Sangamo/Schlumberer/Sentinel/Itron","(G) Westinghouse/ABB/Elster","(S) Sensus"]},{"Value":["Two"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker9","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Location","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["00-Unknown","01-Basement","03-Furnace Room","10-First Floor","16-First Floor Closet/Cabinet","20-Second Floor","26-Second Floor Closet/Cabinet","30-Third Floor","36-Third Floor Closet/Cabinet","40-Back","41-Front","42-Left","43-Right","45-Under House/Step","46-On Pole","47-Meter Pedestal","50-Barn","60-Garage Inside","61-Garage Outside","99-Special Instructions"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker10","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Constant","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["1.0","Other"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Other","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker11","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Meter Kind","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["KQH","RKVA"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker12","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Device Type","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Meter","Instrument Transformer","Pulse Accumulator","Recorder","Totalizer"]},{"Value":["Two"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker6","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Program ID","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["00 STANDARD METER","10 STD DEMAND METER","06 IDR - TOU/SURVEY","20 TOU - GS2T VA","21 PUMPING STATION","22 TOU - 1S/1T VA","23 TOU - 1P VA","24 TOU - 5P CHURCH","25 TOU - NC ONLY","26 LIGHTING NC ONLY","40 IDR - PROMPTS 04 &","44 IDR - KWH"]}]},{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell3","Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"FormCellButton0","IsVisible":true,"Separator":true,"Title":"Continue","Alignment":"Center","ButtonType":"Text","Semantic":"Normal","ImagePosition":"Leading"}]}]}],"_Type":"Page","_Name":"Service_Order_Completion","Caption":"Service Order Completion","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/MDK_MeterInformation/Actions/CloseModalPage_Cancel.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ 6113:
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Pages/Service_Order_Completion_Comments.page ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Comments","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["CHANGE SERVICE TYPE OH/UG","CUT @ POLE","CUT @ TRANSFORMER","CUT IN FLAT","FUSES INVERTED","INSTALL LOCKING BAND","LEFT DOOR TAG","RECONNECTED @ POLE","ROCENNECTED @ TRANSFORMER","RECONNECTED SERVICE","REMOVED JUMPERS","REMOVED STOLEN METER","SEASONAL","SERVICE FOUND OFF","SERVICE FOUND OFF/GOT RDG","SERVICE FOUND ON","SERVICE FOUND ON/GOT RDG","VACANT","VERIFIED READING"]},{"Value":"Free Form","_Type":"Control.Type.FormCell.Title","_Name":"FormCellTitle0","IsEditable":false,"IsVisible":true,"Separator":true,"PlaceHolder":"Free Form","Enabled":true},{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote0","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Office Review?"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Action Taken","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Cut off at pole","Cut off at pad","Dials Changed","Field Work Completed","Installed Meter","Installed Lock Band","Not Worked","Other","Reconnected at Pole","Removed Meter","Refer to Security","Service Found Off","Service On / Got Reading"]}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"_Name":"SectionButton0","Title":"New Action / Service Order Completion","Alignment":"Center","ButtonType":"Text","Semantic":"Normal","ImagePosition":"Leading","FullWidth":true,"Visible":true,"OnPress":"/MDK_MeterInformation/Rules/NavToServiceOrderCompletion.js"}],"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"}}]}],"_Type":"Page","_Name":"Service_Order_Completion_Comments","Caption":"Service Order Completion Comments","PrefersLargeCaption":true}

/***/ }),

/***/ 8628:
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Pages/Service_Order_Details.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"Circle for Safety","_Type":"Control.Type.FormCell.Title","_Name":"FormCellTitle0","IsEditable":true,"IsVisible":true,"Separator":true,"Styles":{"Background":"objectTitleBG","Value":"objectTitleVal"},"Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote0","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader1","AccessoryType":"none","UseTopPadding":true,"Caption":"Directions"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Number","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Location","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Read Instr","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote1","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader2","AccessoryType":"none","UseTopPadding":true,"Caption":"Remarks"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell3"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Order Number","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Order Type","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Requested By","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Received","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty7","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Customer","Enabled":true},{"Value":"Address","_Type":"Control.Type.FormCell.Title","_Name":"FormCellTitle1","IsEditable":false,"IsVisible":true,"Separator":true,"Enabled":true},{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote2","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty8","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Account Number","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty9","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Account Status","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty10","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Grid","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty11","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"No. Meters","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty12","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Customer Type","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty13","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Contact Phone","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty14","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Premise Phone","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty15","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Route","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty16","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Cycle","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell4"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Meter Information","Alignment":"Left","ButtonType":"Text","Semantic":"Normal","ImagePosition":"Leading","FullWidth":true,"Visible":true,"OnPress":"/MDK_MeterInformation/Actions/NavToMeter_Information.action"},{"_Name":"SectionButton1","Title":"History Information","Alignment":"Left","ButtonType":"Text","Semantic":"Normal","ImagePosition":"Leading","FullWidth":true,"Visible":true,"OnPress":"/MDK_MeterInformation/Actions/NavToHistory_Information.action"},{"_Name":"SectionButton2","Title":"Service Order Completion","Alignment":"Left","ButtonType":"Text","Semantic":"Normal","ImagePosition":"Leading","FullWidth":true,"Visible":true,"OnPress":"/MDK_MeterInformation/Actions/NavToService_Order_Completion_Comments.action"}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable1","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[]}]}],"_Type":"Page","_Name":"Service_Order_Details","Caption":"Service Order Details","PrefersLargeCaption":true}

/***/ }),

/***/ 3768:
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK_MeterInformation","Version":"/MDK_MeterInformation/Globals/AppDefinition_Version.global","MainPage":"/MDK_MeterInformation/Pages/Main.page","OnLaunch":["/MDK_MeterInformation/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MDK_MeterInformation/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK_MeterInformation/Actions/Service/InitializeOffline.action","Styles":"/MDK_MeterInformation/Styles/Styles.css","Localization":"/MDK_MeterInformation/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDK_MeterInformation/Styles/Styles.light.css","ios":"/MDK_MeterInformation/Styles/Styles.light.nss","android":"/MDK_MeterInformation/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/MDK_MeterInformation/Styles/Styles.light.nss","android":"/MDK_MeterInformation/Styles/Styles.light.json"}}

/***/ }),

/***/ 7850:
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/AppUpdate.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK_MeterInformation/Rules/AppUpdateFailure.js","OnSuccess":"/MDK_MeterInformation/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ 5427:
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/AppUpdateFailureMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 945:
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/AppUpdateProgressBanner.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK_MeterInformation/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 4920:
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/AppUpdateSuccessMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 4851:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/CloseModalPage_Cancel.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Cancel"},"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true}

/***/ }),

/***/ 1516:
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/ClosePage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ 3044:
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDK_MeterInformation/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ 9919:
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_MeterInformation/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ 5174:
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_MeterInformation/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ 1174:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Logout.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ 3137:
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/LogoutMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK_MeterInformation/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ 357:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/NavToHistory_Information.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToHistory_Information"},"PageToOpen":"/MDK_MeterInformation/Pages/History_Information.page"}

/***/ }),

/***/ 4687:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/NavToMeter_Information.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToMeter_Information"},"PageToOpen":"/MDK_MeterInformation/Pages/Meter_Information.page"}

/***/ }),

/***/ 7799:
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/NavToService_Order_Completion.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToService_Order_Completion"},"PageToOpen":"/MDK_MeterInformation/Pages/Service_Order_Completion.page","ModalPage":true}

/***/ }),

/***/ 5117:
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/NavToService_Order_Completion_Comments.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToService_Order_Completion_Comments"},"PageToOpen":"/MDK_MeterInformation/Pages/Service_Order_Completion_Comments.page"}

/***/ }),

/***/ 1509:
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/NavToService_Order_Details.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToService_Order_Details"},"PageToOpen":"/MDK_MeterInformation/Pages/Service_Order_Details.page"}

/***/ }),

/***/ 2093:
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/OnWillUpdate.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ 1522:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/CloseOffline.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDK_MeterInformation/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDK_MeterInformation/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDK_MeterInformation/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ 6431:
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/CloseOfflineFailureMessage.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 884:
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 9533:
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/DownloadOffline.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_MeterInformation/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDK_MeterInformation/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MDK_MeterInformation/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ 3067:
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/DownloadStartedMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDK_MeterInformation/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 1820:
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/InitializeOffline.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_MeterInformation/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MDK_MeterInformation/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MDK_MeterInformation/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ 9810:
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 9981:
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 9415:
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/SyncFailureMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 7933:
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/SyncStartedMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDK_MeterInformation/Actions/Service/UploadOffline.action","OnFailure":"/MDK_MeterInformation/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 6126:
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/SyncSuccessMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 5241:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Actions/Service/UploadOffline.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_MeterInformation/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDK_MeterInformation/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MDK_MeterInformation/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ 135:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Globals/AppDefinition_Version.global ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ 8118:
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Services/SampleServiceV2.service ***!
  \*********************************************************************************/
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
let mdk_meterinformation_actions_appupdate_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/AppUpdate.action */ 7850)
let mdk_meterinformation_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/AppUpdateFailureMessage.action */ 5427)
let mdk_meterinformation_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/AppUpdateProgressBanner.action */ 945)
let mdk_meterinformation_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/AppUpdateSuccessMessage.action */ 4920)
let mdk_meterinformation_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/CloseModalPage_Cancel.action */ 4851)
let mdk_meterinformation_actions_closepage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/ClosePage.action */ 1516)
let mdk_meterinformation_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ 3044)
let mdk_meterinformation_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ 9919)
let mdk_meterinformation_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/ErrorArchive/NavToErrorArchive_List.action */ 5174)
let mdk_meterinformation_actions_logout_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Logout.action */ 1174)
let mdk_meterinformation_actions_logoutmessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/LogoutMessage.action */ 3137)
let mdk_meterinformation_actions_navtohistory_information_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/NavToHistory_Information.action */ 357)
let mdk_meterinformation_actions_navtometer_information_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/NavToMeter_Information.action */ 4687)
let mdk_meterinformation_actions_navtoservice_order_completion_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/NavToService_Order_Completion.action */ 7799)
let mdk_meterinformation_actions_navtoservice_order_completion_comments_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/NavToService_Order_Completion_Comments.action */ 5117)
let mdk_meterinformation_actions_navtoservice_order_details_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/NavToService_Order_Details.action */ 1509)
let mdk_meterinformation_actions_onwillupdate_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/OnWillUpdate.action */ 2093)
let mdk_meterinformation_actions_service_closeoffline_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/CloseOffline.action */ 1522)
let mdk_meterinformation_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/CloseOfflineFailureMessage.action */ 6431)
let mdk_meterinformation_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/CloseOfflineSuccessMessage.action */ 884)
let mdk_meterinformation_actions_service_downloadoffline_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/DownloadOffline.action */ 9533)
let mdk_meterinformation_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/DownloadStartedMessage.action */ 3067)
let mdk_meterinformation_actions_service_initializeoffline_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/InitializeOffline.action */ 1820)
let mdk_meterinformation_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/InitializeOfflineFailureMessage.action */ 9810)
let mdk_meterinformation_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/InitializeOfflineSuccessMessage.action */ 9981)
let mdk_meterinformation_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/SyncFailureMessage.action */ 9415)
let mdk_meterinformation_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/SyncStartedMessage.action */ 7933)
let mdk_meterinformation_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/SyncSuccessMessage.action */ 6126)
let mdk_meterinformation_actions_service_uploadoffline_action = __webpack_require__(/*! ./MDK_MeterInformation/Actions/Service/UploadOffline.action */ 5241)
let mdk_meterinformation_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK_MeterInformation/Globals/AppDefinition_Version.global */ 135)
let mdk_meterinformation_i18n_i18n_properties = __webpack_require__(/*! ./MDK_MeterInformation/i18n/i18n.properties */ 7291)
let mdk_meterinformation_jsconfig_json = __webpack_require__(/*! ./MDK_MeterInformation/jsconfig.json */ 5599)
let mdk_meterinformation_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDK_MeterInformation/Pages/ErrorArchive/ErrorArchive_Detail.page */ 6932)
let mdk_meterinformation_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDK_MeterInformation/Pages/ErrorArchive/ErrorArchive_List.page */ 3031)
let mdk_meterinformation_pages_history_information_page = __webpack_require__(/*! ./MDK_MeterInformation/Pages/History_Information.page */ 6041)
let mdk_meterinformation_pages_main_page = __webpack_require__(/*! ./MDK_MeterInformation/Pages/Main.page */ 326)
let mdk_meterinformation_pages_meter_information_page = __webpack_require__(/*! ./MDK_MeterInformation/Pages/Meter_Information.page */ 7588)
let mdk_meterinformation_pages_service_order_completion_comments_page = __webpack_require__(/*! ./MDK_MeterInformation/Pages/Service_Order_Completion_Comments.page */ 6113)
let mdk_meterinformation_pages_service_order_completion_page = __webpack_require__(/*! ./MDK_MeterInformation/Pages/Service_Order_Completion.page */ 1361)
let mdk_meterinformation_pages_service_order_details_page = __webpack_require__(/*! ./MDK_MeterInformation/Pages/Service_Order_Details.page */ 8628)
let mdk_meterinformation_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK_MeterInformation/Rules/AppUpdateFailure.js */ 6835)
let mdk_meterinformation_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK_MeterInformation/Rules/AppUpdateSuccess.js */ 8480)
let mdk_meterinformation_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDK_MeterInformation/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ 8448)
let mdk_meterinformation_rules_navtoserviceordercompletion_js = __webpack_require__(/*! ./MDK_MeterInformation/Rules/NavToServiceOrderCompletion.js */ 798)
let mdk_meterinformation_rules_onwillupdate_js = __webpack_require__(/*! ./MDK_MeterInformation/Rules/OnWillUpdate.js */ 1416)
let mdk_meterinformation_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK_MeterInformation/Rules/ResetAppSettingsAndLogout.js */ 5504)
let mdk_meterinformation_services_sampleservicev2_service = __webpack_require__(/*! ./MDK_MeterInformation/Services/SampleServiceV2.service */ 8118)
let mdk_meterinformation_styles_styles_css = __webpack_require__(/*! ./MDK_MeterInformation/Styles/Styles.css */ 5998)
let mdk_meterinformation_styles_styles_less = __webpack_require__(/*! ./MDK_MeterInformation/Styles/Styles.less */ 6202)
let mdk_meterinformation_styles_styles_light_css = __webpack_require__(/*! ./MDK_MeterInformation/Styles/Styles.light.css */ 3913)
let mdk_meterinformation_styles_styles_light_json = __webpack_require__(/*! ./MDK_MeterInformation/Styles/Styles.light.json */ 6684)
let mdk_meterinformation_styles_styles_light_nss = __webpack_require__(/*! ./MDK_MeterInformation/Styles/Styles.light.nss */ 5576)
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ 7775)
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ 3405)

module.exports = {
	application_app : application_app,
	mdk_meterinformation_actions_appupdate_action : mdk_meterinformation_actions_appupdate_action,
	mdk_meterinformation_actions_appupdatefailuremessage_action : mdk_meterinformation_actions_appupdatefailuremessage_action,
	mdk_meterinformation_actions_appupdateprogressbanner_action : mdk_meterinformation_actions_appupdateprogressbanner_action,
	mdk_meterinformation_actions_appupdatesuccessmessage_action : mdk_meterinformation_actions_appupdatesuccessmessage_action,
	mdk_meterinformation_actions_closemodalpage_cancel_action : mdk_meterinformation_actions_closemodalpage_cancel_action,
	mdk_meterinformation_actions_closepage_action : mdk_meterinformation_actions_closepage_action,
	mdk_meterinformation_actions_errorarchive_errorarchive_syncfailure_action : mdk_meterinformation_actions_errorarchive_errorarchive_syncfailure_action,
	mdk_meterinformation_actions_errorarchive_navtoerrorarchive_detail_action : mdk_meterinformation_actions_errorarchive_navtoerrorarchive_detail_action,
	mdk_meterinformation_actions_errorarchive_navtoerrorarchive_list_action : mdk_meterinformation_actions_errorarchive_navtoerrorarchive_list_action,
	mdk_meterinformation_actions_logout_action : mdk_meterinformation_actions_logout_action,
	mdk_meterinformation_actions_logoutmessage_action : mdk_meterinformation_actions_logoutmessage_action,
	mdk_meterinformation_actions_navtohistory_information_action : mdk_meterinformation_actions_navtohistory_information_action,
	mdk_meterinformation_actions_navtometer_information_action : mdk_meterinformation_actions_navtometer_information_action,
	mdk_meterinformation_actions_navtoservice_order_completion_action : mdk_meterinformation_actions_navtoservice_order_completion_action,
	mdk_meterinformation_actions_navtoservice_order_completion_comments_action : mdk_meterinformation_actions_navtoservice_order_completion_comments_action,
	mdk_meterinformation_actions_navtoservice_order_details_action : mdk_meterinformation_actions_navtoservice_order_details_action,
	mdk_meterinformation_actions_onwillupdate_action : mdk_meterinformation_actions_onwillupdate_action,
	mdk_meterinformation_actions_service_closeoffline_action : mdk_meterinformation_actions_service_closeoffline_action,
	mdk_meterinformation_actions_service_closeofflinefailuremessage_action : mdk_meterinformation_actions_service_closeofflinefailuremessage_action,
	mdk_meterinformation_actions_service_closeofflinesuccessmessage_action : mdk_meterinformation_actions_service_closeofflinesuccessmessage_action,
	mdk_meterinformation_actions_service_downloadoffline_action : mdk_meterinformation_actions_service_downloadoffline_action,
	mdk_meterinformation_actions_service_downloadstartedmessage_action : mdk_meterinformation_actions_service_downloadstartedmessage_action,
	mdk_meterinformation_actions_service_initializeoffline_action : mdk_meterinformation_actions_service_initializeoffline_action,
	mdk_meterinformation_actions_service_initializeofflinefailuremessage_action : mdk_meterinformation_actions_service_initializeofflinefailuremessage_action,
	mdk_meterinformation_actions_service_initializeofflinesuccessmessage_action : mdk_meterinformation_actions_service_initializeofflinesuccessmessage_action,
	mdk_meterinformation_actions_service_syncfailuremessage_action : mdk_meterinformation_actions_service_syncfailuremessage_action,
	mdk_meterinformation_actions_service_syncstartedmessage_action : mdk_meterinformation_actions_service_syncstartedmessage_action,
	mdk_meterinformation_actions_service_syncsuccessmessage_action : mdk_meterinformation_actions_service_syncsuccessmessage_action,
	mdk_meterinformation_actions_service_uploadoffline_action : mdk_meterinformation_actions_service_uploadoffline_action,
	mdk_meterinformation_globals_appdefinition_version_global : mdk_meterinformation_globals_appdefinition_version_global,
	mdk_meterinformation_i18n_i18n_properties : mdk_meterinformation_i18n_i18n_properties,
	mdk_meterinformation_jsconfig_json : mdk_meterinformation_jsconfig_json,
	mdk_meterinformation_pages_errorarchive_errorarchive_detail_page : mdk_meterinformation_pages_errorarchive_errorarchive_detail_page,
	mdk_meterinformation_pages_errorarchive_errorarchive_list_page : mdk_meterinformation_pages_errorarchive_errorarchive_list_page,
	mdk_meterinformation_pages_history_information_page : mdk_meterinformation_pages_history_information_page,
	mdk_meterinformation_pages_main_page : mdk_meterinformation_pages_main_page,
	mdk_meterinformation_pages_meter_information_page : mdk_meterinformation_pages_meter_information_page,
	mdk_meterinformation_pages_service_order_completion_comments_page : mdk_meterinformation_pages_service_order_completion_comments_page,
	mdk_meterinformation_pages_service_order_completion_page : mdk_meterinformation_pages_service_order_completion_page,
	mdk_meterinformation_pages_service_order_details_page : mdk_meterinformation_pages_service_order_details_page,
	mdk_meterinformation_rules_appupdatefailure_js : mdk_meterinformation_rules_appupdatefailure_js,
	mdk_meterinformation_rules_appupdatesuccess_js : mdk_meterinformation_rules_appupdatesuccess_js,
	mdk_meterinformation_rules_errorarchive_errorarchive_checkforsyncerror_js : mdk_meterinformation_rules_errorarchive_errorarchive_checkforsyncerror_js,
	mdk_meterinformation_rules_navtoserviceordercompletion_js : mdk_meterinformation_rules_navtoserviceordercompletion_js,
	mdk_meterinformation_rules_onwillupdate_js : mdk_meterinformation_rules_onwillupdate_js,
	mdk_meterinformation_rules_resetappsettingsandlogout_js : mdk_meterinformation_rules_resetappsettingsandlogout_js,
	mdk_meterinformation_services_sampleservicev2_service : mdk_meterinformation_services_sampleservicev2_service,
	mdk_meterinformation_styles_styles_css : mdk_meterinformation_styles_styles_css,
	mdk_meterinformation_styles_styles_less : mdk_meterinformation_styles_styles_less,
	mdk_meterinformation_styles_styles_light_css : mdk_meterinformation_styles_styles_light_css,
	mdk_meterinformation_styles_styles_light_json : mdk_meterinformation_styles_styles_light_json,
	mdk_meterinformation_styles_styles_light_nss : mdk_meterinformation_styles_styles_light_nss,
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

/***/ 6684:
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/Styles/Styles.light.json ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"objectTitleBG":{"background-color":"yellow"},"objectTitleVal":{"font-color":"orange !important"}}');

/***/ }),

/***/ 5599:
/*!**************************************************************!*\
  !*** ./build.definitions/MDK_MeterInformation/jsconfig.json ***!
  \**************************************************************/
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