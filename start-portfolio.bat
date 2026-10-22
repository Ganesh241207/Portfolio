@echo off
title Ganesh S - Portfolio Server
cd /d "%~dp0"
echo ======================================================
echo Starting Ganesh S Portfolio Local Server...
echo Address: http://localhost:3000
echo ======================================================
node serve.js
pause
