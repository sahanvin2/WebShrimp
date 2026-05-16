from PIL import Image, ImageOps
import numpy as np

img = Image.open('public/logo-raw.png').convert('RGBA')
arr = np.array(img)

# Find bounding box of non-white pixels
# White is (255,255,255)
non_white = (arr[:, :, 0] < 240) | (arr[:, :, 1] < 240) | (arr[:, :, 2] < 240)
coords = np.argwhere(non_white)

if coords.size > 0:
    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0) + 1
    
    # We want to crop out the 'MOTION & CONNECTION' text which is below the main logo.
    # We can find the gap between the main logo and the text below it.
    row_sums = non_white[y0:y1, x0:x1].sum(axis=1)
    
    # Start from the bottom of the bounding box and move up until we hit a gap (row sum == 0)
    gap_y = y1 - y0
    for i in range(len(row_sums)-1, 0, -1):
        if row_sums[i] == 0:
            gap_y = i
            break
            
    # Now gap_y is the height of the main logo part
    y1_new = y0 + gap_y
    
    # Re-calculate bounding box for x using only the top part (the main logo)
    non_white_top = non_white[y0:y1_new, x0:x1]
    coords_top = np.argwhere(non_white_top)
    if coords_top.size > 0:
        _, x0_top = coords_top.min(axis=0)
        _, x1_top = coords_top.max(axis=0) + 1
        x0 = x0 + x0_top
        x1 = x0 - x0_top + x1_top
    
    img_cropped = img.crop((x0, y0, x1, y1_new))
    
    # Now remove white background (make it transparent)
    arr_cropped = np.array(img_cropped)
    
    # Convert to grayscale to use as alpha mask
    gray = img_cropped.convert('L')
    alpha = ImageOps.invert(gray)
    
    alpha_arr = np.array(alpha)
    max_alpha = alpha_arr.max()
    if max_alpha > 0:
        alpha_arr = (alpha_arr.astype(np.float32) / max_alpha * 255).astype(np.uint8)
    alpha = Image.fromarray(alpha_arr)
    
    # Extract the main color by finding the darkest pixel
    darkest_y, darkest_x = np.unravel_index(np.argmin(np.array(gray)), np.array(gray).shape)
    color = arr_cropped[darkest_y, darkest_x, :3]
    
    # Create an image of pure color
    color_img = Image.new('RGBA', img_cropped.size, tuple(color) + (255,))
    color_img.putalpha(alpha)
    
    color_img.save('public/logo.png')
    print('Logo processed successfully!')
else:
    print('Failed to process logo.')
