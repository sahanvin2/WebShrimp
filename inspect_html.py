import os
import re

files = [
    'Voss-and-crane-studio.html',
    'Ember & Salt Fine Dining.html',
    'Phantom Studio.html',
    'Meridian Analytics.html',
    'Sōkai Wellness.html',
    'TerraGuard Foundation.html',
    'LUNE Atelier.html',
    'VAEL Portfolio.html',
    'Nomad Routes.html',
    'Aurum Estate.html',
    'Axiom Protocol.html'
]

for file in files:
    path = os.path.join(r'd:\NNPD\we\web-shrimp-studio\assets\Codes', file)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            placeholders = len(re.findall(r'placeholder', content, re.IGNORECASE))
            imgs = len(re.findall(r'<img', content, re.IGNORECASE))
            bg_imgs = len(re.findall(r'background-image', content, re.IGNORECASE))
            safe_file = file.encode('ascii', 'ignore').decode('ascii')
            print(f"{safe_file}: {placeholders} placeholders, {imgs} imgs, {bg_imgs} bg_imgs")
    else:
        print(f"File not found: {file}")
