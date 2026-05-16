from __future__ import annotations

import mimetypes
import os
from pathlib import Path

import boto3


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
ASSETS_DIR = ROOT / "assets"
SRC_ASSETS_DIR = ROOT / "src" / "assets"

mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("application/manifest+json", ".webmanifest")

INCLUDE_GLOBS = [
    "about/*",
    "blog/*",
    "home/*",
    "portfolio_thumbs/*",
    "process/*",
    "services/*",
    "social/*",
    "team/*",
    "whatsapp/*",
    "images/*",
    "apple-touch-icon.png",
    "favicon.ico",
    "favicon.svg",
    "icon-192.png",
    "icon-512.png",
    "loopingon-mark.svg",
    "loopingon-og.png",
    "loopingon-og.svg",
    "site.webmanifest",
]

EXTRA_ROOTS = [
    (ASSETS_DIR, "source-assets"),
    (SRC_ASSETS_DIR, "src-assets"),
]


def iter_files() -> list[Path]:
    files: list[Path] = []
    seen: set[Path] = set()

    for pattern in INCLUDE_GLOBS:
        for path in sorted(PUBLIC_DIR.glob(pattern)):
            if not path.is_file() or path in seen:
                continue
            seen.add(path)
            files.append(path)

    return files


def iter_extra_files() -> list[tuple[Path, str]]:
    files: list[tuple[Path, str]] = []

    for root, prefix in EXTRA_ROOTS:
        if not root.exists():
            continue

        for path in sorted(root.rglob("*")):
            if not path.is_file():
                continue
            if path.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico"}:
                continue
            files.append((path, f"{prefix}/{path.relative_to(root).as_posix()}"))

    return files


def main() -> None:
    endpoint_url = os.environ["B2_ENDPOINT"]
    access_key_id = os.environ["B2_ACCESS_KEY_ID"]
    secret_access_key = os.environ["B2_SECRET_ACCESS_KEY"]
    bucket = os.environ["B2_BUCKET"]
    region = os.environ.get("B2_REGION", "us-east-005")

    client = boto3.client(
        "s3",
        endpoint_url=endpoint_url,
        aws_access_key_id=access_key_id,
        aws_secret_access_key=secret_access_key,
        region_name=region,
    )

    files = iter_files()
    extra_files = iter_extra_files()
    if not files and not extra_files:
        raise SystemExit("No public assets found to upload.")

    for file_path in files:
        key = file_path.relative_to(PUBLIC_DIR).as_posix()
        content_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
        body = file_path.read_bytes()
        client.put_object(
            Bucket=bucket,
            Key=key,
            Body=body,
            ContentType=content_type,
            CacheControl="max-age=31536000, immutable",
        )
        print(f"uploaded {key}")

    for file_path, key in extra_files:
        content_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
        body = file_path.read_bytes()
        client.put_object(
            Bucket=bucket,
            Key=key,
            Body=body,
            ContentType=content_type,
            CacheControl="max-age=31536000, immutable",
        )
        print(f"uploaded {key}")


if __name__ == "__main__":
    main()
