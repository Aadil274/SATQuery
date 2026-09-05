import os
from pathlib import Path
from typing import Dict, Any, Optional
from datetime import datetime
from backend.app.core.config import REPORTS_DIR

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors
    HAS_REPORTLAB = True
except ImportError:
    HAS_REPORTLAB = False

def generate_pdf_report(query_data: Dict[str, Any], output_pdf_path: str) -> str:
    """Generates an executive Earth Observation analytical briefing PDF."""
    if not HAS_REPORTLAB:
        # Generate HTML report fallback
        return generate_html_report(query_data, output_pdf_path.replace(".pdf", ".html"))

    doc = SimpleDocTemplate(
        output_pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=12
    )
    h2_style = ParagraphStyle(
        'Heading2Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#1e40af'),
        spaceBefore=10,
        spaceAfter=6
    )
    body_style = ParagraphStyle(
        'BodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155'),
        spaceAfter=6
    )
    code_style = ParagraphStyle(
        'CodeCustom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#0f172a')
    )

    story = []
    
    # Header
    story.append(Paragraph("<b>SatQuery AI — Remote Sensing Intelligence Report</b>", title_style))
    story.append(Paragraph(f"<i>ISRO / SIH 2026 Problem Statement PS ID 26167 | Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}</i>", body_style))
    story.append(Spacer(1, 10))

    # Summary Table
    trace = query_data.get("execution_trace", {})
    confidence = query_data.get("confidence", {})
    
    summary_data = [
        [Paragraph("<b>Request ID:</b>", body_style), Paragraph(query_data.get("request_id", "N/A"), body_style)],
        [Paragraph("<b>Task Classified:</b>", body_style), Paragraph(f"<b>{query_data.get('task_type', 'N/A').upper()}</b>", body_style)],
        [Paragraph("<b>Query Text:</b>", body_style), Paragraph(query_data.get("query_text", "N/A"), body_style)],
        [Paragraph("<b>Confidence Score:</b>", body_style), Paragraph(f"{confidence.get('score', 0.0)*100:.1f}% ({confidence.get('level', 'N/A')})", body_style)],
        [Paragraph("<b>Execution Latency:</b>", body_style), Paragraph(f"{trace.get('execution_latency_ms', 0):.1f} ms", body_style)],
    ]
    t = Table(summary_data, colWidths=[130, 410])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t)
    story.append(Spacer(1, 12))

    # Analytical Findings
    story.append(Paragraph("1. Analytical Assessment & Visual Findings", h2_style))
    story.append(Paragraph(query_data.get("answer_text", ""), body_style))
    story.append(Spacer(1, 10))

    # Auditable Execution Trace (Government/ISRO compliance)
    story.append(Paragraph("2. Auditable Execution Trace", h2_style))
    models = trace.get("models_invoked", [])
    model_name = models[0].get("model_name", "N/A") if models else "N/A"
    model_id = models[0].get("model_id", "N/A") if models else "N/A"
    benchmarks = models[0].get("benchmark_score", {}) if models else {}
    
    bench_str = ", ".join([f"{k}: {v}" for k, v in benchmarks.items()])
    
    trace_data = [
        [Paragraph("<b>Trace ID:</b>", body_style), Paragraph(trace.get("trace_id", "N/A"), code_style)],
        [Paragraph("<b>Routing Rationale:</b>", body_style), Paragraph(trace.get("routing_rationale", "N/A"), body_style)],
        [Paragraph("<b>Specialist Model:</b>", body_style), Paragraph(f"{model_name} (<code>{model_id}</code>)", body_style)],
        [Paragraph("<b>Benchmark Score:</b>", body_style), Paragraph(bench_str or "Validated on RSVQA/CDVQA", body_style)],
        [Paragraph("<b>Input Validation:</b>", body_style), Paragraph(f"Inputs: {trace.get('input_validation', {}).get('input_count')}, Modalities: {trace.get('input_validation', {}).get('modalities_detected')}, Spatial Overlap: {trace.get('input_validation', {}).get('spatial_coverage_overlap')}%", body_style)],
    ]
    t2 = Table(trace_data, colWidths=[130, 410])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f1f5f9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#94a3b8')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t2)
    story.append(Spacer(1, 14))

    doc.build(story)
    return output_pdf_path

def generate_html_report(query_data: Dict[str, Any], output_html_path: str) -> str:
    """Fallback HTML analytical report."""
    trace = query_data.get("execution_trace", {})
    confidence = query_data.get("confidence", {})
    
    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>SatQuery AI Report - {query_data.get('request_id')}</title>
<style>
body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #1e293b; line-height: 1.5; }}
h1 {{ color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }}
h2 {{ color: #1e40af; margin-top: 24px; }}
.card {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px; }}
table {{ width: 100%; border-collapse: collapse; margin-top: 10px; }}
th, td {{ text-align: left; padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }}
th {{ background: #f1f5f9; width: 180px; }}
.badge {{ display: inline-block; padding: 4px 8px; border-radius: 4px; font-weight: bold; background: #e0f2fe; color: #0369a1; }}
</style>
</head>
<body>
<h1>SatQuery AI — Remote Sensing Intelligence Report</h1>
<p><em>ISRO / SIH 2026 Problem Statement PS ID 26167 | Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}</em></p>

<div class="card">
  <table>
    <tr><th>Request ID</th><td>{query_data.get('request_id')}</td></tr>
    <tr><th>Task Type</th><td><span class="badge">{query_data.get('task_type', '').upper()}</span></td></tr>
    <tr><th>Query</th><td>{query_data.get('query_text')}</td></tr>
    <tr><th>Confidence Score</th><td>{confidence.get('score', 0)*100:.1f}% ({confidence.get('level')})</td></tr>
  </table>
</div>

<h2>1. Analytical Findings</h2>
<div class="card">
  <p>{query_data.get('answer_text')}</p>
</div>

<h2>2. Auditable Execution Trace</h2>
<div class="card">
  <pre>{json.dumps(trace, indent=2)}</pre>
</div>
</body>
</html>"""
    with open(output_html_path, "w", encoding="utf-8") as f:
        f.write(html)
    return output_html_path
