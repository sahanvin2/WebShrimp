import os
import shutil
import re

src_dir = r"d:\NNPD\we\web-shrimp-studio\assets\Codes\Images"
dest_dir = r"d:\NNPD\we\web-shrimp-studio\public\portfolio_thumbs"

def slugify(text):
    text = text.replace("&", "and")
    text = text.replace("ō", "o")
    text = re.sub(r'[^a-zA-Z0-9\.]', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.lower().strip('-')

for filename in os.listdir(src_dir):
    if filename.endswith(".png") or filename.endswith(".webp"):
        src_path = os.path.join(src_dir, filename)
        new_name = slugify(filename)
        dest_path = os.path.join(dest_dir, new_name)
        # overwrite silently
        shutil.copy2(src_path, dest_path)
