$pages = @('stock-management', 'customer-relation', 'non-profit', 'logistic', 'marketing-mail', 'ai-enterprise')
foreach ($page in $pages) {
    $file = "d:\pryroweb\pruro\app\$page\page.tsx"
    $content = Get-Content $file -Raw
    $content = $content -replace '(?s)import { Header } from "@/components/header"`nimport', 'import { Header } from "@/components/header"`r`nimport'
    $content = $content -replace '(?s)      <header className="fixed top-6.*?</header>', '      <Header />'
    Set-Content $file $content -NoNewline
    Write-Host "Fixed: $page"
}
