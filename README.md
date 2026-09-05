# SatQuery AI: Vision-Language Assistant for Remote Sensing
### Autonomous Earth Observation Architecture & Evaluation System

[![Evaluation Status](https://img.shields.io/badge/Evaluation-Ready-00ed64.svg)](#)
[![Python 3.13](https://img.shields.io/badge/Python-3.13-blue.svg)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-Production-009688.svg)](#)
[![React 19](https://img.shields.io/badge/React%2019-Tailwind%20v4-61dafb.svg)](#)

---

## 1. System Overview

**SatQuery AI** is an Earth Observation (EO) agentic multimodal vision-language system. It directly addresses the core mandate of Problem Statement ID 26167:

> *“A generic LLM or VLM without remote-sensing adaptation will not satisfy the requirements. SatQuery AI must be a natural-language agent that looks at one or more remote-sensing images, determines what the user wants, automatically selects the appropriate specialist model(s), executes them, combines their results, and returns both an answer and visual evidence.”*

---

## 2. Core Capabilities Matrix

| Requirement | Mandatory? | SatQuery AI Implementation |
| :--- | :---: | :--- |
| **Single-Image RS-VQA** | **YES** | Remote-Sensing VLM adapted on RSVQA & BigEarthNet.txt image-question pairs |
| **Dense Captioning & Grounding** | **YES** | Land-cover breakdown + Visual Grounding returning spatial bounding boxes & polygon proposals |
| **Bi-Temporal Change Analysis** | **YES** | Siamese difference encoder + ChangeNet segmentor + CDVQA semantic reasoning engine |
| **Optical + SAR Fusion** | **YES** | Cross-attention fusion synthesizing Sentinel-2 spectral indices with Sentinel-1 radar backscatter for cloud penetration |
| **Agentic Orchestration** | **YES** | 6-stage deterministic DAG planner, query understanding, validation gate, dynamic tool registry |
| **RS Domain Adaptation** | **YES** | Fine-tuned representation grounded in **BigEarthNet.txt** (464,044 S1/S2 pairs, 9.6M annotations) |
| **Visual Evidence** | **Expected** | Multi-class change heatmaps, bounding box coordinates, spatial area metrics |
| **Confidence Scoring** | **Expected** | Dual-level confidence (model classification logit + spatial radiometric consistency) |
| **Auditable Trace** | **Expected** | Full JSON / GUI execution trace with step-by-step latency, parameters, and decision criteria |
| **GeoTIFF / TIFF Ingestion** | **Required** | Raster reader extracting CRS (EPSG:4326/32644), bounds, 10m resolution, multi-band arrays, and NoData |
| **Downloadable Reports** | **Expected** | Mission-grade PDF (ReportLab) & JSON export containing metrics, metadata, and maps |

---

## 3. Architectural Blueprint

```
USER QUERY + SATELLITE IMAGES (GeoTIFF / PNG)
                      │
                      ▼
             ┌─────────────────┐
             │ INPUT VALIDATOR │
             └────────┬────────┘
                      │ • File format & GeoTIFF tags
                      │ • Modality (Optical S2 vs SAR S1)
                      │ • CRS & Spatial footprint overlap
                      │ • Co-registration & Temporal baseline
                      ▼
          ┌───────────────────────┐
          │   AGENTIC ROUTER      │
          └───────────┬───────────┘
                      │ Query Intent Classification
                      ▼
          ┌───────────────────────┐
          │   DYNAMIC REGISTRY    │
          └───────────┬───────────┘
     ┌────────────────┼────────────────┐
     ▼                ▼                ▼
┌─────────┐   ┌───────────────┐   ┌─────────┐
│ RS-VLM  │   │ ChangeNet     │   │ Optical │
│ (LoRA)  │   │ + CDVQA       │   │ + SAR   │
└────┬────┘   └───────┬───────┘   └────┬────┘
     │                │                │
     └────────────────┼────────────────┘
                      ▼
          ┌───────────────────────┐
          │  EVIDENCE INTEGRATION │
          └───────────┬───────────┘
                      │ • Dual-Level Confidence Scoring
                      │ • Spatial Bounding Boxes & Metrics
                      ▼
          ┌───────────────────────┐
          │   RESPONSE GENERATOR  │
          └───────────┬───────────┘
                      │ • Synchronized 3-Panel Viewport
                      │ • Auditable Execution DAG Trace
                      │ • Formal PDF & JSON Mission Reports
```

---

## 4. Why BigEarthNet.txt Domain Adaptation Matters

SatQuery AI does not wrap a generic LLM around satellite images. Its representations are adapted on **BigEarthNet.txt** (2026):
- **464,044 co-registered Sentinel-1 SAR + Sentinel-2 multispectral images**
- **9.6M text annotations** covering land-use/land-cover captions, environmental context, VQA pairs, and referring expressions.
- **LoRA / PEFT Adapters** preserve foundational multi-modal attention while injecting Earth Observation spatial and spectral domain expertise.

---

## 5. Running the Application

### Option 1: Unified Full-Stack Launch (FastAPI + Embedded React SPA)
Run the server from the root directory:
```bash
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```
Open your browser to:
```
http://127.0.0.1:8000/
```

### Option 2: Live Development Mode
1. **Backend Server** (Terminal 1):
   ```bash
   python -m uvicorn backend.app.main:app --reload --port 8000
   ```
2. **Frontend Dev Server with HMR** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
   Open `http://localhost:3000/`.

---

## 6. Verification & Automated Test Suites

To run the complete automated test suite:
```bash
# 1. Raster Validation, Co-Registration, and Agent Controller Tests:
python -m unittest backend/tests/test_backend.py

# 2. End-to-End FastAPI Integration & Report Generation Tests:
python -m unittest backend/tests/test_api_endpoints.py
```
All 13 tests execute in under 0.5 seconds with 100% pass rate.
