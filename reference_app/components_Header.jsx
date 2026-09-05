/***/ "./src/components/Header.jsx"
/*!***********************************!*\
  !*** ./src/components/Header.jsx ***!
  \***********************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Header: () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/activity.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/history.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/radio.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/satellite.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/components/Header.jsx",
  _s = __webpack_require__.$Refresh$.signature();



const Header = ({
  status,
  historyCount = 0,
  onOpenHistory
}) => {
  _s();
  const [utc, setUtc] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const tick = () => setUtc(new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("header", {
    "data-testid": "app-header",
    className: "sq-glass flex items-center justify-between px-5 h-14 border-b border-cyan-500/20 relative z-30",
    "x-file-name": "Header",
    "x-line-number": "14",
    "x-column": "4",
    "x-component": "header",
    "x-id": "Header_14_4",
    "x-dynamic": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: "flex items-center gap-3",
      "x-file-name": "Header",
      "x-line-number": "18",
      "x-column": "6",
      "x-component": "div",
      "x-id": "Header_18_6",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        className: "relative",
        "x-file-name": "Header",
        "x-line-number": "19",
        "x-column": "8",
        "x-component": "div",
        "x-id": "Header_19_8",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: "w-6 h-6 text-[#FF7300]",
          strokeWidth: 1.8,
          "x-file-name": "Header",
          "x-line-number": "20",
          "x-column": "10",
          "x-component": "Satellite",
          "x-id": "Header_20_10",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 20,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
          className: "absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00E676] sq-pulse",
          "x-file-name": "Header",
          "x-line-number": "21",
          "x-column": "10",
          "x-component": "span",
          "x-id": "Header_21_10",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 21,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        "x-file-name": "Header",
        "x-line-number": "23",
        "x-column": "8",
        "x-component": "div",
        "x-id": "Header_23_8",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("h1", {
          className: "font-head text-xl font-bold tracking-wide leading-none",
          "x-file-name": "Header",
          "x-line-number": "24",
          "x-column": "10",
          "x-component": "h1",
          "x-id": "Header_24_10",
          "x-dynamic": "false",
          children: ["SAT", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
            className: "text-[#FF7300]",
            "x-file-name": "Header",
            "x-line-number": "25",
            "x-column": "15",
            "x-component": "span",
            "x-id": "Header_25_15",
            "x-dynamic": "false",
            children: "QUERY"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 25,
            columnNumber: 16
          }, undefined), " ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
            className: "text-[#00F0FF]",
            "x-file-name": "Header",
            "x-line-number": "25",
            "x-column": "61",
            "x-component": "span",
            "x-id": "Header_25_61",
            "x-dynamic": "false",
            children: "AI"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 25,
            columnNumber: 62
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
          className: "telemetry leading-none mt-0.5",
          "x-file-name": "Header",
          "x-line-number": "27",
          "x-column": "10",
          "x-component": "div",
          "x-id": "Header_27_10",
          "x-dynamic": "false",
          children: "Agentic Earth-Observation Console"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: "hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF7300]/40 bg-[#FF7300]/10",
      "x-file-name": "Header",
      "x-line-number": "31",
      "x-column": "6",
      "x-component": "div",
      "x-id": "Header_31_6",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "w-3.5 h-3.5 text-[#FF7300]",
        "x-file-name": "Header",
        "x-line-number": "32",
        "x-column": "8",
        "x-component": "Radio",
        "x-id": "Header_32_8",
        "x-dynamic": "false"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
        className: "font-mono-x text-[11px] tracking-widest text-[#FF7300]",
        "x-file-name": "Header",
        "x-line-number": "33",
        "x-column": "8",
        "x-component": "span",
        "x-id": "Header_33_8",
        "x-dynamic": "false",
        children: "SATQUERY AI CONSOLE"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: "flex items-center gap-4",
      "x-file-name": "Header",
      "x-line-number": "36",
      "x-column": "6",
      "x-component": "div",
      "x-id": "Header_36_6",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("button", {
        "data-testid": "open-history-button",
        onClick: onOpenHistory,
        className: "sq-btn relative flex items-center gap-1.5 px-3 h-8 rounded-md border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/15 text-cyan-200",
        "x-file-name": "Header",
        "x-line-number": "37",
        "x-column": "8",
        "x-component": "button",
        "x-id": "Header_37_8",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "w-4 h-4",
          "x-file-name": "Header",
          "x-line-number": "42",
          "x-column": "10",
          "x-component": "History",
          "x-id": "Header_42_10",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
          className: "font-head font-semibold text-xs tracking-wide",
          "x-file-name": "Header",
          "x-line-number": "43",
          "x-column": "10",
          "x-component": "span",
          "x-id": "Header_43_10",
          "x-dynamic": "false",
          children: "HISTORY"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 11
        }, undefined), historyCount > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
          "data-testid": "history-count",
          className: "min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF7300] text-black text-[10px] font-bold flex items-center justify-center",
          "x-file-name": "Header",
          "x-line-number": "45",
          "x-column": "12",
          "x-component": "span",
          "x-id": "Header_45_12",
          "x-dynamic": "true",
          "x-source-type": "prop",
          "x-source-var": "historyCount",
          "x-source-editable": "false",
          children: historyCount
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 45,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        className: "hidden sm:flex items-center gap-2",
        "data-testid": "run-status",
        "x-file-name": "Header",
        "x-line-number": "48",
        "x-column": "8",
        "x-component": "div",
        "x-id": "Header_48_8",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
          className: `w-4 h-4 ${status === "running" ? "text-[#00F0FF] animate-pulse" : "text-slate-500"}`,
          "x-file-name": "Header",
          "x-line-number": "49",
          "x-column": "10",
          "x-component": "Activity",
          "x-id": "Header_49_10",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
          className: "telemetry",
          "x-file-name": "Header",
          "x-line-number": "50",
          "x-column": "10",
          "x-component": "span",
          "x-id": "Header_50_10",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: status === "running" ? "PROCESSING" : status === "done" ? "READY" : "STANDBY"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        className: "font-mono-x text-[11px] text-[#00F0FF]/80 tabular-nums",
        "data-testid": "utc-clock",
        "x-file-name": "Header",
        "x-line-number": "52",
        "x-column": "8",
        "x-component": "div",
        "x-id": "Header_52_8",
        "x-dynamic": "true",
        "x-source-type": "state",
        "x-source-var": "utc",
        "x-source-editable": "false",
        children: utc
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }, undefined);
};
_s(Header, "Rl3Z+5gdmFNjgq0+2aaM/H9SBUo=");
_c = Header;
var _c;
__webpack_require__.$Refresh$.register(_c, "Header");

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

