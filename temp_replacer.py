import re

with open('D:/NNPD/we/web-shrimp-studio/public/projects/news.html', 'r', encoding='utf-8') as f:
    content = f.read()

images = [
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
]

count = 0
def replacer(match):
    global count
    img = images[count % len(images)]
    count += 1
    classes = 'card-img'
    if 'list-img' in match.group(0) or 'width=\"100\"' in match.group(0):
        classes = 'list-img-el'
    elif '900' in match.group(0):
        classes = 'cat-feat-img'
    elif '480' in match.group(0):
        classes = 'card-img'
    return f'<img src=\"{img}\" alt=\"News image\" class=\"{classes}\" style=\"width:100%; height:100%; object-fit:cover;\" />'

new_content = re.sub(r'<svg class=\"img-svg.*?<\/svg>', replacer, content)

# I also need to replace the hero image which is not img-svg but <svg class="hero-main-img-placeholder"...
# Wait, let's just do another replace for hero-main-img-placeholder
def hero_replacer(match):
    return '<img src=\"https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80\" class=\"hero-main-img\" style=\"width:100%; height:100%; object-fit:cover;\" />'

new_content = re.sub(r'<div class=\"hero-main-img-placeholder.*?<\/div>', hero_replacer, new_content, flags=re.DOTALL)

with open('D:/NNPD/we/web-shrimp-studio/public/projects/news.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Replaced ' + str(count) + ' SVGs with real images.')
