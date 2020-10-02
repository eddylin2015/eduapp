Param (
[Parameter(Mandatory=$true,HelpMessage=".js file")]
[Alias("p","path")]
[ValidateScript({($_).Length -gt 4})]
[string]
$JsName,
[switch]$tnode,
[switch]$tjs
)
If ($PSBoundParameters.Count -gt 2) {
Write-Host "Too many parameters"
}
Write-Host
If ($PSBoundParameters.Keys.Contains("tn")) {
Write-Host "Restore code..."

}
If ($PSBoundParameters.Keys.Contains("tj")) {
Write-Host "Protect code..."

}
Write-Host C:\code\eduapp\pubilc\math\question\($JsName)
get-content f1003n.js -encoding utf8 | select -skip 1 | set-content f1003.js -encoding 