/***/ "./src/lib/report.js"
/*!***************************!*\
  !*** ./src/lib/report.js ***!
  \***************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downloadReport: () => (/* binding */ downloadReport)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

// Build a self-contained printable HTML report and trigger download.
function downloadReport(analysis) {
  var _analysis$plan, _analysis$plan2, _analysis$plan3;
  if (!analysis) return;
  const r = analysis.result || {};
  const c = analysis.confidence || {};
  const rows = (analysis.trace || []).map(t => `<tr><td>${t.label}</td><td>${t.status}</td><td>${t.detail || ""}</td><td>${t.ms} ms</td></tr>`).join("");
  const regions = (r.evidence_regions || []).map(g => `<li><b>${g.type}</b> — ${g.label}: ${g.note || ""} [${(g.box || []).map(n => n.toFixed(2)).join(", ")}]</li>`).join("");
  const models = (((_analysis$plan = analysis.plan) === null || _analysis$plan === void 0 ? void 0 : _analysis$plan.models) || []).join(", ");
  const answer = r.answer || r.caption || r.fusion_insight || "—";
  const html = `<!doctype html><html><head><meta charset="utf-8"/>
  <title>SatQuery AI Report</title>
  <style>
    body{font-family:'Segoe UI',Arial,sans-serif;background:#0B0E14;color:#E2E8F0;margin:0;padding:40px;}
    h1{color:#FF7300;font-size:26px;margin:0 0 4px;} h2{color:#00F0FF;font-size:15px;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid rgba(0,240,255,.25);padding-bottom:6px;margin-top:28px;}
    .badge{display:inline-block;padding:4px 12px;border-radius:20px;border:1px solid #00E676;color:#00E676;font-weight:600;}
    table{width:100%;border-collapse:collapse;font-size:13px;margin-top:8px;} td,th{border:1px solid rgba(255,255,255,.1);padding:6px 10px;text-align:left;}
    .k{color:#94A3B8;} .big{font-size:16px;line-height:1.6;} ul{line-height:1.7;}
    .meta{color:#64748B;font-size:12px;}
  </style></head><body>
  <h1>SATQUERY AI — ANALYSIS REPORT</h1>
  <div class="meta">Generated ${new Date().toLocaleString()} · Session ${analysis.session_id || ""}</div>
  <h2>Query</h2><div class="big">"${analysis.query}"</div>
  <h2>Detected Task</h2><div class="big">${(_analysis$plan2 = analysis.plan) === null || _analysis$plan2 === void 0 ? void 0 : _analysis$plan2.task_label} <span class="k">(${analysis.task})</span></div>
  <div class="k">Intent: ${analysis.intent}</div>
  <div class="k">Models: ${models}</div>
  <div class="k">Parameters: ${JSON.stringify(((_analysis$plan3 = analysis.plan) === null || _analysis$plan3 === void 0 ? void 0 : _analysis$plan3.parameters) || {})}</div>
  <h2>Answer</h2><div class="big">${answer}</div>
  ${r.change_percentage != null ? `<div class="k">Change: ${r.change_percentage}% · Affected: ${r.affected_area || "—"}</div>` : ""}
  <h2>Confidence</h2><div><span class="badge">${c.level} · ${c.percent}%</span></div>
  <table><tr><th>Component</th><th>Value</th></tr>
    ${Object.entries(c.breakdown || {}).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}
  </table>
  <h2>Evidence Regions</h2><ul>${regions || "<li>none</li>"}</ul>
  <h2>Execution Trace</h2>
  <table><tr><th>Step</th><th>Status</th><th>Detail</th><th>t</th></tr>${rows}</table>
  <div class="meta" style="margin-top:20px">Total execution time: ${analysis.elapsed_sec}s · SatQuery-RS-VLM · System confidence score (not a calibrated probability).</div>
  </body></html>`;
  const blob = new Blob([html], {
    type: "text/html"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SatQuery_Report_${Date.now()}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
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

