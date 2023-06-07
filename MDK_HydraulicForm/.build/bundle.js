/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 518:
/*!******************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/i18n/i18n.properties ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ 7459:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Rules/AppUpdateFailure.js ***!
  \***********************************************************************/
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
    "Name": "/MDK_HydraulicForm/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ 4497:
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Rules/AppUpdateSuccess.js ***!
  \***********************************************************************/
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
        "Name": "/MDK_HydraulicForm/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK_HydraulicForm/Actions/AppUpdateSuccessMessage.action",
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

/***/ 5960:
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \**************************************************************************************************/
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
  context.count('/MDK_HydraulicForm/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/MDK_HydraulicForm/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ 8650:
/*!*******************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Rules/OnWillUpdate.js ***!
  \*******************************************************************/
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
  return clientAPI.executeAction('/MDK_HydraulicForm/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_HydraulicForm/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ 3488:
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Rules/OpenAerialLift.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenAerialLift)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OpenAerialLift(clientAPI) {}

/***/ }),

/***/ 9387:
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Rules/ResetAppSettingsAndLogout.js ***!
  \********************************************************************************/
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
    return context.getPageProxy().executeAction('/MDK_HydraulicForm/Actions/Logout.action');
  }
}

/***/ }),

/***/ 630:
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Rules/ShowAerialLiftForm.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowAerialLiftForm)
/* harmony export */ });
function ShowAerialLiftForm(context) {
  var switchControl = context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch0/#Value');
  if (switchControl) {
    // turn off derrick digger switch
    context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch1').setValue(false);

    // hide derrick digger section
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerControls').setVisible(false);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerBooms').setVisible(false);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerOther').setVisible(false);

    // show aerial lift section
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftControls').setVisible(true);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftBooms').setVisible(true);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftStructural').setVisible(true);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftOther').setVisible(true);
  } else {
    // turn on derrick digger switch
    context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch1').setValue(true);

    // show derrick digger section
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerControls').setVisible(true);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerBooms').setVisible(true);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerOther').setVisible(true);

    // hide aerial lift section
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftControls').setVisible(false);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftBooms').setVisible(false);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftStructural').setVisible(false);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftOther').setVisible(false);
  }
}

/***/ }),

/***/ 7897:
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Rules/ShowDerrickDiggerForm.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowDerrickDiggerForm)
/* harmony export */ });
function ShowDerrickDiggerForm(context) {
  var switchControl = context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch1/#Value');
  if (switchControl) {
    // turn off aerial lift switch
    context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch0').setValue(false);

    // hide aerial lift section
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftControls').setVisible(false);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftBooms').setVisible(false);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftStructural').setVisible(false);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftOther').setVisible(false);

    // show derrick digger section
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerControls').setVisible(true);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerBooms').setVisible(true);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerOther').setVisible(true);
  } else {
    // turn on aerial lift switch
    context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch0').setValue(true);

    // show aerial lift section
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftControls').setVisible(true);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftBooms').setVisible(true);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftStructural').setVisible(true);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftOther').setVisible(true);

    // hide derrick digger section
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerControls').setVisible(false);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerBooms').setVisible(false);
    context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerOther').setVisible(false);
  }
}

/***/ }),

/***/ 7792:
/*!***************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Styles/Styles.css ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_HydraulicForm/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 9825:
/*!****************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Styles/Styles.less ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDK_HydraulicForm/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 5347:
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Styles/Styles.light.css ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 193:
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Styles/Styles.light.nss ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
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

/***/ 4716:
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ 6358:
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDK_HydraulicForm/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MDK_HydraulicForm/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ 7552:
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Pages/Hydraulic_Inspection_Form.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker2","IsEditable":false,"IsVisible":true,"Separator":true,"Caption":"Date","Mode":"Datetime"},{"Value":"XXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":false,"IsVisible":true,"Separator":true,"Caption":"Windows ID","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"XXXXXXXXXXXX","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":false,"IsVisible":true,"Separator":true,"Caption":"Machine ID","PlaceHolder":"PlaceHolder","Enabled":true}],"Header":{"_Name":"SectionHeader15","AccessoryType":"none","UseTopPadding":true,"Caption":"Vehicle Inspection"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":true,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Daily Check Sheet - Aerial Lift","OnValueChange":"/MDK_HydraulicForm/Rules/ShowAerialLiftForm.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Daily Check Sheet - Derrick Digger","OnValueChange":"/MDK_HydraulicForm/Rules/ShowDerrickDiggerForm.js"}],"Header":{"_Name":"SectionHeader13","AccessoryType":"none","UseTopPadding":true,"Caption":"Inspection Type"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SFCInspectionType"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true},"KeyAndValues":[{"Value":"Please enter corresponding if not satisfactory","_Name":"KeyValue0","KeyName":"Status Codes","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"1. Outrigger Controls / Stabilizer (Truck w/o Outrigger)"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"2. Lower Control System and Tool Circuit"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch7","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"3. Test Override - Lower"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker5","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch8","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"4. Upper Control System and Tool Circuit"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker6","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch9","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"5. Test Hydraulic Dump Valve-Basket"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker7","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch10","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"6. Test Emergency Power (Electric Drive)"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker8","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]}],"Header":{"_Name":"SectionHeader1","AccessoryType":"none","UseTopPadding":true,"Caption":"Controls"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SFCAerialLiftControls"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"7. Fiberglass Boom / Insert"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker4","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch11","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"8. Bucket /mounting"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker9","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch12","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"9. Drive cables/linkage"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker10","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch13","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"10. Leveling cables/rods & chains"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker11","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch14","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"11. Test pilot operated check valves"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker12","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]}],"Header":{"_Name":"SectionHeader4","AccessoryType":"none","UseTopPadding":true,"Caption":"Booms"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SFCAerialLiftBooms"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch15","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"12. Visual check of welds"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker13","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch16","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"13. Visual check of all pins"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker14","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch17","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"14. Visual check of all cylinders"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker15","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch18","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"15. Visual check of rotation drive"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker16","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]}],"Header":{"_Name":"SectionHeader5","AccessoryType":"none","UseTopPadding":true,"Caption":"Structural"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SFCAerialLiftStructural"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch19","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"16. Lifting jib/pole"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker17","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch20","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"17. Material handling"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker18","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch22","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"18. Scuff pads"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker19","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch23","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"19. Boom/brake"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker20","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch24","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"20. Test micro brake"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker21","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch27","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"21. Check hydraulic fluid"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker22","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch26","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"22. Lubricate machine per chart"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker23","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch25","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"23. Fiberglass booms & basket cleaned"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker24","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch21","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"24. Out of service"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker25","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]}],"Header":{"_Name":"SectionHeader6","AccessoryType":"none","UseTopPadding":true,"Caption":"Other"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SFCAerialLiftOther"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"1. Outrigger Controls and Toll Circuit"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker2","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"2. Outriggers"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker3","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch28","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"3. Control Valves"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker26","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]}],"Header":{"_Name":"SectionHeader2","AccessoryType":"none","UseTopPadding":true,"Caption":"Controls"},"Visible":false,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SFCDerrickDiggerControls"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch52","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"4. Main Booms"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker50","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch53","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"5. Intermidiate"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker51","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch54","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"6. Extension Booms"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker52","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]}],"Header":{"_Name":"SectionHeader10","AccessoryType":"none","UseTopPadding":true,"Caption":"Booms"},"Visible":false,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SFCDerrickDiggerBooms"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch55","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"7. Pole Jack"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker53","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch56","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"8. Hydraulic Fluid Level"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker54","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch57","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"9. Pin on bucket"},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker55","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Status Code","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]}],"Header":{"_Name":"SectionHeader11","AccessoryType":"none","UseTopPadding":true,"Caption":"Other"},"Visible":false,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SFCDerrickDiggerOther"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote0","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader14","AccessoryType":"none","UseTopPadding":true,"Caption":"Operator/Inspector Comments"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Date Fire Extinguisher Check","Mode":"Datetime"},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Date Last DI-Electric Test","Mode":"Datetime"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch58","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Tire Pressure Check"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Vehicle Number","Enabled":true},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker56","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Office Location","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]},{"Value":[],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker57","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Work Shift Hours","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true},"KeyAndValues":[],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}]}],"_Type":"Page","_Name":"Hydraulic_Inspection_Form","Caption":"Hydraulic Inspection Form","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/MDK_HydraulicForm/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true}],"_Name":"ActionBar1"}}

/***/ }),

/***/ 4078:
/*!*************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Pages/Main.page ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Hydraulic Inspection Form","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDK_HydraulicForm/Actions/NavToHydraulic_Inpection_Form.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MDK_HydraulicForm/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_HydraulicForm/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_HydraulicForm/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ 3768:
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK_HydraulicForm","Version":"/MDK_HydraulicForm/Globals/AppDefinition_Version.global","MainPage":"/MDK_HydraulicForm/Pages/Main.page","OnLaunch":["/MDK_HydraulicForm/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MDK_HydraulicForm/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK_HydraulicForm/Actions/Service/InitializeOffline.action","Styles":"/MDK_HydraulicForm/Styles/Styles.css","Localization":"/MDK_HydraulicForm/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDK_HydraulicForm/Styles/Styles.light.css","ios":"/MDK_HydraulicForm/Styles/Styles.light.nss","android":"/MDK_HydraulicForm/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/MDK_HydraulicForm/Styles/Styles.light.nss","android":"/MDK_HydraulicForm/Styles/Styles.light.json"}}

/***/ }),

/***/ 6813:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/AppUpdate.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK_HydraulicForm/Rules/AppUpdateFailure.js","OnSuccess":"/MDK_HydraulicForm/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ 209:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/AppUpdateFailureMessage.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 2110:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/AppUpdateProgressBanner.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK_HydraulicForm/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 8400:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/AppUpdateSuccessMessage.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 2138:
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/CloseModalPage_Cancel.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Cancel"},"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true}

/***/ }),

/***/ 3158:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/ClosePage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ 8095:
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDK_HydraulicForm/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ 9388:
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_HydraulicForm/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ 8795:
/*!************************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_HydraulicForm/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ 5313:
/*!*******************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Logout.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ 3348:
/*!**************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/LogoutMessage.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK_HydraulicForm/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ 449:
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/NavToHydraulic_Inpection_Form.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToHydraulic_Inpection_Form"},"PageToOpen":"/MDK_HydraulicForm/Pages/Hydraulic_Inspection_Form.page","ModalPage":true}

/***/ }),

/***/ 3937:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/NavToMain.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToMain"},"PageToOpen":"/MDK_HydraulicForm/Pages/Main.page"}

/***/ }),

/***/ 827:
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/OnWillUpdate.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ 4844:
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/CloseOffline.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDK_HydraulicForm/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDK_HydraulicForm/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDK_HydraulicForm/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ 6971:
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/CloseOfflineFailureMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 3984:
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 368:
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/DownloadOffline.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_HydraulicForm/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDK_HydraulicForm/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MDK_HydraulicForm/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ 7460:
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/DownloadStartedMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDK_HydraulicForm/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 5331:
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/InitializeOffline.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_HydraulicForm/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MDK_HydraulicForm/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MDK_HydraulicForm/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ 7710:
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 3068:
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 7185:
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/SyncFailureMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 4180:
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/SyncStartedMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDK_HydraulicForm/Actions/Service/UploadOffline.action","OnFailure":"/MDK_HydraulicForm/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 7987:
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/SyncSuccessMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 581:
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Actions/Service/UploadOffline.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_HydraulicForm/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDK_HydraulicForm/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MDK_HydraulicForm/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ 1911:
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Globals/AppDefinition_Version.global ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ 5226:
/*!******************************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Services/SampleServiceV2.service ***!
  \******************************************************************************/
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
let mdk_hydraulicform_actions_appupdate_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/AppUpdate.action */ 6813)
let mdk_hydraulicform_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/AppUpdateFailureMessage.action */ 209)
let mdk_hydraulicform_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/AppUpdateProgressBanner.action */ 2110)
let mdk_hydraulicform_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/AppUpdateSuccessMessage.action */ 8400)
let mdk_hydraulicform_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/CloseModalPage_Cancel.action */ 2138)
let mdk_hydraulicform_actions_closepage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/ClosePage.action */ 3158)
let mdk_hydraulicform_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ 8095)
let mdk_hydraulicform_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ 9388)
let mdk_hydraulicform_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/ErrorArchive/NavToErrorArchive_List.action */ 8795)
let mdk_hydraulicform_actions_logout_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Logout.action */ 5313)
let mdk_hydraulicform_actions_logoutmessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/LogoutMessage.action */ 3348)
let mdk_hydraulicform_actions_navtohydraulic_inpection_form_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/NavToHydraulic_Inpection_Form.action */ 449)
let mdk_hydraulicform_actions_navtomain_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/NavToMain.action */ 3937)
let mdk_hydraulicform_actions_onwillupdate_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/OnWillUpdate.action */ 827)
let mdk_hydraulicform_actions_service_closeoffline_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/CloseOffline.action */ 4844)
let mdk_hydraulicform_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/CloseOfflineFailureMessage.action */ 6971)
let mdk_hydraulicform_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/CloseOfflineSuccessMessage.action */ 3984)
let mdk_hydraulicform_actions_service_downloadoffline_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/DownloadOffline.action */ 368)
let mdk_hydraulicform_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/DownloadStartedMessage.action */ 7460)
let mdk_hydraulicform_actions_service_initializeoffline_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/InitializeOffline.action */ 5331)
let mdk_hydraulicform_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/InitializeOfflineFailureMessage.action */ 7710)
let mdk_hydraulicform_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/InitializeOfflineSuccessMessage.action */ 3068)
let mdk_hydraulicform_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/SyncFailureMessage.action */ 7185)
let mdk_hydraulicform_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/SyncStartedMessage.action */ 4180)
let mdk_hydraulicform_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/SyncSuccessMessage.action */ 7987)
let mdk_hydraulicform_actions_service_uploadoffline_action = __webpack_require__(/*! ./MDK_HydraulicForm/Actions/Service/UploadOffline.action */ 581)
let mdk_hydraulicform_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK_HydraulicForm/Globals/AppDefinition_Version.global */ 1911)
let mdk_hydraulicform_i18n_i18n_properties = __webpack_require__(/*! ./MDK_HydraulicForm/i18n/i18n.properties */ 518)
let mdk_hydraulicform_jsconfig_json = __webpack_require__(/*! ./MDK_HydraulicForm/jsconfig.json */ 859)
let mdk_hydraulicform_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDK_HydraulicForm/Pages/ErrorArchive/ErrorArchive_Detail.page */ 4716)
let mdk_hydraulicform_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDK_HydraulicForm/Pages/ErrorArchive/ErrorArchive_List.page */ 6358)
let mdk_hydraulicform_pages_hydraulic_inspection_form_page = __webpack_require__(/*! ./MDK_HydraulicForm/Pages/Hydraulic_Inspection_Form.page */ 7552)
let mdk_hydraulicform_pages_main_page = __webpack_require__(/*! ./MDK_HydraulicForm/Pages/Main.page */ 4078)
let mdk_hydraulicform_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK_HydraulicForm/Rules/AppUpdateFailure.js */ 7459)
let mdk_hydraulicform_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK_HydraulicForm/Rules/AppUpdateSuccess.js */ 4497)
let mdk_hydraulicform_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDK_HydraulicForm/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ 5960)
let mdk_hydraulicform_rules_onwillupdate_js = __webpack_require__(/*! ./MDK_HydraulicForm/Rules/OnWillUpdate.js */ 8650)
let mdk_hydraulicform_rules_openaeriallift_js = __webpack_require__(/*! ./MDK_HydraulicForm/Rules/OpenAerialLift.js */ 3488)
let mdk_hydraulicform_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK_HydraulicForm/Rules/ResetAppSettingsAndLogout.js */ 9387)
let mdk_hydraulicform_rules_showaerialliftform_js = __webpack_require__(/*! ./MDK_HydraulicForm/Rules/ShowAerialLiftForm.js */ 630)
let mdk_hydraulicform_rules_showderrickdiggerform_js = __webpack_require__(/*! ./MDK_HydraulicForm/Rules/ShowDerrickDiggerForm.js */ 7897)
let mdk_hydraulicform_services_sampleservicev2_service = __webpack_require__(/*! ./MDK_HydraulicForm/Services/SampleServiceV2.service */ 5226)
let mdk_hydraulicform_styles_styles_css = __webpack_require__(/*! ./MDK_HydraulicForm/Styles/Styles.css */ 7792)
let mdk_hydraulicform_styles_styles_less = __webpack_require__(/*! ./MDK_HydraulicForm/Styles/Styles.less */ 9825)
let mdk_hydraulicform_styles_styles_light_css = __webpack_require__(/*! ./MDK_HydraulicForm/Styles/Styles.light.css */ 5347)
let mdk_hydraulicform_styles_styles_light_json = __webpack_require__(/*! ./MDK_HydraulicForm/Styles/Styles.light.json */ 6693)
let mdk_hydraulicform_styles_styles_light_nss = __webpack_require__(/*! ./MDK_HydraulicForm/Styles/Styles.light.nss */ 193)
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ 7775)
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ 3405)

module.exports = {
	application_app : application_app,
	mdk_hydraulicform_actions_appupdate_action : mdk_hydraulicform_actions_appupdate_action,
	mdk_hydraulicform_actions_appupdatefailuremessage_action : mdk_hydraulicform_actions_appupdatefailuremessage_action,
	mdk_hydraulicform_actions_appupdateprogressbanner_action : mdk_hydraulicform_actions_appupdateprogressbanner_action,
	mdk_hydraulicform_actions_appupdatesuccessmessage_action : mdk_hydraulicform_actions_appupdatesuccessmessage_action,
	mdk_hydraulicform_actions_closemodalpage_cancel_action : mdk_hydraulicform_actions_closemodalpage_cancel_action,
	mdk_hydraulicform_actions_closepage_action : mdk_hydraulicform_actions_closepage_action,
	mdk_hydraulicform_actions_errorarchive_errorarchive_syncfailure_action : mdk_hydraulicform_actions_errorarchive_errorarchive_syncfailure_action,
	mdk_hydraulicform_actions_errorarchive_navtoerrorarchive_detail_action : mdk_hydraulicform_actions_errorarchive_navtoerrorarchive_detail_action,
	mdk_hydraulicform_actions_errorarchive_navtoerrorarchive_list_action : mdk_hydraulicform_actions_errorarchive_navtoerrorarchive_list_action,
	mdk_hydraulicform_actions_logout_action : mdk_hydraulicform_actions_logout_action,
	mdk_hydraulicform_actions_logoutmessage_action : mdk_hydraulicform_actions_logoutmessage_action,
	mdk_hydraulicform_actions_navtohydraulic_inpection_form_action : mdk_hydraulicform_actions_navtohydraulic_inpection_form_action,
	mdk_hydraulicform_actions_navtomain_action : mdk_hydraulicform_actions_navtomain_action,
	mdk_hydraulicform_actions_onwillupdate_action : mdk_hydraulicform_actions_onwillupdate_action,
	mdk_hydraulicform_actions_service_closeoffline_action : mdk_hydraulicform_actions_service_closeoffline_action,
	mdk_hydraulicform_actions_service_closeofflinefailuremessage_action : mdk_hydraulicform_actions_service_closeofflinefailuremessage_action,
	mdk_hydraulicform_actions_service_closeofflinesuccessmessage_action : mdk_hydraulicform_actions_service_closeofflinesuccessmessage_action,
	mdk_hydraulicform_actions_service_downloadoffline_action : mdk_hydraulicform_actions_service_downloadoffline_action,
	mdk_hydraulicform_actions_service_downloadstartedmessage_action : mdk_hydraulicform_actions_service_downloadstartedmessage_action,
	mdk_hydraulicform_actions_service_initializeoffline_action : mdk_hydraulicform_actions_service_initializeoffline_action,
	mdk_hydraulicform_actions_service_initializeofflinefailuremessage_action : mdk_hydraulicform_actions_service_initializeofflinefailuremessage_action,
	mdk_hydraulicform_actions_service_initializeofflinesuccessmessage_action : mdk_hydraulicform_actions_service_initializeofflinesuccessmessage_action,
	mdk_hydraulicform_actions_service_syncfailuremessage_action : mdk_hydraulicform_actions_service_syncfailuremessage_action,
	mdk_hydraulicform_actions_service_syncstartedmessage_action : mdk_hydraulicform_actions_service_syncstartedmessage_action,
	mdk_hydraulicform_actions_service_syncsuccessmessage_action : mdk_hydraulicform_actions_service_syncsuccessmessage_action,
	mdk_hydraulicform_actions_service_uploadoffline_action : mdk_hydraulicform_actions_service_uploadoffline_action,
	mdk_hydraulicform_globals_appdefinition_version_global : mdk_hydraulicform_globals_appdefinition_version_global,
	mdk_hydraulicform_i18n_i18n_properties : mdk_hydraulicform_i18n_i18n_properties,
	mdk_hydraulicform_jsconfig_json : mdk_hydraulicform_jsconfig_json,
	mdk_hydraulicform_pages_errorarchive_errorarchive_detail_page : mdk_hydraulicform_pages_errorarchive_errorarchive_detail_page,
	mdk_hydraulicform_pages_errorarchive_errorarchive_list_page : mdk_hydraulicform_pages_errorarchive_errorarchive_list_page,
	mdk_hydraulicform_pages_hydraulic_inspection_form_page : mdk_hydraulicform_pages_hydraulic_inspection_form_page,
	mdk_hydraulicform_pages_main_page : mdk_hydraulicform_pages_main_page,
	mdk_hydraulicform_rules_appupdatefailure_js : mdk_hydraulicform_rules_appupdatefailure_js,
	mdk_hydraulicform_rules_appupdatesuccess_js : mdk_hydraulicform_rules_appupdatesuccess_js,
	mdk_hydraulicform_rules_errorarchive_errorarchive_checkforsyncerror_js : mdk_hydraulicform_rules_errorarchive_errorarchive_checkforsyncerror_js,
	mdk_hydraulicform_rules_onwillupdate_js : mdk_hydraulicform_rules_onwillupdate_js,
	mdk_hydraulicform_rules_openaeriallift_js : mdk_hydraulicform_rules_openaeriallift_js,
	mdk_hydraulicform_rules_resetappsettingsandlogout_js : mdk_hydraulicform_rules_resetappsettingsandlogout_js,
	mdk_hydraulicform_rules_showaerialliftform_js : mdk_hydraulicform_rules_showaerialliftform_js,
	mdk_hydraulicform_rules_showderrickdiggerform_js : mdk_hydraulicform_rules_showderrickdiggerform_js,
	mdk_hydraulicform_services_sampleservicev2_service : mdk_hydraulicform_services_sampleservicev2_service,
	mdk_hydraulicform_styles_styles_css : mdk_hydraulicform_styles_styles_css,
	mdk_hydraulicform_styles_styles_less : mdk_hydraulicform_styles_styles_less,
	mdk_hydraulicform_styles_styles_light_css : mdk_hydraulicform_styles_styles_light_css,
	mdk_hydraulicform_styles_styles_light_json : mdk_hydraulicform_styles_styles_light_json,
	mdk_hydraulicform_styles_styles_light_nss : mdk_hydraulicform_styles_styles_light_nss,
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

/***/ 6693:
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/Styles/Styles.light.json ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ 859:
/*!***********************************************************!*\
  !*** ./build.definitions/MDK_HydraulicForm/jsconfig.json ***!
  \***********************************************************/
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