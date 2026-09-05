/***/ "./src/lib/demoData.js"
/*!*****************************!*\
  !*** ./src/lib/demoData.js ***!
  \*****************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IMAGES: () => (/* binding */ IMAGES),
/* harmony export */   PRESETS: () => (/* binding */ PRESETS),
/* harmony export */   REGION_COLORS: () => (/* binding */ REGION_COLORS),
/* harmony export */   SUGGESTED: () => (/* binding */ SUGGESTED)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

// Pre-loaded demo imagery (generated overhead satellite scenes) + metadata.
const BASE = "https://static.prod-images.emergentagent.com/jobs/7bbeed70-6e25-4f4d-82ca-1b53cd149ed0/images";
const IMAGES = {
  opticalCity: `${BASE}/c84d9f98d5ef9aea2c019426865ff98159ca957527de74e1a3448700cf3d28d1.jpeg`,
  changeBefore: `${BASE}/9db77583c743fb9bd679762fbe7c4f36ffcfe057054df5fb4b21b6c2ea2d87c0.jpeg`,
  changeAfter: `${BASE}/dbe4070a4d2ad6b8004637c457a4e9b4e6c70e5f6ae896f069ee218d059ecb9d.jpeg`,
  opticalDelta: `${BASE}/76613fd924fc5748bdbbd44b116dae1a784043ba510ff64eb8d819738f179f3e.jpeg`,
  sarDelta: `${BASE}/4d07ad2ad67c4a7f8027458601777d2fc80e3aaab763842af7fa7b8474ef6a0b.jpeg`,
  flood: `${BASE}/564ec58c122e53aea8be6802bfded50854a8128fe4c33f3494544b5c85e11101.jpeg`
};
const meta = o => ({
  crs: "EPSG:4326",
  resolution: "10 m/px",
  bands: "B2,B3,B4,B8",
  ...o
});

// Each preset produces one or two image slots the app can load.
const PRESETS = [{
  id: "single_vqa",
  title: "Single-Image VQA / Caption",
  subtitle: "Sentinel-2 · Urban scene",
  icon: "ScanSearch",
  images: [{
    name: "urban_scene.tif",
    url: IMAGES.opticalCity,
    modality: "optical",
    timestamp: "2026-04-13",
    meta: meta({
      sensor: "Sentinel-2 MSI"
    })
  }],
  query: "Describe the land-cover and major objects visible in this image."
}, {
  id: "grounding",
  title: "Referring Grounding",
  subtitle: "Sentinel-2 · River delta",
  icon: "Crosshair",
  images: [{
    name: "delta_scene.tif",
    url: IMAGES.opticalDelta,
    modality: "optical",
    timestamp: "2026-03-02",
    meta: meta({
      sensor: "Sentinel-2 MSI"
    })
  }],
  query: "Highlight all water bodies in the image."
}, {
  id: "change",
  title: "Bi-Temporal Change",
  subtitle: "Cartosat · 2024 → 2026",
  icon: "GitCompareArrows",
  images: [{
    name: "region_2024.tif",
    url: IMAGES.changeBefore,
    modality: "optical",
    timestamp: "2024-01-18",
    meta: meta({
      sensor: "Cartosat-2S",
      resolution: "5 m/px"
    })
  }, {
    name: "region_2026.tif",
    url: IMAGES.changeAfter,
    modality: "optical",
    timestamp: "2026-02-27",
    meta: meta({
      sensor: "Cartosat-2S",
      resolution: "5 m/px"
    })
  }],
  query: "Has the built-up area increased, decreased, or remained unchanged between these dates?"
}, {
  id: "cross_modal",
  title: "Optical + SAR Fusion",
  subtitle: "Sentinel-2 + RISAT SAR",
  icon: "Layers",
  images: [{
    name: "delta_optical.tif",
    url: IMAGES.opticalDelta,
    modality: "optical",
    timestamp: "2026-03-02",
    meta: meta({
      sensor: "Sentinel-2 MSI"
    })
  }, {
    name: "delta_sar.tif",
    url: IMAGES.sarDelta,
    modality: "sar",
    timestamp: "2026-03-03",
    meta: meta({
      sensor: "RISAT-1 / S1 SAR",
      bands: "VV,VH"
    })
  }],
  query: "Use the optical and SAR images together to identify built-up and water-covered regions."
}, {
  id: "flood",
  title: "Flood Assessment (VQA)",
  subtitle: "Sentinel-2 · Flood plain",
  icon: "Waves",
  images: [{
    name: "flood_plain.tif",
    url: IMAGES.flood,
    modality: "optical",
    timestamp: "2026-06-11",
    meta: meta({
      sensor: "Sentinel-2 MSI"
    })
  }],
  query: "Which areas are inundated and roughly what fraction of the farmland is flooded?"
}];
const SUGGESTED = {
  single: ["What land cover types are visible?", "How many distinct water bodies are visible?", "Describe the scene and major objects.", "Highlight the built-up / urban area."],
  pair_optical: ["What changed between these two dates?", "Has the built-up area increased?", "Estimate the percentage of vegetation lost."],
  pair_modal: ["Identify built-up and water-covered regions.", "What does SAR reveal that optical does not?", "Confirm the water extent using both modalities."]
};
const REGION_COLORS = {
  object: {
    stroke: "#00F0FF",
    fill: "rgba(0,240,255,0.14)"
  },
  target: {
    stroke: "#FF7300",
    fill: "rgba(255,115,0,0.18)"
  },
  change: {
    stroke: "#FF1744",
    fill: "rgba(255,23,68,0.20)"
  },
  builtup: {
    stroke: "#FFB300",
    fill: "rgba(255,179,0,0.18)"
  },
  water: {
    stroke: "#00E676",
    fill: "rgba(0,230,118,0.16)"
  }
};

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

