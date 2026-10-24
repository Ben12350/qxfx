@echo off
chcp 65001 >nul
title 心屿 · 情绪疗愈小站
cd /d "%~dp0"

echo.
echo   正在开启心屿...
echo.

where py >nul 2>nul
if %errorlevel% equ 0 (
    py -3 app.py
    goto :end
)

where python >nul 2>nul
if %errorlevel% equ 0 (
    python app.py
    goto :end
)

echo   没有找到 Python。请先安装 Python 3，再双击此文件。
echo   下载地址：https://www.python.org/downloads/
echo.
pause

:end
if %errorlevel% neq 0 (
    echo.
    echo   小站意外停下，请查看上方提示。
    pause
)
