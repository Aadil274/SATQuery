/***/ "./src/lib/api.js"
/*!************************!*\
  !*** ./src/lib/api.js ***!
  \************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API: () => (/* binding */ API),
/* harmony export */   analyze: () => (/* binding */ analyze),
/* harmony export */   blobToBase64: () => (/* binding */ blobToBase64),
/* harmony export */   dimsFromUrl: () => (/* binding */ dimsFromUrl),
/* harmony export */   getRegistry: () => (/* binding */ getRegistry),
/* harmony export */   imageDims: () => (/* binding */ imageDims)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");


const BACKEND_URL = "https://geo-query-flow.preview.emergentagent.com";
const API = `${BACKEND_URL}/api`;

// Get dimensions of a remote image via <img> (no CORS needed for naturalWidth).
function dimsFromUrl(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    img.onerror = () => resolve({
      width: null,
      height: null
    });
    img.src = url;
  });
}
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result || "";
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
function imageDims(base64) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    img.onerror = () => resolve({
      width: null,
      height: null
    });
    img.src = `data:image/jpeg;base64,${base64}`;
  });
}
async function analyze(payload) {
  const res = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`${API}/analyze`, payload, {
    timeout: 120000
  });
  return res.data;
}
async function getRegistry() {
  const res = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${API}/registry`);
  return res.data;
}

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

