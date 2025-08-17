@echo off
REM Opens the project site explicitly in Google Chrome (Windows).
SETLOCAL ENABLEDELAYEDEXPANSION
set "URL=https://gokulkov.github.io/home/"

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
  "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" "%URL%"
  goto :eof
)
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "%URL%"
  goto :eof
)

echo Google Chrome not found in standard Program Files locations.
echo Opening in default browser instead...
start "" "%URL%"
ENDLOCAL
