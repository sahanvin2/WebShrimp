from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg"}


@dataclass(frozen=True)
class Job:
    source: Path
    target: Path
    max_width: int
    quality: int


EXPLICIT_JOBS = [
    Job(ROOT / "src/assets/Sahan.jpg", PUBLIC_DIR / "team/sahan.webp", 520, 80),
    Job(ROOT / "src/assets/Vinura.jpg", PUBLIC_DIR / "team/vinura.webp", 520, 80),
]


def optimize(job: Job) -> tuple[int, int]:
    job.target.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(job.source) as image:
        image = image.convert("RGBA") if "A" in image.getbands() else image.convert("RGB")
        if image.width > job.max_width:
            new_height = round(image.height * (job.max_width / image.width))
            image = image.resize((job.max_width, new_height), Image.Resampling.LANCZOS)

        image.save(
            job.target,
            format="WEBP",
            quality=job.quality,
            method=6,
            optimize=True,
        )

    return job.source.stat().st_size, job.target.stat().st_size


def public_image_jobs() -> list[Job]:
    jobs: list[Job] = []

    for source in sorted(PUBLIC_DIR.rglob("*")):
        if not source.is_file() or source.suffix.lower() not in IMAGE_SUFFIXES:
            continue

        target = source.with_suffix(".webp")
        if target.exists() and target.stat().st_mtime >= source.stat().st_mtime:
            continue

        max_width = 1800
        quality = 82

        if "blog" in source.parts:
            max_width = 1200
            quality = 78
        elif "whatsapp" in source.parts:
            max_width = 1600
        elif "team" in source.parts:
            max_width = 520
        elif "process" in source.parts:
            max_width = 1600
        elif "home" in source.parts:
            max_width = 1400
        elif "portfolio_thumbs" in source.parts:
            max_width = 1400
            quality = 80
        elif "services" in source.parts:
            max_width = 1800

        jobs.append(Job(source, target, max_width, quality))

    return jobs


def main() -> None:
    jobs = EXPLICIT_JOBS + public_image_jobs()
    seen_targets: set[Path] = set()

    for job in jobs:
        if job.target in seen_targets:
            continue
        seen_targets.add(job.target)

        before, after = optimize(job)
        savings = before - after
        percent = (savings / before) * 100 if before else 0
        print(f"{job.target.relative_to(ROOT)}: {before} -> {after} ({percent:.1f}% smaller)")


if __name__ == "__main__":
    main()
