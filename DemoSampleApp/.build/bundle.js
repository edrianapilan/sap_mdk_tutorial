/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 2255:
/*!**************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/i18n/i18n.properties ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ 2284:
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/AppUpdateFailure.js ***!
  \*******************************************************************/
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
    "Name": "/DemoSampleApp/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ 6154:
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/AppUpdateSuccess.js ***!
  \*******************************************************************/
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
        "Name": "/DemoSampleApp/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/DemoSampleApp/Actions/AppUpdateSuccessMessage.action",
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

/***/ 6065:
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Customers_DeleteConfirmation.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Customers_DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function Customers_DeleteConfirmation(context) {
  return context.executeAction('/DemoSampleApp/Actions/Customers_DeleteConfirmation.action').then(result => {
    if (result.data) {
      return context.executeAction('/DemoSampleApp/Actions/Customers_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ 8159:
/*!***********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Customers_OrderCount.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomerOrderCount)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function CustomerOrderCount(context) {
  //The following currentCustomer will retrieve the current customer record
  const currentCustomer = context.getPageProxy().binding.CustomerId;
  //The following expression will retrieve the total count of the orders for a given customer
  return context.count('/DemoSampleApp/Services/SampleServiceV2.service', 'SalesOrderHeaders', `$filter=CustomerId eq '${currentCustomer}'`).then(count => {
    return count;
  });
}

/***/ }),

/***/ 5605:
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/EmailValidation.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EmailValidation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function EmailValidation(context) {
  //The following evaluateTargetPath will retrieve the current value of the email control
  if (context.evaluateTargetPath('#Control:FCEmail/#Value').indexOf('@') === -1) {
    //If email value does not contain @ display a validation failure message to the end-user
    context.executeAction('/DemoSampleApp/Actions/ValidationFailure.action');
  } else {
    //If @ is present in the email value, return true to indicate validation is successful
    return true;
  }
}

/***/ }),

/***/ 3452:
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \**********************************************************************************************/
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
  context.count('/DemoSampleApp/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ 3926:
/*!***************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/OnWillUpdate.js ***!
  \***************************************************************/
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
  return clientAPI.executeAction('/DemoSampleApp/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/DemoSampleApp/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ 6773:
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/ResetAppSettingsAndLogout.js ***!
  \****************************************************************************/
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
    return context.getPageProxy().executeAction('/DemoSampleApp/Actions/Logout.action');
  }
}

/***/ }),

/***/ 6356:
/*!***********************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.css ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/DemoSampleApp/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 1011:
/*!************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.less ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ 8899);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ 4308);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/DemoSampleApp/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 2291:
/*!*****************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.light.css ***!
  \*****************************************************************/
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

/***/ 6751:
/*!*****************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.light.nss ***!
  \*****************************************************************/
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

/***/ 8770:
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_Create.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.FormCellContainer","_Name":"FormCellContainer0","Sections":[{"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateFirstName","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"First Name","PlaceHolder":"Enter Value","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateLastName","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Last Name","PlaceHolder":"Enter Value","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreatePhone","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Phone","PlaceHolder":"Enter Value","KeyboardType":"Phone","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateEmail","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Email","PlaceHolder":"Enter Value","KeyboardType":"Email","Enabled":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCCreateDOB","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"DOB","Mode":"Datetime"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Caption"},{"Value":["Two"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Choose Single","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["One","Two","Three"]}],"Visible":true}]}],"_Type":"Page","_Name":"Customers_Create","Caption":"Create Customer","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/Customers_CreateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ 9955:
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_Detail.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"{FirstName}","Footnote":"{EmailAddress}","Description":"{CustomerId}","StatusText":"{PhoneNumber}","DetailImage":"sap-icon://customer","DetailImageIsCircular":false,"BodyText":"{DateOfBirth}","HeadlineText":"{LastName}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true},"KeyAndValues":[{"Value":"{HouseNumber} {Street}","_Name":"KeyValue0","KeyName":"Address","Visible":true},{"Value":"{City}","_Name":"KeyValue1","KeyName":"City","Visible":true},{"Value":"{PostalCode}","_Name":"KeyValue2","KeyName":"Postal Code","Visible":true},{"Value":"{Country}","_Name":"KeyValue3","KeyName":"Country","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}},{"Header":{"_Name":"SectionHeader0","AccessoryType":"none","UseTopPadding":true,"Caption":"Customer Orders"},"Footer":{"_Name":"SectionFooter0","Caption":"See All","AttributeLabel":"/DemoSampleApp/Rules/Customers_OrderCount.js","AccessoryType":"disclosureIndicator","FooterStyle":"attribute","Visible":true,"OnPress":"/DemoSampleApp/Actions/NavToCustomers_Orders.action","UseBottomPadding":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","DataSubscriptions":["SalesOrderHeaders"],"Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"{@odata.readLink}/SalesOrders","QueryOptions":"$top=5&$orderby=CreatedAt desc"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"Caption":"No Customer Orders Found","FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{SalesOrderId}","Subhead":"$(D,{CreatedAt},'','',{format:'medium'})","DisplayDescriptionInMobile":true,"StatusText":"$(C,{GrossAmount},{CurrencyCode},'',{maximumFractionDigits:2,useGrouping:true})","SubstatusText":"{CurrencyCode}","PreserveIconStackSpacing":false,"AccessoryType":"disclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"OnPress":"/DemoSampleApp/Actions/NavToSalesOrders_Details.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"DesignTimeTarget":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers"},"_Type":"Page","_Name":"Customers_Detail","Caption":"Details","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/NavToCustomers_Edit.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Trash","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Rules/Customers_DeleteConfirmation.js"}],"_Name":"ActionBar1"},"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"ToolbarItem0","Caption":"Create Order","Enabled":true,"Visible":true,"Clickable":true,"Style":"","OnPress":"/DemoSampleApp/Actions/NavToSalesOrderHeaders_Create.action"}]}}

/***/ }),

/***/ 4342:
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_Edit.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.FormCellContainer","_Name":"FormCellContainer0","Sections":[{"Controls":[{"Value":"{FirstName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCFirstName","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"First Name","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{LastName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCLastName","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Last Name","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCPhone","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Phone","PlaceHolder":"PlaceHolder","KeyboardType":"Phone","Enabled":true},{"Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCEmail","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Email","PlaceHolder":"PlaceHolder","KeyboardType":"Email","Enabled":true}],"Visible":true}]}],"_Type":"Page","_Name":"Customers_Edit","Caption":"Update Customer","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/Customers_UpdateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ 7857:
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_List.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ContactCell","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":"$orderby=LastName"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"ContactCell":{"ContextMenu":{"PerformFirstActionWithFullSwipe":true,"Items":[]},"DetailImage":"","Headline":"{LastName}","Subheadline":"{FirstName}","Description":"City {City}","OnPress":"/DemoSampleApp/Actions/NavToCustomers_Detail.action","ActivityItems":[{"_Name":"SectionContactCell0ActivityItems0","ActivityType":"Phone","ActivityValue":"{PhoneNumber}"},{"_Name":"SectionContactCell0ActivityItems1","ActivityType":"Email","ActivityValue":"{EmailAddress}"}]},"Search":{"Enabled":true,"BarcodeScanner":true}}]}],"_Type":"Page","_Name":"Customers_List","Caption":"Customers","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Add","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/NavToCustomers_Create.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ 8621:
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_Orders.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"SalesOrderHeaders","QueryOptions":"$filter=CustomerId eq '{CustomerId}'&$orderby=CreatedAt desc"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"Caption":"No Orders Found","FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"ObjectCell":{"Title":"{SalesOrderId}","Subhead":"{CustomerId}","Description":"$(D,{CreatedAt},'','',{format:'medium'})","DisplayDescriptionInMobile":true,"StatusText":"$(C,{GrossAmount},{CurrencyCode},'',{maximumFractionDigits:2,useGrouping:true})","SubstatusText":"{LifeCycleStatusName}","PreserveIconStackSpacing":false,"AccessoryType":"disclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"OnPress":"/DemoSampleApp/Actions/NavToSalesOrders_Details.action","Selected":false,"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true}},"Search":{"Enabled":true,"BarcodeScanner":true},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"Customers_Orders","Caption":"Customer Orders","PrefersLargeCaption":true}

/***/ }),

/***/ 3737:
/*!*************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ 5654:
/*!***********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ 237:
/*!*********************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Main.page ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Customers","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://customer","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/NavToCustomers_List.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/DemoSampleApp/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/DemoSampleApp/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/DemoSampleApp/Actions/AppUpdateProgressBanner.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"ToolbarItem0","Caption":"Upload Logs","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"Style":"","OnPress":"/DemoSampleApp/Actions/LogUpload.action"}]}}

/***/ }),

/***/ 7146:
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/SalesOrderHeaders_Create.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.FormCellContainer","_Name":"FormCellContainer0","Sections":[{"Controls":[{"Value":"EUR","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateCurrencyCode","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Currency Code","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"18.010","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateNetAmount","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Net Amount","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"108.010","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateTaxAmount","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Tax Amount","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"126.02","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateGrossAmount","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Gross Amount","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"N","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateLifeCycleStatus","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Lifecycle Status","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"New","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateLifeCycleStatusName","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Lifecycle Status Name","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCCreatedate","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Creation Date","Mode":"Datetime"}],"Visible":true}],"LoadingIndicator":{"Enabled":false,"Text":""}}],"_Type":"Page","_Name":"SalesOrderHeaders_Create","Caption":"Create Order","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/SalesOrderHeaders_CreateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ 5812:
/*!************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/SalesOrders_Details.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true},"KeyAndValues":[{"Value":"{SalesOrderId}","_Name":"KeyValue0","KeyName":"Order Number","Visible":true},{"Value":"{LifeCycleStatusName}","_Name":"KeyValue1","KeyName":"Status","Visible":true},{"Value":"$(D,{CreatedAt},'','',{format:'medium'})","_Name":"KeyValue2","KeyName":"Created At","Visible":true},{"Value":"$(C,{NetAmount},{CurrencyCode},'',{maximumFractionDigits:2,useGrouping:true})","_Name":"KeyValue3","KeyName":"Net Amount","Visible":true},{"Value":"$(C,{TaxAmount},{CurrencyCode},'',{maximumFractionDigits:2,useGrouping:true})","_Name":"KeyValue4","KeyName":"Tax Amount","Visible":true},{"Value":"$(C,{GrossAmount},{CurrencyCode},'',{maximumFractionDigits:2,useGrouping:true})","_Name":"KeyValue5","KeyName":"Total Amount","Visible":true}],"MaxItemCount":1,"Layout":{"NumberOfColumns":2}}]}],"_Type":"Page","_Name":"SalesOrders_Details","Caption":"Order Details","PrefersLargeCaption":true,"DesignTimeTarget":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"SalesOrderHeaders"}}

/***/ }),

/***/ 3768:
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"DemoSampleApp","Version":"/DemoSampleApp/Globals/AppDefinition_Version.global","MainPage":"/DemoSampleApp/Pages/Main.page","OnLaunch":["/DemoSampleApp/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/DemoSampleApp/Rules/OnWillUpdate.js","OnDidUpdate":"/DemoSampleApp/Actions/Service/InitializeOffline.action","Styles":"/DemoSampleApp/Styles/Styles.css","Localization":"/DemoSampleApp/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/DemoSampleApp/Styles/Styles.light.css","ios":"/DemoSampleApp/Styles/Styles.light.nss","android":"/DemoSampleApp/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/DemoSampleApp/Styles/Styles.light.nss","android":"/DemoSampleApp/Styles/Styles.light.json"}}

/***/ }),

/***/ 3971:
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/AppUpdate.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/DemoSampleApp/Rules/AppUpdateFailure.js","OnSuccess":"/DemoSampleApp/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ 5407:
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/AppUpdateFailureMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 6133:
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/AppUpdateProgressBanner.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/DemoSampleApp/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 2057:
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/AppUpdateSuccessMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 5070:
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Cancel"},"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true}

/***/ }),

/***/ 8433:
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CloseModalPage_Complete.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Complete"},"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false}

/***/ }),

/***/ 8692:
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ClosePage.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ 7967:
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"CreateCustomerEntityFailureMessage"},"Message":"Failed to Create Customer record - {#ActionResults:Customers_CreateEntity/error}","Title":"Create Customer","OKCaption":"OK"}

/***/ }),

/***/ 632:
/*!***************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CreateSalesOrderHeaderEntityFailureMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"CreateSalesOrderHeaderEntityFailureMessage"},"Message":"Failed to Create Sales Order record - {#ActionResults:SalesOrderHeaders_CreateEntity/error}","Title":"Create Sales Order","OKCaption":"OK"}

/***/ }),

/***/ 3385:
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers_CreateEntity.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"Customers_CreateEntity"},"OnFailure":"/DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action","OnSuccess":"/DemoSampleApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers"},"Properties":{"DateOfBirth":"#Control:FCCreateDOB/#Value","EmailAddress":"#Control:FCCreateEmail/#Value","FirstName":"#Control:FCCreateFirstName/#Value","LastName":"#Control:FCCreateLastName/#Value","PhoneNumber":"#Control:FCCreatePhone/#Value"}}

/***/ }),

/***/ 7106:
/*!*************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers_DeleteConfirmation.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"Customers_DeleteConfirmation"},"Message":"Delete current entity?","Title":"Delete Confirmation","OKCaption":"OK","CancelCaption":"Cancel"}

/***/ }),

/***/ 948:
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers_DeleteEntity.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DeleteEntity","ActionResult":{"_Name":"Customers_DeleteEntity"},"OnFailure":"/DemoSampleApp/Actions/DeleteCustomerEntityFailureMessage.action","OnSuccess":"/DemoSampleApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers","ReadLink":"{@odata.readLink}"}}

/***/ }),

/***/ 3570:
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers_UpdateEntity.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"Customers_UpdateEntity"},"OnFailure":"/DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action","OnSuccess":"/DemoSampleApp/Actions/CloseModalPage_Complete.action","ValidationRule":"/DemoSampleApp/Rules/EmailValidation.js","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers","ReadLink":"{@odata.readLink}"},"Properties":{"EmailAddress":"#Control:FCEmail/#Value","FirstName":"#Control:FCFirstName/#Value","LastName":"#Control:FCLastName/#Value","PhoneNumber":"#Control:FCPhone/#Value"}}

/***/ }),

/***/ 9503:
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/DeleteCustomerEntityFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"DeleteCustomerEntityFailureMessage"},"Message":"Delete entity failure - {#ActionResults:Customers_DeleteEntity/error}","Title":"Delete Customer","OKCaption":"OK"}

/***/ }),

/***/ 958:
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ 7210:
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ 4136:
/*!********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ 8215:
/*!********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/LogSetLevel.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logger.SetLevel","ActionResult":{"_Name":"LogSetLevel"},"Level":"Trace"}

/***/ }),

/***/ 9993:
/*!********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/LogSetState.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logger.SetState","ActionResult":{"_Name":"LogSetState"},"OnSuccess":"/DemoSampleApp/Actions/LogSetLevel.action","LoggerState":"On"}

/***/ }),

/***/ 6127:
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/LogUpload.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logger.Upload","ActionResult":{"_Name":"LogUpload"},"OnFailure":"/DemoSampleApp/Actions/LogUploadFailure.action","OnSuccess":"/DemoSampleApp/Actions/LogUploadSuccessful.action","ShowActivityIndicator":true,"ActivityIndicatorText":"Uploading Logs..."}

/***/ }),

/***/ 9040:
/*!*************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/LogUploadFailure.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"LogUploadFailure"},"Message":"Failed to upload client logs - {#ActionResults:LogUpload/error}","Title":"Upload Client Logs","OKCaption":"OK"}

/***/ }),

/***/ 7343:
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/LogUploadSuccessful.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"LogUploadSuccessful"},"Message":"Log File Uploaded","NumberOfLines":1,"Duration":3,"IsIconHidden":true,"Animated":true}

/***/ }),

/***/ 1569:
/*!***************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Logout.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ 7842:
/*!**********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/LogoutMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/DemoSampleApp/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ 6343:
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_Create.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Create"},"PageToOpen":"/DemoSampleApp/Pages/Customers_Create.page","ModalPage":true}

/***/ }),

/***/ 873:
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_Detail.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Detail"},"PageToOpen":"/DemoSampleApp/Pages/Customers_Detail.page"}

/***/ }),

/***/ 2656:
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_Edit.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Edit"},"PageToOpen":"/DemoSampleApp/Pages/Customers_Edit.page","ModalPage":true}

/***/ }),

/***/ 7360:
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_List.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_List"},"PageToOpen":"/DemoSampleApp/Pages/Customers_List.page"}

/***/ }),

/***/ 2157:
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_Orders.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Orders"},"PageToOpen":"/DemoSampleApp/Pages/Customers_Orders.page"}

/***/ }),

/***/ 2802:
/*!**************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToSalesOrderHeaders_Create.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToSalesOrderHeaders_Create"},"PageToOpen":"/DemoSampleApp/Pages/SalesOrderHeaders_Create.page","ModalPage":true}

/***/ }),

/***/ 3814:
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToSalesOrders_Details.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToSalesOrders_Details"},"PageToOpen":"/DemoSampleApp/Pages/SalesOrders_Details.page"}

/***/ }),

/***/ 3581:
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/OnWillUpdate.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ 8711:
/*!***************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SalesOrderHeaders_CreateEntity.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateRelatedEntity","ActionResult":{"_Name":"SalesOrderHeaders_CreateEntity"},"OnFailure":"/DemoSampleApp/Actions/CreateSalesOrderHeaderEntityFailureMessage.action","OnSuccess":"/DemoSampleApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"SalesOrderHeaders"},"ParentLink":{"Target":{"EntitySet":"Customers","ReadLink":"{@odata.readLink}"},"Property":"SalesOrders"},"Properties":{"CreatedAt":"#Control:FCCreatedate/#Value","CurrencyCode":"#Control:FCCreateCurrencyCode/#Value","GrossAmount":"#Control:FCCreateGrossAmount/#Value","LifeCycleStatus":"#Control:FCCreateLifeCycleStatus/#Value","LifeCycleStatusName":"#Control:FCCreateLifeCycleStatusName/#Value","NetAmount":"#Control:FCCreateNetAmount/#Value","TaxAmount":"#Control:FCCreateTaxAmount/#Value"}}

/***/ }),

/***/ 7059:
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/CloseOffline.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/DemoSampleApp/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/DemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/DemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ 4223:
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 4317:
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 8914:
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/DownloadOffline.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/DemoSampleApp/Actions/Service/SyncFailureMessage.action","OnSuccess":"/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ 4734:
/*!***************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/DownloadStartedMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/DemoSampleApp/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 9789:
/*!**********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/InitializeOffline.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.Initialize","ActionResult":{"_Name":"init"},"OnFailure":"/DemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action","OnSuccess":"/DemoSampleApp/Actions/LogSetState.action","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","Service":"/DemoSampleApp/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}]}

/***/ }),

/***/ 1404:
/*!************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 7254:
/*!************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 7871:
/*!***********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/SyncFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ 8978:
/*!***********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/SyncStartedMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/DemoSampleApp/Actions/Service/UploadOffline.action","OnFailure":"/DemoSampleApp/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ 9118:
/*!***********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/SyncSuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ 8651:
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/UploadOffline.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/DemoSampleApp/Actions/Service/DownloadStartedMessage.action","OnFailure":"/DemoSampleApp/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ 5677:
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"UpdateCustomerEntityFailureMessage"},"Message":"Failed to Save Customer Updates - {#ActionResults:Customers_UpdateEntity/error}","Title":"Update Customer","OKCaption":"OK"}

/***/ }),

/***/ 1843:
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ValidationFailure.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"ValidationFailure"},"Message":"Email address is not in the correct format recipient @ domain . domaintype","Title":"Validate Email","OKCaption":"OK"}

/***/ }),

/***/ 6776:
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Globals/AppDefinition_Version.global ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ 5550:
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Services/SampleServiceV2.service ***!
  \**************************************************************************/
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
let demosampleapp_actions_appupdate_action = __webpack_require__(/*! ./DemoSampleApp/Actions/AppUpdate.action */ 3971)
let demosampleapp_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/AppUpdateFailureMessage.action */ 5407)
let demosampleapp_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./DemoSampleApp/Actions/AppUpdateProgressBanner.action */ 6133)
let demosampleapp_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/AppUpdateSuccessMessage.action */ 2057)
let demosampleapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CloseModalPage_Cancel.action */ 5070)
let demosampleapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CloseModalPage_Complete.action */ 8433)
let demosampleapp_actions_closepage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ClosePage.action */ 8692)
let demosampleapp_actions_createcustomerentityfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action */ 7967)
let demosampleapp_actions_createsalesorderheaderentityfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CreateSalesOrderHeaderEntityFailureMessage.action */ 632)
let demosampleapp_actions_customers_createentity_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers_CreateEntity.action */ 3385)
let demosampleapp_actions_customers_deleteconfirmation_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers_DeleteConfirmation.action */ 7106)
let demosampleapp_actions_customers_deleteentity_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers_DeleteEntity.action */ 948)
let demosampleapp_actions_customers_updateentity_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers_UpdateEntity.action */ 3570)
let demosampleapp_actions_deletecustomerentityfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/DeleteCustomerEntityFailureMessage.action */ 9503)
let demosampleapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ 958)
let demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ 7210)
let demosampleapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ 4136)
let demosampleapp_actions_logout_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Logout.action */ 1569)
let demosampleapp_actions_logoutmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/LogoutMessage.action */ 7842)
let demosampleapp_actions_logsetlevel_action = __webpack_require__(/*! ./DemoSampleApp/Actions/LogSetLevel.action */ 8215)
let demosampleapp_actions_logsetstate_action = __webpack_require__(/*! ./DemoSampleApp/Actions/LogSetState.action */ 9993)
let demosampleapp_actions_logupload_action = __webpack_require__(/*! ./DemoSampleApp/Actions/LogUpload.action */ 6127)
let demosampleapp_actions_loguploadfailure_action = __webpack_require__(/*! ./DemoSampleApp/Actions/LogUploadFailure.action */ 9040)
let demosampleapp_actions_loguploadsuccessful_action = __webpack_require__(/*! ./DemoSampleApp/Actions/LogUploadSuccessful.action */ 7343)
let demosampleapp_actions_navtocustomers_create_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_Create.action */ 6343)
let demosampleapp_actions_navtocustomers_detail_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_Detail.action */ 873)
let demosampleapp_actions_navtocustomers_edit_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_Edit.action */ 2656)
let demosampleapp_actions_navtocustomers_list_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_List.action */ 7360)
let demosampleapp_actions_navtocustomers_orders_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_Orders.action */ 2157)
let demosampleapp_actions_navtosalesorderheaders_create_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToSalesOrderHeaders_Create.action */ 2802)
let demosampleapp_actions_navtosalesorders_details_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToSalesOrders_Details.action */ 3814)
let demosampleapp_actions_onwillupdate_action = __webpack_require__(/*! ./DemoSampleApp/Actions/OnWillUpdate.action */ 3581)
let demosampleapp_actions_salesorderheaders_createentity_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SalesOrderHeaders_CreateEntity.action */ 8711)
let demosampleapp_actions_service_closeoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/CloseOffline.action */ 7059)
let demosampleapp_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action */ 4223)
let demosampleapp_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action */ 4317)
let demosampleapp_actions_service_downloadoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/DownloadOffline.action */ 8914)
let demosampleapp_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/DownloadStartedMessage.action */ 4734)
let demosampleapp_actions_service_initializeoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/InitializeOffline.action */ 9789)
let demosampleapp_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action */ 1404)
let demosampleapp_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action */ 7254)
let demosampleapp_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/SyncFailureMessage.action */ 7871)
let demosampleapp_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/SyncStartedMessage.action */ 8978)
let demosampleapp_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/SyncSuccessMessage.action */ 9118)
let demosampleapp_actions_service_uploadoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/UploadOffline.action */ 8651)
let demosampleapp_actions_updatecustomerentityfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action */ 5677)
let demosampleapp_actions_validationfailure_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ValidationFailure.action */ 1843)
let demosampleapp_globals_appdefinition_version_global = __webpack_require__(/*! ./DemoSampleApp/Globals/AppDefinition_Version.global */ 6776)
let demosampleapp_i18n_i18n_properties = __webpack_require__(/*! ./DemoSampleApp/i18n/i18n.properties */ 2255)
let demosampleapp_jsconfig_json = __webpack_require__(/*! ./DemoSampleApp/jsconfig.json */ 738)
let demosampleapp_pages_customers_create_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_Create.page */ 8770)
let demosampleapp_pages_customers_detail_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_Detail.page */ 9955)
let demosampleapp_pages_customers_edit_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_Edit.page */ 4342)
let demosampleapp_pages_customers_list_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_List.page */ 7857)
let demosampleapp_pages_customers_orders_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_Orders.page */ 8621)
let demosampleapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ 3737)
let demosampleapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page */ 5654)
let demosampleapp_pages_main_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Main.page */ 237)
let demosampleapp_pages_salesorderheaders_create_page = __webpack_require__(/*! ./DemoSampleApp/Pages/SalesOrderHeaders_Create.page */ 7146)
let demosampleapp_pages_salesorders_details_page = __webpack_require__(/*! ./DemoSampleApp/Pages/SalesOrders_Details.page */ 5812)
let demosampleapp_rules_appupdatefailure_js = __webpack_require__(/*! ./DemoSampleApp/Rules/AppUpdateFailure.js */ 2284)
let demosampleapp_rules_appupdatesuccess_js = __webpack_require__(/*! ./DemoSampleApp/Rules/AppUpdateSuccess.js */ 6154)
let demosampleapp_rules_customers_deleteconfirmation_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Customers_DeleteConfirmation.js */ 6065)
let demosampleapp_rules_customers_ordercount_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Customers_OrderCount.js */ 8159)
let demosampleapp_rules_emailvalidation_js = __webpack_require__(/*! ./DemoSampleApp/Rules/EmailValidation.js */ 5605)
let demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ 3452)
let demosampleapp_rules_onwillupdate_js = __webpack_require__(/*! ./DemoSampleApp/Rules/OnWillUpdate.js */ 3926)
let demosampleapp_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./DemoSampleApp/Rules/ResetAppSettingsAndLogout.js */ 6773)
let demosampleapp_services_sampleservicev2_service = __webpack_require__(/*! ./DemoSampleApp/Services/SampleServiceV2.service */ 5550)
let demosampleapp_styles_styles_css = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.css */ 6356)
let demosampleapp_styles_styles_less = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.less */ 1011)
let demosampleapp_styles_styles_light_css = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.light.css */ 2291)
let demosampleapp_styles_styles_light_json = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.light.json */ 8931)
let demosampleapp_styles_styles_light_nss = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.light.nss */ 6751)
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ 7775)
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ 3405)

module.exports = {
	application_app : application_app,
	demosampleapp_actions_appupdate_action : demosampleapp_actions_appupdate_action,
	demosampleapp_actions_appupdatefailuremessage_action : demosampleapp_actions_appupdatefailuremessage_action,
	demosampleapp_actions_appupdateprogressbanner_action : demosampleapp_actions_appupdateprogressbanner_action,
	demosampleapp_actions_appupdatesuccessmessage_action : demosampleapp_actions_appupdatesuccessmessage_action,
	demosampleapp_actions_closemodalpage_cancel_action : demosampleapp_actions_closemodalpage_cancel_action,
	demosampleapp_actions_closemodalpage_complete_action : demosampleapp_actions_closemodalpage_complete_action,
	demosampleapp_actions_closepage_action : demosampleapp_actions_closepage_action,
	demosampleapp_actions_createcustomerentityfailuremessage_action : demosampleapp_actions_createcustomerentityfailuremessage_action,
	demosampleapp_actions_createsalesorderheaderentityfailuremessage_action : demosampleapp_actions_createsalesorderheaderentityfailuremessage_action,
	demosampleapp_actions_customers_createentity_action : demosampleapp_actions_customers_createentity_action,
	demosampleapp_actions_customers_deleteconfirmation_action : demosampleapp_actions_customers_deleteconfirmation_action,
	demosampleapp_actions_customers_deleteentity_action : demosampleapp_actions_customers_deleteentity_action,
	demosampleapp_actions_customers_updateentity_action : demosampleapp_actions_customers_updateentity_action,
	demosampleapp_actions_deletecustomerentityfailuremessage_action : demosampleapp_actions_deletecustomerentityfailuremessage_action,
	demosampleapp_actions_errorarchive_errorarchive_syncfailure_action : demosampleapp_actions_errorarchive_errorarchive_syncfailure_action,
	demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action : demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action,
	demosampleapp_actions_errorarchive_navtoerrorarchive_list_action : demosampleapp_actions_errorarchive_navtoerrorarchive_list_action,
	demosampleapp_actions_logout_action : demosampleapp_actions_logout_action,
	demosampleapp_actions_logoutmessage_action : demosampleapp_actions_logoutmessage_action,
	demosampleapp_actions_logsetlevel_action : demosampleapp_actions_logsetlevel_action,
	demosampleapp_actions_logsetstate_action : demosampleapp_actions_logsetstate_action,
	demosampleapp_actions_logupload_action : demosampleapp_actions_logupload_action,
	demosampleapp_actions_loguploadfailure_action : demosampleapp_actions_loguploadfailure_action,
	demosampleapp_actions_loguploadsuccessful_action : demosampleapp_actions_loguploadsuccessful_action,
	demosampleapp_actions_navtocustomers_create_action : demosampleapp_actions_navtocustomers_create_action,
	demosampleapp_actions_navtocustomers_detail_action : demosampleapp_actions_navtocustomers_detail_action,
	demosampleapp_actions_navtocustomers_edit_action : demosampleapp_actions_navtocustomers_edit_action,
	demosampleapp_actions_navtocustomers_list_action : demosampleapp_actions_navtocustomers_list_action,
	demosampleapp_actions_navtocustomers_orders_action : demosampleapp_actions_navtocustomers_orders_action,
	demosampleapp_actions_navtosalesorderheaders_create_action : demosampleapp_actions_navtosalesorderheaders_create_action,
	demosampleapp_actions_navtosalesorders_details_action : demosampleapp_actions_navtosalesorders_details_action,
	demosampleapp_actions_onwillupdate_action : demosampleapp_actions_onwillupdate_action,
	demosampleapp_actions_salesorderheaders_createentity_action : demosampleapp_actions_salesorderheaders_createentity_action,
	demosampleapp_actions_service_closeoffline_action : demosampleapp_actions_service_closeoffline_action,
	demosampleapp_actions_service_closeofflinefailuremessage_action : demosampleapp_actions_service_closeofflinefailuremessage_action,
	demosampleapp_actions_service_closeofflinesuccessmessage_action : demosampleapp_actions_service_closeofflinesuccessmessage_action,
	demosampleapp_actions_service_downloadoffline_action : demosampleapp_actions_service_downloadoffline_action,
	demosampleapp_actions_service_downloadstartedmessage_action : demosampleapp_actions_service_downloadstartedmessage_action,
	demosampleapp_actions_service_initializeoffline_action : demosampleapp_actions_service_initializeoffline_action,
	demosampleapp_actions_service_initializeofflinefailuremessage_action : demosampleapp_actions_service_initializeofflinefailuremessage_action,
	demosampleapp_actions_service_initializeofflinesuccessmessage_action : demosampleapp_actions_service_initializeofflinesuccessmessage_action,
	demosampleapp_actions_service_syncfailuremessage_action : demosampleapp_actions_service_syncfailuremessage_action,
	demosampleapp_actions_service_syncstartedmessage_action : demosampleapp_actions_service_syncstartedmessage_action,
	demosampleapp_actions_service_syncsuccessmessage_action : demosampleapp_actions_service_syncsuccessmessage_action,
	demosampleapp_actions_service_uploadoffline_action : demosampleapp_actions_service_uploadoffline_action,
	demosampleapp_actions_updatecustomerentityfailuremessage_action : demosampleapp_actions_updatecustomerentityfailuremessage_action,
	demosampleapp_actions_validationfailure_action : demosampleapp_actions_validationfailure_action,
	demosampleapp_globals_appdefinition_version_global : demosampleapp_globals_appdefinition_version_global,
	demosampleapp_i18n_i18n_properties : demosampleapp_i18n_i18n_properties,
	demosampleapp_jsconfig_json : demosampleapp_jsconfig_json,
	demosampleapp_pages_customers_create_page : demosampleapp_pages_customers_create_page,
	demosampleapp_pages_customers_detail_page : demosampleapp_pages_customers_detail_page,
	demosampleapp_pages_customers_edit_page : demosampleapp_pages_customers_edit_page,
	demosampleapp_pages_customers_list_page : demosampleapp_pages_customers_list_page,
	demosampleapp_pages_customers_orders_page : demosampleapp_pages_customers_orders_page,
	demosampleapp_pages_errorarchive_errorarchive_detail_page : demosampleapp_pages_errorarchive_errorarchive_detail_page,
	demosampleapp_pages_errorarchive_errorarchive_list_page : demosampleapp_pages_errorarchive_errorarchive_list_page,
	demosampleapp_pages_main_page : demosampleapp_pages_main_page,
	demosampleapp_pages_salesorderheaders_create_page : demosampleapp_pages_salesorderheaders_create_page,
	demosampleapp_pages_salesorders_details_page : demosampleapp_pages_salesorders_details_page,
	demosampleapp_rules_appupdatefailure_js : demosampleapp_rules_appupdatefailure_js,
	demosampleapp_rules_appupdatesuccess_js : demosampleapp_rules_appupdatesuccess_js,
	demosampleapp_rules_customers_deleteconfirmation_js : demosampleapp_rules_customers_deleteconfirmation_js,
	demosampleapp_rules_customers_ordercount_js : demosampleapp_rules_customers_ordercount_js,
	demosampleapp_rules_emailvalidation_js : demosampleapp_rules_emailvalidation_js,
	demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js : demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js,
	demosampleapp_rules_onwillupdate_js : demosampleapp_rules_onwillupdate_js,
	demosampleapp_rules_resetappsettingsandlogout_js : demosampleapp_rules_resetappsettingsandlogout_js,
	demosampleapp_services_sampleservicev2_service : demosampleapp_services_sampleservicev2_service,
	demosampleapp_styles_styles_css : demosampleapp_styles_styles_css,
	demosampleapp_styles_styles_less : demosampleapp_styles_styles_less,
	demosampleapp_styles_styles_light_css : demosampleapp_styles_styles_light_css,
	demosampleapp_styles_styles_light_json : demosampleapp_styles_styles_light_json,
	demosampleapp_styles_styles_light_nss : demosampleapp_styles_styles_light_nss,
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

/***/ 8931:
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.light.json ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ 738:
/*!*******************************************************!*\
  !*** ./build.definitions/DemoSampleApp/jsconfig.json ***!
  \*******************************************************/
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