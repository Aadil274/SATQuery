/***/ "./src/components/LeftPanel.jsx"
/*!**************************************!*\
  !*** ./src/components/LeftPanel.jsx ***!
  \**************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LeftPanel: () => (/* binding */ LeftPanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file-image.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/radar.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/sun.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trash-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/upload.js");
/* harmony import */ var _lib_demoData__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/lib/demoData */ "./src/lib/demoData.js");
/* harmony import */ var _components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/components/ui/scroll-area */ "./src/components/ui/scroll-area.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _jsxFileName = "/app/frontend/src/components/LeftPanel.jsx",
  _s = __webpack_require__.$Refresh$.signature();






const SectionTitle = ({
  children
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
  className: "telemetry px-1 mb-2 mt-1",
  "x-file-name": "LeftPanel",
  "x-line-number": "8",
  "x-column": "2",
  "x-component": "div",
  "x-id": "LeftPanel_8_2",
  "x-dynamic": "true",
  "x-source-type": "prop",
  "x-source-var": "children",
  "x-source-editable": "false",
  children: children
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 8,
  columnNumber: 3
}, undefined);
_c = SectionTitle;
const LeftPanel = ({
  slots,
  onLoadPreset,
  onAddFile,
  onRemove,
  onClear,
  onToggleModality
}) => {
  _s();
  const fileRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("aside", {
    "data-testid": "left-panel",
    className: "w-[340px] shrink-0 h-full sq-glass border-r border-cyan-500/15 flex flex-col",
    "x-file-name": "LeftPanel",
    "x-line-number": "15",
    "x-column": "4",
    "x-component": "aside",
    "x-id": "LeftPanel_15_4",
    "x-dynamic": "false",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_10__.ScrollArea, {
      className: "flex-1",
      "x-file-name": "LeftPanel",
      "x-line-number": "19",
      "x-column": "6",
      "x-component": "ScrollArea",
      "x-id": "LeftPanel_19_6",
      "x-dynamic": "true",
      "x-excluded": "true",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
        className: "p-4 space-y-5",
        "x-file-name": "LeftPanel",
        "x-line-number": "20",
        "x-column": "8",
        "x-component": "div",
        "x-id": "LeftPanel_20_8",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
          "x-file-name": "LeftPanel",
          "x-line-number": "22",
          "x-column": "10",
          "x-component": "div",
          "x-id": "LeftPanel_22_10",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(SectionTitle, {
            "x-file-name": "LeftPanel",
            "x-line-number": "23",
            "x-column": "12",
            "x-component": "SectionTitle",
            "x-id": "LeftPanel_23_12",
            "x-dynamic": "false",
            children: "Input Imagery"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 23,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("button", {
            "data-testid": "upload-image-button",
            onClick: () => {
              var _fileRef$current;
              return (_fileRef$current = fileRef.current) === null || _fileRef$current === void 0 ? void 0 : _fileRef$current.click();
            },
            disabled: slots.length >= 2,
            className: "sq-btn w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-dashed border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400 text-cyan-300 disabled:opacity-40",
            "x-file-name": "LeftPanel",
            "x-line-number": "24",
            "x-column": "12",
            "x-component": "button",
            "x-id": "LeftPanel_24_12",
            "x-dynamic": "true",
            "x-source-type": "computed",
            "x-source-editable": "false",
            children: [slots.length ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
              className: "w-4 h-4"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 30,
              columnNumber: 31
            }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
              className: "w-4 h-4",
              "x-file-name": "LeftPanel",
              "x-line-number": "30",
              "x-column": "61",
              "x-component": "Upload",
              "x-id": "LeftPanel_30_61",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 30,
              columnNumber: 62
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("span", {
              className: "font-head font-semibold tracking-wide text-sm",
              "x-file-name": "LeftPanel",
              "x-line-number": "31",
              "x-column": "14",
              "x-component": "span",
              "x-id": "LeftPanel_31_14",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: slots.length ? "ADD SECOND IMAGE" : "UPLOAD IMAGERY"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 31,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 24,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("input", {
            ref: fileRef,
            type: "file",
            accept: "image/png,image/jpeg,image/webp",
            className: "hidden",
            "data-testid": "file-input",
            onChange: e => {
              var _e$target$files;
              const f = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
              if (f) onAddFile(f);
              e.target.value = "";
            },
            "x-file-name": "LeftPanel",
            "x-line-number": "35",
            "x-column": "12",
            "x-component": "input",
            "x-id": "LeftPanel_35_12",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("p", {
            className: "text-[11px] text-slate-500 mt-2 px-1",
            "x-file-name": "LeftPanel",
            "x-line-number": "47",
            "x-column": "12",
            "x-component": "p",
            "x-id": "LeftPanel_47_12",
            "x-dynamic": "false",
            children: "PNG \xB7 JPG \xB7 WEBP \xB7 up to 2 scenes (bi-temporal or optical+SAR)"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 47,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 22,
          columnNumber: 11
        }, undefined), slots.length > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
          "x-file-name": "LeftPanel",
          "x-line-number": "52",
          "x-column": "12",
          "x-component": "div",
          "x-id": "LeftPanel_52_12",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "flex items-center justify-between mb-2 px-1",
            "x-file-name": "LeftPanel",
            "x-line-number": "53",
            "x-column": "14",
            "x-component": "div",
            "x-id": "LeftPanel_53_14",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("span", {
              className: "telemetry",
              "x-file-name": "LeftPanel",
              "x-line-number": "54",
              "x-column": "16",
              "x-component": "span",
              "x-id": "LeftPanel_54_16",
              "x-dynamic": "false",
              children: "Detected Configuration"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 54,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("button", {
              "data-testid": "clear-images",
              onClick: onClear,
              className: "sq-btn text-slate-500 hover:text-rose-400",
              "x-file-name": "LeftPanel",
              "x-line-number": "55",
              "x-column": "16",
              "x-component": "button",
              "x-id": "LeftPanel_55_16",
              "x-dynamic": "false",
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
                className: "w-3.5 h-3.5",
                "x-file-name": "LeftPanel",
                "x-line-number": "56",
                "x-column": "18",
                "x-component": "Trash2",
                "x-id": "LeftPanel_56_18",
                "x-dynamic": "false"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 56,
                columnNumber: 19
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 55,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 53,
            columnNumber: 15
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "space-y-3",
            "x-file-name": "LeftPanel",
            "x-line-number": "59",
            "x-column": "14",
            "x-component": "div",
            "x-id": "LeftPanel_59_14",
            "x-dynamic": "true",
            "x-source-type": "computed",
            "x-source-editable": "false",
            children: slots.map((s, i) => {
              var _s$meta, _s$meta2, _s$meta3, _s$meta4;
              return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
                "data-testid": `image-slot-${i}`,
                className: "rounded-lg border border-cyan-500/20 bg-[#182232] overflow-hidden",
                "x-file-name": "LeftPanel",
                "x-line-number": "61",
                "x-column": "18",
                "x-component": "div",
                "x-id": "LeftPanel_61_18",
                "x-dynamic": "false",
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
                  className: "flex gap-3 p-2.5",
                  "x-file-name": "LeftPanel",
                  "x-line-number": "62",
                  "x-column": "20",
                  "x-component": "div",
                  "x-id": "LeftPanel_62_20",
                  "x-dynamic": "false",
                  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("img", {
                    src: s.preview,
                    alt: s.name,
                    className: "w-16 h-16 rounded object-cover border border-white/10",
                    "x-file-name": "LeftPanel",
                    "x-line-number": "63",
                    "x-column": "22",
                    "x-component": "img",
                    "x-id": "LeftPanel_63_22",
                    "x-dynamic": "false"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 63,
                    columnNumber: 23
                  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
                    className: "flex-1 min-w-0",
                    "x-file-name": "LeftPanel",
                    "x-line-number": "64",
                    "x-column": "22",
                    "x-component": "div",
                    "x-id": "LeftPanel_64_22",
                    "x-dynamic": "false",
                    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
                      className: "flex items-center gap-1.5",
                      "x-file-name": "LeftPanel",
                      "x-line-number": "65",
                      "x-column": "24",
                      "x-component": "div",
                      "x-id": "LeftPanel_65_24",
                      "x-dynamic": "false",
                      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                        className: "w-3.5 h-3.5 text-cyan-400 shrink-0",
                        "x-file-name": "LeftPanel",
                        "x-line-number": "66",
                        "x-column": "26",
                        "x-component": "FileImage",
                        "x-id": "LeftPanel_66_26",
                        "x-dynamic": "true",
                        "x-source-type": "external",
                        "x-source-var": "slots",
                        "x-source-editable": "false",
                        "x-array-var": "slots",
                        "x-array-item-param": "s"
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 66,
                        columnNumber: 27
                      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("span", {
                        className: "text-xs font-mono-x truncate text-slate-200",
                        "x-file-name": "LeftPanel",
                        "x-line-number": "67",
                        "x-column": "26",
                        "x-component": "span",
                        "x-id": "LeftPanel_67_26",
                        "x-dynamic": "true",
                        "x-source-type": "static-imported",
                        "x-source-var": "slots",
                        "x-source-path": "name",
                        "x-source-editable": "false",
                        "x-array-var": "slots",
                        "x-array-item-param": "s",
                        children: s.name
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 67,
                        columnNumber: 27
                      }, undefined)]
                    }, void 0, true, {
                      fileName: _jsxFileName,
                      lineNumber: 65,
                      columnNumber: 25
                    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("button", {
                      "data-testid": `modality-toggle-${i}`,
                      onClick: () => onToggleModality(i),
                      className: `sq-btn mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-x tracking-wider ${s.modality === "sar" ? "bg-purple-500/15 text-purple-300 border border-purple-500/40" : "bg-amber-500/15 text-amber-300 border border-amber-500/40"}`,
                      "x-file-name": "LeftPanel",
                      "x-line-number": "69",
                      "x-column": "24",
                      "x-component": "button",
                      "x-id": "LeftPanel_69_24",
                      "x-dynamic": "true",
                      "x-source-type": "computed",
                      "x-source-editable": "false",
                      children: [s.modality === "sar" ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                        className: "w-3 h-3",
                        "x-file-name": "LeftPanel",
                        "x-line-number": "78",
                        "x-column": "50",
                        "x-component": "Radar",
                        "x-id": "LeftPanel_78_50",
                        "x-dynamic": "true",
                        "x-source-type": "external",
                        "x-source-var": "slots",
                        "x-source-editable": "false",
                        "x-array-var": "slots",
                        "x-array-item-param": "s"
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 78,
                        columnNumber: 51
                      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                        className: "w-3 h-3",
                        "x-file-name": "LeftPanel",
                        "x-line-number": "78",
                        "x-column": "82",
                        "x-component": "Sun",
                        "x-id": "LeftPanel_78_82",
                        "x-dynamic": "true",
                        "x-source-type": "external",
                        "x-source-var": "slots",
                        "x-source-editable": "false",
                        "x-array-var": "slots",
                        "x-array-item-param": "s"
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 78,
                        columnNumber: 83
                      }, undefined), s.modality.toUpperCase()]
                    }, void 0, true, {
                      fileName: _jsxFileName,
                      lineNumber: 69,
                      columnNumber: 25
                    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("button", {
                      onClick: () => onRemove(i),
                      className: "sq-btn ml-2 text-[10px] text-slate-500 hover:text-rose-400",
                      "x-file-name": "LeftPanel",
                      "x-line-number": "81",
                      "x-column": "24",
                      "x-component": "button",
                      "x-id": "LeftPanel_81_24",
                      "x-dynamic": "false",
                      children: "remove"
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 81,
                      columnNumber: 25
                    }, undefined)]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 64,
                    columnNumber: 23
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 62,
                  columnNumber: 21
                }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
                  className: "grid grid-cols-2 gap-px bg-cyan-500/10 text-[10px] font-mono-x",
                  "x-file-name": "LeftPanel",
                  "x-line-number": "84",
                  "x-column": "20",
                  "x-component": "div",
                  "x-id": "LeftPanel_84_20",
                  "x-dynamic": "true",
                  "x-source-type": "computed",
                  "x-source-editable": "false",
                  children: [["CRS", ((_s$meta = s.meta) === null || _s$meta === void 0 ? void 0 : _s$meta.crs) || "EPSG:4326"], ["RES", ((_s$meta2 = s.meta) === null || _s$meta2 === void 0 ? void 0 : _s$meta2.resolution) || "10 m/px"], ["BANDS", ((_s$meta3 = s.meta) === null || _s$meta3 === void 0 ? void 0 : _s$meta3.bands) || (s.modality === "sar" ? "VV,VH" : "B2,B3,B4,B8")], ["DATE", s.timestamp || "n/a"], ["DIMS", s.width ? `${s.width}×${s.height}` : "—"], ["SENSOR", ((_s$meta4 = s.meta) === null || _s$meta4 === void 0 ? void 0 : _s$meta4.sensor) || (s.modality === "sar" ? "SAR" : "MSI")]].map(([k, v]) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
                    className: "bg-[#121824] px-2 py-1 flex justify-between gap-1",
                    "x-file-name": "LeftPanel",
                    "x-line-number": "93",
                    "x-column": "24",
                    "x-component": "div",
                    "x-id": "LeftPanel_93_24",
                    "x-dynamic": "false",
                    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("span", {
                      className: "text-cyan-500/70",
                      "x-file-name": "LeftPanel",
                      "x-line-number": "94",
                      "x-column": "26",
                      "x-component": "span",
                      "x-id": "LeftPanel_94_26",
                      "x-dynamic": "true",
                      "x-source-type": "unknown",
                      "x-source-var": "k",
                      "x-source-editable": "false",
                      children: k
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 94,
                      columnNumber: 27
                    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("span", {
                      className: "text-slate-300 truncate",
                      "x-file-name": "LeftPanel",
                      "x-line-number": "95",
                      "x-column": "26",
                      "x-component": "span",
                      "x-id": "LeftPanel_95_26",
                      "x-dynamic": "true",
                      "x-source-type": "unknown",
                      "x-source-var": "v",
                      "x-source-editable": "false",
                      children: v
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 95,
                      columnNumber: 27
                    }, undefined)]
                  }, k, true, {
                    fileName: _jsxFileName,
                    lineNumber: 93,
                    columnNumber: 25
                  }, undefined))
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 84,
                  columnNumber: 21
                }, undefined)]
              }, i, true, {
                fileName: _jsxFileName,
                lineNumber: 61,
                columnNumber: 19
              }, undefined);
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 59,
            columnNumber: 15
          }, undefined), slots.length === 2 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 px-1",
            "x-file-name": "LeftPanel",
            "x-line-number": "103",
            "x-column": "16",
            "x-component": "div",
            "x-id": "LeftPanel_103_16",
            "x-dynamic": "true",
            "x-source-type": "computed",
            "x-source-editable": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
              className: "w-3.5 h-3.5",
              "x-file-name": "LeftPanel",
              "x-line-number": "104",
              "x-column": "18",
              "x-component": "CheckCircle2",
              "x-id": "LeftPanel_104_18",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 104,
              columnNumber: 19
            }, undefined), slots.every(s => s.modality === "optical") ? "Bi-temporal pair · co-registered" : slots.some(s => s.modality === "sar") && slots.some(s => s.modality === "optical") ? "Optical + SAR · co-registered" : "Image pair loaded"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 103,
            columnNumber: 17
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
          "x-file-name": "LeftPanel",
          "x-line-number": "114",
          "x-column": "10",
          "x-component": "div",
          "x-id": "LeftPanel_114_10",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(SectionTitle, {
            "x-file-name": "LeftPanel",
            "x-line-number": "115",
            "x-column": "12",
            "x-component": "SectionTitle",
            "x-id": "LeftPanel_115_12",
            "x-dynamic": "false",
            children: "Demo Datasets"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 115,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
            className: "space-y-2",
            "x-file-name": "LeftPanel",
            "x-line-number": "116",
            "x-column": "12",
            "x-component": "div",
            "x-id": "LeftPanel_116_12",
            "x-dynamic": "true",
            "x-source-type": "computed",
            "x-source-editable": "false",
            children: _lib_demoData__WEBPACK_IMPORTED_MODULE_9__.PRESETS.map(p => {
              const Ic = lucide_react__WEBPACK_IMPORTED_MODULE_1__[p.icon] || lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"];
              return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("button", {
                "data-testid": `preset-${p.id}`,
                onClick: () => onLoadPreset(p),
                className: "sq-btn group w-full text-left rounded-lg border border-white/5 hover:border-cyan-400/50 bg-[#182232] hover:bg-[#1c2942] p-3 flex items-center gap-3",
                "x-file-name": "LeftPanel",
                "x-line-number": "120",
                "x-column": "18",
                "x-component": "button",
                "x-id": "LeftPanel_120_18",
                "x-dynamic": "false",
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("span", {
                  className: "w-9 h-9 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:sq-glow",
                  "x-file-name": "LeftPanel",
                  "x-line-number": "126",
                  "x-column": "20",
                  "x-component": "span",
                  "x-id": "LeftPanel_126_20",
                  "x-dynamic": "false",
                  children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(Ic, {
                    className: "w-4 h-4 text-cyan-300",
                    "x-file-name": "LeftPanel",
                    "x-line-number": "127",
                    "x-column": "22",
                    "x-component": "Ic",
                    "x-id": "LeftPanel_127_22",
                    "x-dynamic": "true",
                    "x-source-type": "static-imported",
                    "x-source-var": "PRESETS",
                    "x-source-file": "@/lib/demoData",
                    "x-source-file-abs": "/app/frontend/src/lib/demoData.js",
                    "x-source-line": "21",
                    "x-source-editable": "true",
                    "x-array-var": "PRESETS",
                    "x-array-file": "@/lib/demoData",
                    "x-array-line": "21",
                    "x-array-item-param": "p"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 127,
                    columnNumber: 23
                  }, undefined)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 126,
                  columnNumber: 21
                }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("span", {
                  className: "min-w-0",
                  "x-file-name": "LeftPanel",
                  "x-line-number": "129",
                  "x-column": "20",
                  "x-component": "span",
                  "x-id": "LeftPanel_129_20",
                  "x-dynamic": "false",
                  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("span", {
                    className: "block font-head font-semibold text-sm text-slate-100 leading-tight",
                    "x-file-name": "LeftPanel",
                    "x-line-number": "130",
                    "x-column": "22",
                    "x-component": "span",
                    "x-id": "LeftPanel_130_22",
                    "x-dynamic": "true",
                    "x-source-type": "static-imported",
                    "x-source-var": "PRESETS",
                    "x-source-file": "@/lib/demoData",
                    "x-source-file-abs": "/app/frontend/src/lib/demoData.js",
                    "x-source-line": "21",
                    "x-source-path": "title",
                    "x-source-editable": "true",
                    "x-array-var": "PRESETS",
                    "x-array-file": "@/lib/demoData",
                    "x-array-line": "21",
                    "x-array-item-param": "p",
                    children: p.title
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 130,
                    columnNumber: 23
                  }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("span", {
                    className: "block text-[11px] text-slate-500 truncate",
                    "x-file-name": "LeftPanel",
                    "x-line-number": "131",
                    "x-column": "22",
                    "x-component": "span",
                    "x-id": "LeftPanel_131_22",
                    "x-dynamic": "true",
                    "x-source-type": "static-imported",
                    "x-source-var": "PRESETS",
                    "x-source-file": "@/lib/demoData",
                    "x-source-file-abs": "/app/frontend/src/lib/demoData.js",
                    "x-source-line": "21",
                    "x-source-path": "subtitle",
                    "x-source-editable": "true",
                    "x-array-var": "PRESETS",
                    "x-array-file": "@/lib/demoData",
                    "x-array-line": "21",
                    "x-array-item-param": "p",
                    children: p.subtitle
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 131,
                    columnNumber: 23
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 129,
                  columnNumber: 21
                }, undefined)]
              }, p.id, true, {
                fileName: _jsxFileName,
                lineNumber: 120,
                columnNumber: 19
              }, undefined);
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 116,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 114,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 15,
    columnNumber: 5
  }, undefined);
};
_s(LeftPanel, "4UJHyBFm9OsKaahfnaT9HCATB1E=");
_c2 = LeftPanel;
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "SectionTitle");
__webpack_require__.$Refresh$.register(_c2, "LeftPanel");

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

