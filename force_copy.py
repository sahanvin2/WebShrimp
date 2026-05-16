import os
import shutil

src_dir = r"d:\NNPD\we\web-shrimp-studio\assets\Codes\Images"
dest_dir = r"d:\NNPD\we\web-shrimp-studio\public\portfolio_thumbs"

for filename in os.listdir(src_dir):
    if filename.endswith(".png"):
        src_path = os.path.join(src_dir, filename)
        dest_path = os.path.join(dest_dir, filename)
        shutil.copy2(src_path, dest_path)
