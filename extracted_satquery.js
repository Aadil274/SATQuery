./src/pages/SatQuery.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/App.js";





function App() {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("div", {
    className: "App",
    "x-file-name": "App",
    "x-line-number": "8",
    "x-column": "4",
    "x-component": "div",
    "x-id": "App_8_4",
    "x-dynamic": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.BrowserRouter, {
      "x-file-name": "App",
      "x-line-number": "9",
      "x-column": "6",
      "x-component": "BrowserRouter",
      "x-id": "App_9_6",
      "x-dynamic": "false",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Routes, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
          path: "/",
          element: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_pages_SatQuery__WEBPACK_IMPORTED_MODULE_3__["default"], {
            "x-file-name": "App",
            "x-line-number": "11",
            "x-column": "35",
            "x-component": "SatQuery",
            "x-id": "App_11_35",
            "x-dynamic": "true"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 11,
            columnNumber: 36
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 11,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_components_ui_sonner__WEBPACK_IMPORTED_MODULE_2__.Toaster, {
      theme: "dark",
      position: "bottom-right",
      richColors: true,
      "x-file-name": "App",
      "x-line-number": "14",
      "x-column": "6",
      "x-component": "Toaster",
      "x-id": "App_14_6",
      "x-dynamic": "true"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 5
  }, this);
}
_c = App;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);
var _c;
__webpack_require__.$Refresh$.register(_c, "App");

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

/***/ "./src/components/BottomDock.jsx"
/*!***************************************!*\
  !*** ./src/components/BottomDock.jsx ***!
  \***************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BottomDock: () => (/* binding */ BottomDock)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/loader-circle.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-down.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-up.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/cpu.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/database.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/terminal.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/components/BottomDock.jsx",
  _s = __webpack_require__.$Refresh$.signature();



const STATUS_ICON = {
  done: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "w-3.5 h-3.5 text-emerald-400",
    "x-file-name": "BottomDock",
    "x-line-number": "5",
    "x-column": "8",
    "x-component": "CheckCircle2",
    "x-id": "BottomDock_5_8",
    "x-dynamic": "false"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 9
  }, undefined),
  warn: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "w-3.5 h-3.5 text-amber-400",
    "x-file-name": "BottomDock",
    "x-line-number": "6",
    "x-column": "8",
    "x-component": "AlertTriangle",
    "x-id": "BottomDock_6_8",
    "x-dynamic": "false"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 6,
    columnNumber: 9
  }, undefined),
  error: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "w-3.5 h-3.5 text-rose-400",
    "x-file-name": "BottomDock",
    "x-line-number": "7",
    "x-column": "9",
    "x-component": "XCircle",
    "x-id": "BottomDock_7_9",
    "x-dynamic": "false"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 10
  }, undefined)
};
const BottomDock = ({
  analysis,
  modelInfo,
  running
}) => {
  _s();
  const [tab, setTab] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("trace");
  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const trace = (analysis === null || analysis === void 0 ? void 0 : analysis.trace) || [];
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
    "data-testid": "bottom-dock",
    className: "sq-glass border-t border-cyan-500/20 z-20",
    "x-file-name": "BottomDock",
    "x-line-number": "16",
    "x-column": "4",
    "x-component": "div",
    "x-id": "BottomDock_16_4",
    "x-dynamic": "true",
    "x-source-type": "computed",
    "x-source-editable": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
      className: "flex items-center px-3 h-9 gap-1",
      "x-file-name": "BottomDock",
      "x-line-number": "17",
      "x-column": "6",
      "x-component": "div",
      "x-id": "BottomDock_17_6",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(TabBtn, {
        active: tab === "trace",
        onClick: () => {
          setTab("trace");
          setOpen(true);
        },
        tid: "tab-trace",
        "x-file-name": "BottomDock",
        "x-line-number": "18",
        "x-column": "8",
        "x-component": "TabBtn",
        "x-id": "BottomDock_18_8",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
          className: "w-3.5 h-3.5",
          "x-file-name": "BottomDock",
          "x-line-number": "19",
          "x-column": "10",
          "x-component": "Terminal",
          "x-id": "BottomDock_19_10",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 11
        }, undefined), " Live Execution Trace", running && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: "w-3 h-3 animate-spin ml-1",
          "x-file-name": "BottomDock",
          "x-line-number": "20",
          "x-column": "22",
          "x-component": "Loader2",
          "x-id": "BottomDock_20_22",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 20,
          columnNumber: 23
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(TabBtn, {
        active: tab === "model",
        onClick: () => {
          setTab("model");
          setOpen(true);
        },
        tid: "tab-model",
        "x-file-name": "BottomDock",
        "x-line-number": "22",
        "x-column": "8",
        "x-component": "TabBtn",
        "x-id": "BottomDock_22_8",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
          className: "w-3.5 h-3.5",
          "x-file-name": "BottomDock",
          "x-line-number": "23",
          "x-column": "10",
          "x-component": "Cpu",
          "x-id": "BottomDock_23_10",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 23,
          columnNumber: 11
        }, undefined), " Model Info / Domain Adaptation"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("button", {
        "data-testid": "dock-toggle",
        onClick: () => setOpen(v => !v),
        className: "sq-btn ml-auto w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-cyan-300",
        "x-file-name": "BottomDock",
        "x-line-number": "25",
        "x-column": "8",
        "x-component": "button",
        "x-id": "BottomDock_25_8",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: open ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
          className: "w-4 h-4"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 19
        }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
          className: "w-4 h-4"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 57
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, undefined), open && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
      className: "h-[168px] overflow-auto px-4 py-2 border-t border-cyan-500/10 bg-[#0B0E14]/60",
      "x-file-name": "BottomDock",
      "x-line-number": "31",
      "x-column": "8",
      "x-component": "div",
      "x-id": "BottomDock_31_8",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: tab === "trace" ? trace.length === 0 ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("p", {
        className: "text-xs text-slate-600 font-mono-x py-6 text-center",
        "x-file-name": "BottomDock",
        "x-line-number": "34",
        "x-column": "14",
        "x-component": "p",
        "x-id": "BottomDock_34_14",
        "x-dynamic": "false",
        children: "Awaiting analysis \u2014 the agent's step-by-step execution chain will appear here."
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 15
      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
        className: "font-mono-x text-[11px] space-y-0.5",
        "x-file-name": "BottomDock",
        "x-line-number": "36",
        "x-column": "14",
        "x-component": "div",
        "x-id": "BottomDock_36_14",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: [trace.map((t, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
          className: "flex items-center gap-2 sq-fade-up",
          style: {
            animationDelay: `${i * 25}ms`
          },
          "x-file-name": "BottomDock",
          "x-line-number": "38",
          "x-column": "18",
          "x-component": "div",
          "x-id": "BottomDock_38_18",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
            className: "text-slate-600 w-14 shrink-0 text-right",
            "x-file-name": "BottomDock",
            "x-line-number": "39",
            "x-column": "20",
            "x-component": "span",
            "x-id": "BottomDock_39_20",
            "x-dynamic": "true",
            "x-source-type": "computed",
            "x-source-editable": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "BottomDock",
              "x-line-number": "39",
              "x-column": "20",
              "x-component": "span",
              "x-id": "BottomDock_39_20_expr0",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: String(t.ms).padStart(5)
            }, void 0, false), "ms"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 39,
            columnNumber: 21
          }, undefined), STATUS_ICON[t.status] || STATUS_ICON.done, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
            className: "text-slate-200",
            "x-file-name": "BottomDock",
            "x-line-number": "41",
            "x-column": "20",
            "x-component": "span",
            "x-id": "BottomDock_41_20",
            "x-dynamic": "true",
            "x-source-type": "static-imported",
            "x-source-var": "trace",
            "x-source-path": "label",
            "x-source-editable": "false",
            "x-array-var": "trace",
            "x-array-item-param": "t",
            children: t.label
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 41,
            columnNumber: 21
          }, undefined), t.detail && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
            className: "text-cyan-500/70",
            "x-file-name": "BottomDock",
            "x-line-number": "42",
            "x-column": "33",
            "x-component": "span",
            "x-id": "BottomDock_42_33",
            "x-dynamic": "true",
            "x-source-type": "static-imported",
            "x-source-var": "trace",
            "x-source-path": "detail",
            "x-source-editable": "false",
            "x-array-var": "trace",
            "x-array-item-param": "t",
            children: ["\xB7 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "BottomDock",
              "x-line-number": "42",
              "x-column": "33",
              "x-component": "span",
              "x-id": "BottomDock_42_33_expr1",
              "x-dynamic": "true",
              "x-source-type": "static-imported",
              "x-source-var": "trace",
              "x-source-path": "detail",
              "x-source-editable": "false",
              "x-array-var": "trace",
              "x-array-item-param": "t",
              children: t.detail
            }, void 0, false)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 42,
            columnNumber: 34
          }, undefined)]
        }, i, true, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 19
        }, undefined)), analysis && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
          className: "mt-2 text-emerald-400",
          "x-file-name": "BottomDock",
          "x-line-number": "46",
          "x-column": "18",
          "x-component": "div",
          "x-id": "BottomDock_46_18",
          "x-dynamic": "true",
          "x-source-type": "prop",
          "x-source-var": "analysis",
          "x-source-path": "elapsed_sec",
          "x-source-editable": "false",
          children: ["\u2713 Pipeline complete in ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
            "data-ve-dynamic": "true",
            "x-excluded": "true",
            style: {
              display: "contents"
            },
            "x-file-name": "BottomDock",
            "x-line-number": "46",
            "x-column": "18",
            "x-component": "div",
            "x-id": "BottomDock_46_18_expr1",
            "x-dynamic": "true",
            "x-source-type": "prop",
            "x-source-var": "analysis",
            "x-source-path": "elapsed_sec",
            "x-source-editable": "false",
            children: analysis.elapsed_sec
          }, void 0, false), "s"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 19
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 15
      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(ModelInfo, {
        info: modelInfo,
        "x-file-name": "BottomDock",
        "x-line-number": "51",
        "x-column": "12",
        "x-component": "ModelInfo",
        "x-id": "BottomDock_51_12",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 13
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, undefined);
};
_s(BottomDock, "5JVVCR+hNpGXo5oNDJpmZVY6iT8=");
_c = BottomDock;
const ModelInfo = ({
  info
}) => {
  var _info$training, _info$training2, _info$training3, _info$training4, _info$datasets, _info$tasks, _info$benchmarks;
  if (!info) return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("p", {
    className: "text-xs text-slate-600 py-6 text-center",
    "x-file-name": "BottomDock",
    "x-line-number": "60",
    "x-column": "20",
    "x-component": "p",
    "x-id": "BottomDock_60_20",
    "x-dynamic": "false",
    children: "Loading model registry\u2026"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 60,
    columnNumber: 21
  }, undefined);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-4 text-[11px]",
    "x-file-name": "BottomDock",
    "x-line-number": "62",
    "x-column": "4",
    "x-component": "div",
    "x-id": "BottomDock_62_4",
    "x-dynamic": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
      className: "space-y-1",
      "x-file-name": "BottomDock",
      "x-line-number": "63",
      "x-column": "6",
      "x-component": "div",
      "x-id": "BottomDock_63_6",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
        className: "telemetry mb-1 flex items-center gap-1.5",
        "x-file-name": "BottomDock",
        "x-line-number": "64",
        "x-column": "8",
        "x-component": "div",
        "x-id": "BottomDock_64_8",
        "x-dynamic": "true",
        "x-source-type": "prop",
        "x-source-var": "info",
        "x-source-path": "name",
        "x-source-editable": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
          className: "w-3.5 h-3.5 text-[#FF7300]",
          "x-file-name": "BottomDock",
          "x-line-number": "64",
          "x-column": "66",
          "x-component": "Cpu",
          "x-id": "BottomDock_64_66",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 67
        }, undefined), " ", info.name]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(KV, {
        k: "Base model",
        v: info.base_model,
        "x-file-name": "BottomDock",
        "x-line-number": "65",
        "x-column": "8",
        "x-component": "KV",
        "x-id": "BottomDock_65_8",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(KV, {
        k: "Adaptation",
        v: info.adaptation,
        "x-file-name": "BottomDock",
        "x-line-number": "66",
        "x-column": "8",
        "x-component": "KV",
        "x-id": "BottomDock_66_8",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }, undefined), /*