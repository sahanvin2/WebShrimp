import os
import re
import random

# High quality Unsplash image IDs mapped to general categories
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
    'architecture': [
        '1486406146926-c627a92ad1ab', '1481026469463-66327c86e544', '1503387762-592deb58ef4e',
        '1463131349079-c56bb81fb396', '1497366811353-6870744d04b2', '1479839672679-a46483c0e7c8'
    ]
}

def get_random_unsplash_url(category, width=800, height=600):
    cat_keys = list(IMG_IDS.keys())
    selected_cat = category if category in IMG_IDS else random.choice(cat_keys)
    img_id = random.choice(IMG_IDS[selected_cat])
    return f"https://images.unsplash.com/photo-{img_id}?auto=format&fit=crop&q=80&w={width}&h={height}"

def process_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to match: https://picsum.photos/seed/[something]/[width]/[height].jpg
    def repl_picsum(match):
        seed = match.group(1).lower()
        width = match.group(2)
        height = match.group(3)
        
        cat = 'business'
        if 'person' in seed or 'team' in seed or 'user' in seed or 'author' in seed or 'insta' in seed:
            cat = 'people'
        elif 'maison' in seed or 'cat-' in seed or 'product' in seed or 'fashion' in seed:
            cat = 'ecommerce'
        elif 'tech' in seed or 'app' in seed or 'dash' in seed:
            cat = 'tech'
            
        return get_random_unsplash_url(cat, width, height)

    content = re.sub(r'https://picsum\.photos/seed/([^/]+)/(\d+)/(\d+)\.jpg', repl_picsum, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
projects_dir = r"d:\NNPD\we\web-shrimp-studio\public\projects"
for filename in os.listdir(projects_dir):
    if filename.endswith(".html"):
        process_file(os.path.join(projects_dir, filename))

print("Done!")
