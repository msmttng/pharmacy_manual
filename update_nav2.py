import os
import re

files = ['index.html', 'picking-audit.html', 'tosho-audit.html', 'yuyama-pack.html', 'medixs.html', 'others.html', 'reception.html']

nav_html = """
                <ul>
                    <li><a href="reception.html">受付フロー</a></li>
                    <li><a href="picking-audit.html">ピッキング・監査</a></li>
                    <li><a href="tosho-audit.html">散薬・シロップ監査</a></li>
                    <li><a href="yuyama-pack.html">湯山分包機</a></li>
                    <li><a href="index.html">会計処理</a></li>
                    <li><a href="medixs.html">薬歴 (Medixs)</a></li>
                    <li><a href="others.html">その他・配置場所</a></li>
                </ul>
"""

for filename in files:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace <ul>...</ul> inside <nav class="nav">
    content = re.sub(r'<ul>[\s\S]*?</ul>', nav_html.strip(), content)
    
    # Add class="active" to the current page
    current_link = f'href="{filename}"'
    active_link = f'href="{filename}" class="active"'
    content = content.replace(current_link, active_link)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
