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
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(KV, {
        k: "Method",
        v: `${(_info$training = info.training) === null || _info$training === void 0 ? void 0 : _info$training.method} · ${(_info$training2 = info.training) === null || _info$training2 === void 0 ? void 0 : _info$training2.trainable_params} params`,
        "x-file-name": "BottomDock",
        "x-line-number": "67",
        "x-column": "8",
        "x-component": "KV",
        "x-id": "BottomDock_67_8",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(KV, {
        k: "Samples",
        v: `${(_info$training3 = info.training) === null || _info$training3 === void 0 ? void 0 : _info$training3.samples} · ${(_info$training4 = info.training) === null || _info$training4 === void 0 ? void 0 : _info$training4.epochs} epochs`,
        "x-file-name": "BottomDock",
        "x-line-number": "68",
        "x-column": "8",
        "x-component": "KV",
        "x-id": "BottomDock_68_8",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
        className: "inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-300",
        "x-file-name": "BottomDock",
        "x-line-number": "69",
        "x-column": "8",
        "x-component": "div",
        "x-id": "BottomDock_69_8",
        "x-dynamic": "true",
        "x-source-type": "prop",
        "x-source-var": "info",
        "x-source-path": "status",
        "x-source-editable": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
          className: "w-3 h-3",
          "x-file-name": "BottomDock",
          "x-line-number": "70",
          "x-column": "10",
          "x-component": "CheckCircle2",
          "x-id": "BottomDock_70_10",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 11
        }, undefined), " ", info.status]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
      className: "space-y-1",
      "x-file-name": "BottomDock",
      "x-line-number": "73",
      "x-column": "6",
      "x-component": "div",
      "x-id": "BottomDock_73_6",
      "x-dynamic": "true",
      "x-source-type": "unknown",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
        className: "telemetry mb-1 flex items-center gap-1.5",
        "x-file-name": "BottomDock",
        "x-line-number": "74",
        "x-column": "8",
        "x-component": "div",
        "x-id": "BottomDock_74_8",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
          className: "w-3.5 h-3.5 text-[#00F0FF]",
          "x-file-name": "BottomDock",
          "x-line-number": "74",
          "x-column": "66",
          "x-component": "Database",
          "x-id": "BottomDock_74_66",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 74,
          columnNumber: 67
        }, undefined), " Datasets"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 9
      }, undefined), (_info$datasets = info.datasets) === null || _info$datasets === void 0 ? void 0 : _info$datasets.map((d, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
        className: "text-slate-300 font-mono-x leading-snug",
        "x-file-name": "BottomDock",
        "x-line-number": "75",
        "x-column": "38",
        "x-component": "div",
        "x-id": "BottomDock_75_38",
        "x-dynamic": "true",
        "x-source-type": "static-imported",
        "x-source-var": "_info$datasets",
        "x-source-editable": "false",
        "x-array-var": "_info$datasets",
        "x-array-item-param": "d",
        children: ["\u25B8 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
          "data-ve-dynamic": "true",
          "x-excluded": "true",
          style: {
            display: "contents"
          },
          "x-file-name": "BottomDock",
          "x-line-number": "75",
          "x-column": "38",
          "x-component": "div",
          "x-id": "BottomDock_75_38_expr1",
          "x-dynamic": "true",
          "x-source-type": "static-imported",
          "x-source-var": "_info$datasets",
          "x-source-editable": "false",
          "x-array-var": "_info$datasets",
          "x-array-item-param": "d",
          children: d
        }, void 0, false)]
      }, i, true, {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 39
      }, undefined)), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
        className: "telemetry mt-2 mb-1",
        "x-file-name": "BottomDock",
        "x-line-number": "76",
        "x-column": "8",
        "x-component": "div",
        "x-id": "BottomDock_76_8",
        "x-dynamic": "false",
        children: "Tasks"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
        className: "flex flex-wrap gap-1",
        "x-file-name": "BottomDock",
        "x-line-number": "77",
        "x-column": "8",
        "x-component": "div",
        "x-id": "BottomDock_77_8",
        "x-dynamic": "true",
        "x-source-type": "unknown",
        "x-source-editable": "false",
        children: (_info$tasks = info.tasks) === null || _info$tasks === void 0 ? void 0 : _info$tasks.map((t, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
          className: "px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 font-mono-x text-[10px]",
          "x-file-name": "BottomDock",
          "x-line-number": "78",
          "x-column": "37",
          "x-component": "span",
          "x-id": "BottomDock_78_37",
          "x-dynamic": "true",
          "x-source-type": "static-imported",
          "x-source-var": "_info$tasks",
          "x-source-editable": "false",
          "x-array-var": "_info$tasks",
          "x-array-item-param": "t",
          children: t
        }, i, false, {
          fileName: _jsxFileName,
          lineNumber: 78,
          columnNumber: 38
        }, undefined))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
      "x-file-name": "BottomDock",
      "x-line-number": "81",
      "x-column": "6",
      "x-component": "div",
      "x-id": "BottomDock_81_6",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
        className: "telemetry mb-1",
        "x-file-name": "BottomDock",
        "x-line-number": "82",
        "x-column": "8",
        "x-component": "div",
        "x-id": "BottomDock_82_8",
        "x-dynamic": "false",
        children: "Domain Adaptation Gains"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("table", {
        className: "w-full font-mono-x text-[10px]",
        "data-testid": "benchmark-table",
        "x-file-name": "BottomDock",
        "x-line-number": "83",
        "x-column": "8",
        "x-component": "table",
        "x-id": "BottomDock_83_8",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("thead", {
          "x-file-name": "BottomDock",
          "x-line-number": "84",
          "x-column": "10",
          "x-component": "thead",
          "x-id": "BottomDock_84_10",
          "x-dynamic": "false",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("tr", {
            className: "text-cyan-500/70",
            "x-file-name": "BottomDock",
            "x-line-number": "84",
            "x-column": "17",
            "x-component": "tr",
            "x-id": "BottomDock_84_17",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("th", {
              className: "text-left font-normal",
              "x-file-name": "BottomDock",
              "x-line-number": "84",
              "x-column": "50",
              "x-component": "th",
              "x-id": "BottomDock_84_50",
              "x-dynamic": "false",
              children: "Metric"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 84,
              columnNumber: 51
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("th", {
              className: "text-right font-normal",
              "x-file-name": "BottomDock",
              "x-line-number": "84",
              "x-column": "99",
              "x-component": "th",
              "x-id": "BottomDock_84_99",
              "x-dynamic": "false",
              children: "Base"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 84,
              columnNumber: 100
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("th", {
              className: "text-right font-normal",
              "x-file-name": "BottomDock",
              "x-line-number": "84",
              "x-column": "147",
              "x-component": "th",
              "x-id": "BottomDock_84_147",
              "x-dynamic": "false",
              children: "Adapted"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 84,
              columnNumber: 148
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("th", {
              className: "text-right font-normal",
              "x-file-name": "BottomDock",
              "x-line-number": "84",
              "x-column": "198",
              "x-component": "th",
              "x-id": "BottomDock_84_198",
              "x-dynamic": "false",
              children: "\u0394"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 84,
              columnNumber: 199
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 84,
            columnNumber: 18
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("tbody", {
          "x-file-name": "BottomDock",
          "x-line-number": "85",
          "x-column": "10",
          "x-component": "tbody",
          "x-id": "BottomDock_85_10",
          "x-dynamic": "true",
          "x-source-type": "unknown",
          "x-source-editable": "false",
          children: (_info$benchmarks = info.benchmarks) === null || _info$benchmarks === void 0 ? void 0 : _info$benchmarks.map((b, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("tr", {
            className: "border-t border-white/5",
            "x-file-name": "BottomDock",
            "x-line-number": "87",
            "x-column": "14",
            "x-component": "tr",
            "x-id": "BottomDock_87_14",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("td", {
              className: "text-slate-300 py-0.5",
              "x-file-name": "BottomDock",
              "x-line-number": "88",
              "x-column": "16",
              "x-component": "td",
              "x-id": "BottomDock_88_16",
              "x-dynamic": "true",
              "x-source-type": "static-imported",
              "x-source-var": "_info$benchmarks",
              "x-source-path": "metric",
              "x-source-editable": "false",
              "x-array-var": "_info$benchmarks",
              "x-array-item-param": "b",
              children: b.metric
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 88,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("td", {
              className: "text-right text-slate-500",
              "x-file-name": "BottomDock",
              "x-line-number": "89",
              "x-column": "16",
              "x-component": "td",
              "x-id": "BottomDock_89_16",
              "x-dynamic": "true",
              "x-source-type": "static-imported",
              "x-source-var": "_info$benchmarks",
              "x-source-path": "base",
              "x-source-editable": "false",
              "x-array-var": "_info$benchmarks",
              "x-array-item-param": "b",
              children: b.base
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 89,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("td", {
              className: "text-right text-emerald-300",
              "x-file-name": "BottomDock",
              "x-line-number": "90",
              "x-column": "16",
              "x-component": "td",
              "x-id": "BottomDock_90_16",
              "x-dynamic": "true",
              "x-source-type": "static-imported",
              "x-source-var": "_info$benchmarks",
              "x-source-path": "adapted",
              "x-source-editable": "false",
              "x-array-var": "_info$benchmarks",
              "x-array-item-param": "b",
              children: b.adapted
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 90,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("td", {
              className: "text-right text-[#FF7300]",
              "x-file-name": "BottomDock",
              "x-line-number": "91",
              "x-column": "16",
              "x-component": "td",
              "x-id": "BottomDock_91_16",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: ["+", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
                "data-ve-dynamic": "true",
                "x-excluded": "true",
                style: {
                  display: "contents"
                },
                "x-file-name": "BottomDock",
                "x-line-number": "91",
                "x-column": "16",
                "x-component": "td",
                "x-id": "BottomDock_91_16_expr1",
                "x-dynamic": "true",
                "x-source-type": "computed",
                "x-source-editable": "false",
                children: (b.adapted - b.base).toFixed(1)
              }, void 0, false)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 91,
              columnNumber: 17
            }, undefined)]
          }, i, true, {
            fileName: _jsxFileName,
            lineNumber: 87,
            columnNumber: 15
          }, undefined))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 85,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 62,
    columnNumber: 5
  }, undefined);
};
_c2 = ModelInfo;
const KV = ({
  k,
  v
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("div", {
  className: "flex gap-2",
  "x-file-name": "BottomDock",
  "x-line-number": "102",
  "x-column": "2",
  "x-component": "div",
  "x-id": "BottomDock_102_2",
  "x-dynamic": "false",
  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
    className: "text-slate-500 w-20 shrink-0",
    "x-file-name": "BottomDock",
    "x-line-number": "102",
    "x-column": "30",
    "x-component": "span",
    "x-id": "BottomDock_102_30",
    "x-dynamic": "true",
    "x-source-type": "prop",
    "x-source-var": "k",
    "x-source-editable": "false",
    children: k
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 102,
    columnNumber: 31
  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
    className: "text-slate-200",
    "x-file-name": "BottomDock",
    "x-line-number": "102",
    "x-column": "87",
    "x-component": "span",
    "x-id": "BottomDock_102_87",
    "x-dynamic": "true",
    "x-source-type": "prop",
    "x-source-var": "v",
    "x-source-editable": "false",
    children: v
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 102,
    columnNumber: 88
  }, undefined)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 102,
  columnNumber: 3
}, undefined);
_c3 = KV;
const TabBtn = ({
  children,
  active,
  onClick,
  tid
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("button", {
  "data-testid": tid,
  onClick: onClick,
  className: `sq-btn flex items-center gap-1.5 px-3 h-7 rounded-md text-[11px] font-head font-semibold tracking-wide ${active ? "bg-cyan-500/15 text-cyan-200 sq-glow" : "text-slate-400 hover:text-cyan-300"}`,
  "x-file-name": "BottomDock",
  "x-line-number": "106",
  "x-column": "2",
  "x-component": "button",
  "x-id": "BottomDock_106_2",
  "x-dynamic": "true",
  "x-source-type": "prop",
  "x-source-var": "children",
  "x-source-editable": "false",
  children: children
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 106,
  columnNumber: 3
}, undefined);
_c4 = TabBtn;
var _c, _c2, _c3, _c4;
__webpack_require__.$Refresh$.register(_c, "BottomDock");
__webpack_require__.$Refresh$.register(_c2, "ModelInfo");
__webpack_require__.$Refresh$.register(_c3, "KV");
__webpack_require__.$Refresh$.register(_c4, "TabBtn");

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

