/***/ "./src/components/ui/slider.jsx"
/*!**************************************!*\
  !*** ./src/components/ui/slider.jsx ***!
  \**************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slider: () => (/* binding */ Slider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _radix_ui_react_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-slider */ "./node_modules/@radix-ui/react-slider/dist/index.mjs");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/utils */ "./src/lib/utils.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/components/ui/slider.jsx";




const Slider = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(_c = ({
  className,
  ...props
}, ref) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_radix_ui_react_slider__WEBPACK_IMPORTED_MODULE_1__.Root, {
  ref: ref,
  className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("relative flex w-full touch-none select-none items-center", className),
  "x-file-name": "slider",
  "x-line-number": "7",
  "x-column": "2",
  "x-component": "Root",
  "x-id": "slider_7_2",
  "x-dynamic": "true",
  ...props,
  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_radix_ui_react_slider__WEBPACK_IMPORTED_MODULE_1__.Track, {
    className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
    "x-file-name": "slider",
    "x-line-number": "11",
    "x-column": "4",
    "x-component": "Track",
    "x-id": "slider_11_4",
    "x-dynamic": "false",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_radix_ui_react_slider__WEBPACK_IMPORTED_MODULE_1__.Range, {
      className: "absolute h-full bg-primary",
      "x-file-name": "slider",
      "x-line-number": "13",
      "x-column": "6",
      "x-component": "Range",
      "x-id": "slider_13_6",
      "x-dynamic": "false"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 11,
    columnNumber: 5
  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_radix_ui_react_slider__WEBPACK_IMPORTED_MODULE_1__.Thumb, {
    className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    "x-file-name": "slider",
    "x-line-number": "15",
    "x-column": "4",
    "x-component": "Thumb",
    "x-id": "slider_15_4",
    "x-dynamic": "false"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 15,
    columnNumber: 5
  }, undefined)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 7,
  columnNumber: 3
}, undefined));
_c2 = Slider;
Slider.displayName = _radix_ui_react_slider__WEBPACK_IMPORTED_MODULE_1__.Root.displayName;

var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "Slider$React.forwardRef");
__webpack_require__.$Refresh$.register(_c2, "Slider");

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ },

