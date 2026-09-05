/***/ "./src/components/CompareModal.jsx"
/*!*****************************************!*\
  !*** ./src/components/CompareModal.jsx ***!
  \*****************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompareModal: () => (/* binding */ CompareModal)
/* harmony export */ });
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/ui/dialog */ "./src/components/ui/dialog.jsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/arrow-right.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/minus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trending-down.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trending-up.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/components/CompareModal.jsx";



const CONF = {
  HIGH: {
    text: "text-emerald-400",
    bar: "#00E676",
    border: "border-emerald-500/50"
  },
  MEDIUM: {
    text: "text-amber-400",
    bar: "#FFB300",
    border: "border-amber-500/50"
  },
  LOW: {
    text: "text-rose-400",
    bar: "#FF1744",
    border: "border-rose-500/50"
  }
};
const AnswerOf = r => (r === null || r === void 0 ? void 0 : r.answer) || (r === null || r === void 0 ? void 0 : r.caption) || (r === null || r === void 0 ? void 0 : r.fusion_insight) || "—";
_c = AnswerOf;
const Column = ({
  entry,
  align = "left"
}) => {
  var _a$plan, _r$evidence_regions;
  const a = (entry === null || entry === void 0 ? void 0 : entry.analysis) || {};
  const r = a.result || {};
  const c = a.confidence;
  const conf = c ? CONF[c.level] : CONF.MEDIUM;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
    className: `flex-1 min-w-0 ${align === "right" ? "text-right" : ""}`,
    "x-file-name": "CompareModal",
    "x-line-number": "18",
    "x-column": "4",
    "x-component": "div",
    "x-id": "CompareModal_18_4",
    "x-dynamic": "true",
    "x-source-type": "computed",
    "x-source-editable": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: `flex gap-1.5 mb-2 ${align === "right" ? "justify-end" : ""}`,
      "x-file-name": "CompareModal",
      "x-line-number": "19",
      "x-column": "6",
      "x-component": "div",
      "x-id": "CompareModal_19_6",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: ((entry === null || entry === void 0 ? void 0 : entry.slots) || []).map((s, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("img", {
        src: s.preview,
        alt: "",
        className: "w-14 h-14 rounded object-cover border border-white/10",
        "x-file-name": "CompareModal",
        "x-line-number": "21",
        "x-column": "10",
        "x-component": "img",
        "x-id": "CompareModal_21_10",
        "x-dynamic": "false"
      }, i, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 11
      }, undefined))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
      className: "text-[10px] font-mono-x px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/25",
      "x-file-name": "CompareModal",
      "x-line-number": "24",
      "x-column": "6",
      "x-component": "span",
      "x-id": "CompareModal_24_6",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: ((_a$plan = a.plan) === null || _a$plan === void 0 ? void 0 : _a$plan.task_label) || a.task
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("p", {
      className: "text-[13px] text-slate-100 font-medium mt-2 leading-snug",
      "x-file-name": "CompareModal",
      "x-line-number": "25",
      "x-column": "6",
      "x-component": "p",
      "x-id": "CompareModal_25_6",
      "x-dynamic": "true",
      "x-source-type": "unknown",
      "x-source-var": "a",
      "x-source-path": "query",
      "x-source-editable": "false",
      children: ["\"", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
        "data-ve-dynamic": "true",
        "x-excluded": "true",
        style: {
          display: "contents"
        },
        "x-file-name": "CompareModal",
        "x-line-number": "25",
        "x-column": "6",
        "x-component": "p",
        "x-id": "CompareModal_25_6_expr1",
        "x-dynamic": "true",
        "x-source-type": "unknown",
        "x-source-var": "a",
        "x-source-path": "query",
        "x-source-editable": "false",
        children: a.query
      }, void 0, false), "\""]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: `mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${conf.border} bg-black/30`,
      "x-file-name": "CompareModal",
      "x-line-number": "27",
      "x-column": "6",
      "x-component": "div",
      "x-id": "CompareModal_27_6",
      "x-dynamic": "false",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
        className: `font-head font-bold text-lg ${conf.text}`,
        "x-file-name": "CompareModal",
        "x-line-number": "28",
        "x-column": "8",
        "x-component": "span",
        "x-id": "CompareModal_28_8",
        "x-dynamic": "true",
        "x-source-type": "unknown",
        "x-source-editable": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
          "data-ve-dynamic": "true",
          "x-excluded": "true",
          style: {
            display: "contents"
          },
          "x-file-name": "CompareModal",
          "x-line-number": "28",
          "x-column": "8",
          "x-component": "span",
          "x-id": "CompareModal_28_8_expr0",
          "x-dynamic": "true",
          "x-source-type": "unknown",
          "x-source-editable": "false",
          children: c === null || c === void 0 ? void 0 : c.level
        }, void 0, false), " \xB7 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
          "data-ve-dynamic": "true",
          "x-excluded": "true",
          style: {
            display: "contents"
          },
          "x-file-name": "CompareModal",
          "x-line-number": "28",
          "x-column": "8",
          "x-component": "span",
          "x-id": "CompareModal_28_8_expr2",
          "x-dynamic": "true",
          "x-source-type": "unknown",
          "x-source-editable": "false",
          children: c === null || c === void 0 ? void 0 : c.percent
        }, void 0, false), "%"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: "h-1.5 rounded-full bg-black/40 overflow-hidden mt-2",
      "x-file-name": "CompareModal",
      "x-line-number": "30",
      "x-column": "6",
      "x-component": "div",
      "x-id": "CompareModal_30_6",
      "x-dynamic": "false",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        className: "h-full rounded-full",
        style: {
          width: `${(c === null || c === void 0 ? void 0 : c.percent) || 0}%`,
          background: conf.bar
        },
        "x-file-name": "CompareModal",
        "x-line-number": "31",
        "x-column": "8",
        "x-component": "div",
        "x-id": "CompareModal_31_8",
        "x-dynamic": "false"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: "mt-3",
      "x-file-name": "CompareModal",
      "x-line-number": "34",
      "x-column": "6",
      "x-component": "div",
      "x-id": "CompareModal_34_6",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        className: "telemetry mb-1",
        "x-file-name": "CompareModal",
        "x-line-number": "35",
        "x-column": "8",
        "x-component": "div",
        "x-id": "CompareModal_35_8",
        "x-dynamic": "false",
        children: "Answer"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("p", {
        className: "text-[12px] text-slate-300 leading-relaxed",
        "x-file-name": "CompareModal",
        "x-line-number": "36",
        "x-column": "8",
        "x-component": "p",
        "x-id": "CompareModal_36_8",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: AnswerOf(r)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, undefined), r.change_percentage != null && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: "mt-2 text-[12px] text-rose-300 font-mono-x",
      "x-file-name": "CompareModal",
      "x-line-number": "40",
      "x-column": "8",
      "x-component": "div",
      "x-id": "CompareModal_40_8",
      "x-dynamic": "true",
      "x-source-type": "unknown",
      "x-source-var": "r",
      "x-source-path": "change_percentage",
      "x-source-editable": "false",
      children: ["\u0394 change: ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
        "data-ve-dynamic": "true",
        "x-excluded": "true",
        style: {
          display: "contents"
        },
        "x-file-name": "CompareModal",
        "x-line-number": "40",
        "x-column": "8",
        "x-component": "div",
        "x-id": "CompareModal_40_8_expr1",
        "x-dynamic": "true",
        "x-source-type": "unknown",
        "x-source-var": "r",
        "x-source-path": "change_percentage",
        "x-source-editable": "false",
        children: r.change_percentage
      }, void 0, false), "%"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: "mt-3 grid grid-cols-2 gap-x-3 gap-y-0.5",
      "x-file-name": "CompareModal",
      "x-line-number": "43",
      "x-column": "6",
      "x-component": "div",
      "x-id": "CompareModal_43_6",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: Object.entries((c === null || c === void 0 ? void 0 : c.breakdown) || {}).map(([k, v]) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        className: `flex justify-between text-[10px] font-mono-x ${align === "right" ? "flex-row-reverse" : ""}`,
        "x-file-name": "CompareModal",
        "x-line-number": "45",
        "x-column": "10",
        "x-component": "div",
        "x-id": "CompareModal_45_10",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
          className: "text-slate-500",
          "x-file-name": "CompareModal",
          "x-line-number": "46",
          "x-column": "12",
          "x-component": "span",
          "x-id": "CompareModal_46_12",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: k.replace(/_/g, " ")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
          className: "text-slate-200",
          "x-file-name": "CompareModal",
          "x-line-number": "47",
          "x-column": "12",
          "x-component": "span",
          "x-id": "CompareModal_47_12",
          "x-dynamic": "true",
          "x-source-type": "unknown",
          "x-source-var": "v",
          "x-source-editable": "false",
          children: v
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 13
        }, undefined)]
      }, k, true, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 11
      }, undefined))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: "mt-2 text-[10px] text-slate-500 font-mono-x",
      "x-file-name": "CompareModal",
      "x-line-number": "51",
      "x-column": "6",
      "x-component": "div",
      "x-id": "CompareModal_51_6",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
        "data-ve-dynamic": "true",
        "x-excluded": "true",
        style: {
          display: "contents"
        },
        "x-file-name": "CompareModal",
        "x-line-number": "51",
        "x-column": "6",
        "x-component": "div",
        "x-id": "CompareModal_51_6_expr1",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: ((_r$evidence_regions = r.evidence_regions) === null || _r$evidence_regions === void 0 ? void 0 : _r$evidence_regions.length) || 0
      }, void 0, false), " regions \xB7 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
        "data-ve-dynamic": "true",
        "x-excluded": "true",
        style: {
          display: "contents"
        },
        "x-file-name": "CompareModal",
        "x-line-number": "51",
        "x-column": "6",
        "x-component": "div",
        "x-id": "CompareModal_51_6_expr3",
        "x-dynamic": "true",
        "x-source-type": "unknown",
        "x-source-var": "a",
        "x-source-path": "elapsed_sec",
        "x-source-editable": "false",
        children: a.elapsed_sec
      }, void 0, false), "s"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }, undefined);
};
_c2 = Column;
const CompareModal = ({
  open,
  onOpenChange,
  entries
}) => {
  var _A$analysis$confidenc, _A$analysis, _A$analysis$confidenc2, _B$analysis$confidenc, _B$analysis, _B$analysis$confidenc2;
  const [A, B] = entries || [];
  const pa = (_A$analysis$confidenc = A === null || A === void 0 ? void 0 : (_A$analysis = A.analysis) === null || _A$analysis === void 0 ? void 0 : (_A$analysis$confidenc2 = _A$analysis.confidence) === null || _A$analysis$confidenc2 === void 0 ? void 0 : _A$analysis$confidenc2.percent) !== null && _A$analysis$confidenc !== void 0 ? _A$analysis$confidenc : 0;
  const pb = (_B$analysis$confidenc = B === null || B === void 0 ? void 0 : (_B$analysis = B.analysis) === null || _B$analysis === void 0 ? void 0 : (_B$analysis$confidenc2 = _B$analysis.confidence) === null || _B$analysis$confidenc2 === void 0 ? void 0 : _B$analysis$confidenc2.percent) !== null && _B$analysis$confidenc !== void 0 ? _B$analysis$confidenc : 0;
  const delta = Math.round((pb - pa) * 10) / 10;
  const DeltaIcon = delta > 0 ? lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"] : delta < 0 ? lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"] : lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"];
  const deltaColor = delta > 0 ? "text-emerald-400" : delta < 0 ? "text-rose-400" : "text-slate-400";
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog, {
    open: open,
    onOpenChange: onOpenChange,
    "x-file-name": "CompareModal",
    "x-line-number": "67",
    "x-column": "4",
    "x-component": "Dialog",
    "x-id": "CompareModal_67_4",
    "x-dynamic": "false",
    "x-excluded": "true",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogContent, {
      className: "max-w-4xl bg-[#0B0E14] border border-cyan-500/25 text-slate-200",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogHeader, {
        "x-file-name": "CompareModal",
        "x-line-number": "69",
        "x-column": "8",
        "x-component": "DialogHeader",
        "x-id": "CompareModal_69_8",
        "x-dynamic": "true",
        "x-excluded": "true",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogTitle, {
          className: "font-head tracking-wide flex items-center gap-2 text-slate-100",
          "x-file-name": "CompareModal",
          "x-line-number": "70",
          "x-column": "10",
          "x-component": "DialogTitle",
          "x-id": "CompareModal_70_10",
          "x-dynamic": "false",
          children: "SIDE-BY-SIDE COMPARISON"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogDescription, {
          className: "text-slate-500 text-xs",
          "x-file-name": "CompareModal",
          "x-line-number": "73",
          "x-column": "10",
          "x-component": "DialogDescription",
          "x-id": "CompareModal_73_10",
          "x-dynamic": "false",
          children: "Compare answers, confidence and evidence across two analyses."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 73,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 9
      }, undefined), A && B ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        className: "flex items-stretch gap-4",
        "data-testid": "compare-body",
        "x-file-name": "CompareModal",
        "x-line-number": "77",
        "x-column": "10",
        "x-component": "div",
        "x-id": "CompareModal_77_10",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
          className: "flex-1 rounded-lg border border-white/8 bg-[#121824] p-4",
          "x-file-name": "CompareModal",
          "x-line-number": "78",
          "x-column": "12",
          "x-component": "div",
          "x-id": "CompareModal_78_12",
          "x-dynamic": "false",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Column, {
            entry: A,
            "x-file-name": "CompareModal",
            "x-line-number": "78",
            "x-column": "86",
            "x-component": "Column",
            "x-id": "CompareModal_78_86",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 87
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 78,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
          className: "flex flex-col items-center justify-center gap-2 shrink-0 px-1",
          "x-file-name": "CompareModal",
          "x-line-number": "80",
          "x-column": "12",
          "x-component": "div",
          "x-id": "CompareModal_80_12",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
            className: "w-5 h-5 text-cyan-500/60"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 81,
            columnNumber: 15
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
            className: `flex flex-col items-center ${deltaColor}`,
            "x-file-name": "CompareModal",
            "x-line-number": "82",
            "x-column": "14",
            "x-component": "div",
            "x-id": "CompareModal_82_14",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(DeltaIcon, {
              className: "w-5 h-5",
              "x-file-name": "CompareModal",
              "x-line-number": "83",
              "x-column": "16",
              "x-component": "DeltaIcon",
              "x-id": "CompareModal_83_16",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 83,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
              className: "font-head font-bold text-sm",
              "data-testid": "confidence-delta",
              "x-file-name": "CompareModal",
              "x-line-number": "84",
              "x-column": "16",
              "x-component": "span",
              "x-id": "CompareModal_84_16",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
                "data-ve-dynamic": "true",
                "x-excluded": "true",
                style: {
                  display: "contents"
                },
                "x-file-name": "CompareModal",
                "x-line-number": "84",
                "x-column": "16",
                "x-component": "span",
                "x-id": "CompareModal_84_16_expr0",
                "x-dynamic": "true",
                "x-source-type": "computed",
                "x-source-editable": "false",
                children: delta > 0 ? "+" : ""
              }, void 0, false), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
                "data-ve-dynamic": "true",
                "x-excluded": "true",
                style: {
                  display: "contents"
                },
                "x-file-name": "CompareModal",
                "x-line-number": "84",
                "x-column": "16",
                "x-component": "span",
                "x-id": "CompareModal_84_16_expr1",
                "x-dynamic": "true",
                "x-source-type": "unknown",
                "x-source-var": "delta",
                "x-source-editable": "false",
                children: delta
              }, void 0, false), "%"]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 84,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("span", {
              className: "telemetry text-slate-500",
              "x-file-name": "CompareModal",
              "x-line-number": "85",
              "x-column": "16",
              "x-component": "span",
              "x-id": "CompareModal_85_16",
              "x-dynamic": "false",
              children: "conf \u0394"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 85,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 82,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 80,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
          className: "flex-1 rounded-lg border border-white/8 bg-[#121824] p-4",
          "x-file-name": "CompareModal",
          "x-line-number": "89",
          "x-column": "12",
          "x-component": "div",
          "x-id": "CompareModal_89_12",
          "x-dynamic": "false",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Column, {
            entry: B,
            align: "right",
            "x-file-name": "CompareModal",
            "x-line-number": "89",
            "x-column": "86",
            "x-component": "Column",
            "x-id": "CompareModal_89_86",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 89,
            columnNumber: 87
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 11
      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("p", {
        className: "text-sm text-slate-500 py-8 text-center",
        "x-file-name": "CompareModal",
        "x-line-number": "92",
        "x-column": "10",
        "x-component": "p",
        "x-id": "CompareModal_92_10",
        "x-dynamic": "false",
        children: "Select two analyses to compare."
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 67,
    columnNumber: 5
  }, undefined);
};
_c3 = CompareModal;
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "AnswerOf");
__webpack_require__.$Refresh$.register(_c2, "Column");
__webpack_require__.$Refresh$.register(_c3, "CompareModal");

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

