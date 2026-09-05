/***/ "./src/components/HistoryDrawer.jsx"
/*!******************************************!*\
  !*** ./src/components/HistoryDrawer.jsx ***!
  \******************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoryDrawer: () => (/* binding */ HistoryDrawer)
/* harmony export */ });
/* harmony import */ var _components_ui_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/ui/sheet */ "./src/components/ui/sheet.jsx");
/* harmony import */ var _components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ui/scroll-area */ "./src/components/ui/scroll-area.jsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/git-compare.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/history.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/pin.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/play.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trash-2.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/components/HistoryDrawer.jsx";




const CONF_TEXT = {
  HIGH: "text-emerald-400",
  MEDIUM: "text-amber-400",
  LOW: "text-rose-400"
};
const HistoryDrawer = ({
  open,
  onOpenChange,
  items,
  onReplay,
  onClear,
  compareSel = [],
  onToggleCompare,
  onOpenCompare
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_components_ui_sheet__WEBPACK_IMPORTED_MODULE_0__.Sheet, {
    open: open,
    onOpenChange: onOpenChange,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_components_ui_sheet__WEBPACK_IMPORTED_MODULE_0__.SheetContent, {
      side: "right",
      className: "w-[420px] sm:max-w-[420px] bg-[#0B0E14] border-l border-cyan-500/25 text-slate-200 p-0",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_components_ui_sheet__WEBPACK_IMPORTED_MODULE_0__.SheetHeader, {
        className: "px-4 py-3 border-b border-cyan-500/15",
        "x-file-name": "HistoryDrawer",
        "x-line-number": "11",
        "x-column": "8",
        "x-component": "SheetHeader",
        "x-id": "HistoryDrawer_11_8",
        "x-dynamic": "true",
        "x-excluded": "true",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_components_ui_sheet__WEBPACK_IMPORTED_MODULE_0__.SheetTitle, {
          className: "font-head tracking-wide text-slate-100 flex items-center gap-2",
          "x-file-name": "HistoryDrawer",
          "x-line-number": "12",
          "x-column": "10",
          "x-component": "SheetTitle",
          "x-id": "HistoryDrawer_12_10",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
            className: "w-5 h-5 text-[#FF7300]",
            "x-file-name": "HistoryDrawer",
            "x-line-number": "13",
            "x-column": "12",
            "x-component": "History",
            "x-id": "HistoryDrawer_13_12",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 13,
            columnNumber: 13
          }, undefined), " ANALYSIS HISTORY", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("span", {
            className: "ml-auto telemetry",
            "x-file-name": "HistoryDrawer",
            "x-line-number": "14",
            "x-column": "12",
            "x-component": "span",
            "x-id": "HistoryDrawer_14_12",
            "x-dynamic": "true",
            "x-source-type": "prop",
            "x-source-var": "items",
            "x-source-path": "length",
            "x-source-editable": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "HistoryDrawer",
              "x-line-number": "14",
              "x-column": "12",
              "x-component": "span",
              "x-id": "HistoryDrawer_14_12_expr0",
              "x-dynamic": "true",
              "x-source-type": "prop",
              "x-source-var": "items",
              "x-source-path": "length",
              "x-source-editable": "false",
              children: items.length
            }, void 0, false), " RUN", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "HistoryDrawer",
              "x-line-number": "14",
              "x-column": "12",
              "x-component": "span",
              "x-id": "HistoryDrawer_14_12_expr2",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: items.length === 1 ? "" : "S"
            }, void 0, false)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 14,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 12,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_components_ui_sheet__WEBPACK_IMPORTED_MODULE_0__.SheetDescription, {
          className: "text-slate-500 text-xs",
          "x-file-name": "HistoryDrawer",
          "x-line-number": "16",
          "x-column": "10",
          "x-component": "SheetDescription",
          "x-id": "HistoryDrawer_16_10",
          "x-dynamic": "false",
          children: "Replay any run, or pin two to compare side-by-side."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 16,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 9
      }, undefined), compareSel.length > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("div", {
        className: "px-4 py-2 border-b border-cyan-500/15 bg-[#121824] flex items-center gap-2",
        "data-testid": "compare-bar",
        "x-file-name": "HistoryDrawer",
        "x-line-number": "20",
        "x-column": "10",
        "x-component": "div",
        "x-id": "HistoryDrawer_20_10",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "w-4 h-4 text-[#00F0FF]",
          "x-file-name": "HistoryDrawer",
          "x-line-number": "21",
          "x-column": "12",
          "x-component": "GitCompare",
          "x-id": "HistoryDrawer_21_12",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 21,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("span", {
          className: "telemetry",
          "x-file-name": "HistoryDrawer",
          "x-line-number": "22",
          "x-column": "12",
          "x-component": "span",
          "x-id": "HistoryDrawer_22_12",
          "x-dynamic": "true",
          "x-source-type": "prop",
          "x-source-var": "compareSel",
          "x-source-path": "length",
          "x-source-editable": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("span", {
            "data-ve-dynamic": "true",
            "x-excluded": "true",
            style: {
              display: "contents"
            },
            "x-file-name": "HistoryDrawer",
            "x-line-number": "22",
            "x-column": "12",
            "x-component": "span",
            "x-id": "HistoryDrawer_22_12_expr0",
            "x-dynamic": "true",
            "x-source-type": "prop",
            "x-source-var": "compareSel",
            "x-source-path": "length",
            "x-source-editable": "false",
            children: compareSel.length
          }, void 0, false), "/2 PINNED"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 22,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("button", {
          "data-testid": "open-compare-button",
          disabled: compareSel.length !== 2,
          onClick: onOpenCompare,
          className: "sq-btn ml-auto px-3 py-1 rounded-md bg-[#FF7300] text-black text-xs font-head font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed",
          "x-file-name": "HistoryDrawer",
          "x-line-number": "23",
          "x-column": "12",
          "x-component": "button",
          "x-id": "HistoryDrawer_23_12",
          "x-dynamic": "false",
          children: "COMPARE"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 23,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_1__.ScrollArea, {
        className: "h-[calc(100vh-58px)]",
        "x-file-name": "HistoryDrawer",
        "x-line-number": "34",
        "x-column": "8",
        "x-component": "ScrollArea",
        "x-id": "HistoryDrawer_34_8",
        "x-dynamic": "true",
        "x-excluded": "true",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("div", {
          className: "p-4 space-y-3",
          "x-file-name": "HistoryDrawer",
          "x-line-number": "35",
          "x-column": "10",
          "x-component": "div",
          "x-id": "HistoryDrawer_35_10",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: items.length === 0 ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("div", {
            className: "text-center py-16",
            "x-file-name": "HistoryDrawer",
            "x-line-number": "37",
            "x-column": "14",
            "x-component": "div",
            "x-id": "HistoryDrawer_37_14",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
              className: "w-10 h-10 text-cyan-500/25 mx-auto mb-3",
              "x-file-name": "HistoryDrawer",
              "x-line-number": "38",
              "x-column": "16",
              "x-component": "History",
              "x-id": "HistoryDrawer_38_16",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 38,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("p", {
              className: "text-sm text-slate-500",
              "x-file-name": "HistoryDrawer",
              "x-line-number": "39",
              "x-column": "16",
              "x-component": "p",
              "x-id": "HistoryDrawer_39_16",
              "x-dynamic": "false",
              children: "No analyses yet. Run a query to build your history \u2014 every result is replayable in one click."
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 39,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 37,
            columnNumber: 15
          }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
            children: [items.map(it => {
              var _it$analysis, _it$analysis2, _it$analysis3, _it$analysis3$plan, _it$analysis4;
              const r = ((_it$analysis = it.analysis) === null || _it$analysis === void 0 ? void 0 : _it$analysis.result) || {};
              const ans = r.answer || r.caption || r.fusion_insight || "";
              const conf = (_it$analysis2 = it.analysis) === null || _it$analysis2 === void 0 ? void 0 : _it$analysis2.confidence;
              const pinned = compareSel.includes(it.id);
              return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("div", {
                "data-testid": `history-item-${it.id}`,
                onClick: () => onReplay(it),
                className: `sq-btn group w-full text-left rounded-lg border cursor-pointer p-3 ${pinned ? "border-[#00F0FF]/60 bg-[#12283a] sq-glow" : "border-white/8 hover:border-cyan-400/50 bg-[#182232] hover:bg-[#1c2942]"}`,
                "x-file-name": "HistoryDrawer",
                "x-line-number": "49",
                "x-column": "20",
                "x-component": "div",
                "x-id": "HistoryDrawer_49_20",
                "x-dynamic": "true",
                "x-source-type": "computed",
                "x-source-editable": "false",
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("div", {
                  className: "flex items-center gap-2 mb-1.5",
                  "x-file-name": "HistoryDrawer",
                  "x-line-number": "55",
                  "x-column": "22",
                  "x-component": "div",
                  "x-id": "HistoryDrawer_55_22",
                  "x-dynamic": "true",
                  "x-source-type": "computed",
                  "x-source-editable": "false",
                  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("span", {
                    className: "text-[10px] font-mono-x px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/25",
                    "x-file-name": "HistoryDrawer",
                    "x-line-number": "56",
                    "x-column": "24",
                    "x-component": "span",
                    "x-id": "HistoryDrawer_56_24",
                    "x-dynamic": "true",
                    "x-source-type": "computed",
                    "x-source-editable": "false",
                    children: ((_it$analysis3 = it.analysis) === null || _it$analysis3 === void 0 ? void 0 : (_it$analysis3$plan = _it$analysis3.plan) === null || _it$analysis3$plan === void 0 ? void 0 : _it$analysis3$plan.task_label) || ((_it$analysis4 = it.analysis) === null || _it$analysis4 === void 0 ? void 0 : _it$analysis4.task)
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 56,
                    columnNumber: 25
                  }, undefined), conf && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("span", {
                    className: `text-[10px] font-mono-x ${CONF_TEXT[conf.level] || ""}`,
                    "x-file-name": "HistoryDrawer",
                    "x-line-number": "57",
                    "x-column": "33",
                    "x-component": "span",
                    "x-id": "HistoryDrawer_57_33",
                    "x-dynamic": "true",
                    "x-source-type": "unknown",
                    "x-source-var": "conf",
                    "x-source-path": "level",
                    "x-source-editable": "false",
                    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("span", {
                      "data-ve-dynamic": "true",
                      "x-excluded": "true",
                      style: {
                        display: "contents"
                      },
                      "x-file-name": "HistoryDrawer",
                      "x-line-number": "57",
                      "x-column": "33",
                      "x-component": "span",
                      "x-id": "HistoryDrawer_57_33_expr0",
                      "x-dynamic": "true",
                      "x-source-type": "unknown",
                      "x-source-var": "conf",
                      "x-source-path": "level",
                      "x-source-editable": "false",
                      children: conf.level
                    }, void 0, false), " ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("span", {
                      "data-ve-dynamic": "true",
                      "x-excluded": "true",
                      style: {
                        display: "contents"
                      },
                      "x-file-name": "HistoryDrawer",
                      "x-line-number": "57",
                      "x-column": "33",
                      "x-component": "span",
                      "x-id": "HistoryDrawer_57_33_expr2",
                      "x-dynamic": "true",
                      "x-source-type": "unknown",
                      "x-source-var": "conf",
                      "x-source-path": "percent",
                      "x-source-editable": "false",
                      children: conf.percent
                    }, void 0, false), "%"]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 57,
                    columnNumber: 34
                  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("button", {
                    "data-testid": `pin-compare-${it.id}`,
                    onClick: e => {
                      e.stopPropagation();
                      onToggleCompare(it);
                    },
                    title: pinned ? "Unpin from compare" : "Pin to compare",
                    className: `sq-btn ml-auto w-6 h-6 rounded flex items-center justify-center ${pinned ? "bg-[#00F0FF]/20 text-[#00F0FF]" : "text-slate-500 hover:text-cyan-300 hover:bg-white/5"}`,
                    "x-file-name": "HistoryDrawer",
                    "x-line-number": "58",
                    "x-column": "24",
                    "x-component": "button",
                    "x-id": "HistoryDrawer_58_24",
                    "x-dynamic": "false",
                    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                      className: `w-3.5 h-3.5 ${pinned ? "fill-current" : ""}`,
                      "x-file-name": "HistoryDrawer",
                      "x-line-number": "64",
                      "x-column": "26",
                      "x-component": "Pin",
                      "x-id": "HistoryDrawer_64_26",
                      "x-dynamic": "true",
                      "x-source-type": "external",
                      "x-source-var": "items",
                      "x-source-editable": "false",
                      "x-array-var": "items",
                      "x-array-item-param": "it"
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 64,
                      columnNumber: 27
                    }, undefined)
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 58,
                    columnNumber: 25
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 55,
                  columnNumber: 23
                }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("p", {
                  className: "text-[13px] text-slate-100 font-medium leading-snug line-clamp-2",
                  "x-file-name": "HistoryDrawer",
                  "x-line-number": "67",
                  "x-column": "22",
                  "x-component": "p",
                  "x-id": "HistoryDrawer_67_22",
                  "x-dynamic": "true",
                  "x-source-type": "static-imported",
                  "x-source-var": "items",
                  "x-source-path": "query",
                  "x-source-editable": "false",
                  "x-array-var": "items",
                  "x-array-item-param": "it",
                  children: ["\"", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("span", {
                    "data-ve-dynamic": "true",
                    "x-excluded": "true",
                    style: {
                      display: "contents"
                    },
                    "x-file-name": "HistoryDrawer",
                    "x-line-number": "67",
                    "x-column": "22",
                    "x-component": "p",
                    "x-id": "HistoryDrawer_67_22_expr1",
                    "x-dynamic": "true",
                    "x-source-type": "static-imported",
                    "x-source-var": "items",
                    "x-source-path": "query",
                    "x-source-editable": "false",
                    "x-array-var": "items",
                    "x-array-item-param": "it",
                    children: it.query
                  }, void 0, false), "\""]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 67,
                  columnNumber: 23
                }, undefined), ans && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("p", {
                  className: "text-[11px] text-slate-400 mt-1 line-clamp-2",
                  "x-file-name": "HistoryDrawer",
                  "x-line-number": "68",
                  "x-column": "30",
                  "x-component": "p",
                  "x-id": "HistoryDrawer_68_30",
                  "x-dynamic": "true",
                  "x-source-type": "unknown",
                  "x-source-var": "ans",
                  "x-source-editable": "false",
                  children: ans
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 68,
                  columnNumber: 31
                }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("div", {
                  className: "flex items-center gap-1 mt-2 text-[10px] text-[#FF7300] opacity-0 group-hover:opacity-100 transition-opacity",
                  "x-file-name": "HistoryDrawer",
                  "x-line-number": "69",
                  "x-column": "22",
                  "x-component": "div",
                  "x-id": "HistoryDrawer_69_22",
                  "x-dynamic": "false",
                  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                    className: "w-3 h-3",
                    "x-file-name": "HistoryDrawer",
                    "x-line-number": "70",
                    "x-column": "24",
                    "x-component": "Play",
                    "x-id": "HistoryDrawer_70_24",
                    "x-dynamic": "true",
                    "x-source-type": "external",
                    "x-source-var": "items",
                    "x-source-editable": "false",
                    "x-array-var": "items",
                    "x-array-item-param": "it"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 70,
                    columnNumber: 25
                  }, undefined), " Replay this analysis"]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 69,
                  columnNumber: 23
                }, undefined)]
              }, it.id, true, {
                fileName: _jsxFileName,
                lineNumber: 49,
                columnNumber: 21
              }, undefined);
            }), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)("button", {
              "data-testid": "clear-history",
              onClick: onClear,
              className: "sq-btn w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-mono-x",
              "x-file-name": "HistoryDrawer",
              "x-line-number": "75",
              "x-column": "16",
              "x-component": "button",
              "x-id": "HistoryDrawer_75_16",
              "x-dynamic": "false",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                className: "w-3.5 h-3.5",
                "x-file-name": "HistoryDrawer",
                "x-line-number": "76",
                "x-column": "18",
                "x-component": "Trash2",
                "x-id": "HistoryDrawer_76_18",
                "x-dynamic": "false"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 76,
                columnNumber: 19
              }, undefined), " CLEAR HISTORY"]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 75,
              columnNumber: 17
            }, undefined)]
          }, void 0, true)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 5
  }, undefined);
};
_c = HistoryDrawer;
var _c;
__webpack_require__.$Refresh$.register(_c, "HistoryDrawer");

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

