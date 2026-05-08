import os

files = ['index.html', 'picking-audit.html', 'tosho-audit.html', 'yuyama-pack.html', 'medixs.html']

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'others.html' in content:
        continue
        
    replacement = '                    <li><a href="others.html">その他・配置場所</a></li>\n                </ul>'
    content = content.replace('                </ul>', replacement)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
