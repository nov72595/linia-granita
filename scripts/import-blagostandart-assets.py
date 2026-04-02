from __future__ import annotations

import json
import hashlib
import re
import urllib.parse
import urllib.request
from pathlib import Path


BASE_URL = "https://blagostandart.by"

CATEGORY_URLS = {
    "vazy": f"{BASE_URL}/product-category/vazy/",
    "lampady": f"{BASE_URL}/product-category/lampady/",
    "dekor": f"{BASE_URL}/product-category/aksessuary/",
    "metal": f"{BASE_URL}/product-category/metallicheskie/",
    "granit": f"{BASE_URL}/product-category/granitnye/",
    "kovka": f"{BASE_URL}/product-category/kovanye/",
    "bench-set": f"{BASE_URL}/product-category/lavki-stoly/",
}

WORKSPACE_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_ROOT = WORKSPACE_ROOT / "public" / "catalog" / "blagostandart"
OUTPUT_JSON = WORKSPACE_ROOT / "app" / "lib" / "blagostandartImport.json"


def fetch_text(url: str) -> str:
    encoded_url = encode_url(url)
    req = urllib.request.Request(
        encoded_url,
        headers={
            "User-Agent": "Mozilla/5.0",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return response.read().decode("utf-8", errors="ignore")


def fetch_binary(url: str) -> bytes:
    encoded_url = encode_url(url)
    req = urllib.request.Request(
        encoded_url,
        headers={
            "User-Agent": "Mozilla/5.0",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return response.read()


def unique_in_order(values: list[str]) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for value in values:
        if value in seen:
            continue
        seen.add(value)
        out.append(value)
    return out


def encode_url(url: str) -> str:
    parsed = urllib.parse.urlsplit(url)
    encoded_path = urllib.parse.quote(parsed.path, safe="/%._-~")
    encoded_query = urllib.parse.quote_plus(parsed.query, safe="=&")
    return urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, encoded_path, encoded_query, parsed.fragment))


def slug_from_url(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    return parsed.path.rstrip("/").split("/")[-1]


def sanitize_slug(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9-_]+", "-", value)
    value = re.sub(r"-{2,}", "-", value).strip("-")
    return value or "item"


def parse_product_links(category_html: str) -> list[str]:
    links = re.findall(r'href="(https://blagostandart\.by/product/[^"]+/?)"', category_html, flags=re.IGNORECASE)
    return unique_in_order(links)


def parse_product_title(product_html: str, fallback_slug: str) -> str:
    match = re.search(r'<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>(.*?)</h1>', product_html, flags=re.IGNORECASE | re.DOTALL)
    if not match:
        return fallback_slug.replace("-", " ").strip().title()
    text = re.sub(r"<[^>]+>", "", match.group(1))
    text = re.sub(r"\s+", " ", text).strip()
    return text or fallback_slug


def parse_gallery_image_urls(product_html: str) -> list[str]:
    urls: list[str] = []

    urls.extend(
        re.findall(
            r'woocommerce-product-gallery__image[^>]*>\s*<a[^>]+href="([^"]+)"',
            product_html,
            flags=re.IGNORECASE,
        )
    )
    urls.extend(re.findall(r'data-large_image="([^"]+)"', product_html, flags=re.IGNORECASE))

    normalized: list[str] = []
    for url in urls:
        if not url:
            continue
        if url.startswith("//"):
            normalized.append("https:" + url)
        elif url.startswith("/"):
            normalized.append(BASE_URL + url)
        else:
            normalized.append(url)

    image_urls = [u for u in unique_in_order(normalized) if "/wp-content/uploads/" in u]
    image_urls = [u for u in image_urls if not re.search(r"-\d+x\d+\.(jpg|jpeg|png|webp)$", u, flags=re.IGNORECASE)]
    return image_urls


def extension_from_url(url: str) -> str:
    path = urllib.parse.urlparse(url).path
    ext = Path(path).suffix.lower()
    if ext in {".jpg", ".jpeg", ".png", ".webp", ".gif"}:
        return ext
    return ".jpg"


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)

    result: dict[str, list[dict[str, object]]] = {}

    for category_key, category_url in CATEGORY_URLS.items():
        print(f"[category] {category_key} -> {category_url}")
        try:
            category_html = fetch_text(category_url)
        except Exception as exc:
            print(f"  failed category fetch: {exc}")
            result[category_key] = []
            continue

        product_links = parse_product_links(category_html)
        print(f"  found products: {len(product_links)}")
        category_items: list[dict[str, object]] = []

        for product_url in product_links:
            slug = sanitize_slug(slug_from_url(product_url))
            try:
                product_html = fetch_text(product_url)
            except Exception as exc:
                print(f"  skip {slug}: product fetch failed: {exc}")
                continue

            title = parse_product_title(product_html, slug)
            image_urls = parse_gallery_image_urls(product_html)
            if not image_urls:
                print(f"  skip {slug}: no gallery images")
                continue

            item_dir = OUTPUT_ROOT / category_key / slug
            item_dir.mkdir(parents=True, exist_ok=True)

            local_images: list[str] = []
            seen_hashes: set[str] = set()
            for idx, image_url in enumerate(image_urls, start=1):
                ext = extension_from_url(image_url)
                file_name = f"{idx:02d}{ext}"
                output_file = item_dir / file_name
                try:
                    data = fetch_binary(image_url)
                    digest = hashlib.sha1(data).hexdigest()
                    if digest in seen_hashes:
                        continue
                    seen_hashes.add(digest)
                    output_file.write_bytes(data)
                except Exception as exc:
                    print(f"    image download failed {image_url}: {exc}")
                    continue
                local_rel = "/" + str(output_file.relative_to(WORKSPACE_ROOT / "public")).replace("\\", "/")
                local_images.append(local_rel)

            if not local_images:
                continue

            category_items.append(
                {
                    "slug": slug,
                    "title": title,
                    "sourceUrl": product_url,
                    "images": local_images,
                }
            )
            print(f"  imported {slug}: {len(local_images)} images")

        result[category_key] = category_items

    OUTPUT_JSON.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nSaved import map: {OUTPUT_JSON}")


if __name__ == "__main__":
    main()
