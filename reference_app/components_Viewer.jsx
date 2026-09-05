/***/ "./src/components/Viewer.jsx"
/*!***********************************!*\
  !*** ./src/components/Viewer.jsx ***!
  \***********************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Viewer: () => (/* binding */ Viewer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/square-split-horizontal.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/crosshair.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye-off.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/flame.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/maximize-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/radar.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/sun.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/zoom-in.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/zoom-out.js");
/* harmony import */ var _components_ui_slider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/components/ui/slider */ "./src/components/ui/slider.jsx");
/* harmony import */ var _lib_demoData__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/lib/demoData */ "./src/lib/demoData.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/components/Viewer.jsx",
  _s = __webpack_require__.$Refresh$.signature();





const Viewer = ({
  slots,
  analysis,
  running
}) => {
  _s();
  var _analysis$result, _analysis$result2, _slots$primaryIdx, _slots$primaryIdx$mod, _analysis$result3;
  const [zoom, setZoom] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [pan, setPan] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    x: 0,
    y: 0
  });
  const [showRegions, setShowRegions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [opacity, setOpacity] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(70);
  const [split, setSplit] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(50);
  const [splitMode, setSplitMode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [layer, setLayer] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [showHeatmap, setShowHeatmap] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const dragging = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const stageRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const task = analysis === null || analysis === void 0 ? void 0 : analysis.task;
  const regions = showRegions && (analysis === null || analysis === void 0 ? void 0 : (_analysis$result = analysis.result) === null || _analysis$result === void 0 ? void 0 : _analysis$result.evidence_regions) || [];
  const changeRegions = ((analysis === null || analysis === void 0 ? void 0 : (_analysis$result2 = analysis.result) === null || _analysis$result2 === void 0 ? void 0 : _analysis$result2.evidence_regions) || []).filter(r => r.type === "change");
  const isPair = slots.length === 2;
  const primaryIdx = task === "cross_modal" ? Math.max(0, slots.findIndex(s => s.modality === "optical")) : isPair ? 1 : 0;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setZoom(1);
    setPan({
      x: 0,
      y: 0
    });
    setLayer(0);
  }, [slots.map(s => s.preview).join()]);
  const onWheel = e => {
    e.preventDefault();
    setZoom(z => Math.min(5, Math.max(1, z + (e.deltaY < 0 ? 0.2 : -0.2))));
  };
  const onDown = e => {
    dragging.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    };
  };
  const onMove = e => {
    if (!dragging.current) return;
    setPan({
      x: e.clientX - dragging.current.x,
      y: e.clientY - dragging.current.y
    });
  };
  const onUp = () => {
    dragging.current = null;
  };
  const reset = () => {
    setZoom(1);
    setPan({
      x: 0,
      y: 0
    });
  };
  const baseImg = slots[0];
  const topImg = slots[primaryIdx] || slots[0];
  const singleView = !isPair || !splitMode;
  const shown = singleView ? slots[layer] || slots[0] : null;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("section", {
    "data-testid": "viewer",
    className: "flex-1 relative flex flex-col bg-[#0B0E14] overflow-hidden",
    "x-file-name": "Viewer",
    "x-line-number": "47",
    "x-column": "4",
    "x-component": "section",
    "x-id": "Viewer_47_4",
    "x-dynamic": "true",
    "x-source-type": "computed",
    "x-source-editable": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
      className: "absolute top-3 right-3 z-20 flex flex-col gap-2 items-end",
      "x-file-name": "Viewer",
      "x-line-number": "49",
      "x-column": "6",
      "x-component": "div",
      "x-id": "Viewer_49_6",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
        className: "sq-glass rounded-lg flex items-center gap-1 p-1",
        "x-file-name": "Viewer",
        "x-line-number": "50",
        "x-column": "8",
        "x-component": "div",
        "x-id": "Viewer_50_8",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(IconBtn, {
          tid: "zoom-in",
          onClick: () => setZoom(z => Math.min(5, z + 0.3)),
          "x-file-name": "Viewer",
          "x-line-number": "51",
          "x-column": "10",
          "x-component": "IconBtn",
          "x-id": "Viewer_51_10",
          "x-dynamic": "true",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
            className: "w-4 h-4",
            "x-file-name": "Viewer",
            "x-line-number": "51",
            "x-column": "86",
            "x-component": "ZoomIn",
            "x-id": "Viewer_51_86",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 51,
            columnNumber: 87
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(IconBtn, {
          tid: "zoom-out",
          onClick: () => setZoom(z => Math.max(1, z - 0.3)),
          "x-file-name": "Viewer",
          "x-line-number": "52",
          "x-column": "10",
          "x-component": "IconBtn",
          "x-id": "Viewer_52_10",
          "x-dynamic": "true",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
            className: "w-4 h-4",
            "x-file-name": "Viewer",
            "x-line-number": "52",
            "x-column": "87",
            "x-component": "ZoomOut",
            "x-id": "Viewer_52_87",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 52,
            columnNumber: 88
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(IconBtn, {
          tid: "reset-view",
          onClick: reset,
          "x-file-name": "Viewer",
          "x-line-number": "53",
          "x-column": "10",
          "x-component": "IconBtn",
          "x-id": "Viewer_53_10",
          "x-dynamic": "true",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
            className: "w-4 h-4",
            "x-file-name": "Viewer",
            "x-line-number": "53",
            "x-column": "52",
            "x-component": "Maximize2",
            "x-id": "Viewer_53_52",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 53,
            columnNumber: 53
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
          className: "w-px h-5 bg-cyan-500/20 mx-0.5",
          "x-file-name": "Viewer",
          "x-line-number": "54",
          "x-column": "10",
          "x-component": "div",
          "x-id": "Viewer_54_10",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(IconBtn, {
          tid: "toggle-regions",
          active: showRegions,
          onClick: () => setShowRegions(v => !v),
          "x-file-name": "Viewer",
          "x-line-number": "55",
          "x-column": "10",
          "x-component": "IconBtn",
          "x-id": "Viewer_55_10",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: showRegions ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "w-4 h-4",
            "x-file-name": "Viewer",
            "x-line-number": "56",
            "x-column": "27",
            "x-component": "Eye",
            "x-id": "Viewer_56_27",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 56,
            columnNumber: 28
          }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
            className: "w-4 h-4",
            "x-file-name": "Viewer",
            "x-line-number": "56",
            "x-column": "57",
            "x-component": "EyeOff",
            "x-id": "Viewer_56_57",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 56,
            columnNumber: 58
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 11
        }, undefined), isPair && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(IconBtn, {
          tid: "toggle-split",
          active: splitMode,
          onClick: () => setSplitMode(v => !v),
          "x-file-name": "Viewer",
          "x-line-number": "59",
          "x-column": "12",
          "x-component": "IconBtn",
          "x-id": "Viewer_59_12",
          "x-dynamic": "true",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
            className: "w-4 h-4",
            "x-file-name": "Viewer",
            "x-line-number": "60",
            "x-column": "14",
            "x-component": "SplitSquareHorizontal",
            "x-id": "Viewer_60_14",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 60,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 13
        }, undefined), task === "change" && changeRegions.length > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(IconBtn, {
          tid: "toggle-heatmap",
          active: showHeatmap,
          onClick: () => setShowHeatmap(v => !v),
          "x-file-name": "Viewer",
          "x-line-number": "64",
          "x-column": "12",
          "x-component": "IconBtn",
          "x-id": "Viewer_64_12",
          "x-dynamic": "true",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
            className: "w-4 h-4",
            "x-file-name": "Viewer",
            "x-line-number": "65",
            "x-column": "14",
            "x-component": "Flame",
            "x-id": "Viewer_65_14",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 65,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 9
      }, undefined), isPair && !splitMode && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
        className: "sq-glass rounded-lg flex items-center p-1 gap-1",
        "data-testid": "layer-switch",
        "x-file-name": "Viewer",
        "x-line-number": "70",
        "x-column": "10",
        "x-component": "div",
        "x-id": "Viewer_70_10",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: slots.map((s, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("button", {
          "data-testid": `layer-${i}`,
          onClick: () => setLayer(i),
          className: `sq-btn px-2.5 py-1 rounded text-[11px] font-mono-x flex items-center gap-1 ${layer === i ? "bg-cyan-500/20 text-cyan-200 sq-glow" : "text-slate-400 hover:text-cyan-300"}`,
          "x-file-name": "Viewer",
          "x-line-number": "72",
          "x-column": "14",
          "x-component": "button",
          "x-id": "Viewer_72_14",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: [s.modality === "sar" ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
            className: "w-3 h-3",
            "x-file-name": "Viewer",
            "x-line-number": "78",
            "x-column": "40",
            "x-component": "Radar",
            "x-id": "Viewer_78_40",
            "x-dynamic": "true",
            "x-source-type": "external",
            "x-source-var": "slots",
            "x-source-editable": "false",
            "x-array-var": "slots",
            "x-array-item-param": "s"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 41
          }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
            className: "w-3 h-3",
            "x-file-name": "Viewer",
            "x-line-number": "78",
            "x-column": "72",
            "x-component": "Sun",
            "x-id": "Viewer_78_72",
            "x-dynamic": "true",
            "x-source-type": "external",
            "x-source-var": "slots",
            "x-source-editable": "false",
            "x-array-var": "slots",
            "x-array-item-param": "s"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 73
          }, undefined), task === "change" ? i === 0 ? "T1" : "T2" : s.modality.slice(0, 3).toUpperCase()]
        }, i, true, {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 15
        }, undefined))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
        className: "sq-glass rounded-lg px-2 py-1 telemetry",
        "x-file-name": "Viewer",
        "x-line-number": "84",
        "x-column": "8",
        "x-component": "div",
        "x-id": "Viewer_84_8",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: ["ZOOM ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
          "data-ve-dynamic": "true",
          "x-excluded": "true",
          style: {
            display: "contents"
          },
          "x-file-name": "Viewer",
          "x-line-number": "84",
          "x-column": "8",
          "x-component": "div",
          "x-id": "Viewer_84_8_expr1",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: zoom.toFixed(1)
        }, void 0, false), "\xD7"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
      className: "absolute top-3 left-3 z-20 telemetry sq-glass rounded px-2 py-1 flex items-center gap-1.5",
      "x-file-name": "Viewer",
      "x-line-number": "88",
      "x-column": "6",
      "x-component": "div",
      "x-id": "Viewer_88_6",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: "w-3.5 h-3.5 text-[#FF7300]",
        "x-file-name": "Viewer",
        "x-line-number": "89",
        "x-column": "8",
        "x-component": "Crosshair",
        "x-id": "Viewer_89_8",
        "x-dynamic": "false"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 9
      }, undefined), " GEOSPATIAL VIEWPORT"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
      ref: stageRef,
      className: "flex-1 relative sq-grid-bg overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center",
      onWheel: onWheel,
      onMouseDown: onDown,
      onMouseMove: onMove,
      onMouseUp: onUp,
      onMouseLeave: onUp,
      "x-file-name": "Viewer",
      "x-line-number": "93",
      "x-column": "6",
      "x-component": "div",
      "x-id": "Viewer_93_6",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [running && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
        className: "sq-scanline",
        "x-file-name": "Viewer",
        "x-line-number": "102",
        "x-column": "20",
        "x-component": "div",
        "x-id": "Viewer_102_20",
        "x-dynamic": "false"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 21
      }, undefined), !slots.length ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(EmptyState, {
        "x-file-name": "Viewer",
        "x-line-number": "105",
        "x-column": "10",
        "x-component": "EmptyState",
        "x-id": "Viewer_105_10",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 11
      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
        className: "relative",
        style: {
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: dragging.current ? "none" : "transform .15s ease"
        },
        "x-file-name": "Viewer",
        "x-line-number": "107",
        "x-column": "10",
        "x-component": "div",
        "x-id": "Viewer_107_10",
        "x-dynamic": "false",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
          className: "relative",
          style: {
            width: "min(66vh, 760px)",
            aspectRatio: "1 / 1"
          },
          "x-file-name": "Viewer",
          "x-line-number": "111",
          "x-column": "12",
          "x-component": "div",
          "x-id": "Viewer_111_12",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: [singleView ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("img", {
            src: shown === null || shown === void 0 ? void 0 : shown.preview,
            alt: "scene",
            draggable: false,
            className: "w-full h-full object-cover rounded-lg border border-cyan-500/20 select-none",
            "x-file-name": "Viewer",
            "x-line-number": "113",
            "x-column": "16",
            "x-component": "img",
            "x-id": "Viewer_113_16",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 113,
            columnNumber: 17
          }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("img", {
              src: baseImg.preview,
              alt: "before",
              draggable: false,
              className: "absolute inset-0 w-full h-full object-cover rounded-lg border border-cyan-500/20 select-none",
              "x-file-name": "Viewer",
              "x-line-number": "116",
              "x-column": "18",
              "x-component": "img",
              "x-id": "Viewer_116_18",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 116,
              columnNumber: 19
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
              className: "absolute inset-0 overflow-hidden rounded-lg",
              style: {
                clipPath: `inset(0 ${100 - split}% 0 0)`
              },
              "x-file-name": "Viewer",
              "x-line-number": "117",
              "x-column": "18",
              "x-component": "div",
              "x-id": "Viewer_117_18",
              "x-dynamic": "false",
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("img", {
                src: topImg.preview,
                alt: "after",
                draggable: false,
                className: "w-full h-full object-cover rounded-lg select-none",
                "x-file-name": "Viewer",
                "x-line-number": "118",
                "x-column": "20",
                "x-component": "img",
                "x-id": "Viewer_118_20",
                "x-dynamic": "false"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 118,
                columnNumber: 21
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 117,
              columnNumber: 19
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
              className: "absolute top-0 bottom-0 z-10",
              style: {
                left: `${split}%`
              },
              "x-file-name": "Viewer",
              "x-line-number": "121",
              "x-column": "18",
              "x-component": "div",
              "x-id": "Viewer_121_18",
              "x-dynamic": "false",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
                className: "w-0.5 h-full bg-[#FF7300] sq-glow-orange",
                "x-file-name": "Viewer",
                "x-line-number": "122",
                "x-column": "20",
                "x-component": "div",
                "x-id": "Viewer_122_20",
                "x-dynamic": "false"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 122,
                columnNumber: 21
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
                className: "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FF7300] flex items-center justify-center cursor-ew-resize",
                onMouseDown: e => {
                  e.stopPropagation();
                  const rect = e.currentTarget.closest(".relative").getBoundingClientRect();
                  const mv = ev => setSplit(Math.min(95, Math.max(5, (ev.clientX - rect.left) / rect.width * 100)));
                  const up = () => {
                    window.removeEventListener("mousemove", mv);
                    window.removeEventListener("mouseup", up);
                  };
                  window.addEventListener("mousemove", mv);
                  window.addEventListener("mouseup", up);
                },
                "x-file-name": "Viewer",
                "x-line-number": "123",
                "x-column": "20",
                "x-component": "div",
                "x-id": "Viewer_123_20",
                "x-dynamic": "false",
                children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
                  className: "w-3.5 h-3.5 text-black",
                  "x-file-name": "Viewer",
                  "x-line-number": "130",
                  "x-column": "22",
                  "x-component": "SplitSquareHorizontal",
                  "x-id": "Viewer_130_22",
                  "x-dynamic": "false"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 130,
                  columnNumber: 23
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 123,
                columnNumber: 21
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 121,
              columnNumber: 19
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
              className: "absolute top-2 left-2 telemetry bg-black/60 rounded px-1.5 py-0.5 z-10",
              "x-file-name": "Viewer",
              "x-line-number": "133",
              "x-column": "18",
              "x-component": "span",
              "x-id": "Viewer_133_18",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: task === "change" ? "T1 · BEFORE" : "OPTICAL"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 133,
              columnNumber: 19
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
              className: "absolute top-2 right-2 telemetry bg-black/60 rounded px-1.5 py-0.5 z-10",
              "x-file-name": "Viewer",
              "x-line-number": "134",
              "x-column": "18",
              "x-component": "span",
              "x-id": "Viewer_134_18",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: task === "change" ? "T2 · AFTER" : (_slots$primaryIdx = slots[primaryIdx]) === null || _slots$primaryIdx === void 0 ? void 0 : (_slots$primaryIdx$mod = _slots$primaryIdx.modality) === null || _slots$primaryIdx$mod === void 0 ? void 0 : _slots$primaryIdx$mod.toUpperCase()
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 134,
              columnNumber: 19
            }, undefined)]
          }, void 0, true), task === "change" && showHeatmap && changeRegions.length > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
            className: "absolute inset-0 pointer-events-none rounded-lg overflow-hidden",
            "data-testid": "change-heatmap",
            style: {
              opacity: opacity / 100
            },
            "x-file-name": "Viewer",
            "x-line-number": "140",
            "x-column": "16",
            "x-component": "div",
            "x-id": "Viewer_140_16",
            "x-dynamic": "false",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
              className: "absolute inset-0",
              style: {
                filter: "blur(7px)"
              },
              "x-file-name": "Viewer",
              "x-line-number": "141",
              "x-column": "18",
              "x-component": "div",
              "x-id": "Viewer_141_18",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: changeRegions.map((r, i) => {
                const [x, y, w, h] = r.box;
                const cx = (x + w / 2) * 100;
                const cy = (y + h / 2) * 100;
                const size = Math.max(w, h, 0.08) * 100 * 1.9;
                return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
                  className: "absolute rounded-full sq-fade-up",
                  style: {
                    left: `${cx}%`,
                    top: `${cy}%`,
                    width: `${size}%`,
                    height: `${size}%`,
                    transform: "translate(-50%,-50%)",
                    mixBlendMode: "screen",
                    background: "radial-gradient(circle, rgba(255,32,0,0.95) 0%, rgba(255,120,0,0.6) 34%, rgba(255,210,0,0.18) 60%, transparent 74%)"
                  },
                  "x-file-name": "Viewer",
                  "x-line-number": "148",
                  "x-column": "24",
                  "x-component": "div",
                  "x-id": "Viewer_148_24",
                  "x-dynamic": "false"
                }, i, false, {
                  fileName: _jsxFileName,
                  lineNumber: 148,
                  columnNumber: 25
                }, undefined);
              })
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 141,
              columnNumber: 19
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 140,
            columnNumber: 17
          }, undefined), (singleView ? layer === primaryIdx || !isPair : true) && regions.map((r, i) => {
            const c = _lib_demoData__WEBPACK_IMPORTED_MODULE_12__.REGION_COLORS[r.type] || _lib_demoData__WEBPACK_IMPORTED_MODULE_12__.REGION_COLORS.object;
            const [x, y, w, h] = r.box;
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
              "data-testid": `region-${i}`,
              className: "absolute rounded-sm sq-fade-up",
              style: {
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                width: `${w * 100}%`,
                height: `${h * 100}%`,
                border: `2px solid ${c.stroke}`,
                background: c.fill,
                opacity: opacity / 100,
                boxShadow: `0 0 10px ${c.stroke}55`
              },
              "x-file-name": "Viewer",
              "x-line-number": "165",
              "x-column": "20",
              "x-component": "div",
              "x-id": "Viewer_165_20",
              "x-dynamic": "false",
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
                className: "absolute -top-5 left-0 whitespace-nowrap text-[10px] font-mono-x px-1 rounded",
                style: {
                  background: c.stroke,
                  color: "#0B0E14"
                },
                "x-file-name": "Viewer",
                "x-line-number": "175",
                "x-column": "22",
                "x-component": "span",
                "x-id": "Viewer_175_22",
                "x-dynamic": "true",
                "x-source-type": "static-imported",
                "x-source-var": "regions",
                "x-source-path": "label",
                "x-source-editable": "false",
                "x-array-var": "regions",
                "x-array-item-param": "r",
                children: r.label
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 175,
                columnNumber: 23
              }, undefined)
            }, i, false, {
              fileName: _jsxFileName,
              lineNumber: 165,
              columnNumber: 21
            }, undefined);
          })]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 111,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 7
    }, undefined), slots.length > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
      className: "sq-glass border-t border-cyan-500/15 px-4 py-2.5 flex items-center gap-6 z-20",
      "x-file-name": "Viewer",
      "x-line-number": "187",
      "x-column": "8",
      "x-component": "div",
      "x-id": "Viewer_187_8",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
        className: "flex items-center gap-3 min-w-[220px]",
        "x-file-name": "Viewer",
        "x-line-number": "188",
        "x-column": "10",
        "x-component": "div",
        "x-id": "Viewer_188_10",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
          className: "telemetry whitespace-nowrap",
          "x-file-name": "Viewer",
          "x-line-number": "189",
          "x-column": "12",
          "x-component": "span",
          "x-id": "Viewer_189_12",
          "x-dynamic": "false",
          children: "Overlay Opacity"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 189,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_components_ui_slider__WEBPACK_IMPORTED_MODULE_11__.Slider, {
          "data-testid": "opacity-slider",
          value: [opacity],
          onValueChange: v => setOpacity(v[0]),
          min: 0,
          max: 100,
          step: 5,
          className: "w-32",
          "x-file-name": "Viewer",
          "x-line-number": "190",
          "x-column": "12",
          "x-component": "Slider",
          "x-id": "Viewer_190_12",
          "x-dynamic": "true"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 190,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
          className: "font-mono-x text-[11px] text-cyan-300 w-8",
          "x-file-name": "Viewer",
          "x-line-number": "191",
          "x-column": "12",
          "x-component": "span",
          "x-id": "Viewer_191_12",
          "x-dynamic": "true",
          "x-source-type": "state",
          "x-source-var": "opacity",
          "x-source-editable": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
            "data-ve-dynamic": "true",
            "x-excluded": "true",
            style: {
              display: "contents"
            },
            "x-file-name": "Viewer",
            "x-line-number": "191",
            "x-column": "12",
            "x-component": "span",
            "x-id": "Viewer_191_12_expr0",
            "x-dynamic": "true",
            "x-source-type": "state",
            "x-source-var": "opacity",
            "x-source-editable": "false",
            children: opacity
          }, void 0, false), "%"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 191,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 188,
        columnNumber: 11
      }, undefined), isPair && splitMode && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
        className: "flex items-center gap-3 min-w-[220px]",
        "x-file-name": "Viewer",
        "x-line-number": "194",
        "x-column": "12",
        "x-component": "div",
        "x-id": "Viewer_194_12",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
          className: "telemetry whitespace-nowrap",
          "x-file-name": "Viewer",
          "x-line-number": "195",
          "x-column": "14",
          "x-component": "span",
          "x-id": "Viewer_195_14",
          "x-dynamic": "false",
          children: "Reveal"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 195,
          columnNumber: 15
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_components_ui_slider__WEBPACK_IMPORTED_MODULE_11__.Slider, {
          "data-testid": "split-slider",
          value: [split],
          onValueChange: v => setSplit(v[0]),
          min: 5,
          max: 95,
          step: 1,
          className: "w-32",
          "x-file-name": "Viewer",
          "x-line-number": "196",
          "x-column": "14",
          "x-component": "Slider",
          "x-id": "Viewer_196_14",
          "x-dynamic": "true"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 196,
          columnNumber: 15
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 194,
        columnNumber: 13
      }, undefined), (analysis === null || analysis === void 0 ? void 0 : (_analysis$result3 = analysis.result) === null || _analysis$result3 === void 0 ? void 0 : _analysis$result3.change_percentage) != null && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
        className: "ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/40",
        "x-file-name": "Viewer",
        "x-line-number": "200",
        "x-column": "12",
        "x-component": "div",
        "x-id": "Viewer_200_12",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
          className: "telemetry text-rose-300",
          "x-file-name": "Viewer",
          "x-line-number": "201",
          "x-column": "14",
          "x-component": "span",
          "x-id": "Viewer_201_14",
          "x-dynamic": "false",
          children: "\u0394 CHANGE"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 201,
          columnNumber: 15
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
          className: "font-mono-x text-sm text-rose-300 font-semibold",
          "x-file-name": "Viewer",
          "x-line-number": "202",
          "x-column": "14",
          "x-component": "span",
          "x-id": "Viewer_202_14",
          "x-dynamic": "true",
          "x-source-type": "prop",
          "x-source-var": "analysis",
          "x-source-path": "result.change_percentage",
          "x-source-editable": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
            "data-ve-dynamic": "true",
            "x-excluded": "true",
            style: {
              display: "contents"
            },
            "x-file-name": "Viewer",
            "x-line-number": "202",
            "x-column": "14",
            "x-component": "span",
            "x-id": "Viewer_202_14_expr0",
            "x-dynamic": "true",
            "x-source-type": "prop",
            "x-source-var": "analysis",
            "x-source-path": "result.change_percentage",
            "x-source-editable": "false",
            children: analysis.result.change_percentage
          }, void 0, false), "%"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 202,
          columnNumber: 15
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 200,
        columnNumber: 13
      }, undefined), task === "change" && showHeatmap && changeRegions.length > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
        className: "flex items-center gap-2",
        "data-testid": "heat-legend",
        "x-file-name": "Viewer",
        "x-line-number": "206",
        "x-column": "12",
        "x-component": "div",
        "x-id": "Viewer_206_12",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
          className: "telemetry",
          "x-file-name": "Viewer",
          "x-line-number": "207",
          "x-column": "14",
          "x-component": "span",
          "x-id": "Viewer_207_14",
          "x-dynamic": "false",
          children: "CHANGE INTENSITY"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 207,
          columnNumber: 15
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
          className: "h-2.5 w-24 rounded-full",
          style: {
            background: "linear-gradient(90deg, transparent, rgba(255,210,0,0.6), rgba(255,120,0,0.85), rgba(255,32,0,1))"
          },
          "x-file-name": "Viewer",
          "x-line-number": "208",
          "x-column": "14",
          "x-component": "span",
          "x-id": "Viewer_208_14",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 208,
          columnNumber: 15
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
          className: "telemetry text-rose-300",
          "x-file-name": "Viewer",
          "x-line-number": "209",
          "x-column": "14",
          "x-component": "span",
          "x-id": "Viewer_209_14",
          "x-dynamic": "false",
          children: "HIGH"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 209,
          columnNumber: 15
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 206,
        columnNumber: 13
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
        className: "flex items-center gap-3 ml-auto flex-wrap",
        "x-file-name": "Viewer",
        "x-line-number": "212",
        "x-column": "10",
        "x-component": "div",
        "x-id": "Viewer_212_10",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: legendItems(regions).map(t => {
          const c = _lib_demoData__WEBPACK_IMPORTED_MODULE_12__.REGION_COLORS[t] || _lib_demoData__WEBPACK_IMPORTED_MODULE_12__.REGION_COLORS.object;
          return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
            className: "flex items-center gap-1.5 telemetry",
            "x-file-name": "Viewer",
            "x-line-number": "216",
            "x-column": "16",
            "x-component": "span",
            "x-id": "Viewer_216_16",
            "x-dynamic": "true",
            "x-source-type": "static-imported",
            "x-source-editable": "false",
            "x-array-item-param": "t",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
              className: "w-3 h-3 rounded-sm",
              style: {
                background: c.fill,
                border: `1.5px solid ${c.stroke}`
              },
              "x-file-name": "Viewer",
              "x-line-number": "217",
              "x-column": "18",
              "x-component": "span",
              "x-id": "Viewer_217_18",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 217,
              columnNumber: 19
            }, undefined), t]
          }, t, true, {
            fileName: _jsxFileName,
            lineNumber: 216,
            columnNumber: 17
          }, undefined);
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 212,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 187,
      columnNumber: 9
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 47,
    columnNumber: 5
  }, undefined);
};
_s(Viewer, "sApMmZ+YCVlptQt6V83oQWH91YQ=");
_c = Viewer;
const legendItems = regions => [...new Set(regions.map(r => r.type))];
const IconBtn = ({
  children,
  onClick,
  active,
  tid
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("button", {
  "data-testid": tid,
  onClick: onClick,
  className: `sq-btn w-8 h-8 rounded flex items-center justify-center ${active ? "bg-cyan-500/20 text-cyan-200 sq-glow" : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"}`,
  "x-file-name": "Viewer",
  "x-line-number": "232",
  "x-column": "2",
  "x-component": "button",
  "x-id": "Viewer_232_2",
  "x-dynamic": "true",
  "x-source-type": "prop",
  "x-source-var": "children",
  "x-source-editable": "false",
  children: children
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 232,
  columnNumber: 3
}, undefined);
_c2 = IconBtn;
const EmptyState = () => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("div", {
  className: "text-center px-8",
  "x-file-name": "Viewer",
  "x-line-number": "242",
  "x-column": "2",
  "x-component": "div",
  "x-id": "Viewer_242_2",
  "x-dynamic": "false",
  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "w-14 h-14 text-cyan-500/30 mx-auto mb-4 sq-pulse",
    "x-file-name": "Viewer",
    "x-line-number": "243",
    "x-column": "4",
    "x-component": "Crosshair",
    "x-id": "Viewer_243_4",
    "x-dynamic": "false"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 243,
    columnNumber: 5
  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("p", {
    className: "font-head text-lg text-slate-400 tracking-wide",
    "x-file-name": "Viewer",
    "x-line-number": "244",
    "x-column": "4",
    "x-component": "p",
    "x-id": "Viewer_244_4",
    "x-dynamic": "false",
    children: "NO IMAGERY LOADED"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 244,
    columnNumber: 5
  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("p", {
    className: "text-sm text-slate-600 mt-1 max-w-xs mx-auto",
    "x-file-name": "Viewer",
    "x-line-number": "245",
    "x-column": "4",
    "x-component": "p",
    "x-id": "Viewer_245_4",
    "x-dynamic": "false",
    children: "Upload a scene or select a demo dataset from the left panel to begin analysis."
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 245,
    columnNumber: 5
  }, undefined)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 242,
  columnNumber: 3
}, undefined);
_c3 = EmptyState;
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "Viewer");
__webpack_require__.$Refresh$.register(_c2, "IconBtn");
__webpack_require__.$Refresh$.register(_c3, "EmptyState");

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

