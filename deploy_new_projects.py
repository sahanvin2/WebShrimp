import os
import shutil
import glob
import re
import random

brain_dir = r"C:\Users\User\.gemini\antigravity\brain\c0b15246-da16-4ffc-b2b1-d7311aace0b4"
assets_dir = r"d:\NNPD\we\web-shrimp-studio\assets\Codes"
projects_dir = r"d:\NNPD\we\web-shrimp-studio\public\projects"
thumbs_dir = r"d:\NNPD\we\web-shrimp-studio\public\portfolio_thumbs"

projects = {
    'Voss-and-crane-studio.html': 'voss_and_crane',
    'Ember & Salt Fine Dining.html': 'ember_and_salt',
    'Phantom Studio.html': 'phantom_studio',
    'Meridian Analytics.html': 'meridian_analytics',
    'Sōkai Wellness.html': 'sokai_wellness',
    'TerraGuard Foundation.html': 'terraguard_foundation',
    'LUNE Atelier.html': 'lune_atelier',
    'VAEL Portfolio.html': 'vael_portfolio',
    'Nomad Routes.html': 'nomad_routes',
    'Aurum Estate.html': 'aurum_estate',
    'Axiom Protocol.html': 'axiom_protocol'
}

# 1. Copy generated thumbnails to thumbs_dir with correct names
for html_file, prefix in projects.items():
    pattern = os.path.join(brain_dir, f"{prefix}_*.png")
    matches = glob.glob(pattern)
    if matches:
        latest_img = max(matches, key=os.path.getctime)
        base_name = os.path.splitext(html_file)[0]
        dest_path = os.path.join(thumbs_dir, f"{base_name}.png")
        shutil.copy2(latest_img, dest_path)

def get_random_picsum():
    seed = random.randint(1, 1000)
    return f"https://picsum.photos/seed/{seed}/800/600.jpg"

for html_file in projects.keys():
    src_path = os.path.join(assets_dir, html_file)
    dest_path = os.path.join(projects_dir, html_file)
    
    if not os.path.exists(src_path):
        continue
        
    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    def inject_bg(match):
        full_tag = match.group(0)
        if 'background-image' not in full_tag:
            img_url = get_random_picsum()
            if 'style="' in full_tag:
                return full_tag.replace('style="', f'style="background-image: url(\'{img_url}\'); background-size: cover; background-position: center; ')
            elif "style='" in full_tag:
                return full_tag.replace("style='", f"style='background-image: url(\"{img_url}\"); background-size: cover; background-position: center; ")
            else:
                return full_tag.replace('>', f' style="background-image: url(\'{img_url}\'); background-size: cover; background-position: center;">')
        return full_tag

    content = re.sub(r'<div[^>]*class="[^"]*image-placeholder[^"]*"[^>]*>', inject_bg, content)
    
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done")
