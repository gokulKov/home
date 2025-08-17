# Opens the project site explicitly in Google Chrome (PowerShell)
$URL = 'https://gokulkov.github.io/home/'
$possible = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe"
)
foreach ($p in $possible) {
  if (Test-Path $p) {
    Start-Process -FilePath $p -ArgumentList $URL
    return
  }
}
# fallback
Start-Process $URL
# If Chrome is not found, open the URL in the default browser
