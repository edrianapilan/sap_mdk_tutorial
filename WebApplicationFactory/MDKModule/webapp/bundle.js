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

/***/ "./build.definitions/MDK_WorkOrderOutage/i18n/i18n.properties":
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/i18n/i18n.properties ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Rules/AppUpdateFailure.js":
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

/***/ "./build.definitions/MDK_WorkOrderOutage/Rules/AppUpdateSuccess.js":
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

/***/ "./build.definitions/MDK_WorkOrderOutage/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
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

/***/ "./build.definitions/MDK_WorkOrderOutage/Rules/OnWillUpdate.js":
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

/***/ "./build.definitions/MDK_WorkOrderOutage/Rules/OpenWorkCofirmation.js":
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
  console.log(wrStatusVal);
  if (wrStatusVal == "") {}
}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Rules/ResetAppSettingsAndLogout.js":
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

/***/ "./build.definitions/MDK_WorkOrderOutage/Styles/Styles.css":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Styles/Styles.css ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_WorkOrderOutage/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Styles/Styles.less":
/*!******************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Styles/Styles.less ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDK_WorkOrderOutage/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Styles/Styles.nss":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Styles/Styles.nss ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/api.js":
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

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.5.0/node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
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

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/Customers/Customers_Detail.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Customers/Customers_Detail.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customer Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{FirstName}","Subhead":"{City}","BodyText":"","Footnote":"{CustomerId}","Description":"{Country}","StatusText":"{DateOfBirth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{EmailAddress}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"City","Value":"{City}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"CustomerId","Value":"{CustomerId}"},{"KeyName":"DateOfBirth","Value":"{DateOfBirth}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"FirstName","Value":"{FirstName}"},{"KeyName":"HouseNumber","Value":"{HouseNumber}"},{"KeyName":"LastName","Value":"{LastName}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"PostalCode","Value":"{PostalCode}"},{"KeyName":"Street","Value":"{Street}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Address"},"KeyAndValues":[{"KeyName":"HouseNumber","Value":"{Address/HouseNumber}"},{"KeyName":"Street","Value":"{Address/Street}"},{"KeyName":"City","Value":"{Address/City}"},{"KeyName":"Country","Value":"{Address/Country}"},{"KeyName":"PostalCode","Value":"{Address/PostalCode}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValueAddress","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"SalesOrders"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}","OnPress":"/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/SalesOrders","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderHeaders"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/Customers/Customers_List.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Customers/Customers_List.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customers","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Country}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_Detail.action","StatusImage":"","Title":"{FirstName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{DateOfBirth}","Subhead":"{City}","SubstatusText":"{EmailAddress}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Customers","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_List.page":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/Main.page":
/*!***************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Main.page ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Work Request Details","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDK_WorkOrderOutage/Actions/NavToWork_Request_Details.action"}],"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"}}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MDK_WorkOrderOutage/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_WorkOrderOutage/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDK_WorkOrderOutage/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/Products/Products_Detail.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Products/Products_Detail.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Product Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service/{@odata.readLink}/$value","HeadlineText":"{Name}","Subhead":"{Category}","BodyText":"","Footnote":"{CurrencyCode}","Description":"{CategoryName}","StatusText":"{DimensionDepth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{DimensionHeight}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DimensionDepth","Value":"{DimensionDepth}"},{"KeyName":"DimensionHeight","Value":"{DimensionHeight}"},{"KeyName":"DimensionUnit","Value":"{DimensionUnit}"},{"KeyName":"DimensionWidth","Value":"{DimensionWidth}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"PictureUrl","Value":"{PictureUrl}"},{"KeyName":"Price","Value":"{Price}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"},{"KeyName":"Weight","Value":"{Weight}"},{"KeyName":"WeightUnit","Value":"{WeightUnit}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/Products/Products_List.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Products/Products_List.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Products","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CategoryName}","AvatarStack":{"Avatars":[{"Image":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service/{@odata.readLink}/$value"}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/Products/NavToProducts_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{CurrencyCode}","PreserveIconStackSpacing":false,"StatusText":"{DimensionDepth}","Subhead":"{Category}","SubstatusText":"{DimensionHeight}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Products","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderHeader Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{PurchaseOrderId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{NetAmount}","Description":"{GrossAmount}","StatusText":"{SupplierId}","StatusImage":"","SubstatusImage":"","SubstatusText":"{TaxAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"PurchaseOrderId","Value":"{PurchaseOrderId}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductId}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderId}","OnPress":"/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["PurchaseOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderHeaders","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action","StatusImage":"","Title":"{PurchaseOrderId}","Footnote":"{NetAmount}","PreserveIconStackSpacing":false,"StatusText":"{SupplierId}","Subhead":"{CurrencyCode}","SubstatusText":"{TaxAmount}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItem Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{ItemNumber}","Description":"{GrossAmount}","StatusText":"{NetAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{PurchaseOrderId}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"PurchaseOrderId","Value":"{PurchaseOrderId}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItems","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action","StatusImage":"","Title":"{ProductId}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderId}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeader Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{LifeCycleStatusName}","Subhead":"{CreatedAt}","BodyText":"","Footnote":"{CustomerId}","Description":"{CurrencyCode}","StatusText":"{GrossAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{LifeCycleStatus}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CreatedAt","Value":"{CreatedAt}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"CustomerId","Value":"{CustomerId}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"LifeCycleStatus","Value":"{LifeCycleStatus}"},{"KeyName":"LifeCycleStatusName","Value":"{LifeCycleStatusName}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"SalesOrderId","Value":"{SalesOrderId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductId}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}","OnPress":"/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeaders","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action","StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_Detail.page":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_Detail.page ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderItem Detail","DesignTimeTarget":{"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","EntitySet":"SalesOrderItems","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{GrossAmount}","Description":"{DeliveryDate}","StatusText":"{ItemNumber}","StatusImage":"","SubstatusImage":"","SubstatusText":"{NetAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DeliveryDate","Value":"{DeliveryDate}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"SalesOrderId","Value":"{SalesOrderId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_List.page":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_List.page ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderItems","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action","StatusImage":"","Title":"{ProductId}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SalesOrderItems","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/Work_Confirmation.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Work_Confirmation.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Request Number","PlaceHolder":"PlaceHolder","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Request Type","PlaceHolder":"PlaceHolder","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Customers Out","PlaceHolder":"PlaceHolder","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Device","PlaceHolder":"PlaceHolder","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Phase(s)","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select multiple items","IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["A","B","C"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Grid","PlaceHolder":"PlaceHolder","Enabled":true}]}]}],"_Type":"Page","_Name":"Work_Confirmation","Caption":"Work Confirmation","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Pages/Work_Request_Details.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Pages/Work_Request_Details.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Request Number","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Work Request Type","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Secondary Assignment","Enabled":true},{"Value":["Issued"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCWRStatus","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"WR Status","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","OnValueChange":"/MDK_WorkOrderOutage/Rules/OpenWorkCofirmation.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["Issued","Completed"]},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Construction Type","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["OH","OG"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty4","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Meter Number","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty5","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Device","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty6","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Grid","Enabled":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker1","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Phase(s)","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"PickerItems":["A","B","C"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty7","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Confirmed Open","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty8","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Priorty Score","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty9","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Customers Out","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty10","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Customers Assigned","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty11","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Special Condition","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty12","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Military","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty14","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Life Support","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty13","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Medical Certificates","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty15","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Customer","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty16","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Business","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty17","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Address","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty18","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Phone No.","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty19","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Alt Phone No.","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker0","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"ETR Range","Mode":"Datetime"},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker1","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"To","Mode":"Datetime"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty20","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"ETR Updated By","Enabled":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker2","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"At","Mode":"Datetime"}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote0","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader0","AccessoryType":"none","UseTopPadding":true,"Caption":"Work Description"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell3"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote1","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader1","AccessoryType":"none","UseTopPadding":true,"Caption":"ROC Information"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell4"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote2","IsEditable":true,"IsVisible":true,"Separator":true,"Enabled":true}],"Header":{"_Name":"SectionHeader2","AccessoryType":"none","UseTopPadding":true,"Caption":"Field Information"},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell5"}]}],"_Type":"Page","_Name":"Work_Request_Details","Caption":"Work Request Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK_WorkOrderOutage","Version":"/MDK_WorkOrderOutage/Globals/AppDefinition_Version.global","MainPage":"/MDK_WorkOrderOutage/Pages/Main.page","OnLaunch":["/MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MDK_WorkOrderOutage/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action","Styles":"/MDK_WorkOrderOutage/Styles/Styles.less","Localization":"/MDK_WorkOrderOutage/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDK_WorkOrderOutage/Styles/Styles.css","ios":"/MDK_WorkOrderOutage/Styles/Styles.nss","android":"/MDK_WorkOrderOutage/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdate.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdate.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK_WorkOrderOutage/Rules/AppUpdateFailure.js","OnSuccess":"/MDK_WorkOrderOutage/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateProgressBanner.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateProgressBanner.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK_WorkOrderOutage/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateSuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateSuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/CloseModalPage_Cancel.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/CloseModalPage_Cancel.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/CloseModalPage_Complete.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/CloseModalPage_Complete.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/ClosePage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/ClosePage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_Detail.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_Detail.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/Customers/Customers_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_List.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_List.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/Customers/Customers_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Logout.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Logout.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/LogoutMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/LogoutMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK_WorkOrderOutage/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/NavToWork_Request_Details.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/NavToWork_Request_Details.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToWork_Request_Details"},"PageToOpen":"/MDK_WorkOrderOutage/Pages/Work_Request_Details.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/OnWillUpdate.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/OnWillUpdate.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Products/NavToProducts_Detail.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Products/NavToProducts_Detail.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/Products/Products_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Products/NavToProducts_List.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Products/NavToProducts_List.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/Products/Products_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action":
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action":
/*!****************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action ***!
  \****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_List.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_List.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOffline.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOffline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDK_WorkOrderOutage/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDK_WorkOrderOutage/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOfflineFailureMessage.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOfflineFailureMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOfflineSuccessMessage.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/DownloadOffline.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/DownloadOffline.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"},{"Name":"Products","Query":"Products"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MDK_WorkOrderOutage/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/DownloadStartedMessage.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/DownloadStartedMessage.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDK_WorkOrderOutage/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"},{"Name":"Products","Query":"Products"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineFailureMessage.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncStartedMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncStartedMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDK_WorkOrderOutage/Actions/Service/UploadOffline.action","OnFailure":"/MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncSuccessMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncSuccessMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/UploadOffline.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Actions/Service/UploadOffline.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_WorkOrderOutage/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDK_WorkOrderOutage/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Globals/AppDefinition_Version.global":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Globals/AppDefinition_Version.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Services/SampleServiceV2.service":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Services/SampleServiceV2.service ***!
  \********************************************************************************/
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
let mdk_workorderoutage_actions_appupdate_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/AppUpdate.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdate.action")
let mdk_workorderoutage_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateFailureMessage.action")
let mdk_workorderoutage_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateProgressBanner.action")
let mdk_workorderoutage_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/AppUpdateSuccessMessage.action")
let mdk_workorderoutage_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/CloseModalPage_Cancel.action")
let mdk_workorderoutage_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/CloseModalPage_Complete.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/CloseModalPage_Complete.action")
let mdk_workorderoutage_actions_closepage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/ClosePage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/ClosePage.action")
let mdk_workorderoutage_actions_customers_navtocustomers_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_Detail.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_Detail.action")
let mdk_workorderoutage_actions_customers_navtocustomers_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_List.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Customers/NavToCustomers_List.action")
let mdk_workorderoutage_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let mdk_workorderoutage_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let mdk_workorderoutage_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/ErrorArchive/NavToErrorArchive_List.action")
let mdk_workorderoutage_actions_logout_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Logout.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Logout.action")
let mdk_workorderoutage_actions_logoutmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/LogoutMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/LogoutMessage.action")
let mdk_workorderoutage_actions_navtowork_request_details_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/NavToWork_Request_Details.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/NavToWork_Request_Details.action")
let mdk_workorderoutage_actions_onwillupdate_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/OnWillUpdate.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/OnWillUpdate.action")
let mdk_workorderoutage_actions_products_navtoproducts_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Products/NavToProducts_Detail.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Products/NavToProducts_Detail.action")
let mdk_workorderoutage_actions_products_navtoproducts_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Products/NavToProducts_List.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Products/NavToProducts_List.action")
let mdk_workorderoutage_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action")
let mdk_workorderoutage_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action")
let mdk_workorderoutage_actions_purchaseorderitems_navtopurchaseorderitems_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action")
let mdk_workorderoutage_actions_purchaseorderitems_navtopurchaseorderitems_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action")
let mdk_workorderoutage_actions_salesorderheaders_navtosalesorderheaders_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action")
let mdk_workorderoutage_actions_salesorderheaders_navtosalesorderheaders_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action")
let mdk_workorderoutage_actions_salesorderitems_navtosalesorderitems_detail_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action")
let mdk_workorderoutage_actions_salesorderitems_navtosalesorderitems_list_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_List.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/SalesOrderItems/NavToSalesOrderItems_List.action")
let mdk_workorderoutage_actions_service_closeoffline_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/CloseOffline.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOffline.action")
let mdk_workorderoutage_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOfflineFailureMessage.action")
let mdk_workorderoutage_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/CloseOfflineSuccessMessage.action")
let mdk_workorderoutage_actions_service_downloadoffline_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/DownloadOffline.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/DownloadOffline.action")
let mdk_workorderoutage_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/DownloadStartedMessage.action")
let mdk_workorderoutage_actions_service_initializeoffline_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action")
let mdk_workorderoutage_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineFailureMessage.action")
let mdk_workorderoutage_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/InitializeOfflineSuccessMessage.action")
let mdk_workorderoutage_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncFailureMessage.action")
let mdk_workorderoutage_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/SyncStartedMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncStartedMessage.action")
let mdk_workorderoutage_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/SyncSuccessMessage.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/SyncSuccessMessage.action")
let mdk_workorderoutage_actions_service_uploadoffline_action = __webpack_require__(/*! ./MDK_WorkOrderOutage/Actions/Service/UploadOffline.action */ "./build.definitions/MDK_WorkOrderOutage/Actions/Service/UploadOffline.action")
let mdk_workorderoutage_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK_WorkOrderOutage/Globals/AppDefinition_Version.global */ "./build.definitions/MDK_WorkOrderOutage/Globals/AppDefinition_Version.global")
let mdk_workorderoutage_i18n_i18n_properties = __webpack_require__(/*! ./MDK_WorkOrderOutage/i18n/i18n.properties */ "./build.definitions/MDK_WorkOrderOutage/i18n/i18n.properties")
let mdk_workorderoutage_jsconfig_json = __webpack_require__(/*! ./MDK_WorkOrderOutage/jsconfig.json */ "./build.definitions/MDK_WorkOrderOutage/jsconfig.json")
let mdk_workorderoutage_pages_customers_customers_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Customers/Customers_Detail.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/Customers/Customers_Detail.page")
let mdk_workorderoutage_pages_customers_customers_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Customers/Customers_List.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/Customers/Customers_List.page")
let mdk_workorderoutage_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_Detail.page")
let mdk_workorderoutage_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/ErrorArchive/ErrorArchive_List.page")
let mdk_workorderoutage_pages_main_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Main.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/Main.page")
let mdk_workorderoutage_pages_products_products_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Products/Products_Detail.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/Products/Products_Detail.page")
let mdk_workorderoutage_pages_products_products_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Products/Products_List.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/Products/Products_List.page")
let mdk_workorderoutage_pages_purchaseorderheaders_purchaseorderheaders_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page")
let mdk_workorderoutage_pages_purchaseorderheaders_purchaseorderheaders_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page")
let mdk_workorderoutage_pages_purchaseorderitems_purchaseorderitems_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page")
let mdk_workorderoutage_pages_purchaseorderitems_purchaseorderitems_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page")
let mdk_workorderoutage_pages_salesorderheaders_salesorderheaders_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page")
let mdk_workorderoutage_pages_salesorderheaders_salesorderheaders_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page")
let mdk_workorderoutage_pages_salesorderitems_salesorderitems_detail_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_Detail.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_Detail.page")
let mdk_workorderoutage_pages_salesorderitems_salesorderitems_list_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_List.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/SalesOrderItems/SalesOrderItems_List.page")
let mdk_workorderoutage_pages_work_confirmation_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Work_Confirmation.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/Work_Confirmation.page")
let mdk_workorderoutage_pages_work_request_details_page = __webpack_require__(/*! ./MDK_WorkOrderOutage/Pages/Work_Request_Details.page */ "./build.definitions/MDK_WorkOrderOutage/Pages/Work_Request_Details.page")
let mdk_workorderoutage_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/AppUpdateFailure.js */ "./build.definitions/MDK_WorkOrderOutage/Rules/AppUpdateFailure.js")
let mdk_workorderoutage_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/AppUpdateSuccess.js */ "./build.definitions/MDK_WorkOrderOutage/Rules/AppUpdateSuccess.js")
let mdk_workorderoutage_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/MDK_WorkOrderOutage/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let mdk_workorderoutage_rules_onwillupdate_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/OnWillUpdate.js */ "./build.definitions/MDK_WorkOrderOutage/Rules/OnWillUpdate.js")
let mdk_workorderoutage_rules_openworkcofirmation_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/OpenWorkCofirmation.js */ "./build.definitions/MDK_WorkOrderOutage/Rules/OpenWorkCofirmation.js")
let mdk_workorderoutage_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK_WorkOrderOutage/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MDK_WorkOrderOutage/Rules/ResetAppSettingsAndLogout.js")
let mdk_workorderoutage_services_sampleservicev2_service = __webpack_require__(/*! ./MDK_WorkOrderOutage/Services/SampleServiceV2.service */ "./build.definitions/MDK_WorkOrderOutage/Services/SampleServiceV2.service")
let mdk_workorderoutage_styles_styles_css = __webpack_require__(/*! ./MDK_WorkOrderOutage/Styles/Styles.css */ "./build.definitions/MDK_WorkOrderOutage/Styles/Styles.css")
let mdk_workorderoutage_styles_styles_json = __webpack_require__(/*! ./MDK_WorkOrderOutage/Styles/Styles.json */ "./build.definitions/MDK_WorkOrderOutage/Styles/Styles.json")
let mdk_workorderoutage_styles_styles_less = __webpack_require__(/*! ./MDK_WorkOrderOutage/Styles/Styles.less */ "./build.definitions/MDK_WorkOrderOutage/Styles/Styles.less")
let mdk_workorderoutage_styles_styles_nss = __webpack_require__(/*! ./MDK_WorkOrderOutage/Styles/Styles.nss */ "./build.definitions/MDK_WorkOrderOutage/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

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
	mdk_workorderoutage_actions_navtowork_request_details_action : mdk_workorderoutage_actions_navtowork_request_details_action,
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
	mdk_workorderoutage_services_sampleservicev2_service : mdk_workorderoutage_services_sampleservicev2_service,
	mdk_workorderoutage_styles_styles_css : mdk_workorderoutage_styles_styles_css,
	mdk_workorderoutage_styles_styles_json : mdk_workorderoutage_styles_styles_json,
	mdk_workorderoutage_styles_styles_less : mdk_workorderoutage_styles_styles_less,
	mdk_workorderoutage_styles_styles_nss : mdk_workorderoutage_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/Styles/Styles.json":
/*!******************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/Styles/Styles.json ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MDK_WorkOrderOutage/jsconfig.json":
/*!*************************************************************!*\
  !*** ./build.definitions/MDK_WorkOrderOutage/jsconfig.json ***!
  \*************************************************************/
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