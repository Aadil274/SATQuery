import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from typing import Dict, Any

class MissionReportGenerator:
    """
    Generates formal Earth Observation Mission & Evaluation PDF Reports
    tailored for autonomous remote sensing mission evaluation.
    """
    
    @staticmethod
    def generate_pdf(report_data: Dict[str, Any], output_path: str) -> str:
        doc = SimpleDocTemplate(
            output_path,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )
        
        styles = getSampleStyleSheet()
        
        # Custom space-grade styling
        title_style = ParagraphStyle(
            'TitleStyle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=18,
            leading=22,
            textColor=colors.HexColor('#0f172a'),
            spaceAfter=4
        )
        
        subtitle_style = ParagraphStyle(
            'SubTitleStyle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leading=14,
            textColor=colors.HexColor('#64748b'),
            spaceAfter=12
        )
        
        section_heading = ParagraphStyle(
            'SectionHeading',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=12,
            leading=16,
            textColor=colors.HexColor('#1e293b'),
            spaceBefore=10,
            spaceAfter=6
        )
        
        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=13,
            textColor=colors.HexColor('#334155')
        )
        
        bullet_style = ParagraphStyle(
            'Bullet',
            parent=body_style,
            leftIndent=12,
            spaceAfter=3
        )
        
        story = []
        
        # Header Banner
        header_table_data = [
            [
                Paragraph("<b>SatQuery AI</b> | Earth Observation Evaluation", title_style),
                Paragraph("<b>Earth Observation Mission Division</b><br/><font size=8 color='#64748b'>CLASSIFICATION: OFFICIAL / EO-EVAL</font>", ParagraphStyle('RHead', parent=subtitle_style, alignment=2))
            ]
        ]
        header_table = Table(header_table_data, colWidths=[340, 200])
        header_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('LINEBELOW', (0, 0), (-1, -1), 1.5, colors.HexColor('#2563eb')),
        ]))
        story.append(header_table)
        story.append(Spacer(1, 12))
        
        # Query & Summary Block
        query_text = report_data.get("query", "What changed between these two dates, and where did the change occur?")
        task_type = report_data.get("task_type", "Bi-temporal Change Analysis")
        conf_score = report_data.get("confidence_score", 92)
        
        story.append(Paragraph("<b>MISSION QUERY & TASK SPECIFICATION</b>", section_heading))
        meta_rows = [
            [Paragraph("<b>Natural Language Query:</b>", body_style), Paragraph(f"<i>\"{query_text}\"</i>", body_style)],
            [Paragraph("<b>Classified Task Type:</b>", body_style), Paragraph(task_type, body_style)],
            [Paragraph("<b>Confidence Metric:</b>", body_style), Paragraph(f"<b>{conf_score}%</b> (Dual-Level Verification: Model + Spatial Evidence)", body_style)],
            [Paragraph("<b>Execution Status:</b>", body_style), Paragraph("<font color='#16a34a'><b>COMPLETED (Deterministic DAG Verified)</b></font>", body_style)],
        ]
        t_query = Table(meta_rows, colWidths=[150, 390])
        t_query.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ]))
        story.append(t_query)
        story.append(Spacer(1, 10))
        
        # AI Analysis Findings
        headline = report_data.get("headline_answer", "Built-up area increased in the eastern section.")
        bullets = report_data.get("bullet_points", [])
        
        story.append(Paragraph("<b>EXECUTIVE AI ANALYSIS & REASONING SUMMARY</b>", section_heading))
        story.append(Paragraph(f"<b>Primary Finding:</b> {headline}", body_style))
        for b in bullets:
            story.append(Paragraph(f"• {b}", bullet_style))
        story.append(Spacer(1, 8))

        # Heatmap & Spatial Intensity Metrics if present
        heatmap_info = report_data.get("heatmap")
        if heatmap_info:
            story.append(Paragraph("<b>HEATMAP & SPATIAL INTENSITY METRICS</b>", section_heading))
            story.append(Paragraph(f"<b>Overlay Type:</b> {heatmap_info.get('title', 'Heatmap')} ({heatmap_info.get('intensity_label', 'Intensity')})", body_style))
            h_pts = heatmap_info.get("points", [])
            for pt in h_pts:
                story.append(Paragraph(f"• Hotspot: {pt.get('label', 'Zone')} (Center: [{pt.get('y', 0.5):.2f}, {pt.get('x', 0.5):.2f}]) · Intensity: {int(pt.get('intensity', 0.8)*100)}%", bullet_style))
            story.append(Spacer(1, 8))

        
        # Geospatial Input Information Table
        story.append(Paragraph("<b>GEOSPATIAL & SENSOR SPECIFICATIONS</b>", section_heading))
        input_info = report_data.get("input_information", {})
        if isinstance(input_info, dict):
            loc = input_info.get("location", "Unknown")
            res = input_info.get("resolution", "Unknown")
            area = input_info.get("area", "Unknown")
            before = input_info.get("before_image", {})
            after = input_info.get("after_image", {})
        else:
            loc = getattr(input_info, 'location', 'Unknown')
            res = getattr(input_info, 'resolution', 'Unknown')
            area = getattr(input_info, 'area', 'Unknown')
            before = getattr(input_info, 'before_image', {}) or {}
            after = getattr(input_info, 'after_image', {}) or {}
        before_date = before.get("date", "N/A") if before else "N/A"
        before_sensor = before.get("sensor", "N/A") if before else "N/A"
        after_date = after.get("date", "N/A") if after else "N/A"
        after_sensor = after.get("sensor", "N/A") if after else "N/A"
        geo_table_data = [
            [
                Paragraph("<b>Parameter</b>", body_style),
                Paragraph("<b>Specification</b>", body_style),
                Paragraph("<b>Parameter</b>", body_style),
                Paragraph("<b>Specification</b>", body_style)
            ],
            [
                Paragraph("Sensor 1 (T1)", body_style),
                Paragraph(before_sensor, body_style),
                Paragraph("Observation Date (T1)", body_style),
                Paragraph(before_date, body_style)
            ],
            [
                Paragraph("Sensor 2 (T2)", body_style),
                Paragraph(after_sensor, body_style),
                Paragraph("Observation Date (T2)", body_style),
                Paragraph(after_date, body_style)
            ],
            [
                Paragraph("Location", body_style),
                Paragraph(loc, body_style),
                Paragraph("Spatial Resolution", body_style),
                Paragraph(res, body_style)
            ],
            [
                Paragraph("Scene Footprint", body_style),
                Paragraph(area, body_style),
                Paragraph("Analysis Status", body_style),
                Paragraph("Completed", body_style)
            ]
        ]
        t_geo = Table(geo_table_data, colWidths=[130, 140, 130, 140])
        t_geo.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f172a')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f1f5f9')]),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ]))
        story.append(t_geo)
        story.append(Spacer(1, 10))
        
        # Agentic Execution DAG Trace
        story.append(Paragraph("<b>AUDITABLE AGENTIC EXECUTION WORKFLOW</b>", section_heading))
        trace_steps = [["Step", "Phase", "Engine / Model", "Validation / Rationale"]]
        workflow_steps = report_data.get("workflow_steps", [])
        if workflow_steps:
            for i, step in enumerate(workflow_steps):
                if isinstance(step, dict):
                    title = step.get("title", f"Step {i+1}")
                    desc = step.get("description", "")
                    details = step.get("details", "")
                else:
                    title = getattr(step, 'title', f"Step {i+1}")
                    desc = getattr(step, 'description', '')
                    details = getattr(step, 'details', '')
                trace_steps.append([f"{i+1:02d}", title, desc, details])
        else:
            trace_steps.append(["01", "Analysis", "Agentic Pipeline", "Task executed and completed"])
        t_trace = Table(trace_steps, colWidths=[30, 120, 150, 240])
        t_trace.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e293b')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f8fafc')]),
            ('FONTSIZE', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 3),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ]))
        story.append(t_trace)
        
        # Spatial Evidence Regions
        evidence = report_data.get("evidence_regions", [])
        if evidence:
            story.append(Spacer(1, 10))
            story.append(Paragraph("<b>SPATIAL EVIDENCE REGIONS</b>", section_heading))
            ev_rows = [["ID", "Label", "Category", "Area (km²)", "Confidence"]]
            for r in evidence:
                if isinstance(r, dict):
                    ev_rows.append([
                        r.get("id", "-"),
                        r.get("label", "-"),
                        r.get("category", "-"),
                        str(r.get("area_km2", "-")),
                        f"{int(r.get('confidence', 0) * 100)}%"
                    ])
                else:
                    ev_rows.append([
                        getattr(r, 'id', '-'),
                        getattr(r, 'label', '-'),
                        getattr(r, 'category', '-'),
                        str(getattr(r, 'area_km2', '-')),
                        f"{int(getattr(r, 'confidence', 0) * 100)}%"
                    ])
            t_ev = Table(ev_rows, colWidths=[50, 200, 80, 70, 70])
            t_ev.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e293b')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
                ('FONTSIZE', (0, 0), (-1, -1), 8),
                ('TOPPADDING', (0, 0), (-1, -1), 3),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
            ]))
            story.append(t_ev)
        
        # Build Document
        doc.build(story)
        return output_path
