import os
import re
import random

IMG_IDS = {
    'business': [
        '1497366216548-37526070297c', '1416339306562-f3d12fefd36f', '1556761175-5973dc0f32e7',
        '1507679622114-c3bf1480fe39', '1552664730-d307ca884978', '1522071820081-009f0129c71c',
        '1600880292203-757bb62b4baf', '1542744173-8e7e53415bb0', '1573164713988-8665fc963095'
    ],
    'ecommerce': [
        '1483985988355-763728e1935b', '1441986300917-64674bd600d8', '1491553895911-0055eca6402d',
        '1607083206968-13611e3d76db', '1460353581641-378addc0274f', '1523381210434-271e8be1f52b',
        '1515886657613-9f3515b0c78f', '1485955900006-d0928adc10b1', '1511556532299-8f662fc26c06'
    ],
    'people': [
        '1534528741775-53994a69daeb', '1506794778202-cad84cf45f1d', '1507003211169-0a1dd7228f2d',
        '1517841905240-472988babdf9', '1438761681033-6461ffad8d80', '1531427186611-ec06d51922ba',
        '1580489944761-15a19d654956', '1494790108377-be9c29b29330', '1527980965255-d3b416303d12'
    ],
    'tech': [
        '1517694712202-14dd9538aa97', '1498050108023-c5249f4df085', '1488590528505-98d2b5dba041',
        '1550751827-4bd374c3f58b', '1531297172867-11f4cc79559f', '1526374965328-7f61d4dc18c5'
    ],
    'world': [
        '1526304640581-d334cdbbf45e', '1480714378408-67cf0d13bc1b', '1470252656025-9df0f4e3c5a6',
        '1508247963583-662589e4726e', '1518709268805-4e9042af9f23', '1486406146926-c627a92ad1ab'
    ]
}

def get_random_unsplash_url(category, width=800, height=600):
    cat_keys = list(IMG_IDS.keys())
    selected_cat = category if category in IMG_IDS else random.choice(cat_keys)
    img_id = random.choice(IMG_IDS[selected_cat])
    return f"https://images.unsplash.com/photo-{img_id}?auto=format&fit=crop&q=80&w={width}&h={height}"

filepath = r"d:\NNPD\we\web-shrimp-studio\public\projects\news.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <svg class="img-svg... in the list articles
# Example: <svg class="img-svg bg-4" viewBox="0 0 100 100">...<defs>...<stop...></svg>
def repl_svg(match):
    # Determine context based on the full match or just randomly
    svg_str = match.group(0)
    cat = 'world'
    if 'tech' in svg_str.lower() or 'bg-4' in svg_str or 'bg-5' in svg_str or 'bg-7' in svg_str:
        cat = 'tech'
    elif 'bg-2' in svg_str or 'bg-6' in svg_str or 'bg-8' in svg_str:
        cat = 'business'

    # The list images are in .list-img which are small squares, or .card-img-wrap which are 16:9
    width = 600
    height = 400
    class_name = ""
    
    if 'viewBox="0 0 100 100"' in svg_str:
        class_name = "list-img-el"
        width = 400
        height = 400
    elif 'viewBox="0 0 480 270"' in svg_str:
        class_name = "card-img"
        width = 800
        height = 450
    elif 'viewBox="0 0 720 405"' in svg_str:
        class_name = "hero-main-img"
        width = 1200
        height = 675
        cat = 'world' # the main hero is world/AI
    elif 'viewBox="0 0 480 270"' in svg_str or 'viewBox="0 0 900 394"' in svg_str:
        class_name = "cat-feat-img"
        width = 1200
        height = 600
        if 'TECH' in svg_str.upper(): cat = 'tech'
        if 'BIZ' in svg_str.upper() or 'BUSINESS' in svg_str.upper() or 'MARKETS' in svg_str.upper(): cat = 'business'
    else:
        class_name = "sec-img"

    url = get_random_unsplash_url(cat, width, height)
    return f'<img src="{url}" class="{class_name}" alt="News Image">'

content = re.sub(r'<svg class="img-svg[^>]*>.*?</svg>', repl_svg, content, flags=re.DOTALL)

# Replace the giant hero article image
def repl_hero(match):
    url = get_random_unsplash_url('world', 1200, 600)
    return f'<img src="{url}" class="article-hero-img" alt="Hero Image">'

content = re.sub(r'<svg class="article-hero-img"[^>]*>.*?</svg>', repl_hero, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done replacing news.html SVGs!")
