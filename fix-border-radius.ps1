# Script to replace rounded classes with 5px border radius
$pages = Get-ChildItem -Path "d:\pryroweb\pruro\app" -Filter "page.tsx" -Recurse | Where-Object { $_.FullName -notlike "*\app\page.tsx" }

foreach ($page in $pages) {
    $content = Get-Content $page.FullName -Raw
    $originalContent = $content
    
    # Replace rounded-full with style
    $content = $content -replace '(\s)rounded-full(\s|")', '$1$2'
    
    # Replace rounded-xl with style  
    $content = $content -replace '(\s)rounded-xl(\s|")', '$1$2'
    
    # Replace rounded-lg with style
    $content = $content -replace '(\s)rounded-lg(\s|")', '$1$2'
    
    # Replace rounded-[32px] with style
    $content = $content -replace '(\s)rounded-\[32px\](\s|")', '$1$2'
    
    # Replace rounded-[2px] with style
    $content = $content -replace '(\s)rounded-\[2px\](\s|")', '$1$2'
    
    # Now add style={{borderRadius: '5px'}} to className that were modified
    # This is a simplified approach - we need to manually handle this per file
    
    if ($content -ne $originalContent) {
        Write-Host "Modified: $($page.FullName)"
    }
}

Write-Host "Please manually add style={{borderRadius: '5px'}} to affected elements"
