import os
import re

thumbs_dir = r"d:\NNPD\we\web-shrimp-studio\public\portfolio_thumbs"

def slugify(text):
    text = text.replace("&", "and")
    text = text.replace("ō", "o")
    text = re.sub(r'[^a-zA-Z0-9\.]', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.lower().strip('-')

for filename in os.listdir(thumbs_dir):
    if filename.endswith(".png") or filename.endswith(".webp"):
        old_path = os.path.join(thumbs_dir, filename)
        new_name = slugify(filename)
        new_path = os.path.join(thumbs_dir, new_name)
        if old_path != new_path:
            # handle case-insensitive renames by renaming to a temp name first
            temp_path = os.path.join(thumbs_dir, "temp_" + new_name)
            os.rename(old_path, temp_path)
            os.rename(temp_path, new_path)
