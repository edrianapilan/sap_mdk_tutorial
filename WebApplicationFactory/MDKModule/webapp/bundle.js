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

/***/ "./build.definitions/MDK_Annotations/i18n/i18n.properties":
/*!****************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/i18n/i18n.properties ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "PRODUCT_NAME=PRODUCT_NAME\nPRODUCT_CATEGORY=PRODUCT_CATEGORY\nPRODUCT_SHORT_DESCRIPTION=PRODUCT_SHORT_DESCRIPTION\nPRODUCT_LONG_DESCRIPTION=PRODUCT_LONG_DESCRIPTION\nPRODUCT_PRICE=PRODUCT_PRICE\nPRODUCT_WEIGHT=PRODUCT_WEIGHT\nPRODUCT_HEIGHT=PRODUCT_HEIGHT\nPRODUCT_DEPTH=PRODUCT_DEPTH\nPRODUCT_WIDTH=PRODUCT_WIDTH\nPRODUCT_TYPE=PRODUCT_TYPE\nPRODUCT_TYPES=PRODUCT_TYPES\nPRODUCT_PRODUCT_ID=PRODUCT_PRODUCT_ID\nPRODUCT_UNIT=PRODUCT_UNIT\nPRODUCT_WEIGHT_UNIT=PRODUCT_WEIGHT_UNIT\nPRODUCT_QUANTITY_UNIT=PRODUCT_QUANTITY_UNIT\nPRODUCT_CATEGORY_NAME=PRODUCT_CATEGORY_NAME\nPRODUCT_CURENCY_CODE=PRODUCT_CURENCY_CODE\nPRODUCT_PICTURE_URL=PRODUCT_PICTURE_URL\nPRODUCT_SUPPLIER_ID=PRODUCT_SUPPLIER_ID\nPRODUCT_UPDATE_TIMESTAMP=PRODUCT_UPDATE_TIMESTAMP\n"

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Rules/AppUpdateFailure.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Rules/AppUpdateFailure.js ***!
  \*********************************************************************/
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
    "Name": "/MDK_Annotations/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Rules/AppUpdateSuccess.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Rules/AppUpdateSuccess.js ***!
  \*********************************************************************/
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
        "Name": "/MDK_Annotations/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK_Annotations/Actions/AppUpdateSuccessMessage.action",
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

/***/ "./build.definitions/MDK_Annotations/Rules/OnWillUpdate.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Rules/OnWillUpdate.js ***!
  \*****************************************************************/
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
  return clientAPI.executeAction('/MDK_Annotations/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return Promise.resolve();
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Rules/Products/Products_DeleteConfirmation.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Rules/Products/Products_DeleteConfirmation.js ***!
  \*****************************************************************************************/
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
  return clientAPI.executeAction('/MDK_Annotations/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_Annotations/Actions/Products/Products_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Rules/ResetAppSettingsAndLogout.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Rules/ResetAppSettingsAndLogout.js ***!
  \******************************************************************************/
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
    return context.getPageProxy().executeAction('/MDK_Annotations/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Styles/Styles.css":
/*!*************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Styles/Styles.css ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_Annotations/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK_Annotations/Styles/Styles.less":
/*!**************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Styles/Styles.less ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.4.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDK_Annotations/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK_Annotations/Styles/Styles.nss":
/*!*************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Styles/Styles.nss ***!
  \*************************************************************/
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

/***/ "./build.definitions/MDK_Annotations/Pages/Main.page":
/*!***********************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Pages/Main.page ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Main","Controls":[{"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Buttons":[{"OnPress":"/MDK_Annotations/Actions/Products/NavToProducts_List.action","TextAlignment":"center","Title":"Products"}],"_Name":"SectionButtonTable0","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/MDK_Annotations/Actions/LogoutMessage.action"},{"_Name":"UpdateToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Update","Enabled":true,"Clickable":true,"OnPress":"/MDK_Annotations/Actions/AppUpdateProgressBanner.action","Visible":"$(PLT,true,true,false)"}]},"PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Pages/Products/Products_Create.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Pages/Products/Products_Create.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_Annotations/Actions/CloseModalPage_Cancel.action","Position":"left","SystemItem":"Cancel"},{"OnPress":"/MDK_Annotations/Actions/Products/Products_CreateEntity.action","Position":"right","SystemItem":"Save"}]},"Caption":"Create $(L,PRODUCT_TYPE)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Category","_Name":"Category","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","KeyboardType":"Number","_Name":"DimensionDepth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","KeyboardType":"Number","_Name":"DimensionHeight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","KeyboardType":"Number","_Name":"DimensionWidth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","KeyboardType":"Number","_Name":"Price","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ProductId}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Stock","Service":"/MDK_Annotations/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDK_Annotations/Services/SampleServiceV2.service"}},"_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Weight","KeyboardType":"Number","_Name":"Weight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"AttachmentTitle":"Media","AttachmentAddTitle":"Browse","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":["jpg","png","gif"],"_Name":"Attachment","_Type":"Control.Type.FormCell.Attachment"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_Create"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Pages/Products/Products_Detail.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Pages/Products/Products_Detail.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,PRODUCT_TYPE)","DesignTimeTarget":{"Service":"/MDK_Annotations/Services/SampleServiceV2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDK_Annotations/Actions/Products/NavToProducts_Edit.action","Position":"right","SystemItem":"Edit"},{"OnPress":"/MDK_Annotations/Actions/Products/Products_DetailPopover.action","Position":"right","Text":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"DetailImage":"/MDK_Annotations/Services/SampleServiceV2.service/{@odata.readLink}/$value","HeadlineText":"{Name}","Subhead":"{Category}","Tags":[],"BodyText":"","Footnote":"{CurrencyCode}","Description":"{CategoryName}","StatusText":"{DimensionDepth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{DimensionHeight}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DimensionDepth","Value":"{DimensionDepth}"},{"KeyName":"DimensionHeight","Value":"{DimensionHeight}"},{"KeyName":"DimensionUnit","Value":"{DimensionUnit}"},{"KeyName":"DimensionWidth","Value":"{DimensionWidth}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"PictureUrl","Value":"{PictureUrl}"},{"KeyName":"Price","Value":"{Price}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"},{"KeyName":"Weight","Value":"{Weight}"},{"KeyName":"WeightUnit","Value":"{WeightUnit}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"KeyAndValues":[{"KeyName":"$(L,PRODUCT_NAME)","Value":"{Name}"},{"KeyName":"$(L,PRODUCT_CATEGORY)","Value":"{Category}"},{"KeyName":"$(L,PRODUCT_SHORT_DESCRIPTION)","Value":"{ShortDescription}"},{"KeyName":"$(L,PRODUCT_LONG_DESCRIPTION)","Value":"{LongDescription}"},{"KeyName":"$(L,PRODUCT_PRICE)","Value":"{Price}"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","Header":{"UseTopPadding":true,"Caption":""},"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}},{"KeyAndValues":[{"KeyName":"$(L,PRODUCT_WEIGHT)","Value":"{Weight}"},{"KeyName":"$(L,PRODUCT_HEIGHT)","Value":"{DimensionHeight}"},{"KeyName":"$(L,PRODUCT_DEPTH)","Value":"{DimensionDepth}"},{"KeyName":"$(L,PRODUCT_WIDTH)","Value":"{DimensionWidth}"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","Header":{"UseTopPadding":true,"Caption":""},"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}},{"KeyAndValues":[{"KeyName":"$(L,PRODUCT_PRICE)","Value":"{Price}"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","Header":{"UseTopPadding":true,"Caption":""},"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_Detail"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Pages/Products/Products_Edit.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Pages/Products/Products_Edit.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update $(L,PRODUCT_TYPE)","DesignTimeTarget":{"Service":"/MDK_Annotations/Services/SampleServiceV2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"Position":"left","SystemItem":"Cancel","OnPress":"/MDK_Annotations/Actions/CloseModalPage_Cancel.action"},{"Position":"right","SystemItem":"Save","OnPress":"/MDK_Annotations/Actions/Products/Products_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Category","_Name":"Category","Value":"{Category}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","Value":"{CategoryName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","_Name":"DimensionDepth","Value":"{DimensionDepth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","_Name":"DimensionHeight","Value":"{DimensionHeight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","Value":"{DimensionUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","_Name":"DimensionWidth","Value":"{DimensionWidth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","Value":"{LongDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","Value":"{PictureUrl}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","_Name":"Price","Value":"{Price}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ProductId}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Stock","Service":"/MDK_Annotations/Services/SampleServiceV2.service"}},"Value":"{ProductId}","_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","Value":"{ShortDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDK_Annotations/Services/SampleServiceV2.service"}},"Value":"{SupplierId}","_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Value":"{UpdatedTimestamp}","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Weight","_Name":"Weight","Value":"{Weight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","Value":"{WeightUnit}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_Edit"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Pages/Products/Products_List.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Pages/Products/Products_List.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,PRODUCT_TYPES)","ActionBar":{"Items":[{"OnPress":"/MDK_Annotations/Actions/Products/NavToProducts_Create.action","Position":"right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CategoryName}","DetailImage":"/MDK_Annotations/Services/SampleServiceV2.service/{@odata.readLink}/$value","DetailImageIsCircular":false,"Icons":[],"OnPress":"/MDK_Annotations/Actions/Products/NavToProducts_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{CurrencyCode}","PreserveIconStackSpacing":false,"StatusText":"{DimensionDepth}","Subhead":"{Category}","SubstatusText":"{DimensionHeight}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Products","Service":"/MDK_Annotations/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_List"}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK_Annotations","Version":"/MDK_Annotations/Globals/AppDefinition_Version.global","MainPage":"/MDK_Annotations/Pages/Main.page","OnLaunch":["/MDK_Annotations/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/MDK_Annotations/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK_Annotations/Actions/Service/InitializeOnline.action","Styles":"/MDK_Annotations/Styles/Styles.less","Localization":"/MDK_Annotations/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MDK_Annotations/Styles/Styles.css","ios":"/MDK_Annotations/Styles/Styles.nss","android":"/MDK_Annotations/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/AppUpdate.action":
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/AppUpdate.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK_Annotations/Rules/AppUpdateFailure.js","OnSuccess":"/MDK_Annotations/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/AppUpdateFailureMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/AppUpdateFailureMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/AppUpdateProgressBanner.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/AppUpdateProgressBanner.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK_Annotations/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/AppUpdateSuccessMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/AppUpdateSuccessMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/CloseModalPage_Cancel.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/CloseModalPage_Cancel.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Cancel"},"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/CloseModalPage_Complete.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/CloseModalPage_Complete.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Complete"},"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/ClosePage.action":
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/ClosePage.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/CreateEntityFailureMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/CreateEntityFailureMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/CreateEntitySuccessMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/CreateEntitySuccessMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/MDK_Annotations/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/DeleteConfirmation.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/DeleteConfirmation.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/DeleteEntityFailureMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/DeleteEntityFailureMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/DeleteEntitySuccessMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/DeleteEntitySuccessMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDK_Annotations/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Logout.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Logout.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/LogoutMessage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/LogoutMessage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK_Annotations/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/OnWillUpdate.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/OnWillUpdate.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_Create.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_Create.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_Annotations/Pages/Products/Products_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_Detail.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_Detail.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_Annotations/Pages/Products/Products_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_Edit.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_Edit.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_Annotations/Pages/Products/Products_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_List.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_List.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_Annotations/Pages/Products/Products_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Products/Products_CreateEntity.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Products/Products_CreateEntity.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"OnFailure":"/MDK_Annotations/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_Annotations/Actions/CreateEntitySuccessMessage.action","Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductId":"#Control:ProductId/#SelectedValue","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"Media":"#Control:Attachment/#Value","Target":{"EntitySet":"Products","Service":"/MDK_Annotations/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateMedia"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Products/Products_DeleteEntity.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Products/Products_DeleteEntity.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Products","Service":"/MDK_Annotations/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDK_Annotations/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDK_Annotations/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Products/Products_DetailPopover.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Products/Products_DetailPopover.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Open Document","OnPress":"/MDK_Annotations/Actions/Products/Products_OpenDocument.action"},{"Title":"Delete","OnPress":"/MDK_Annotations/Rules/Products/Products_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Products/Products_OpenDocument.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Products/Products_OpenDocument.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OpenDocument","Path":"/MDK_Annotations/Services/SampleServiceV2.service/{@odata.readLink}/$value","MimeType":"image/jpeg"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Products/Products_UpdateEntity.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Products/Products_UpdateEntity.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Products","Service":"/MDK_Annotations/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductId":"#Control:ProductId/#SelectedValue","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDK_Annotations/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDK_Annotations/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Service/InitializeOnline.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Service/InitializeOnline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_Annotations/Services/SampleServiceV2.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/MDK_Annotations/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/MDK_Annotations/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Service/InitializeOnlineFailureMessage.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/UpdateEntityFailureMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/UpdateEntityFailureMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Actions/UpdateEntitySuccessMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Actions/UpdateEntitySuccessMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDK_Annotations/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Globals/AppDefinition_Version.global":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Globals/AppDefinition_Version.global ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Services/SampleServiceV2.service":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Services/SampleServiceV2.service ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV2","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

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
let mdk_annotations_actions_appupdate_action = __webpack_require__(/*! ./MDK_Annotations/Actions/AppUpdate.action */ "./build.definitions/MDK_Annotations/Actions/AppUpdate.action")
let mdk_annotations_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MDK_Annotations/Actions/AppUpdateFailureMessage.action")
let mdk_annotations_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK_Annotations/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MDK_Annotations/Actions/AppUpdateProgressBanner.action")
let mdk_annotations_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MDK_Annotations/Actions/AppUpdateSuccessMessage.action")
let mdk_annotations_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDK_Annotations/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MDK_Annotations/Actions/CloseModalPage_Cancel.action")
let mdk_annotations_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDK_Annotations/Actions/CloseModalPage_Complete.action */ "./build.definitions/MDK_Annotations/Actions/CloseModalPage_Complete.action")
let mdk_annotations_actions_closepage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/ClosePage.action */ "./build.definitions/MDK_Annotations/Actions/ClosePage.action")
let mdk_annotations_actions_createentityfailuremessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/CreateEntityFailureMessage.action */ "./build.definitions/MDK_Annotations/Actions/CreateEntityFailureMessage.action")
let mdk_annotations_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/MDK_Annotations/Actions/CreateEntitySuccessMessage.action")
let mdk_annotations_actions_deleteconfirmation_action = __webpack_require__(/*! ./MDK_Annotations/Actions/DeleteConfirmation.action */ "./build.definitions/MDK_Annotations/Actions/DeleteConfirmation.action")
let mdk_annotations_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/MDK_Annotations/Actions/DeleteEntityFailureMessage.action")
let mdk_annotations_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/MDK_Annotations/Actions/DeleteEntitySuccessMessage.action")
let mdk_annotations_actions_logout_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Logout.action */ "./build.definitions/MDK_Annotations/Actions/Logout.action")
let mdk_annotations_actions_logoutmessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/LogoutMessage.action */ "./build.definitions/MDK_Annotations/Actions/LogoutMessage.action")
let mdk_annotations_actions_onwillupdate_action = __webpack_require__(/*! ./MDK_Annotations/Actions/OnWillUpdate.action */ "./build.definitions/MDK_Annotations/Actions/OnWillUpdate.action")
let mdk_annotations_actions_products_navtoproducts_create_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Products/NavToProducts_Create.action */ "./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_Create.action")
let mdk_annotations_actions_products_navtoproducts_detail_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Products/NavToProducts_Detail.action */ "./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_Detail.action")
let mdk_annotations_actions_products_navtoproducts_edit_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Products/NavToProducts_Edit.action */ "./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_Edit.action")
let mdk_annotations_actions_products_navtoproducts_list_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Products/NavToProducts_List.action */ "./build.definitions/MDK_Annotations/Actions/Products/NavToProducts_List.action")
let mdk_annotations_actions_products_products_createentity_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Products/Products_CreateEntity.action */ "./build.definitions/MDK_Annotations/Actions/Products/Products_CreateEntity.action")
let mdk_annotations_actions_products_products_deleteentity_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Products/Products_DeleteEntity.action */ "./build.definitions/MDK_Annotations/Actions/Products/Products_DeleteEntity.action")
let mdk_annotations_actions_products_products_detailpopover_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Products/Products_DetailPopover.action */ "./build.definitions/MDK_Annotations/Actions/Products/Products_DetailPopover.action")
let mdk_annotations_actions_products_products_opendocument_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Products/Products_OpenDocument.action */ "./build.definitions/MDK_Annotations/Actions/Products/Products_OpenDocument.action")
let mdk_annotations_actions_products_products_updateentity_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Products/Products_UpdateEntity.action */ "./build.definitions/MDK_Annotations/Actions/Products/Products_UpdateEntity.action")
let mdk_annotations_actions_service_initializeonline_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Service/InitializeOnline.action */ "./build.definitions/MDK_Annotations/Actions/Service/InitializeOnline.action")
let mdk_annotations_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/MDK_Annotations/Actions/Service/InitializeOnlineFailureMessage.action")
let mdk_annotations_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/MDK_Annotations/Actions/Service/InitializeOnlineSuccessMessage.action")
let mdk_annotations_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/MDK_Annotations/Actions/UpdateEntityFailureMessage.action")
let mdk_annotations_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./MDK_Annotations/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/MDK_Annotations/Actions/UpdateEntitySuccessMessage.action")
let mdk_annotations_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK_Annotations/Globals/AppDefinition_Version.global */ "./build.definitions/MDK_Annotations/Globals/AppDefinition_Version.global")
let mdk_annotations_i18n_i18n_properties = __webpack_require__(/*! ./MDK_Annotations/i18n/i18n.properties */ "./build.definitions/MDK_Annotations/i18n/i18n.properties")
let mdk_annotations_jsconfig_json = __webpack_require__(/*! ./MDK_Annotations/jsconfig.json */ "./build.definitions/MDK_Annotations/jsconfig.json")
let mdk_annotations_pages_main_page = __webpack_require__(/*! ./MDK_Annotations/Pages/Main.page */ "./build.definitions/MDK_Annotations/Pages/Main.page")
let mdk_annotations_pages_products_products_create_page = __webpack_require__(/*! ./MDK_Annotations/Pages/Products/Products_Create.page */ "./build.definitions/MDK_Annotations/Pages/Products/Products_Create.page")
let mdk_annotations_pages_products_products_detail_page = __webpack_require__(/*! ./MDK_Annotations/Pages/Products/Products_Detail.page */ "./build.definitions/MDK_Annotations/Pages/Products/Products_Detail.page")
let mdk_annotations_pages_products_products_edit_page = __webpack_require__(/*! ./MDK_Annotations/Pages/Products/Products_Edit.page */ "./build.definitions/MDK_Annotations/Pages/Products/Products_Edit.page")
let mdk_annotations_pages_products_products_list_page = __webpack_require__(/*! ./MDK_Annotations/Pages/Products/Products_List.page */ "./build.definitions/MDK_Annotations/Pages/Products/Products_List.page")
let mdk_annotations_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK_Annotations/Rules/AppUpdateFailure.js */ "./build.definitions/MDK_Annotations/Rules/AppUpdateFailure.js")
let mdk_annotations_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK_Annotations/Rules/AppUpdateSuccess.js */ "./build.definitions/MDK_Annotations/Rules/AppUpdateSuccess.js")
let mdk_annotations_rules_onwillupdate_js = __webpack_require__(/*! ./MDK_Annotations/Rules/OnWillUpdate.js */ "./build.definitions/MDK_Annotations/Rules/OnWillUpdate.js")
let mdk_annotations_rules_products_products_deleteconfirmation_js = __webpack_require__(/*! ./MDK_Annotations/Rules/Products/Products_DeleteConfirmation.js */ "./build.definitions/MDK_Annotations/Rules/Products/Products_DeleteConfirmation.js")
let mdk_annotations_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK_Annotations/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MDK_Annotations/Rules/ResetAppSettingsAndLogout.js")
let mdk_annotations_services_sampleservicev2_service = __webpack_require__(/*! ./MDK_Annotations/Services/SampleServiceV2.service */ "./build.definitions/MDK_Annotations/Services/SampleServiceV2.service")
let mdk_annotations_styles_styles_css = __webpack_require__(/*! ./MDK_Annotations/Styles/Styles.css */ "./build.definitions/MDK_Annotations/Styles/Styles.css")
let mdk_annotations_styles_styles_json = __webpack_require__(/*! ./MDK_Annotations/Styles/Styles.json */ "./build.definitions/MDK_Annotations/Styles/Styles.json")
let mdk_annotations_styles_styles_less = __webpack_require__(/*! ./MDK_Annotations/Styles/Styles.less */ "./build.definitions/MDK_Annotations/Styles/Styles.less")
let mdk_annotations_styles_styles_nss = __webpack_require__(/*! ./MDK_Annotations/Styles/Styles.nss */ "./build.definitions/MDK_Annotations/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mdk_annotations_actions_appupdate_action : mdk_annotations_actions_appupdate_action,
	mdk_annotations_actions_appupdatefailuremessage_action : mdk_annotations_actions_appupdatefailuremessage_action,
	mdk_annotations_actions_appupdateprogressbanner_action : mdk_annotations_actions_appupdateprogressbanner_action,
	mdk_annotations_actions_appupdatesuccessmessage_action : mdk_annotations_actions_appupdatesuccessmessage_action,
	mdk_annotations_actions_closemodalpage_cancel_action : mdk_annotations_actions_closemodalpage_cancel_action,
	mdk_annotations_actions_closemodalpage_complete_action : mdk_annotations_actions_closemodalpage_complete_action,
	mdk_annotations_actions_closepage_action : mdk_annotations_actions_closepage_action,
	mdk_annotations_actions_createentityfailuremessage_action : mdk_annotations_actions_createentityfailuremessage_action,
	mdk_annotations_actions_createentitysuccessmessage_action : mdk_annotations_actions_createentitysuccessmessage_action,
	mdk_annotations_actions_deleteconfirmation_action : mdk_annotations_actions_deleteconfirmation_action,
	mdk_annotations_actions_deleteentityfailuremessage_action : mdk_annotations_actions_deleteentityfailuremessage_action,
	mdk_annotations_actions_deleteentitysuccessmessage_action : mdk_annotations_actions_deleteentitysuccessmessage_action,
	mdk_annotations_actions_logout_action : mdk_annotations_actions_logout_action,
	mdk_annotations_actions_logoutmessage_action : mdk_annotations_actions_logoutmessage_action,
	mdk_annotations_actions_onwillupdate_action : mdk_annotations_actions_onwillupdate_action,
	mdk_annotations_actions_products_navtoproducts_create_action : mdk_annotations_actions_products_navtoproducts_create_action,
	mdk_annotations_actions_products_navtoproducts_detail_action : mdk_annotations_actions_products_navtoproducts_detail_action,
	mdk_annotations_actions_products_navtoproducts_edit_action : mdk_annotations_actions_products_navtoproducts_edit_action,
	mdk_annotations_actions_products_navtoproducts_list_action : mdk_annotations_actions_products_navtoproducts_list_action,
	mdk_annotations_actions_products_products_createentity_action : mdk_annotations_actions_products_products_createentity_action,
	mdk_annotations_actions_products_products_deleteentity_action : mdk_annotations_actions_products_products_deleteentity_action,
	mdk_annotations_actions_products_products_detailpopover_action : mdk_annotations_actions_products_products_detailpopover_action,
	mdk_annotations_actions_products_products_opendocument_action : mdk_annotations_actions_products_products_opendocument_action,
	mdk_annotations_actions_products_products_updateentity_action : mdk_annotations_actions_products_products_updateentity_action,
	mdk_annotations_actions_service_initializeonline_action : mdk_annotations_actions_service_initializeonline_action,
	mdk_annotations_actions_service_initializeonlinefailuremessage_action : mdk_annotations_actions_service_initializeonlinefailuremessage_action,
	mdk_annotations_actions_service_initializeonlinesuccessmessage_action : mdk_annotations_actions_service_initializeonlinesuccessmessage_action,
	mdk_annotations_actions_updateentityfailuremessage_action : mdk_annotations_actions_updateentityfailuremessage_action,
	mdk_annotations_actions_updateentitysuccessmessage_action : mdk_annotations_actions_updateentitysuccessmessage_action,
	mdk_annotations_globals_appdefinition_version_global : mdk_annotations_globals_appdefinition_version_global,
	mdk_annotations_i18n_i18n_properties : mdk_annotations_i18n_i18n_properties,
	mdk_annotations_jsconfig_json : mdk_annotations_jsconfig_json,
	mdk_annotations_pages_main_page : mdk_annotations_pages_main_page,
	mdk_annotations_pages_products_products_create_page : mdk_annotations_pages_products_products_create_page,
	mdk_annotations_pages_products_products_detail_page : mdk_annotations_pages_products_products_detail_page,
	mdk_annotations_pages_products_products_edit_page : mdk_annotations_pages_products_products_edit_page,
	mdk_annotations_pages_products_products_list_page : mdk_annotations_pages_products_products_list_page,
	mdk_annotations_rules_appupdatefailure_js : mdk_annotations_rules_appupdatefailure_js,
	mdk_annotations_rules_appupdatesuccess_js : mdk_annotations_rules_appupdatesuccess_js,
	mdk_annotations_rules_onwillupdate_js : mdk_annotations_rules_onwillupdate_js,
	mdk_annotations_rules_products_products_deleteconfirmation_js : mdk_annotations_rules_products_products_deleteconfirmation_js,
	mdk_annotations_rules_resetappsettingsandlogout_js : mdk_annotations_rules_resetappsettingsandlogout_js,
	mdk_annotations_services_sampleservicev2_service : mdk_annotations_services_sampleservicev2_service,
	mdk_annotations_styles_styles_css : mdk_annotations_styles_styles_css,
	mdk_annotations_styles_styles_json : mdk_annotations_styles_styles_json,
	mdk_annotations_styles_styles_less : mdk_annotations_styles_styles_less,
	mdk_annotations_styles_styles_nss : mdk_annotations_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/MDK_Annotations/Styles/Styles.json":
/*!**************************************************************!*\
  !*** ./build.definitions/MDK_Annotations/Styles/Styles.json ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MDK_Annotations/jsconfig.json":
/*!*********************************************************!*\
  !*** ./build.definitions/MDK_Annotations/jsconfig.json ***!
  \*********************************************************/
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