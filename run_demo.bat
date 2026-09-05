@echo off
title SatQuery AI - ISRO / SIH 2026 Runner
echo =====================================================================
echo           SatQuery AI - Interactive Vision-Language Assistant
echo         ISRO / Dept of Space ^| Smart India Hackathon PS ID 26167
echo =====================================================================
echo.

set PYTHONPATH=.

:: Step 1: Check Python virtualenv
if not exist ".venv\Scripts\python.exe" (
    echo [ERROR] Python virtual environment not found in .venv.
    echo Please run: python -m venv .venv ^& .venv\Scripts\pip install -r backend\requirements.txt
    pause
    exit /b 1
)

:: Step 2: Pre-generate sample datasets if missing
if not exist "backend\samples\sample_manifest.json" (
    echo [*] Generating authentic remote sensing evaluation datasets...
    .venv\Scripts\python scripts\generate_sample_data.py
)

echo [*] Launching SatQuery AI Backend (FastAPI on http://127.0.0.1:8000)...
start "SatQuery AI Backend" cmd /k ".venv\Scripts\python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000"

echo [*] Launching SatQuery AI Frontend Studio (Vite on http://localhost:5173)...
start "SatQuery AI Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo [*] Waiting 3 seconds for services to initialize...
timeout /t 3 /nobreak >nul

echo [*] Opening SatQuery AI in your default web browser...
start http://localhost:5173

echo.
echo =====================================================================
echo   SatQuery AI Studio is now running!
echo   - Web Studio: http://localhost:5173
echo   - Backend API Docs: http://127.0.0.1:8000/docs
echo   - Model Registry: http://127.0.0.1:8000/api/registry
echo =====================================================================
echo.
pause
