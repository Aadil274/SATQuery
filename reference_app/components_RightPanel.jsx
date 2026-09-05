/***/ "./src/components/RightPanel.jsx"
/*!***************************************!*\
  !*** ./src/components/RightPanel.jsx ***!
  \***************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RightPanel: () => (/* binding */ RightPanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/loader-circle.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/sparkles.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-right.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/cpu.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/download.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/send.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/shield-check.js");
/* harmony import */ var _components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/components/ui/scroll-area */ "./src/components/ui/scroll-area.jsx");
/* harmony import */ var _lib_demoData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/lib/demoData */ "./src/lib/demoData.js");
/* harmony import */ var _lib_report__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/lib/report */ "./src/lib/report.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/components/RightPanel.jsx",
  _s = __webpack_require__.$Refresh$.signature();






const CONF = {
  HIGH: {
    text: "text-emerald-400",
    bg: "bg-emerald-950/60",
    border: "border-emerald-500/60",
    bar: "#00E676"
  },
  MEDIUM: {
    text: "text-amber-400",
    bg: "bg-amber-950/60",
    border: "border-amber-500/60",
    bar: "#FFB300"
  },
  LOW: {
    text: "text-rose-400",
    bg: "bg-rose-950/60",
    border: "border-rose-500/60",
    bar: "#FF1744"
  }
};
const RightPanel = ({
  slots,
  analysis,
  running,
  onAnalyze
}) => {
  _s();
  var _analysis$plan, _analysis$plan2, _analysis$plan3, _r$primary_changes, _r$land_cover, _r$evidence_regions, _analysis$result, _analysis$result$evid;
  const [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handler = e => setQuery(e.detail);
    window.addEventListener("sq-set-query", handler);
    return () => window.removeEventListener("sq-set-query", handler);
  }, []);
  const suggestions = slots.length < 2 ? _lib_demoData__WEBPACK_IMPORTED_MODULE_10__.SUGGESTED.single : slots.some(s => s.modality === "sar") ? _lib_demoData__WEBPACK_IMPORTED_MODULE_10__.SUGGESTED.pair_modal : _lib_demoData__WEBPACK_IMPORTED_MODULE_10__.SUGGESTED.pair_optical;
  const submit = () => {
    if (query.trim() && slots.length && !running) onAnalyze(query.trim());
  };
  const r = analysis === null || analysis === void 0 ? void 0 : analysis.result;
  const c = analysis === null || analysis === void 0 ? void 0 : analysis.confidence;
  const conf = c ? CONF[c.level] : null;
  const answer = (r === null || r === void 0 ? void 0 : r.answer) || (r === null || r === void 0 ? void 0 : r.caption) || (r === null || r === void 0 ? void 0 : r.fusion_insight);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("aside", {
    "data-testid": "right-panel",
    className: "w-[380px] shrink-0 h-full sq-glass border-l border-cyan-500/15 flex flex-col",
    "x-file-name": "RightPanel",
    "x-line-number": "35",
    "x-column": "4",
    "x-component": "aside",
    "x-id": "RightPanel_35_4",
    "x-dynamic": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
      className: "p-4 border-b border-cyan-500/15",
      "x-file-name": "RightPanel",
      "x-line-number": "37",
      "x-column": "6",
      "x-component": "div",
      "x-id": "RightPanel_37_6",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
        className: "telemetry mb-2 flex items-center gap-1.5",
        "x-file-name": "RightPanel",
        "x-line-number": "38",
        "x-column": "8",
        "x-component": "div",
        "x-id": "RightPanel_38_8",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "w-3.5 h-3.5 text-[#FF7300]",
          "x-file-name": "RightPanel",
          "x-line-number": "38",
          "x-column": "66",
          "x-component": "Sparkles",
          "x-id": "RightPanel_38_66",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 67
        }, undefined), " Natural-Language Query"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
        className: "relative",
        "x-file-name": "RightPanel",
        "x-line-number": "39",
        "x-column": "8",
        "x-component": "div",
        "x-id": "RightPanel_39_8",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("textarea", {
          "data-testid": "query-input",
          value: query,
          onChange: e => setQuery(e.target.value),
          onKeyDown: e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          },
          rows: 2,
          placeholder: slots.length ? "Ask about the imagery…" : "Load imagery first…",
          disabled: !slots.length,
          className: "w-full resize-none rounded-lg bg-[#0B0E14] border border-cyan-500/25 focus:border-cyan-400 focus:sq-glow outline-none p-3 pr-11 text-sm text-slate-100 placeholder:text-slate-600 disabled:opacity-50",
          "x-file-name": "RightPanel",
          "x-line-number": "40",
          "x-column": "10",
          "x-component": "textarea",
          "x-id": "RightPanel_40_10",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("button", {
          "data-testid": "analyze-button",
          onClick: submit,
          disabled: !query.trim() || !slots.length || running,
          className: "sq-btn absolute right-2 bottom-2 w-8 h-8 rounded-md bg-[#FF7300] hover:bg-[#ff8626] text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed",
          "x-file-name": "RightPanel",
          "x-line-number": "50",
          "x-column": "10",
          "x-component": "button",
          "x-id": "RightPanel_50_10",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: running ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
            className: "w-4 h-4 animate-spin",
            "x-file-name": "RightPanel",
            "x-line-number": "56",
            "x-column": "23",
            "x-component": "Loader2",
            "x-id": "RightPanel_56_23",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 56,
            columnNumber: 24
          }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
            className: "w-4 h-4",
            "x-file-name": "RightPanel",
            "x-line-number": "56",
            "x-column": "70",
            "x-component": "Send",
            "x-id": "RightPanel_56_70",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 56,
            columnNumber: 71
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
        className: "flex flex-wrap gap-1.5 mt-2",
        "x-file-name": "RightPanel",
        "x-line-number": "59",
        "x-column": "8",
        "x-component": "div",
        "x-id": "RightPanel_59_8",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: suggestions.map((s, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("button", {
          "data-testid": `suggestion-${i}`,
          onClick: () => setQuery(s),
          className: "sq-btn text-[11px] px-2 py-1 rounded-full border border-cyan-500/20 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/50 bg-cyan-500/5",
          "x-file-name": "RightPanel",
          "x-line-number": "61",
          "x-column": "12",
          "x-component": "button",
          "x-id": "RightPanel_61_12",
          "x-dynamic": "true",
          "x-source-type": "static-imported",
          "x-source-var": "suggestions",
          "x-source-editable": "false",
          "x-array-var": "suggestions",
          "x-array-item-param": "s",
          children: s
        }, i, false, {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 13
        }, undefined))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(_components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_9__.ScrollArea, {
      className: "flex-1",
      "x-file-name": "RightPanel",
      "x-line-number": "73",
      "x-column": "6",
      "x-component": "ScrollArea",
      "x-id": "RightPanel_73_6",
      "x-dynamic": "true",
      "x-excluded": "true",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
        className: "p-4 space-y-4",
        "x-file-name": "RightPanel",
        "x-line-number": "74",
        "x-column": "8",
        "x-component": "div",
        "x-id": "RightPanel_74_8",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: [!analysis && !running && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
          className: "text-center py-10",
          "x-file-name": "RightPanel",
          "x-line-number": "76",
          "x-column": "12",
          "x-component": "div",
          "x-id": "RightPanel_76_12",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "w-10 h-10 text-cyan-500/25 mx-auto mb-3",
            "x-file-name": "RightPanel",
            "x-line-number": "77",
            "x-column": "14",
            "x-component": "Cpu",
            "x-id": "RightPanel_77_14",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 77,
            columnNumber: 15
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("p", {
            className: "text-sm text-slate-500",
            "x-file-name": "RightPanel",
            "x-line-number": "78",
            "x-column": "14",
            "x-component": "p",
            "x-id": "RightPanel_78_14",
            "x-dynamic": "false",
            children: "The agent will classify your query, route it to specialist models, and return a grounded answer with evidence."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 13
        }, undefined), running && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
          className: "flex items-center gap-2 text-cyan-300 text-sm sq-fade-up",
          "x-file-name": "RightPanel",
          "x-line-number": "83",
          "x-column": "12",
          "x-component": "div",
          "x-id": "RightPanel_83_12",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
            className: "w-4 h-4 animate-spin",
            "x-file-name": "RightPanel",
            "x-line-number": "84",
            "x-column": "14",
            "x-component": "Loader2",
            "x-id": "RightPanel_84_14",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 84,
            columnNumber: 15
          }, undefined), " Agent orchestrating specialist models\u2026"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 13
        }, undefined), analysis && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
            className: "rounded-lg border border-cyan-500/20 bg-[#182232] p-3 sq-fade-up",
            "data-testid": "task-planner",
            "x-file-name": "RightPanel",
            "x-line-number": "91",
            "x-column": "14",
            "x-component": "div",
            "x-id": "RightPanel_91_14",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
              className: "telemetry mb-2 flex items-center gap-1.5",
              "x-file-name": "RightPanel",
              "x-line-number": "92",
              "x-column": "16",
              "x-component": "div",
              "x-id": "RightPanel_92_16",
              "x-dynamic": "false",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                className: "w-3.5 h-3.5 text-[#00F0FF]",
                "x-file-name": "RightPanel",
                "x-line-number": "92",
                "x-column": "74",
                "x-component": "Cpu",
                "x-id": "RightPanel_92_74",
                "x-dynamic": "false"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 92,
                columnNumber: 75
              }, undefined), " Agentic Task Planner"]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 92,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(Row, {
              k: "Intent",
              v: analysis.intent,
              "x-file-name": "RightPanel",
              "x-line-number": "93",
              "x-column": "16",
              "x-component": "Row",
              "x-id": "RightPanel_93_16",
              "x-dynamic": "true"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 93,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(Row, {
              k: "Task",
              v: (_analysis$plan = analysis.plan) === null || _analysis$plan === void 0 ? void 0 : _analysis$plan.task_label,
              accent: true,
              "x-file-name": "RightPanel",
              "x-line-number": "94",
              "x-column": "16",
              "x-component": "Row",
              "x-id": "RightPanel_94_16",
              "x-dynamic": "true"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 94,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(Row, {
              k: "Inputs",
              v: (((_analysis$plan2 = analysis.plan) === null || _analysis$plan2 === void 0 ? void 0 : _analysis$plan2.inputs) || []).join(", "),
              "x-file-name": "RightPanel",
              "x-line-number": "95",
              "x-column": "16",
              "x-component": "Row",
              "x-id": "RightPanel_95_16",
              "x-dynamic": "true"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 95,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
              className: "mt-2",
              "x-file-name": "RightPanel",
              "x-line-number": "96",
              "x-column": "16",
              "x-component": "div",
              "x-id": "RightPanel_96_16",
              "x-dynamic": "false",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                className: "text-[10px] text-cyan-500/70 font-mono-x",
                "x-file-name": "RightPanel",
                "x-line-number": "97",
                "x-column": "18",
                "x-component": "span",
                "x-id": "RightPanel_97_18",
                "x-dynamic": "false",
                children: "SELECTED MODELS"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 97,
                columnNumber: 19
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
                className: "mt-1 space-y-1",
                "x-file-name": "RightPanel",
                "x-line-number": "98",
                "x-column": "18",
                "x-component": "div",
                "x-id": "RightPanel_98_18",
                "x-dynamic": "true",
                "x-source-type": "computed",
                "x-source-editable": "false",
                children: (((_analysis$plan3 = analysis.plan) === null || _analysis$plan3 === void 0 ? void 0 : _analysis$plan3.models) || []).map((m, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
                  className: "flex items-center gap-1.5 text-[11px] text-slate-300 font-mono-x",
                  "x-file-name": "RightPanel",
                  "x-line-number": "100",
                  "x-column": "22",
                  "x-component": "div",
                  "x-id": "RightPanel_100_22",
                  "x-dynamic": "true",
                  "x-source-type": "static-imported",
                  "x-source-editable": "false",
                  "x-array-item-param": "m",
                  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    className: "w-3 h-3 text-emerald-400"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 101,
                    columnNumber: 25
                  }, undefined), " ", m]
                }, i, true, {
                  fileName: _jsxFileName,
                  lineNumber: 100,
                  columnNumber: 23
                }, undefined))
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 98,
                columnNumber: 19
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 96,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 91,
            columnNumber: 15
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
            className: "rounded-lg border border-[#FF7300]/30 bg-[#FF7300]/5 p-3 sq-fade-up",
            "data-testid": "ai-answer",
            "x-file-name": "RightPanel",
            "x-line-number": "109",
            "x-column": "14",
            "x-component": "div",
            "x-id": "RightPanel_109_14",
            "x-dynamic": "true",
            "x-source-type": "computed",
            "x-source-editable": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
              className: "telemetry mb-1.5 text-[#FF7300]",
              "x-file-name": "RightPanel",
              "x-line-number": "110",
              "x-column": "16",
              "x-component": "div",
              "x-id": "RightPanel_110_16",
              "x-dynamic": "false",
              children: "SatQuery-RS-VLM \xB7 Answer"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 110,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("p", {
              className: "text-sm text-slate-100 leading-relaxed whitespace-pre-wrap",
              "x-file-name": "RightPanel",
              "x-line-number": "111",
              "x-column": "16",
              "x-component": "p",
              "x-id": "RightPanel_111_16",
              "x-dynamic": "true",
              "x-source-type": "unknown",
              "x-source-var": "answer",
              "x-source-editable": "false",
              children: answer
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 111,
              columnNumber: 17
            }, undefined), (r === null || r === void 0 ? void 0 : (_r$primary_changes = r.primary_changes) === null || _r$primary_changes === void 0 ? void 0 : _r$primary_changes.length) > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("ul", {
              className: "mt-2 space-y-1",
              "x-file-name": "RightPanel",
              "x-line-number": "113",
              "x-column": "18",
              "x-component": "ul",
              "x-id": "RightPanel_113_18",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: r.primary_changes.map((x, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("li", {
                className: "text-[12px] text-rose-300 flex gap-1.5",
                "x-file-name": "RightPanel",
                "x-line-number": "115",
                "x-column": "22",
                "x-component": "li",
                "x-id": "RightPanel_115_22",
                "x-dynamic": "true",
                "x-source-type": "static-imported",
                "x-source-var": "r",
                "x-source-editable": "false",
                "x-array-var": "r",
                "x-array-item-param": "x",
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                  "x-file-name": "RightPanel",
                  "x-line-number": "115",
                  "x-column": "85",
                  "x-component": "span",
                  "x-id": "RightPanel_115_85",
                  "x-dynamic": "false",
                  children: "\u25B8"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 115,
                  columnNumber: 86
                }, undefined), x]
              }, i, true, {
                fileName: _jsxFileName,
                lineNumber: 115,
                columnNumber: 23
              }, undefined))
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 113,
              columnNumber: 19
            }, undefined), (r === null || r === void 0 ? void 0 : (_r$land_cover = r.land_cover) === null || _r$land_cover === void 0 ? void 0 : _r$land_cover.length) > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
              className: "mt-2 flex flex-wrap gap-1",
              "x-file-name": "RightPanel",
              "x-line-number": "120",
              "x-column": "18",
              "x-component": "div",
              "x-id": "RightPanel_120_18",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: r.land_cover.map((x, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                className: "text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-mono-x",
                "x-file-name": "RightPanel",
                "x-line-number": "121",
                "x-column": "48",
                "x-component": "span",
                "x-id": "RightPanel_121_48",
                "x-dynamic": "true",
                "x-source-type": "static-imported",
                "x-source-var": "r",
                "x-source-editable": "false",
                "x-array-var": "r",
                "x-array-item-param": "x",
                children: x
              }, i, false, {
                fileName: _jsxFileName,
                lineNumber: 121,
                columnNumber: 49
              }, undefined))
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 120,
              columnNumber: 19
            }, undefined), (r === null || r === void 0 ? void 0 : r.fusion_insight) && answer !== r.fusion_insight && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("p", {
              className: "mt-2 text-[12px] text-cyan-300/90 border-l-2 border-cyan-500/40 pl-2",
              "x-file-name": "RightPanel",
              "x-line-number": "125",
              "x-column": "18",
              "x-component": "p",
              "x-id": "RightPanel_125_18",
              "x-dynamic": "true",
              "x-source-type": "unknown",
              "x-source-var": "r",
              "x-source-path": "fusion_insight",
              "x-source-editable": "false",
              children: ["SAR adds: ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                "data-ve-dynamic": "true",
                "x-excluded": "true",
                style: {
                  display: "contents"
                },
                "x-file-name": "RightPanel",
                "x-line-number": "125",
                "x-column": "18",
                "x-component": "p",
                "x-id": "RightPanel_125_18_expr1",
                "x-dynamic": "true",
                "x-source-type": "unknown",
                "x-source-var": "r",
                "x-source-path": "fusion_insight",
                "x-source-editable": "false",
                children: r.fusion_insight
              }, void 0, false)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 125,
              columnNumber: 19
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 109,
            columnNumber: 15
          }, undefined), conf && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
            className: `rounded-lg border ${conf.border} ${conf.bg} p-3 sq-fade-up`,
            "data-testid": "confidence-panel",
            "x-file-name": "RightPanel",
            "x-line-number": "131",
            "x-column": "16",
            "x-component": "div",
            "x-id": "RightPanel_131_16",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
              className: "flex items-center justify-between mb-2",
              "x-file-name": "RightPanel",
              "x-line-number": "132",
              "x-column": "18",
              "x-component": "div",
              "x-id": "RightPanel_132_18",
              "x-dynamic": "false",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                className: "telemetry flex items-center gap-1.5",
                "x-file-name": "RightPanel",
                "x-line-number": "133",
                "x-column": "20",
                "x-component": "span",
                "x-id": "RightPanel_133_20",
                "x-dynamic": "false",
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
                  className: "w-3.5 h-3.5",
                  "x-file-name": "RightPanel",
                  "x-line-number": "133",
                  "x-column": "74",
                  "x-component": "ShieldCheck",
                  "x-id": "RightPanel_133_74",
                  "x-dynamic": "false"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 133,
                  columnNumber: 75
                }, undefined), " System Confidence"]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 133,
                columnNumber: 21
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                "data-testid": "confidence-badge",
                className: `font-head font-bold text-lg ${conf.text}`,
                "x-file-name": "RightPanel",
                "x-line-number": "134",
                "x-column": "20",
                "x-component": "span",
                "x-id": "RightPanel_134_20",
                "x-dynamic": "true",
                "x-source-type": "unknown",
                "x-source-var": "c",
                "x-source-path": "level",
                "x-source-editable": "false",
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                  "data-ve-dynamic": "true",
                  "x-excluded": "true",
                  style: {
                    display: "contents"
                  },
                  "x-file-name": "RightPanel",
                  "x-line-number": "134",
                  "x-column": "20",
                  "x-component": "span",
                  "x-id": "RightPanel_134_20_expr0",
                  "x-dynamic": "true",
                  "x-source-type": "unknown",
                  "x-source-var": "c",
                  "x-source-path": "level",
                  "x-source-editable": "false",
                  children: c.level
                }, void 0, false), " \xB7 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                  "data-ve-dynamic": "true",
                  "x-excluded": "true",
                  style: {
                    display: "contents"
                  },
                  "x-file-name": "RightPanel",
                  "x-line-number": "134",
                  "x-column": "20",
                  "x-component": "span",
                  "x-id": "RightPanel_134_20_expr2",
                  "x-dynamic": "true",
                  "x-source-type": "unknown",
                  "x-source-var": "c",
                  "x-source-path": "percent",
                  "x-source-editable": "false",
                  children: c.percent
                }, void 0, false), "%"]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 134,
                columnNumber: 21
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 132,
              columnNumber: 19
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
              className: "h-1.5 rounded-full bg-black/40 overflow-hidden",
              "x-file-name": "RightPanel",
              "x-line-number": "136",
              "x-column": "18",
              "x-component": "div",
              "x-id": "RightPanel_136_18",
              "x-dynamic": "false",
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
                className: "h-full rounded-full transition-all duration-700",
                style: {
                  width: `${c.percent}%`,
                  background: conf.bar
                },
                "x-file-name": "RightPanel",
                "x-line-number": "137",
                "x-column": "20",
                "x-component": "div",
                "x-id": "RightPanel_137_20",
                "x-dynamic": "false"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 137,
                columnNumber: 21
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 136,
              columnNumber: 19
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
              className: "grid grid-cols-2 gap-x-3 gap-y-1 mt-2.5",
              "x-file-name": "RightPanel",
              "x-line-number": "139",
              "x-column": "18",
              "x-component": "div",
              "x-id": "RightPanel_139_18",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: Object.entries(c.breakdown).map(([k, v]) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
                className: "flex justify-between text-[10px] font-mono-x",
                "x-file-name": "RightPanel",
                "x-line-number": "141",
                "x-column": "22",
                "x-component": "div",
                "x-id": "RightPanel_141_22",
                "x-dynamic": "false",
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                  className: "text-slate-400",
                  "x-file-name": "RightPanel",
                  "x-line-number": "142",
                  "x-column": "24",
                  "x-component": "span",
                  "x-id": "RightPanel_142_24",
                  "x-dynamic": "true",
                  "x-source-type": "computed",
                  "x-source-editable": "false",
                  children: k.replace(/_/g, " ")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 142,
                  columnNumber: 25
                }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                  className: "text-slate-200",
                  "x-file-name": "RightPanel",
                  "x-line-number": "143",
                  "x-column": "24",
                  "x-component": "span",
                  "x-id": "RightPanel_143_24",
                  "x-dynamic": "true",
                  "x-source-type": "unknown",
                  "x-source-var": "v",
                  "x-source-editable": "false",
                  children: v
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 143,
                  columnNumber: 25
                }, undefined)]
              }, k, true, {
                fileName: _jsxFileName,
                lineNumber: 141,
                columnNumber: 23
              }, undefined))
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 139,
              columnNumber: 19
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("p", {
              className: "text-[9px] text-slate-500 mt-2 italic",
              "x-file-name": "RightPanel",
              "x-line-number": "147",
              "x-column": "18",
              "x-component": "p",
              "x-id": "RightPanel_147_18",
              "x-dynamic": "false",
              children: "System score, not a calibrated probability."
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 147,
              columnNumber: 19
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 131,
            columnNumber: 17
          }, undefined), (r === null || r === void 0 ? void 0 : (_r$evidence_regions = r.evidence_regions) === null || _r$evidence_regions === void 0 ? void 0 : _r$evidence_regions.length) > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
            className: "rounded-lg border border-cyan-500/20 bg-[#182232] p-3 sq-fade-up",
            "data-testid": "evidence-panel",
            "x-file-name": "RightPanel",
            "x-line-number": "153",
            "x-column": "16",
            "x-component": "div",
            "x-id": "RightPanel_153_16",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
              className: "telemetry mb-2",
              "x-file-name": "RightPanel",
              "x-line-number": "154",
              "x-column": "18",
              "x-component": "div",
              "x-id": "RightPanel_154_18",
              "x-dynamic": "true",
              "x-source-type": "unknown",
              "x-source-var": "r",
              "x-source-path": "evidence_regions.length",
              "x-source-editable": "false",
              children: ["Evidence Regions \xB7 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                "data-ve-dynamic": "true",
                "x-excluded": "true",
                style: {
                  display: "contents"
                },
                "x-file-name": "RightPanel",
                "x-line-number": "154",
                "x-column": "18",
                "x-component": "div",
                "x-id": "RightPanel_154_18_expr1",
                "x-dynamic": "true",
                "x-source-type": "unknown",
                "x-source-var": "r",
                "x-source-path": "evidence_regions.length",
                "x-source-editable": "false",
                children: r.evidence_regions.length
              }, void 0, false)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 154,
              columnNumber: 19
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
              className: "space-y-1.5",
              "x-file-name": "RightPanel",
              "x-line-number": "155",
              "x-column": "18",
              "x-component": "div",
              "x-id": "RightPanel_155_18",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: r.evidence_regions.map((g, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
                className: "text-[11px] flex gap-2",
                "x-file-name": "RightPanel",
                "x-line-number": "157",
                "x-column": "22",
                "x-component": "div",
                "x-id": "RightPanel_157_22",
                "x-dynamic": "false",
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                  className: "font-mono-x text-cyan-400 uppercase w-14 shrink-0",
                  "x-file-name": "RightPanel",
                  "x-line-number": "158",
                  "x-column": "24",
                  "x-component": "span",
                  "x-id": "RightPanel_158_24",
                  "x-dynamic": "true",
                  "x-source-type": "static-imported",
                  "x-source-var": "r",
                  "x-source-path": "evidence_regions.type",
                  "x-source-editable": "false",
                  "x-array-var": "r",
                  "x-array-item-param": "g",
                  children: g.type
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 158,
                  columnNumber: 25
                }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
                  className: "text-slate-300",
                  "x-file-name": "RightPanel",
                  "x-line-number": "159",
                  "x-column": "24",
                  "x-component": "span",
                  "x-id": "RightPanel_159_24",
                  "x-dynamic": "true",
                  "x-source-type": "computed",
                  "x-source-editable": "false",
                  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("b", {
                    className: "text-slate-100",
                    "x-file-name": "RightPanel",
                    "x-line-number": "159",
                    "x-column": "57",
                    "x-component": "b",
                    "x-id": "RightPanel_159_57",
                    "x-dynamic": "true",
                    "x-source-type": "static-imported",
                    "x-source-var": "r",
                    "x-source-path": "evidence_regions.label",
                    "x-source-editable": "false",
                    "x-array-var": "r",
                    "x-array-item-param": "g",
                    children: g.label
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 159,
                    columnNumber: 58
                  }, undefined), g.note ? ` — ${g.note}` : ""]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 159,
                  columnNumber: 25
                }, undefined)]
              }, i, true, {
                fileName: _jsxFileName,
                lineNumber: 157,
                columnNumber: 23
              }, undefined))
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 155,
              columnNumber: 19
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 153,
            columnNumber: 17
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("button", {
            "data-testid": "download-report-button",
            onClick: () => (0,_lib_report__WEBPACK_IMPORTED_MODULE_11__.downloadReport)(analysis),
            className: "sq-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 font-head font-semibold tracking-wide",
            "x-file-name": "RightPanel",
            "x-line-number": "167",
            "x-column": "14",
            "x-component": "button",
            "x-id": "RightPanel_167_14",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
              className: "w-4 h-4",
              "x-file-name": "RightPanel",
              "x-line-number": "172",
              "x-column": "16",
              "x-component": "Download",
              "x-id": "RightPanel_172_16",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 172,
              columnNumber: 17
            }, undefined), " DOWNLOAD ANALYSIS REPORT"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 167,
            columnNumber: 15
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
            className: "flex items-center gap-1.5 text-[10px] text-slate-500 justify-center",
            "x-file-name": "RightPanel",
            "x-line-number": "174",
            "x-column": "14",
            "x-component": "div",
            "x-id": "RightPanel_174_14",
            "x-dynamic": "true",
            "x-source-type": "prop",
            "x-source-var": "analysis",
            "x-source-path": "elapsed_sec",
            "x-source-editable": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
              className: "w-3 h-3",
              "x-file-name": "RightPanel",
              "x-line-number": "175",
              "x-column": "16",
              "x-component": "FileText",
              "x-id": "RightPanel_175_16",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 175,
              columnNumber: 17
            }, undefined), " ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "RightPanel",
              "x-line-number": "174",
              "x-column": "14",
              "x-component": "div",
              "x-id": "RightPanel_174_14_expr3",
              "x-dynamic": "true",
              "x-source-type": "prop",
              "x-source-var": "analysis",
              "x-source-path": "elapsed_sec",
              "x-source-editable": "false",
              children: analysis.elapsed_sec
            }, void 0, false), "s execution \xB7 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "RightPanel",
              "x-line-number": "174",
              "x-column": "14",
              "x-component": "div",
              "x-id": "RightPanel_174_14_expr5",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: ((_analysis$result = analysis.result) === null || _analysis$result === void 0 ? void 0 : (_analysis$result$evid = _analysis$result.evidence_regions) === null || _analysis$result$evid === void 0 ? void 0 : _analysis$result$evid.length) || 0
            }, void 0, false), " regions"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 174,
            columnNumber: 15
          }, undefined)]
        }, void 0, true)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 5
  }, undefined);
};
_s(RightPanel, "CCuvaKRud86EhT+STbWOVtMtgh8=");
_c = RightPanel;
const Row = ({
  k,
  v,
  accent
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("div", {
  className: "flex justify-between gap-2 py-0.5",
  "x-file-name": "RightPanel",
  "x-line-number": "186",
  "x-column": "2",
  "x-component": "div",
  "x-id": "RightPanel_186_2",
  "x-dynamic": "false",
  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
    className: "text-[11px] text-slate-500 font-mono-x",
    "x-file-name": "RightPanel",
    "x-line-number": "187",
    "x-column": "4",
    "x-component": "span",
    "x-id": "RightPanel_187_4",
    "x-dynamic": "true",
    "x-source-type": "prop",
    "x-source-var": "k",
    "x-source-editable": "false",
    children: k
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 187,
    columnNumber: 5
  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("span", {
    className: `text-[11px] text-right ${accent ? "text-[#00F0FF] font-semibold" : "text-slate-200"}`,
    "x-file-name": "RightPanel",
    "x-line-number": "188",
    "x-column": "4",
    "x-component": "span",
    "x-id": "RightPanel_188_4",
    "x-dynamic": "true",
    "x-source-type": "prop",
    "x-source-var": "v",
    "x-source-editable": "false",
    children: v
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 188,
    columnNumber: 5
  }, undefined)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 186,
  columnNumber: 3
}, undefined);
_c2 = Row;
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "RightPanel");
__webpack_require__.$Refresh$.register(_c2, "Row");

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

