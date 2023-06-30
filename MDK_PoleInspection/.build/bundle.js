/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6649:
/*!*******************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/i18n/i18n.properties ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ 562:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Rules/AppUpdateFailure.js ***!
  \************************************************************************/
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
    "Name": "/MDK_PoleInspection/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ 9559:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Rules/AppUpdateSuccess.js ***!
  \************************************************************************/
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
        "Name": "/MDK_PoleInspection/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK_PoleInspection/Actions/AppUpdateSuccessMessage.action",
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

/***/ 4357:
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \***************************************************************************************************/
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
  context.count('/MDK_PoleInspection/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/MDK_PoleInspection/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ 4143:
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Rules/OnWillUpdate.js ***!
  \********************************************************************/
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
  return clientAPI.executeAction('/MDK_PoleInspection/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_PoleInspection/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ 319:
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Rules/ResetAppSettingsAndLogout.js ***!
  \*********************************************************************************/
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
    return context.getPageProxy().executeAction('/MDK_PoleInspection/Actions/Logout.action');
  }
}

/***/ }),

/***/ 453:
/*!****************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Styles/Styles.css ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 5951);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js */ 1253);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_PoleInspection/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 1049:
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Styles/Styles.less ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 5951);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js */ 1253);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDK_PoleInspection/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 8870:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Styles/Styles.light.css ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 5951);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js */ 1253);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 7201:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Styles/Styles.light.nss ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 5951);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js */ 1253);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 1253:
/*!***********************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js ***!
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

/***/ 5951:
/*!******************************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
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

/***/ 9394:
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ 2669:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDK_PoleInspection/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MDK_PoleInspection/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ 6461:
/*!**************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Pages/Inspection_order.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Order Number","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Object ID","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Shape","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"DOM OID","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Subject Type CD","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Grid Address","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"DOM Grid","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty7","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Dom Pole No.","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty8","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Own CD","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Pole Owner","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Dominion","Other","Unknown","Tele/Com","Municipal","Private"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty10","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Class","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty11","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Height","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty12","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Treatment CD","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty13","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Material CD","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty14","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"GPS X","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty15","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"GPS Y","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"OSMOSETAG","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"Server OID","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Caption","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty18","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Submission","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty19","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"DFID","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty20","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Office Name","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty21","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Office No.","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"Inspection_Order","Caption":"Inspection Order","PrefersLargeCaption":true}

/***/ }),

/***/ 8850:
/*!**************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Pages/Main.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Inspection Order","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDK_PoleInspection/Actions/NavToInspection_Order.action"},{"_Name":"SectionButton1","Title":"Pole Inspection Form","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDK_PoleInspection/Actions/NavToPole_Inspection.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MDK_PoleInspection/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_PoleInspection/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_PoleInspection/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ 7312:
/*!******************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Pages/Pole_Inspection_Form.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"ATTR Change","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Select the Pole / Equipment Number","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker2","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Review Information","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Information Accurate","Correction Needed"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker3","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Select field(s) which needs to be corrected","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Information Accurate","Correction Needed"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker4","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"New Pole","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"Value":["Two"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker5","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Accessibility","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Inspect Date","Mode":"Date"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Inspect Vendor","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker6","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Inspection Type","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["B - SOUND & BORE","BD - SOUND & BORE W/ DECAY","BX - SOUND & BORE REJECT ","P - PARTIAL EXCAVATE  ","PX - PARTIAL EXCAVATE REJECT  ","R - SOUND & RESISTOGRAPH ","RD - SOUND & RESISTOGRAPH W/ DECAY","RX - SOUND & RESISTOGRAPH REJECT","T - EXTERNAL TREAT","TD - EXTERNAL TREAT W/ DECAY","TX - EXTERNAL TREAT REJECT","V - VISUAL REPORT","VX - VISUAL REJECT","X - EXCAVATED REJECT "]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker7","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Pole Condition","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["NON RESTORABLE REJECT  ","RESTORABLE REJECT","NON REJECT  ","NOT INSPECTED","PRIORITY NON RESTORABLE REJECT","PRIORITY RESTORABLE REJECT "]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker8","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Not Inspected - Reason?","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Animals ","Incorrect Feeder ","Inside Substation ","Locked Gate/Fence","Material ","No Power Lines Attached ","Not Accessible ","Not in Field ","Owner Refusal ","Previously Inspected ","Water","Wrong Pole Type"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker9","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Access Comments","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["< 50ft from Curb ","> 50ft from Curb ","Backyard from Alley ","Backyard from Street ","Crops","Right of Way "]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker10","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Reject Reason","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Carpenter Ants ","Compression Wood ","Decayed Top ","Enclosed Pocket ","Excessive Cracking / Checking ","Exposed Pocket ","Hazardous Conditions ","Hollow ","Mechanical Damage ","Other Insects ","Previous Above Groundline Reject ","Restored Pole Below Min Shell ","Shell Rot ","Shell Rot Above ","Split Top ","Termites ","Wind Shake ","Woodpecker Holes "]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker11","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Restrict Reason","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Double Truss Required ","Stub Pole ","Scabbed Pole ","Truss Required"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Original Circumference (in Inches)","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Effective Circumference (in Inches)","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Percent Strength (%)","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Attachment","_Name":"FormCellAttachment0","IsVisible":true,"Separator":true,"AttachmentActionType":["AddPhoto"]}],"Header":{"_Name":"SectionHeader0","AccessoryType":"none","UseTopPadding":true,"Caption":"Attach Picture"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote0","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader1","AccessoryType":"none","UseTopPadding":true,"Caption":"Inspection Comments"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote1","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader2","AccessoryType":"none","UseTopPadding":true,"Caption":"Pole Condition Comments"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell3"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker12","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"No Treat Reason","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Concrete","Dominion Spec","Fence","Garden","Park","Reject","Pole In Pavement","Water"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Insects","Enabled":true},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Last Inspection Year","Mode":"Date"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Last Treat Info","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Last Inspection Method","Enabled":true},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Last Treat Year","Mode":"Date"},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Inspection Date/Time","Mode":"Datetime"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty7","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Inspection Provider","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty8","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Inspection Invoice","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty9","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Fumigant Qty","Enabled":true},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker13","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Internal Treat","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell4"},{"Header":{"_Name":"SectionHeader3","AccessoryType":"none","UseTopPadding":true,"Caption":"Internal Treat Comment"},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell5","Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote2","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}]},{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell6","Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty10","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Decay","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty11","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Shell Rot","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty12","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Crew ID","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty13","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Load","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty14","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Supervisor","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty15","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Foreman","Enabled":true}]}]}],"_Type":"Page","_Name":"Pole_Inspection_Form","Caption":"Pole Inspection Form","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true}],"_Name":"ActionBar1"}}

/***/ }),

/***/ 3208:
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK_PoleInspection","Version":"/MDK_PoleInspection/Globals/AppDefinition_Version.global","MainPage":"/MDK_PoleInspection/Pages/Main.page","OnLaunch":["/MDK_PoleInspection/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MDK_PoleInspection/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK_PoleInspection/Actions/Service/InitializeOffline.action","Styles":"/MDK_PoleInspection/Styles/Styles.css","Localization":"/MDK_PoleInspection/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDK_PoleInspection/Styles/Styles.light.css","ios":"/MDK_PoleInspection/Styles/Styles.light.nss","android":"/MDK_PoleInspection/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/MDK_PoleInspection/Styles/Styles.light.nss","android":"/MDK_PoleInspection/Styles/Styles.light.json"}}

/***/ }),

/***/ 2391:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/AppUpdate.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK_PoleInspection/Rules/AppUpdateFailure.js","OnSuccess":"/MDK_PoleInspection/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ 4247:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/AppUpdateFailureMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 763:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/AppUpdateProgressBanner.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK_PoleInspection/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 8847:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/AppUpdateSuccessMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 5441:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/ClosePage.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ 2931:
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDK_PoleInspection/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ 5589:
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_PoleInspection/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ 6566:
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_PoleInspection/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ 5193:
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Logout.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ 3788:
/*!***************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/LogoutMessage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK_PoleInspection/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ 6371:
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/NavToInspection_Order.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToInspection_Order"},"PageToOpen":"/MDK_PoleInspection/Pages/Inspection_order.page"}

/***/ }),

/***/ 3646:
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/NavToPole_Inspection.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToPole_Inspection"},"PageToOpen":"/MDK_PoleInspection/Pages/Pole_Inspection_Form.page","ModalPage":true}

/***/ }),

/***/ 417:
/*!**************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/OnWillUpdate.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ 8937:
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/CloseOffline.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDK_PoleInspection/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDK_PoleInspection/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDK_PoleInspection/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ 8620:
/*!************************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/CloseOfflineFailureMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 1497:
/*!************************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 2049:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/DownloadOffline.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_PoleInspection/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDK_PoleInspection/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MDK_PoleInspection/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ 3736:
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/DownloadStartedMessage.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDK_PoleInspection/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 421:
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/InitializeOffline.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_PoleInspection/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MDK_PoleInspection/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MDK_PoleInspection/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ 7342:
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 847:
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 7338:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/SyncFailureMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 7314:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/SyncStartedMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDK_PoleInspection/Actions/Service/UploadOffline.action","OnFailure":"/MDK_PoleInspection/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 8790:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/SyncSuccessMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 5737:
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Actions/Service/UploadOffline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_PoleInspection/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDK_PoleInspection/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MDK_PoleInspection/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ 3569:
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Globals/AppDefinition_Version.global ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ 2031:
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Services/SampleServiceV2.service ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV2","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ 292:
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

let application_app = __webpack_require__(/*! ./Application.app */ 3208)
let mdk_poleinspection_actions_appupdate_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/AppUpdate.action */ 2391)
let mdk_poleinspection_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/AppUpdateFailureMessage.action */ 4247)
let mdk_poleinspection_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/AppUpdateProgressBanner.action */ 763)
let mdk_poleinspection_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/AppUpdateSuccessMessage.action */ 8847)
let mdk_poleinspection_actions_closepage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/ClosePage.action */ 5441)
let mdk_poleinspection_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ 2931)
let mdk_poleinspection_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ 5589)
let mdk_poleinspection_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/ErrorArchive/NavToErrorArchive_List.action */ 6566)
let mdk_poleinspection_actions_logout_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Logout.action */ 5193)
let mdk_poleinspection_actions_logoutmessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/LogoutMessage.action */ 3788)
let mdk_poleinspection_actions_navtoinspection_order_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/NavToInspection_Order.action */ 6371)
let mdk_poleinspection_actions_navtopole_inspection_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/NavToPole_Inspection.action */ 3646)
let mdk_poleinspection_actions_onwillupdate_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/OnWillUpdate.action */ 417)
let mdk_poleinspection_actions_service_closeoffline_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/CloseOffline.action */ 8937)
let mdk_poleinspection_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/CloseOfflineFailureMessage.action */ 8620)
let mdk_poleinspection_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/CloseOfflineSuccessMessage.action */ 1497)
let mdk_poleinspection_actions_service_downloadoffline_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/DownloadOffline.action */ 2049)
let mdk_poleinspection_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/DownloadStartedMessage.action */ 3736)
let mdk_poleinspection_actions_service_initializeoffline_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/InitializeOffline.action */ 421)
let mdk_poleinspection_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/InitializeOfflineFailureMessage.action */ 7342)
let mdk_poleinspection_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/InitializeOfflineSuccessMessage.action */ 847)
let mdk_poleinspection_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/SyncFailureMessage.action */ 7338)
let mdk_poleinspection_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/SyncStartedMessage.action */ 7314)
let mdk_poleinspection_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/SyncSuccessMessage.action */ 8790)
let mdk_poleinspection_actions_service_uploadoffline_action = __webpack_require__(/*! ./MDK_PoleInspection/Actions/Service/UploadOffline.action */ 5737)
let mdk_poleinspection_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK_PoleInspection/Globals/AppDefinition_Version.global */ 3569)
let mdk_poleinspection_i18n_i18n_properties = __webpack_require__(/*! ./MDK_PoleInspection/i18n/i18n.properties */ 6649)
let mdk_poleinspection_jsconfig_json = __webpack_require__(/*! ./MDK_PoleInspection/jsconfig.json */ 2339)
let mdk_poleinspection_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDK_PoleInspection/Pages/ErrorArchive/ErrorArchive_Detail.page */ 9394)
let mdk_poleinspection_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDK_PoleInspection/Pages/ErrorArchive/ErrorArchive_List.page */ 2669)
let mdk_poleinspection_pages_inspection_order_page = __webpack_require__(/*! ./MDK_PoleInspection/Pages/Inspection_order.page */ 6461)
let mdk_poleinspection_pages_main_page = __webpack_require__(/*! ./MDK_PoleInspection/Pages/Main.page */ 8850)
let mdk_poleinspection_pages_pole_inspection_form_page = __webpack_require__(/*! ./MDK_PoleInspection/Pages/Pole_Inspection_Form.page */ 7312)
let mdk_poleinspection_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK_PoleInspection/Rules/AppUpdateFailure.js */ 562)
let mdk_poleinspection_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK_PoleInspection/Rules/AppUpdateSuccess.js */ 9559)
let mdk_poleinspection_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDK_PoleInspection/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ 4357)
let mdk_poleinspection_rules_onwillupdate_js = __webpack_require__(/*! ./MDK_PoleInspection/Rules/OnWillUpdate.js */ 4143)
let mdk_poleinspection_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK_PoleInspection/Rules/ResetAppSettingsAndLogout.js */ 319)
let mdk_poleinspection_services_sampleservicev2_service = __webpack_require__(/*! ./MDK_PoleInspection/Services/SampleServiceV2.service */ 2031)
let mdk_poleinspection_styles_styles_css = __webpack_require__(/*! ./MDK_PoleInspection/Styles/Styles.css */ 453)
let mdk_poleinspection_styles_styles_less = __webpack_require__(/*! ./MDK_PoleInspection/Styles/Styles.less */ 1049)
let mdk_poleinspection_styles_styles_light_css = __webpack_require__(/*! ./MDK_PoleInspection/Styles/Styles.light.css */ 8870)
let mdk_poleinspection_styles_styles_light_json = __webpack_require__(/*! ./MDK_PoleInspection/Styles/Styles.light.json */ 1226)
let mdk_poleinspection_styles_styles_light_nss = __webpack_require__(/*! ./MDK_PoleInspection/Styles/Styles.light.nss */ 7201)
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ 7775)
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ 292)

module.exports = {
	application_app : application_app,
	mdk_poleinspection_actions_appupdate_action : mdk_poleinspection_actions_appupdate_action,
	mdk_poleinspection_actions_appupdatefailuremessage_action : mdk_poleinspection_actions_appupdatefailuremessage_action,
	mdk_poleinspection_actions_appupdateprogressbanner_action : mdk_poleinspection_actions_appupdateprogressbanner_action,
	mdk_poleinspection_actions_appupdatesuccessmessage_action : mdk_poleinspection_actions_appupdatesuccessmessage_action,
	mdk_poleinspection_actions_closepage_action : mdk_poleinspection_actions_closepage_action,
	mdk_poleinspection_actions_errorarchive_errorarchive_syncfailure_action : mdk_poleinspection_actions_errorarchive_errorarchive_syncfailure_action,
	mdk_poleinspection_actions_errorarchive_navtoerrorarchive_detail_action : mdk_poleinspection_actions_errorarchive_navtoerrorarchive_detail_action,
	mdk_poleinspection_actions_errorarchive_navtoerrorarchive_list_action : mdk_poleinspection_actions_errorarchive_navtoerrorarchive_list_action,
	mdk_poleinspection_actions_logout_action : mdk_poleinspection_actions_logout_action,
	mdk_poleinspection_actions_logoutmessage_action : mdk_poleinspection_actions_logoutmessage_action,
	mdk_poleinspection_actions_navtoinspection_order_action : mdk_poleinspection_actions_navtoinspection_order_action,
	mdk_poleinspection_actions_navtopole_inspection_action : mdk_poleinspection_actions_navtopole_inspection_action,
	mdk_poleinspection_actions_onwillupdate_action : mdk_poleinspection_actions_onwillupdate_action,
	mdk_poleinspection_actions_service_closeoffline_action : mdk_poleinspection_actions_service_closeoffline_action,
	mdk_poleinspection_actions_service_closeofflinefailuremessage_action : mdk_poleinspection_actions_service_closeofflinefailuremessage_action,
	mdk_poleinspection_actions_service_closeofflinesuccessmessage_action : mdk_poleinspection_actions_service_closeofflinesuccessmessage_action,
	mdk_poleinspection_actions_service_downloadoffline_action : mdk_poleinspection_actions_service_downloadoffline_action,
	mdk_poleinspection_actions_service_downloadstartedmessage_action : mdk_poleinspection_actions_service_downloadstartedmessage_action,
	mdk_poleinspection_actions_service_initializeoffline_action : mdk_poleinspection_actions_service_initializeoffline_action,
	mdk_poleinspection_actions_service_initializeofflinefailuremessage_action : mdk_poleinspection_actions_service_initializeofflinefailuremessage_action,
	mdk_poleinspection_actions_service_initializeofflinesuccessmessage_action : mdk_poleinspection_actions_service_initializeofflinesuccessmessage_action,
	mdk_poleinspection_actions_service_syncfailuremessage_action : mdk_poleinspection_actions_service_syncfailuremessage_action,
	mdk_poleinspection_actions_service_syncstartedmessage_action : mdk_poleinspection_actions_service_syncstartedmessage_action,
	mdk_poleinspection_actions_service_syncsuccessmessage_action : mdk_poleinspection_actions_service_syncsuccessmessage_action,
	mdk_poleinspection_actions_service_uploadoffline_action : mdk_poleinspection_actions_service_uploadoffline_action,
	mdk_poleinspection_globals_appdefinition_version_global : mdk_poleinspection_globals_appdefinition_version_global,
	mdk_poleinspection_i18n_i18n_properties : mdk_poleinspection_i18n_i18n_properties,
	mdk_poleinspection_jsconfig_json : mdk_poleinspection_jsconfig_json,
	mdk_poleinspection_pages_errorarchive_errorarchive_detail_page : mdk_poleinspection_pages_errorarchive_errorarchive_detail_page,
	mdk_poleinspection_pages_errorarchive_errorarchive_list_page : mdk_poleinspection_pages_errorarchive_errorarchive_list_page,
	mdk_poleinspection_pages_inspection_order_page : mdk_poleinspection_pages_inspection_order_page,
	mdk_poleinspection_pages_main_page : mdk_poleinspection_pages_main_page,
	mdk_poleinspection_pages_pole_inspection_form_page : mdk_poleinspection_pages_pole_inspection_form_page,
	mdk_poleinspection_rules_appupdatefailure_js : mdk_poleinspection_rules_appupdatefailure_js,
	mdk_poleinspection_rules_appupdatesuccess_js : mdk_poleinspection_rules_appupdatesuccess_js,
	mdk_poleinspection_rules_errorarchive_errorarchive_checkforsyncerror_js : mdk_poleinspection_rules_errorarchive_errorarchive_checkforsyncerror_js,
	mdk_poleinspection_rules_onwillupdate_js : mdk_poleinspection_rules_onwillupdate_js,
	mdk_poleinspection_rules_resetappsettingsandlogout_js : mdk_poleinspection_rules_resetappsettingsandlogout_js,
	mdk_poleinspection_services_sampleservicev2_service : mdk_poleinspection_services_sampleservicev2_service,
	mdk_poleinspection_styles_styles_css : mdk_poleinspection_styles_styles_css,
	mdk_poleinspection_styles_styles_less : mdk_poleinspection_styles_styles_less,
	mdk_poleinspection_styles_styles_light_css : mdk_poleinspection_styles_styles_light_css,
	mdk_poleinspection_styles_styles_light_json : mdk_poleinspection_styles_styles_light_json,
	mdk_poleinspection_styles_styles_light_nss : mdk_poleinspection_styles_styles_light_nss,
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

/***/ 1226:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/Styles/Styles.light.json ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ 2339:
/*!************************************************************!*\
  !*** ./build.definitions/MDK_PoleInspection/jsconfig.json ***!
  \************************************************************/
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