import re

with open('D:/NNPD/we/web-shrimp-studio/public/projects/news.html', 'r', encoding='utf-8') as f:
    content = f.read()

def article_replacer(match):
    return '<img src=\"https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80\" class=\"article-hero-img\" style=\"width:100%; height:100%; object-fit:cover;\" />'

new_content = re.sub(r'<svg class=\"article-hero-img.*?<\/svg>', article_replacer, content, flags=re.DOTALL)

with open('D:/NNPD/we/web-shrimp-studio/public/projects/news.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Replaced article hero img.')
