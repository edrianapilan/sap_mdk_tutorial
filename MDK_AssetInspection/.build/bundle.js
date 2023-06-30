/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 54:
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/i18n/i18n.properties ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ 602:
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Rules/AppUpdateFailure.js ***!
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
    "Name": "/MDK_AssetInspection/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ 186:
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Rules/AppUpdateSuccess.js ***!
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
        "Name": "/MDK_AssetInspection/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK_AssetInspection/Actions/AppUpdateSuccessMessage.action",
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

/***/ 131:
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
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
  context.count('/MDK_AssetInspection/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/MDK_AssetInspection/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ 571:
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Rules/OnWillUpdate.js ***!
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
  return clientAPI.executeAction('/MDK_AssetInspection/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_AssetInspection/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ 428:
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Rules/ResetAppSettingsAndLogout.js ***!
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
    return context.getPageProxy().executeAction('/MDK_AssetInspection/Actions/Logout.action');
  }
}

/***/ }),

/***/ 504:
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Styles/Styles.css ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_AssetInspection/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 51:
/*!******************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Styles/Styles.less ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDK_AssetInspection/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 692:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Styles/Styles.light.css ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 98:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Styles/Styles.light.nss ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 308:
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

/***/ 899:
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

/***/ 980:
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Pages/Asset_Inspection_Form.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Attachment","_Name":"FormCellAttachment0","IsVisible":true,"Separator":true,"AttachmentActionType":["SelectFile"]}],"Header":{"_Name":"SectionHeader0","AccessoryType":"none","UseTopPadding":true,"Caption":"Documents"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection1","Visible":true,"EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"Value":"6","_Name":"SectionSimplePropertyCell1","KeyName":"Related Work Orders","AccessoryType":"disclosureIndicator","Visible":true}},{"SimplePropertyCell":{"Value":"2","_Name":"SectionSimplePropertyCell2","KeyName":"Related Notifications","AccessoryType":"disclosureIndicator","Visible":true}}],"Layout":{"NumberOfColumns":1}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Description","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Class","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Manufacturer","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Model Number","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Manufacturer S. No.","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Functional Location","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Superior Equipment","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote0","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader1","AccessoryType":"none","UseTopPadding":true,"Caption":"Characteristics"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell3"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty8","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Lower Limit","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty9","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Upper Limit","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty10","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Unit of Measure","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty13","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Valuation Code","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty12","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Reading","Enabled":true}],"Header":{"_Name":"SectionHeader2","AccessoryType":"none","UseTopPadding":true,"Caption":"Current Reading"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell4"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote1","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader3","AccessoryType":"none","UseTopPadding":true,"Caption":"Notes"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell5"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Date","Mode":"Date"},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Time","Mode":"Time"}],"Header":{"_Name":"SectionHeader4","AccessoryType":"none","UseTopPadding":true,"Caption":"Previous Reading"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell6"},{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell7","Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Take Reading"}]},{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell8","Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty14","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Numeric","Enabled":true}]},{"Header":{"_Name":"SectionHeader5","AccessoryType":"none","UseTopPadding":true,"Caption":"Description"},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell9","Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote2","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}]},{"Header":{"_Name":"SectionHeader6","AccessoryType":"none","UseTopPadding":true,"Caption":"Characteristic"},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell10","Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote3","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}]},{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell11","Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty16","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Reading","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty17","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Unit of Measure","Enabled":true}]},{"Header":{"_Name":"SectionHeader7","AccessoryType":"none","UseTopPadding":true,"Caption":"Text"},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell12","Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote4","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}]},{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell13","Controls":[{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Correction to be reported?","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]}]},{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell14","Controls":[{"Value":["Two"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Select Attribute","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty18","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Enter Correct Value","Enabled":true}]},{"Header":{"_Name":"SectionHeader8","AccessoryType":"none","UseTopPadding":true,"Caption":"Attach Photo"},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell15","Controls":[{"_Type":"Control.Type.FormCell.Attachment","_Name":"FormCellAttachment1","IsVisible":true,"Separator":true,"AttachmentActionType":["AddPhoto"]}]}]}],"_Type":"Page","_Name":"Asset_Inspection_Form","Caption":"Asset Inspection Form","PrefersLargeCaption":true}

/***/ }),

/***/ 288:
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ 202:
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDK_AssetInspection/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MDK_AssetInspection/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ 338:
/*!***************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Pages/Main.page ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"_Name":"SectionButton0","Title":"Button","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"res://mdk_logo.png","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDK_AssetInspection/Actions/NavToAsset_Inspection.action"}],"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"}}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MDK_AssetInspection/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_AssetInspection/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_AssetInspection/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ 768:
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK_AssetInspection","Version":"/MDK_AssetInspection/Globals/AppDefinition_Version.global","MainPage":"/MDK_AssetInspection/Pages/Main.page","OnLaunch":["/MDK_AssetInspection/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MDK_AssetInspection/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK_AssetInspection/Actions/Service/InitializeOffline.action","Styles":"/MDK_AssetInspection/Styles/Styles.css","Localization":"/MDK_AssetInspection/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDK_AssetInspection/Styles/Styles.light.css","ios":"/MDK_AssetInspection/Styles/Styles.light.nss","android":"/MDK_AssetInspection/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/MDK_AssetInspection/Styles/Styles.light.nss","android":"/MDK_AssetInspection/Styles/Styles.light.json"}}

/***/ }),

/***/ 318:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/AppUpdate.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK_AssetInspection/Rules/AppUpdateFailure.js","OnSuccess":"/MDK_AssetInspection/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ 970:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/AppUpdateFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 447:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/AppUpdateProgressBanner.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK_AssetInspection/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 847:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/AppUpdateSuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 488:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/ClosePage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ 191:
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDK_AssetInspection/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ 146:
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_AssetInspection/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ 709:
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_AssetInspection/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ 387:
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Logout.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ 330:
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/LogoutMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK_AssetInspection/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ 342:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/NavToAsset_Inspection.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAsset_Inspection"},"PageToOpen":"/MDK_AssetInspection/Pages/Asset_Inspection_Form.page"}

/***/ }),

/***/ 529:
/*!***************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/OnWillUpdate.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ 371:
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/CloseOffline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDK_AssetInspection/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDK_AssetInspection/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDK_AssetInspection/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ 751:
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/CloseOfflineFailureMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 541:
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 523:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/DownloadOffline.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_AssetInspection/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDK_AssetInspection/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MDK_AssetInspection/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ 895:
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/DownloadStartedMessage.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDK_AssetInspection/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 542:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/InitializeOffline.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_AssetInspection/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MDK_AssetInspection/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MDK_AssetInspection/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ 149:
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 23:
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 755:
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/SyncFailureMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 217:
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/SyncStartedMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDK_AssetInspection/Actions/Service/UploadOffline.action","OnFailure":"/MDK_AssetInspection/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 210:
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/SyncSuccessMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 949:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Actions/Service/UploadOffline.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_AssetInspection/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDK_AssetInspection/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MDK_AssetInspection/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ 598:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Globals/AppDefinition_Version.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ 727:
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Services/SampleServiceV2.service ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV2","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ 405:
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ 280:
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ 768)
let mdk_assetinspection_actions_appupdate_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/AppUpdate.action */ 318)
let mdk_assetinspection_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/AppUpdateFailureMessage.action */ 970)
let mdk_assetinspection_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/AppUpdateProgressBanner.action */ 447)
let mdk_assetinspection_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/AppUpdateSuccessMessage.action */ 847)
let mdk_assetinspection_actions_closepage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/ClosePage.action */ 488)
let mdk_assetinspection_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ 191)
let mdk_assetinspection_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ 146)
let mdk_assetinspection_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/ErrorArchive/NavToErrorArchive_List.action */ 709)
let mdk_assetinspection_actions_logout_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Logout.action */ 387)
let mdk_assetinspection_actions_logoutmessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/LogoutMessage.action */ 330)
let mdk_assetinspection_actions_navtoasset_inspection_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/NavToAsset_Inspection.action */ 342)
let mdk_assetinspection_actions_onwillupdate_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/OnWillUpdate.action */ 529)
let mdk_assetinspection_actions_service_closeoffline_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/CloseOffline.action */ 371)
let mdk_assetinspection_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/CloseOfflineFailureMessage.action */ 751)
let mdk_assetinspection_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/CloseOfflineSuccessMessage.action */ 541)
let mdk_assetinspection_actions_service_downloadoffline_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/DownloadOffline.action */ 523)
let mdk_assetinspection_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/DownloadStartedMessage.action */ 895)
let mdk_assetinspection_actions_service_initializeoffline_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/InitializeOffline.action */ 542)
let mdk_assetinspection_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/InitializeOfflineFailureMessage.action */ 149)
let mdk_assetinspection_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/InitializeOfflineSuccessMessage.action */ 23)
let mdk_assetinspection_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/SyncFailureMessage.action */ 755)
let mdk_assetinspection_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/SyncStartedMessage.action */ 217)
let mdk_assetinspection_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/SyncSuccessMessage.action */ 210)
let mdk_assetinspection_actions_service_uploadoffline_action = __webpack_require__(/*! ./MDK_AssetInspection/Actions/Service/UploadOffline.action */ 949)
let mdk_assetinspection_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK_AssetInspection/Globals/AppDefinition_Version.global */ 598)
let mdk_assetinspection_i18n_i18n_properties = __webpack_require__(/*! ./MDK_AssetInspection/i18n/i18n.properties */ 54)
let mdk_assetinspection_jsconfig_json = __webpack_require__(/*! ./MDK_AssetInspection/jsconfig.json */ 173)
let mdk_assetinspection_pages_asset_inspection_form_page = __webpack_require__(/*! ./MDK_AssetInspection/Pages/Asset_Inspection_Form.page */ 980)
let mdk_assetinspection_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDK_AssetInspection/Pages/ErrorArchive/ErrorArchive_Detail.page */ 288)
let mdk_assetinspection_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDK_AssetInspection/Pages/ErrorArchive/ErrorArchive_List.page */ 202)
let mdk_assetinspection_pages_main_page = __webpack_require__(/*! ./MDK_AssetInspection/Pages/Main.page */ 338)
let mdk_assetinspection_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK_AssetInspection/Rules/AppUpdateFailure.js */ 602)
let mdk_assetinspection_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK_AssetInspection/Rules/AppUpdateSuccess.js */ 186)
let mdk_assetinspection_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDK_AssetInspection/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ 131)
let mdk_assetinspection_rules_onwillupdate_js = __webpack_require__(/*! ./MDK_AssetInspection/Rules/OnWillUpdate.js */ 571)
let mdk_assetinspection_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK_AssetInspection/Rules/ResetAppSettingsAndLogout.js */ 428)
let mdk_assetinspection_services_sampleservicev2_service = __webpack_require__(/*! ./MDK_AssetInspection/Services/SampleServiceV2.service */ 727)
let mdk_assetinspection_styles_styles_css = __webpack_require__(/*! ./MDK_AssetInspection/Styles/Styles.css */ 504)
let mdk_assetinspection_styles_styles_less = __webpack_require__(/*! ./MDK_AssetInspection/Styles/Styles.less */ 51)
let mdk_assetinspection_styles_styles_light_css = __webpack_require__(/*! ./MDK_AssetInspection/Styles/Styles.light.css */ 692)
let mdk_assetinspection_styles_styles_light_json = __webpack_require__(/*! ./MDK_AssetInspection/Styles/Styles.light.json */ 763)
let mdk_assetinspection_styles_styles_light_nss = __webpack_require__(/*! ./MDK_AssetInspection/Styles/Styles.light.nss */ 98)
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ 775)
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ 405)

module.exports = {
	application_app : application_app,
	mdk_assetinspection_actions_appupdate_action : mdk_assetinspection_actions_appupdate_action,
	mdk_assetinspection_actions_appupdatefailuremessage_action : mdk_assetinspection_actions_appupdatefailuremessage_action,
	mdk_assetinspection_actions_appupdateprogressbanner_action : mdk_assetinspection_actions_appupdateprogressbanner_action,
	mdk_assetinspection_actions_appupdatesuccessmessage_action : mdk_assetinspection_actions_appupdatesuccessmessage_action,
	mdk_assetinspection_actions_closepage_action : mdk_assetinspection_actions_closepage_action,
	mdk_assetinspection_actions_errorarchive_errorarchive_syncfailure_action : mdk_assetinspection_actions_errorarchive_errorarchive_syncfailure_action,
	mdk_assetinspection_actions_errorarchive_navtoerrorarchive_detail_action : mdk_assetinspection_actions_errorarchive_navtoerrorarchive_detail_action,
	mdk_assetinspection_actions_errorarchive_navtoerrorarchive_list_action : mdk_assetinspection_actions_errorarchive_navtoerrorarchive_list_action,
	mdk_assetinspection_actions_logout_action : mdk_assetinspection_actions_logout_action,
	mdk_assetinspection_actions_logoutmessage_action : mdk_assetinspection_actions_logoutmessage_action,
	mdk_assetinspection_actions_navtoasset_inspection_action : mdk_assetinspection_actions_navtoasset_inspection_action,
	mdk_assetinspection_actions_onwillupdate_action : mdk_assetinspection_actions_onwillupdate_action,
	mdk_assetinspection_actions_service_closeoffline_action : mdk_assetinspection_actions_service_closeoffline_action,
	mdk_assetinspection_actions_service_closeofflinefailuremessage_action : mdk_assetinspection_actions_service_closeofflinefailuremessage_action,
	mdk_assetinspection_actions_service_closeofflinesuccessmessage_action : mdk_assetinspection_actions_service_closeofflinesuccessmessage_action,
	mdk_assetinspection_actions_service_downloadoffline_action : mdk_assetinspection_actions_service_downloadoffline_action,
	mdk_assetinspection_actions_service_downloadstartedmessage_action : mdk_assetinspection_actions_service_downloadstartedmessage_action,
	mdk_assetinspection_actions_service_initializeoffline_action : mdk_assetinspection_actions_service_initializeoffline_action,
	mdk_assetinspection_actions_service_initializeofflinefailuremessage_action : mdk_assetinspection_actions_service_initializeofflinefailuremessage_action,
	mdk_assetinspection_actions_service_initializeofflinesuccessmessage_action : mdk_assetinspection_actions_service_initializeofflinesuccessmessage_action,
	mdk_assetinspection_actions_service_syncfailuremessage_action : mdk_assetinspection_actions_service_syncfailuremessage_action,
	mdk_assetinspection_actions_service_syncstartedmessage_action : mdk_assetinspection_actions_service_syncstartedmessage_action,
	mdk_assetinspection_actions_service_syncsuccessmessage_action : mdk_assetinspection_actions_service_syncsuccessmessage_action,
	mdk_assetinspection_actions_service_uploadoffline_action : mdk_assetinspection_actions_service_uploadoffline_action,
	mdk_assetinspection_globals_appdefinition_version_global : mdk_assetinspection_globals_appdefinition_version_global,
	mdk_assetinspection_i18n_i18n_properties : mdk_assetinspection_i18n_i18n_properties,
	mdk_assetinspection_jsconfig_json : mdk_assetinspection_jsconfig_json,
	mdk_assetinspection_pages_asset_inspection_form_page : mdk_assetinspection_pages_asset_inspection_form_page,
	mdk_assetinspection_pages_errorarchive_errorarchive_detail_page : mdk_assetinspection_pages_errorarchive_errorarchive_detail_page,
	mdk_assetinspection_pages_errorarchive_errorarchive_list_page : mdk_assetinspection_pages_errorarchive_errorarchive_list_page,
	mdk_assetinspection_pages_main_page : mdk_assetinspection_pages_main_page,
	mdk_assetinspection_rules_appupdatefailure_js : mdk_assetinspection_rules_appupdatefailure_js,
	mdk_assetinspection_rules_appupdatesuccess_js : mdk_assetinspection_rules_appupdatesuccess_js,
	mdk_assetinspection_rules_errorarchive_errorarchive_checkforsyncerror_js : mdk_assetinspection_rules_errorarchive_errorarchive_checkforsyncerror_js,
	mdk_assetinspection_rules_onwillupdate_js : mdk_assetinspection_rules_onwillupdate_js,
	mdk_assetinspection_rules_resetappsettingsandlogout_js : mdk_assetinspection_rules_resetappsettingsandlogout_js,
	mdk_assetinspection_services_sampleservicev2_service : mdk_assetinspection_services_sampleservicev2_service,
	mdk_assetinspection_styles_styles_css : mdk_assetinspection_styles_styles_css,
	mdk_assetinspection_styles_styles_less : mdk_assetinspection_styles_styles_less,
	mdk_assetinspection_styles_styles_light_css : mdk_assetinspection_styles_styles_light_css,
	mdk_assetinspection_styles_styles_light_json : mdk_assetinspection_styles_styles_light_json,
	mdk_assetinspection_styles_styles_light_nss : mdk_assetinspection_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ 568:
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ 280)))));
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

/***/ 763:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/Styles/Styles.light.json ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ 173:
/*!*************************************************************!*\
  !*** ./build.definitions/MDK_AssetInspection/jsconfig.json ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ 775:
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
/******/ 	var __webpack_exports__ = __webpack_require__(568);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map