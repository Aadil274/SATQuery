/***/ "./src/components/ui/dialog.jsx"
/*!**************************************!*\
  !*** ./src/components/ui/dialog.jsx ***!
  \**************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dialog: () => (/* binding */ Dialog),
/* harmony export */   DialogClose: () => (/* binding */ DialogClose),
/* harmony export */   DialogContent: () => (/* binding */ DialogContent),
/* harmony export */   DialogDescription: () => (/* binding */ DialogDescription),
/* harmony export */   DialogFooter: () => (/* binding */ DialogFooter),
/* harmony export */   DialogHeader: () => (/* binding */ DialogHeader),
/* harmony export */   DialogOverlay: () => (/* binding */ DialogOverlay),
/* harmony export */   DialogPortal: () => (/* binding */ DialogPortal),
/* harmony export */   DialogTitle: () => (/* binding */ DialogTitle),
/* harmony export */   DialogTrigger: () => (/* binding */ DialogTrigger)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-dialog */ "./node_modules/@radix-ui/react-dialog/dist/index.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/utils */ "./src/lib/utils.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/components/ui/dialog.jsx";





const Dialog = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Root;
const DialogTrigger = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Trigger;
const DialogPortal = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Portal;
const DialogClose = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Close;
const DialogOverlay = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(_c = ({
  className,
  ...props
}, ref) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Overlay, {
  ref: ref,
  className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
  "x-file-name": "dialog",
  "x-line-number": "16",
  "x-column": "2",
  "x-component": "Overlay",
  "x-id": "dialog_16_2",
  "x-dynamic": "true",
  "x-excluded": "true",
  ...props
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 16,
  columnNumber: 3
}, undefined));
_c2 = DialogOverlay;
DialogOverlay.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Overlay.displayName;
const DialogContent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(_c3 = ({
  className,
  children,
  ...props
}, ref) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(DialogPortal, {
  "x-file-name": "dialog",
  "x-line-number": "27",
  "x-column": "2",
  "x-component": "DialogPortal",
  "x-id": "dialog_27_2",
  "x-dynamic": "false",
  "x-excluded": "true",
  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(DialogOverlay, {
    "x-file-name": "dialog",
    "x-line-number": "28",
    "x-column": "4",
    "x-component": "DialogOverlay",
    "x-id": "dialog_28_4",
    "x-dynamic": "false",
    "x-excluded": "true"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Content, {
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
    "x-file-name": "dialog",
    "x-line-number": "29",
    "x-column": "4",
    "x-component": "Content",
    "x-id": "dialog_29_4",
    "x-dynamic": "true",
    "x-excluded": "true",
    "x-source-type": "prop",
    "x-source-var": "children",
    "x-source-editable": "false",
    ...props,
    children: [children, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Close, {
      className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
      "x-file-name": "dialog",
      "x-line-number": "37",
      "x-column": "6",
      "x-component": "Close",
      "x-id": "dialog_37_6",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: "h-4 w-4"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("span", {
        className: "sr-only",
        "x-file-name": "dialog",
        "x-line-number": "40",
        "x-column": "8",
        "x-component": "span",
        "x-id": "dialog_40_8",
        "x-dynamic": "false",
        children: "Close"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 5
  }, undefined)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 27,
  columnNumber: 3
}, undefined));
_c4 = DialogContent;
DialogContent.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("div", {
  className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex flex-col space-y-1.5 text-center sm:text-left", className),
  "x-file-name": "dialog",
  "x-line-number": "51",
  "x-column": "2",
  "x-component": "div",
  "x-id": "dialog_51_2",
  "x-dynamic": "true",
  ...props
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 51,
  columnNumber: 3
}, undefined);
_c5 = DialogHeader;
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("div", {
  className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
  "x-file-name": "dialog",
  "x-line-number": "61",
  "x-column": "2",
  "x-component": "div",
  "x-id": "dialog_61_2",
  "x-dynamic": "true",
  ...props
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 61,
  columnNumber: 3
}, undefined);
_c6 = DialogFooter;
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(_c7 = ({
  className,
  ...props
}, ref) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Title, {
  ref: ref,
  className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("text-lg font-semibold leading-none tracking-tight", className),
  "x-file-name": "dialog",
  "x-line-number": "68",
  "x-column": "2",
  "x-component": "Title",
  "x-id": "dialog_68_2",
  "x-dynamic": "true",
  ...props
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 68,
  columnNumber: 3
}, undefined));
_c8 = DialogTitle;
DialogTitle.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Title.displayName;
const DialogDescription = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(_c9 = ({
  className,
  ...props
}, ref) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Description, {
  ref: ref,
  className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("text-sm text-muted-foreground", className),
  "x-file-name": "dialog",
  "x-line-number": "76",
  "x-column": "2",
  "x-component": "Description",
  "x-id": "dialog_76_2",
  "x-dynamic": "true",
  ...props
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 76,
  columnNumber: 3
}, undefined));
_c0 = DialogDescription;
DialogDescription.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_1__.Description.displayName;

var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c0;
__webpack_require__.$Refresh$.register(_c, "DialogOverlay$React.forwardRef");
__webpack_require__.$Refresh$.register(_c2, "DialogOverlay");
__webpack_require__.$Refresh$.register(_c3, "DialogContent$React.forwardRef");
__webpack_require__.$Refresh$.register(_c4, "DialogContent");
__webpack_require__.$Refresh$.register(_c5, "DialogHeader");
__webpack_require__.$Refresh$.register(_c6, "DialogFooter");
__webpack_require__.$Refresh$.register(_c7, "DialogTitle$React.forwardRef");
__webpack_require__.$Refresh$.register(_c8, "DialogTitle");
__webpack_require__.$Refresh$.register(_c9, "DialogDescription$React.forwardRef");
__webpack_require__.$Refresh$.register(_c0, "DialogDescription");

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

