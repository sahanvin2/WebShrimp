from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"

LOOP_PATH = (
    "M18 53C11.5 56.8 7.8 54.2 7.8 49.4C7.8 45.3 10.4 41.8 12.5 37.1C14.4 32.7 "
    "15.2 28.4 15.2 23.8V20.6C15.2 15.4 18.5 12 22.8 12C27.1 12 30.1 15.2 30.1 19.6"
    "C30.1 25.2 26.9 29 22.7 33.1C18.7 37 15.8 40.7 15.8 45.5C15.8 50.5 19.2 53.3 "
    "24.1 53.3C28.6 53.3 32 51 35.6 46.2"
)
INFINITY_PATH = (
    "M35.8 37.2C43.1 28 50.8 28 58.3 37.2C65.7 46.2 73.3 46.2 80.7 37.2C88.3 28 "
    "95.9 28 103.4 37.2C96 46.2 88.4 46.2 80.9 37.2C73.4 28 65.9 28 58.4 37.2"
    "C50.9 46.2 43.2 46.2 35.8 37.2Z"
)


def cubic_points(
    p0: tuple[float, float],
    p1: tuple[float, float],
    p2: tuple[float, float],
    p3: tuple[float, float],
    steps: int = 48,
) -> list[tuple[float, float]]:
    points: list[tuple[float, float]] = []
    for index in range(steps + 1):
        t = index / steps
        mt = 1 - t
        x = (mt ** 3) * p0[0] + 3 * (mt ** 2) * t * p1[0] + 3 * mt * (t ** 2) * p2[0] + (t ** 3) * p3[0]
        y = (mt ** 3) * p0[1] + 3 * (mt ** 2) * t * p1[1] + 3 * mt * (t ** 2) * p2[1] + (t ** 3) * p3[1]
        points.append((x, y))
    return points


def parse_path(path_data: str) -> list[list[tuple[float, float]]]:
    tokens = re.findall(r"[A-Za-z]|-?\d+(?:\.\d+)?", path_data)
    index = 0
    command = ""
    current = (0.0, 0.0)
    start = (0.0, 0.0)
    current_path: list[tuple[float, float]] = []
    paths: list[list[tuple[float, float]]] = []

    def flush() -> None:
        nonlocal current_path
        if current_path:
            paths.append(current_path)
            current_path = []

    while index < len(tokens):
        token = tokens[index]
        if token.isalpha():
            command = token
            index += 1

        if command == "M":
            x = float(tokens[index])
            y = float(tokens[index + 1])
            index += 2
            flush()
            current = (x, y)
            start = current
            current_path = [current]
            command = "L"
        elif command == "C":
            while index + 5 < len(tokens) and not tokens[index].isalpha():
                p1 = (float(tokens[index]), float(tokens[index + 1]))
                p2 = (float(tokens[index + 2]), float(tokens[index + 3]))
                p3 = (float(tokens[index + 4]), float(tokens[index + 5]))
                current_path.extend(cubic_points(current, p1, p2, p3)[1:])
                current = p3
                index += 6
                if index >= len(tokens) or tokens[index].isalpha():
                    break
        elif command == "L":
            while index + 1 < len(tokens) and not tokens[index].isalpha():
                current = (float(tokens[index]), float(tokens[index + 1]))
                current_path.append(current)
                index += 2
                if index >= len(tokens) or tokens[index].isalpha():
                    break
        elif command == "Z":
            current_path.append(start)
            current = start
            flush()
            command = ""
        else:
            index += 1

    flush()
    return paths


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/trebucbd.ttf" if bold else "C:/Windows/Fonts/trebuc.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]

    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size)

    return ImageFont.load_default()


def lerp_color(start: tuple[int, int, int], end: tuple[int, int, int], amount: float) -> tuple[int, int, int]:
    return tuple(round(s + (e - s) * amount) for s, e in zip(start, end))


def create_gradient(size: tuple[int, int], start: tuple[int, int, int], end: tuple[int, int, int]) -> Image.Image:
    width, height = size
    gradient = Image.new("RGBA", size)
    pixels = gradient.load()

    for y in range(height):
        for x in range(width):
            amount = ((x / max(width - 1, 1)) * 0.62) + ((y / max(height - 1, 1)) * 0.38)
            color = lerp_color(start, end, min(amount, 1))
            pixels[x, y] = (*color, 255)

    return gradient


def add_glow(
    base: Image.Image,
    bbox: tuple[int, int, int, int],
    color: tuple[int, int, int],
    blur_radius: int,
    alpha: int,
) -> None:
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse(bbox, fill=(*color, alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(blur_radius))
    base.alpha_composite(glow)


def render_mark(
    image: Image.Image,
    origin: tuple[float, float],
    scale: float,
    stroke_width: int,
    tail_color: tuple[int, int, int],
    loop_color: tuple[int, int, int],
    dot_color: tuple[int, int, int],
) -> None:
    draw = ImageDraw.Draw(image)

    def stroke_path(points: list[tuple[float, float]], color: tuple[int, int, int]) -> None:
        radius = stroke_width / 2
        for start, end in zip(points, points[1:]):
            dx = end[0] - start[0]
            dy = end[1] - start[1]
            distance = max((dx * dx + dy * dy) ** 0.5, 1)
            steps = max(1, round(distance / max(radius * 0.12, 1)))

            for index in range(steps + 1):
                amount = index / steps
                x = start[0] + (dx * amount)
                y = start[1] + (dy * amount)
                draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color)

    def transform(points: list[tuple[float, float]]) -> list[tuple[float, float]]:
        ox, oy = origin
        return [(ox + (x * scale), oy + (y * scale)) for x, y in points]

    for path in parse_path(LOOP_PATH):
        stroke_path(transform(path), tail_color)

    for path in parse_path(INFINITY_PATH):
        stroke_path(transform(path), loop_color)

    cx = origin[0] + (116 * scale)
    cy = origin[1] + (17 * scale)
    radius = max(4, round(4 * scale))
    draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=dot_color)


def create_icon(size: int) -> Image.Image:
    work_scale = 4
    work_size = size * work_scale
    base = Image.new("RGBA", (work_size, work_size), (0, 0, 0, 0))
    gradient = create_gradient((work_size, work_size), (14, 42, 93), (31, 93, 165))

    mask = Image.new("L", (work_size, work_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    inset = round(work_size * 0.06)
    radius = round(work_size * 0.23)
    mask_draw.rounded_rectangle((inset, inset, work_size - inset, work_size - inset), radius=radius, fill=255)
    gradient.putalpha(mask)
    base.alpha_composite(gradient)

    add_glow(
        base,
        (round(work_size * 0.08), round(work_size * 0.06), round(work_size * 0.72), round(work_size * 0.7)),
        (255, 255, 255),
        round(work_size * 0.08),
        40,
    )
    add_glow(
        base,
        (round(work_size * 0.45), round(work_size * 0.34), round(work_size * 1.02), round(work_size * 0.95)),
        (47, 145, 255),
        round(work_size * 0.1),
        60,
    )

    mark_layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    render_mark(
        mark_layer,
        origin=(work_size * 0.1, work_size * 0.2),
        scale=work_size / 162,
        stroke_width=max(24, round(work_size * 0.05)),
        tail_color=(247, 251, 255),
        loop_color=(145, 209, 255),
        dot_color=(255, 177, 92),
    )
    mark_layer = mark_layer.filter(ImageFilter.GaussianBlur(work_scale * 0.35))
    base.alpha_composite(mark_layer)

    return base.resize((size, size), Image.Resampling.LANCZOS)


def create_og_preview() -> Image.Image:
    width, height = 1200, 630
    base = create_gradient((width, height), (10, 24, 53), (28, 89, 168))
    add_glow(base, (840, -40, 1220, 320), (255, 255, 255), 70, 26)
    add_glow(base, (-120, 430, 220, 780), (130, 190, 255), 80, 24)

    card = Image.new("RGBA", (220, 220), (247, 251, 255, 255))
    card_mask = Image.new("L", (220, 220), 0)
    ImageDraw.Draw(card_mask).rounded_rectangle((0, 0, 220, 220), radius=52, fill=255)
    card.putalpha(card_mask)
    card_shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(card_shadow)
    shadow_draw.rounded_rectangle((86, 96, 318, 328), radius=56, fill=(8, 16, 36, 75))
    card_shadow = card_shadow.filter(ImageFilter.GaussianBlur(20))
    base.alpha_composite(card_shadow)
    base.alpha_composite(card, (90, 96))

    mark_layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    render_mark(
        mark_layer,
        origin=(105, 118),
        scale=1.58,
        stroke_width=12,
        tail_color=(23, 63, 115),
        loop_color=(42, 118, 201),
        dot_color=(255, 177, 92),
    )
    mark_layer = mark_layer.filter(ImageFilter.GaussianBlur(0.6))
    base.alpha_composite(mark_layer)

    draw = ImageDraw.Draw(base)
    title_font = load_font(84, bold=True)
    sub_font = load_font(31, bold=False)
    headline_font = load_font(60, bold=True)
    body_font = load_font(27, bold=False)

    draw.text((344, 130), "loopingon", fill=(255, 255, 255), font=title_font)
    draw.text((346, 226), "Web and Software Agency · Sri Lanka", fill=(219, 234, 255), font=sub_font)
    draw.text((92, 386), "Websites and software built", fill=(255, 255, 255), font=headline_font)
    draw.text((92, 456), "to help businesses grow.", fill=(255, 255, 255), font=headline_font)
    draw.text((94, 541), "Faster loads. Cleaner branding. Better digital experiences.", fill=(221, 234, 255), font=body_font)

    return base


def save_png_variants(icon: Image.Image) -> None:
    variants = {
      PUBLIC_DIR / "apple-touch-icon.png": 180,
      PUBLIC_DIR / "icon-192.png": 192,
      PUBLIC_DIR / "icon-512.png": 512,
    }

    for path, size in variants.items():
        icon.resize((size, size), Image.Resampling.LANCZOS).save(path, format="PNG", optimize=True)

    favicon = icon.resize((64, 64), Image.Resampling.LANCZOS)
    favicon.save(PUBLIC_DIR / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])


def main() -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

    icon = create_icon(1024)
    save_png_variants(icon)
    create_og_preview().save(PUBLIC_DIR / "loopingon-og.png", format="PNG", optimize=True)

    print("generated brand raster assets")


if __name__ == "__main__":
    main()
