/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4292:
/*!*******************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/i18n/i18n.properties ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ 8375:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Rules/AppUpdateFailure.js ***!
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
    "Name": "/MDK_PadMountSwitch/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ 5325:
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Rules/AppUpdateSuccess.js ***!
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
        "Name": "/MDK_PadMountSwitch/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK_PadMountSwitch/Actions/AppUpdateSuccessMessage.action",
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

/***/ 4508:
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
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
  context.count('/MDK_PadMountSwitch/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/MDK_PadMountSwitch/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ 2358:
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Rules/OnWillUpdate.js ***!
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
  return clientAPI.executeAction('/MDK_PadMountSwitch/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_PadMountSwitch/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ 7139:
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Rules/ResetAppSettingsAndLogout.js ***!
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
    return context.getPageProxy().executeAction('/MDK_PadMountSwitch/Actions/Logout.action');
  }
}

/***/ }),

/***/ 3806:
/*!****************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Styles/Styles.css ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 5951);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js */ 1253);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_PadMountSwitch/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 955:
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Styles/Styles.less ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 5951);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js */ 1253);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDK_PadMountSwitch/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 5062:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Styles/Styles.light.css ***!
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

/***/ 7622:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Styles/Styles.light.nss ***!
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

/***/ 747:
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ 5450:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDK_PadMountSwitch/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MDK_PadMountSwitch/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ 7328:
/*!**************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Pages/Main.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"_Name":"SectionButton0","Title":"Pad Mount Switch Form","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDK_PadMountSwitch/Actions/NavToPad_Mount_Switch_Form.action"},{"_Name":"SectionButton1","Title":"Pad Mount Switch Inspection","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDK_PadMountSwitch/Actions/NavToPad_Mount_Switch_Inspection.action"}],"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"}}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MDK_PadMountSwitch/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_PadMountSwitch/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_PadMountSwitch/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ 4677:
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Pages/Pad_Mount_Switch_Form.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Order Number","Enabled":true},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Creation Date","Mode":"Date"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Office","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Device Number","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"GIS Device","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Device Type","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":[""]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Inspection Type","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Live Front","Dead Front","S&C"]}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker2","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Overall Condition","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker3","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Paint","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker4","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Accessibility","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker5","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Doord/Hinges/Rust","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker6","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Pad","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker7","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Locks","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker11","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Vegetation","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker12","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"HV Danger Sign","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker13","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"HV Front Barrier","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker14","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"HV Bushings","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker15","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Heaters","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker16","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Heater CIRCUIT","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker17","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Fuse or Holder","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker18","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Snuffer","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker19","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Moisture","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker20","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Oil Level","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker31","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Oil Leak","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker21","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Ground Reading","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker22","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Other","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Latitude","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Longitude","Enabled":true}],"Header":{"_Name":"SectionHeader0","AccessoryType":"none","UseTopPadding":true,"Caption":"Physical Condition"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Other","Enabled":true},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Year Manufactured","Mode":"Date"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty7","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Serial No.","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker24","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Insulationg Medium","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["SF6","Oil","Air","Vacuum","Unknown"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker25","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Phase","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker26","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Refurbished","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker27","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Arrestors","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker28","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Arrestor Manufacturer","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Ohio Brass","Joslyn","Kearney","GE","Raychem","McGraw Edison","Westinghouse","Varistar","Varicap MCOV","VARGARD","Verrigap - HD","Other"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty8","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Oil Volume","Enabled":true},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker29","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Signage at Switch is Correct","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker30","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"GIS Correct","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker23","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Manufacturer","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["AB Chance","Cooper","EEI","Federal Pacific","G&W Electric","General Electric","K&M","Kearny","Nelson","RTE","S&C","Shellbetter Inc","Other"]}],"Header":{"_Name":"SectionHeader1","AccessoryType":"none","UseTopPadding":true,"Caption":"Switch Information"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker32","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Phase","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker33","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Manufacturer","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["AB Chance","Cooper","EEI","Federal Pacific","G&W Electric","General Electric","K&M","Kearny","Nelson","RTE","S&C","Shellbetter Inc","Other"]},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Year Manufactured","Mode":"Date"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker35","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Refurbished","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty9","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Serial No.","Enabled":true},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker36","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Fault Indicators","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker37","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Switch Type","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["SW 1PH Tap","SW DF3 Way","SW DF 4 Way","SW DF E-VFI 1PH PO SF6","SW DF E-VFI 3PH Tap PO","SW DF E-VFI 4 Way PO","SW DF E-VFI ATC","SW DF LCE VFI LTT-3 (Maint)","SW DF LTT 6 Fuse (Maint)","SW DF VFI 3 Way PO","SW DF VFI 4 Way","SW DF VFI LTT-6 PO","SW DF VISTA","SW LF 1PH PMS1 (Maint)","SW LF 3PH 3 Way","SW LF 3PH Tap (Maint)","SW LF 3PH Tie (Maint)","SW LF 6 Fuse (Maint)","Unknown","SW PM RECLOSER","SW DF 3 PH VISTA"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker38","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Insulationg Medium","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["SF6","Oil","Air","Vacuum","Unknown"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty10","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Tank Temperature *use heat gun*","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty11","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"SF6 Gas Capacity *from nameplate* (lbs)","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty12","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"SF6 Pressure *from gauge* (In Psi)","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty13","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Oil Volume *from nameplate* (lbs)","Enabled":true},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker39","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"GIS Correct","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker40","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"GIS Map Change Needed","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Incorrect Attributes","Incorrect Grid Address","Incorrect Location","Incorrect Device Number","Asset not in field"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty14","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Detailed Description of Map Changes Needed","Enabled":true},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker41","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Signage at Switch is Correct","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Yes","No"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty15","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Comments","Enabled":true}],"Header":{"_Name":"SectionHeader2","AccessoryType":"none","UseTopPadding":true,"Caption":"Other"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell3"},{"Header":{"_Name":"SectionHeader3","AccessoryType":"none","UseTopPadding":true,"Caption":"Picture of Name Plate"},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell4","Controls":[{"_Type":"Control.Type.FormCell.Attachment","_Name":"FormCellAttachment0","IsVisible":true,"Separator":true,"AttachmentActionType":["AddPhoto"]}]},{"Header":{"_Name":"SectionHeader4","AccessoryType":"none","UseTopPadding":true,"Caption":"Picture of Front of Switch"},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell5","Controls":[{"_Type":"Control.Type.FormCell.Attachment","_Name":"FormCellAttachment1","IsVisible":true,"Separator":true,"AttachmentActionType":["AddPhoto"]}]},{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell6","Controls":[{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker42","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Heaters","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker43","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Lightning Arrestors","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker44","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Insulators","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker45","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Cable Accesorries - Curr. Sensors, F. Ind","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker46","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Door Gaskets","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker47","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Other","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty16","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Other - Comments","Enabled":true}]},{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell7","Controls":[{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker48","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Procedure #2 - Test Clock & Lamps","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]},{"Value":"Press \"Test\" menu key. Press the \"Next\" key (or \"Last\" item key)","_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote0","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true},{"Value":"Scroll until you get to \"Test Lamps\". Press \"Enter\" (Lamps should flash 5 times)","_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote1","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true},{"Value":"Press \"Time\" menu key. Press the \"Next\" key (or \"Last\" item key).","_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote3","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true},{"Value":"Press \"Test\" menu key. Press the \"Next\" key (or \"last\" item key).","_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote2","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true},{"Value":"Scroll until you get to values.","_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote4","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true},{"Value":"To change the value of an item, enter access code - 6601.Press \"Change\", then \"Enter\" key","_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote5","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker49","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Perform Testing of Control","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Good","Repaired","Follow-Up Required"]}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[]}]}],"_Type":"Page","_Name":"Pad_Mount_Switch_Form","Caption":"Pad Mount Switch Form","PrefersLargeCaption":true}

/***/ }),

/***/ 1461:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Pages/Pad_Mount_Switch_Inspection.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.Tabs","_Name":"Tabs0","Items":[{"_Type":"Control.Type.TabItem","Caption":"TabItem0","PageToOpen":"/MDK_PadMountSwitch/Pages/Pad_Mount_Switch_Form.page","_Name":"TabItem0"}],"Position":"Top","TabStripType":"Normal"}],"_Type":"Page","_Name":"Pad_Mount_Switch_Inspection","Caption":"Pad Mount Switch Inspection"}

/***/ }),

/***/ 3208:
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK_PadMountSwitch","Version":"/MDK_PadMountSwitch/Globals/AppDefinition_Version.global","MainPage":"/MDK_PadMountSwitch/Pages/Main.page","OnLaunch":["/MDK_PadMountSwitch/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MDK_PadMountSwitch/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK_PadMountSwitch/Actions/Service/InitializeOffline.action","Styles":"/MDK_PadMountSwitch/Styles/Styles.css","Localization":"/MDK_PadMountSwitch/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDK_PadMountSwitch/Styles/Styles.light.css","ios":"/MDK_PadMountSwitch/Styles/Styles.light.nss","android":"/MDK_PadMountSwitch/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/MDK_PadMountSwitch/Styles/Styles.light.nss","android":"/MDK_PadMountSwitch/Styles/Styles.light.json"}}

/***/ }),

/***/ 6459:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/AppUpdate.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK_PadMountSwitch/Rules/AppUpdateFailure.js","OnSuccess":"/MDK_PadMountSwitch/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ 7761:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/AppUpdateFailureMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 6822:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/AppUpdateProgressBanner.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK_PadMountSwitch/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 9756:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/AppUpdateSuccessMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 6687:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/ClosePage.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ 3046:
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDK_PadMountSwitch/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ 5939:
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_PadMountSwitch/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ 771:
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_PadMountSwitch/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ 1846:
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Logout.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ 555:
/*!***************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/LogoutMessage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK_PadMountSwitch/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ 6685:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/NavToPad_Mount_Switch_Form.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToPad_Mount_Switch_Form"},"PageToOpen":"/MDK_PadMountSwitch/Pages/Pad_Mount_Switch_Form.page"}

/***/ }),

/***/ 8405:
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/NavToPad_Mount_Switch_Inspection.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToPad_Mount_Switch_Inspection"},"PageToOpen":"/MDK_PadMountSwitch/Pages/Pad_Mount_Switch_Inspection.page"}

/***/ }),

/***/ 6122:
/*!**************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/OnWillUpdate.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ 1694:
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/CloseOffline.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDK_PadMountSwitch/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDK_PadMountSwitch/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDK_PadMountSwitch/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ 1300:
/*!************************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/CloseOfflineFailureMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 7380:
/*!************************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 376:
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/DownloadOffline.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_PadMountSwitch/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDK_PadMountSwitch/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MDK_PadMountSwitch/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ 6545:
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/DownloadStartedMessage.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDK_PadMountSwitch/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 7866:
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/InitializeOffline.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_PadMountSwitch/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MDK_PadMountSwitch/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MDK_PadMountSwitch/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ 3641:
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 7876:
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 9545:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/SyncFailureMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 2787:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/SyncStartedMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDK_PadMountSwitch/Actions/Service/UploadOffline.action","OnFailure":"/MDK_PadMountSwitch/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 5754:
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/SyncSuccessMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 4347:
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Actions/Service/UploadOffline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_PadMountSwitch/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDK_PadMountSwitch/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MDK_PadMountSwitch/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ 3673:
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Globals/AppDefinition_Version.global ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ 7698:
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Services/SampleServiceV2.service ***!
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
let mdk_padmountswitch_actions_appupdate_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/AppUpdate.action */ 6459)
let mdk_padmountswitch_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/AppUpdateFailureMessage.action */ 7761)
let mdk_padmountswitch_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/AppUpdateProgressBanner.action */ 6822)
let mdk_padmountswitch_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/AppUpdateSuccessMessage.action */ 9756)
let mdk_padmountswitch_actions_closepage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/ClosePage.action */ 6687)
let mdk_padmountswitch_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ 3046)
let mdk_padmountswitch_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ 5939)
let mdk_padmountswitch_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/ErrorArchive/NavToErrorArchive_List.action */ 771)
let mdk_padmountswitch_actions_logout_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Logout.action */ 1846)
let mdk_padmountswitch_actions_logoutmessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/LogoutMessage.action */ 555)
let mdk_padmountswitch_actions_navtopad_mount_switch_form_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/NavToPad_Mount_Switch_Form.action */ 6685)
let mdk_padmountswitch_actions_navtopad_mount_switch_inspection_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/NavToPad_Mount_Switch_Inspection.action */ 8405)
let mdk_padmountswitch_actions_onwillupdate_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/OnWillUpdate.action */ 6122)
let mdk_padmountswitch_actions_service_closeoffline_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/CloseOffline.action */ 1694)
let mdk_padmountswitch_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/CloseOfflineFailureMessage.action */ 1300)
let mdk_padmountswitch_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/CloseOfflineSuccessMessage.action */ 7380)
let mdk_padmountswitch_actions_service_downloadoffline_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/DownloadOffline.action */ 376)
let mdk_padmountswitch_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/DownloadStartedMessage.action */ 6545)
let mdk_padmountswitch_actions_service_initializeoffline_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/InitializeOffline.action */ 7866)
let mdk_padmountswitch_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/InitializeOfflineFailureMessage.action */ 3641)
let mdk_padmountswitch_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/InitializeOfflineSuccessMessage.action */ 7876)
let mdk_padmountswitch_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/SyncFailureMessage.action */ 9545)
let mdk_padmountswitch_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/SyncStartedMessage.action */ 2787)
let mdk_padmountswitch_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/SyncSuccessMessage.action */ 5754)
let mdk_padmountswitch_actions_service_uploadoffline_action = __webpack_require__(/*! ./MDK_PadMountSwitch/Actions/Service/UploadOffline.action */ 4347)
let mdk_padmountswitch_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK_PadMountSwitch/Globals/AppDefinition_Version.global */ 3673)
let mdk_padmountswitch_i18n_i18n_properties = __webpack_require__(/*! ./MDK_PadMountSwitch/i18n/i18n.properties */ 4292)
let mdk_padmountswitch_jsconfig_json = __webpack_require__(/*! ./MDK_PadMountSwitch/jsconfig.json */ 6805)
let mdk_padmountswitch_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDK_PadMountSwitch/Pages/ErrorArchive/ErrorArchive_Detail.page */ 747)
let mdk_padmountswitch_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDK_PadMountSwitch/Pages/ErrorArchive/ErrorArchive_List.page */ 5450)
let mdk_padmountswitch_pages_main_page = __webpack_require__(/*! ./MDK_PadMountSwitch/Pages/Main.page */ 7328)
let mdk_padmountswitch_pages_pad_mount_switch_form_page = __webpack_require__(/*! ./MDK_PadMountSwitch/Pages/Pad_Mount_Switch_Form.page */ 4677)
let mdk_padmountswitch_pages_pad_mount_switch_inspection_page = __webpack_require__(/*! ./MDK_PadMountSwitch/Pages/Pad_Mount_Switch_Inspection.page */ 1461)
let mdk_padmountswitch_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK_PadMountSwitch/Rules/AppUpdateFailure.js */ 8375)
let mdk_padmountswitch_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK_PadMountSwitch/Rules/AppUpdateSuccess.js */ 5325)
let mdk_padmountswitch_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDK_PadMountSwitch/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ 4508)
let mdk_padmountswitch_rules_onwillupdate_js = __webpack_require__(/*! ./MDK_PadMountSwitch/Rules/OnWillUpdate.js */ 2358)
let mdk_padmountswitch_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK_PadMountSwitch/Rules/ResetAppSettingsAndLogout.js */ 7139)
let mdk_padmountswitch_services_sampleservicev2_service = __webpack_require__(/*! ./MDK_PadMountSwitch/Services/SampleServiceV2.service */ 7698)
let mdk_padmountswitch_styles_styles_css = __webpack_require__(/*! ./MDK_PadMountSwitch/Styles/Styles.css */ 3806)
let mdk_padmountswitch_styles_styles_less = __webpack_require__(/*! ./MDK_PadMountSwitch/Styles/Styles.less */ 955)
let mdk_padmountswitch_styles_styles_light_css = __webpack_require__(/*! ./MDK_PadMountSwitch/Styles/Styles.light.css */ 5062)
let mdk_padmountswitch_styles_styles_light_json = __webpack_require__(/*! ./MDK_PadMountSwitch/Styles/Styles.light.json */ 852)
let mdk_padmountswitch_styles_styles_light_nss = __webpack_require__(/*! ./MDK_PadMountSwitch/Styles/Styles.light.nss */ 7622)
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ 7775)
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ 292)

module.exports = {
	application_app : application_app,
	mdk_padmountswitch_actions_appupdate_action : mdk_padmountswitch_actions_appupdate_action,
	mdk_padmountswitch_actions_appupdatefailuremessage_action : mdk_padmountswitch_actions_appupdatefailuremessage_action,
	mdk_padmountswitch_actions_appupdateprogressbanner_action : mdk_padmountswitch_actions_appupdateprogressbanner_action,
	mdk_padmountswitch_actions_appupdatesuccessmessage_action : mdk_padmountswitch_actions_appupdatesuccessmessage_action,
	mdk_padmountswitch_actions_closepage_action : mdk_padmountswitch_actions_closepage_action,
	mdk_padmountswitch_actions_errorarchive_errorarchive_syncfailure_action : mdk_padmountswitch_actions_errorarchive_errorarchive_syncfailure_action,
	mdk_padmountswitch_actions_errorarchive_navtoerrorarchive_detail_action : mdk_padmountswitch_actions_errorarchive_navtoerrorarchive_detail_action,
	mdk_padmountswitch_actions_errorarchive_navtoerrorarchive_list_action : mdk_padmountswitch_actions_errorarchive_navtoerrorarchive_list_action,
	mdk_padmountswitch_actions_logout_action : mdk_padmountswitch_actions_logout_action,
	mdk_padmountswitch_actions_logoutmessage_action : mdk_padmountswitch_actions_logoutmessage_action,
	mdk_padmountswitch_actions_navtopad_mount_switch_form_action : mdk_padmountswitch_actions_navtopad_mount_switch_form_action,
	mdk_padmountswitch_actions_navtopad_mount_switch_inspection_action : mdk_padmountswitch_actions_navtopad_mount_switch_inspection_action,
	mdk_padmountswitch_actions_onwillupdate_action : mdk_padmountswitch_actions_onwillupdate_action,
	mdk_padmountswitch_actions_service_closeoffline_action : mdk_padmountswitch_actions_service_closeoffline_action,
	mdk_padmountswitch_actions_service_closeofflinefailuremessage_action : mdk_padmountswitch_actions_service_closeofflinefailuremessage_action,
	mdk_padmountswitch_actions_service_closeofflinesuccessmessage_action : mdk_padmountswitch_actions_service_closeofflinesuccessmessage_action,
	mdk_padmountswitch_actions_service_downloadoffline_action : mdk_padmountswitch_actions_service_downloadoffline_action,
	mdk_padmountswitch_actions_service_downloadstartedmessage_action : mdk_padmountswitch_actions_service_downloadstartedmessage_action,
	mdk_padmountswitch_actions_service_initializeoffline_action : mdk_padmountswitch_actions_service_initializeoffline_action,
	mdk_padmountswitch_actions_service_initializeofflinefailuremessage_action : mdk_padmountswitch_actions_service_initializeofflinefailuremessage_action,
	mdk_padmountswitch_actions_service_initializeofflinesuccessmessage_action : mdk_padmountswitch_actions_service_initializeofflinesuccessmessage_action,
	mdk_padmountswitch_actions_service_syncfailuremessage_action : mdk_padmountswitch_actions_service_syncfailuremessage_action,
	mdk_padmountswitch_actions_service_syncstartedmessage_action : mdk_padmountswitch_actions_service_syncstartedmessage_action,
	mdk_padmountswitch_actions_service_syncsuccessmessage_action : mdk_padmountswitch_actions_service_syncsuccessmessage_action,
	mdk_padmountswitch_actions_service_uploadoffline_action : mdk_padmountswitch_actions_service_uploadoffline_action,
	mdk_padmountswitch_globals_appdefinition_version_global : mdk_padmountswitch_globals_appdefinition_version_global,
	mdk_padmountswitch_i18n_i18n_properties : mdk_padmountswitch_i18n_i18n_properties,
	mdk_padmountswitch_jsconfig_json : mdk_padmountswitch_jsconfig_json,
	mdk_padmountswitch_pages_errorarchive_errorarchive_detail_page : mdk_padmountswitch_pages_errorarchive_errorarchive_detail_page,
	mdk_padmountswitch_pages_errorarchive_errorarchive_list_page : mdk_padmountswitch_pages_errorarchive_errorarchive_list_page,
	mdk_padmountswitch_pages_main_page : mdk_padmountswitch_pages_main_page,
	mdk_padmountswitch_pages_pad_mount_switch_form_page : mdk_padmountswitch_pages_pad_mount_switch_form_page,
	mdk_padmountswitch_pages_pad_mount_switch_inspection_page : mdk_padmountswitch_pages_pad_mount_switch_inspection_page,
	mdk_padmountswitch_rules_appupdatefailure_js : mdk_padmountswitch_rules_appupdatefailure_js,
	mdk_padmountswitch_rules_appupdatesuccess_js : mdk_padmountswitch_rules_appupdatesuccess_js,
	mdk_padmountswitch_rules_errorarchive_errorarchive_checkforsyncerror_js : mdk_padmountswitch_rules_errorarchive_errorarchive_checkforsyncerror_js,
	mdk_padmountswitch_rules_onwillupdate_js : mdk_padmountswitch_rules_onwillupdate_js,
	mdk_padmountswitch_rules_resetappsettingsandlogout_js : mdk_padmountswitch_rules_resetappsettingsandlogout_js,
	mdk_padmountswitch_services_sampleservicev2_service : mdk_padmountswitch_services_sampleservicev2_service,
	mdk_padmountswitch_styles_styles_css : mdk_padmountswitch_styles_styles_css,
	mdk_padmountswitch_styles_styles_less : mdk_padmountswitch_styles_styles_less,
	mdk_padmountswitch_styles_styles_light_css : mdk_padmountswitch_styles_styles_light_css,
	mdk_padmountswitch_styles_styles_light_json : mdk_padmountswitch_styles_styles_light_json,
	mdk_padmountswitch_styles_styles_light_nss : mdk_padmountswitch_styles_styles_light_nss,
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

/***/ 852:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/Styles/Styles.light.json ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ 6805:
/*!************************************************************!*\
  !*** ./build.definitions/MDK_PadMountSwitch/jsconfig.json ***!
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