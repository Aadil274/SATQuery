/***/ "./src/components/ui/scroll-area.jsx"
/*!*******************************************!*\
  !*** ./src/components/ui/scroll-area.jsx ***!
  \*******************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScrollArea: () => (/* binding */ ScrollArea),
/* harmony export */   ScrollBar: () => (/* binding */ ScrollBar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-scroll-area */ "./node_modules/@radix-ui/react-scroll-area/dist/index.mjs");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/utils */ "./src/lib/utils.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/components/ui/scroll-area.jsx";




const ScrollArea = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(_c = ({
  className,
  children,
  ...props
}, ref) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_1__.Root, {
  ref: ref,
  className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("relative overflow-hidden", className),
  "x-file-name": "scroll-area",
  "x-line-number": "7",
  "x-column": "2",
  "x-component": "Root",
  "x-id": "scroll-area_7_2",
  "x-dynamic": "true",
  ...props,
  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_1__.Viewport, {
    className: "h-full w-full rounded-[inherit]",
    "x-file-name": "scroll-area",
    "x-line-number": "11",
    "x-column": "4",
    "x-component": "Viewport",
    "x-id": "scroll-area_11_4",
    "x-dynamic": "true",
    "x-excluded": "true",
    "x-source-type": "prop",
    "x-source-var": "children",
    "x-source-editable": "false",
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 11,
    columnNumber: 5
  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(ScrollBar, {
    "x-file-name": "scroll-area",
    "x-line-number": "14",
    "x-column": "4",
    "x-component": "ScrollBar",
    "x-id": "scroll-area_14_4",
    "x-dynamic": "true"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_1__.Corner, {
    "x-file-name": "scroll-area",
    "x-line-number": "15",
    "x-column": "4",
    "x-component": "Corner",
    "x-id": "scroll-area_15_4",
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
_c2 = ScrollArea;
ScrollArea.displayName = _radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_1__.Root.displayName;
const ScrollBar = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(_c3 = ({
  className,
  orientation = "vertical",
  ...props
}, ref) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_1__.ScrollAreaScrollbar, {
  ref: ref,
  orientation: orientation,
  className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
  "x-file-name": "scroll-area",
  "x-line-number": "21",
  "x-column": "2",
  "x-component": "ScrollAreaScrollbar",
  "x-id": "scroll-area_21_2",
  "x-dynamic": "true",
  ...props,
  children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_1__.ScrollAreaThumb, {
    className: "relative flex-1 rounded-full bg-border",
    "x-file-name": "scroll-area",
    "x-line-number": "33",
    "x-column": "4",
    "x-component": "ScrollAreaThumb",
    "x-id": "scroll-area_33_4",
    "x-dynamic": "false"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 5
  }, undefined)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 21,
  columnNumber: 3
}, undefined));
_c4 = ScrollBar;
ScrollBar.displayName = _radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_1__.ScrollAreaScrollbar.displayName;

var _c, _c2, _c3, _c4;
__webpack_require__.$Refresh$.register(_c, "ScrollArea$React.forwardRef");
__webpack_require__.$Refresh$.register(_c2, "ScrollArea");
__webpack_require__.$Refresh$.register(_c3, "ScrollBar$React.forwardRef");
__webpack_require__.$Refresh$.register(_c4, "ScrollBar");

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

