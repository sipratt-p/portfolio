#!/usr/bin/env python3
"""Render static 1200x630 Open Graph cards for every route.

    node scripts/generate-seo.mjs   # writes scripts/og-routes.json
    python3 scripts/og.py           # writes public/og/<key>.jpg

Work pages get the warm cream card; Lab pages get the dark card with the series still.
Fonts are the site's own (public/fonts). Needs Pillow with WebP support.
"""
import json
import pathlib
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / 'public' / 'fonts'
OUT = ROOT / 'public' / 'og'
W, H = 1200, 630
PAD = 72

LIGHT = dict(bg=(251, 246, 240), ink=(29, 26, 23), muted=(107, 98, 90), accent=(143, 79, 23), rule=(232, 222, 211))
DARK = dict(bg=(5, 6, 10), ink=(242, 237, 227), muted=(163, 158, 148), accent=(241, 217, 168), rule=(40, 42, 50))
IRI = [(63, 213, 230), (200, 107, 240), (242, 196, 107)]


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def iri_line(draw, x0, y, x1, h=3):
    for x in range(x0, x1):
        t = (x - x0) / max(1, x1 - x0)
        c = lerp(IRI[0], IRI[1], t / 0.52) if t < 0.52 else lerp(IRI[1], IRI[2], (t - 0.52) / 0.48)
        draw.line([(x, y), (x, y + h - 1)], fill=c)


def glow(img, cx, cy, r, color, alpha):
    layer = Image.new('RGBA', img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (alpha,))
    layer = layer.filter(ImageFilter.GaussianBlur(r * 0.55))
    img.alpha_composite(layer)


def wrap(draw, text, fnt, width):
    words, lines, cur = text.split(), [], ''
    for w in words:
        trial = (cur + ' ' + w).strip()
        if draw.textlength(trial, font=fnt) <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_title(draw, text, em, x, y, width, pal, max_lines=3):
    """Title in Geist 600, with one emphasised phrase in Instrument Serif italic (accent colour)."""
    for size in (70, 64, 58, 52, 46):
        sans, serif = font('geist-600.ttf', size), font('instrument-serif-italic.ttf', int(size * 1.08))
        lines = wrap(draw, text, sans, width)
        if len(lines) <= max_lines:
            break
    lines = lines[:max_lines]
    lh = int(size * 1.08)
    em_words = set((em or '').split())
    for i, line in enumerate(lines):
        cx = x
        for j, word in enumerate(line.split(' ')):
            bare = word.strip('.,:;')
            is_em = bare in em_words
            f = serif if is_em else sans
            fill = pal['accent'] if is_em else pal['ink']
            token = word + (' ' if j < len(line.split(' ')) - 1 else '')
            draw.text((cx, y + i * lh + (2 if is_em else 0)), token, font=f, fill=fill)
            cx += draw.textlength(token, font=f)
    return y + len(lines) * lh


def card(o):
    lab = o.get('room') == 'lab'
    pal = DARK if lab else LIGHT
    img = Image.new('RGBA', (W, H), pal['bg'] + (255,))
    text_w = W - 2 * PAD
    if lab and o.get('image'):
        src = Image.open(ROOT / 'public' / 'media' / 'lab' / 'img' / f"{o['image']}.jpg").convert('RGB')
        # cover the right 62% of the card, fade into black on the left
        tw, th = int(W * 0.62), H
        s = max(tw / src.width, th / src.height)
        src = src.resize((int(src.width * s) + 1, int(src.height * s) + 1), Image.LANCZOS)
        left, top = (src.width - tw) // 2, (src.height - th) // 2
        src = src.crop((left, top, left + tw, top + th)).convert('RGBA')
        mask = Image.new('L', (tw, th), 255)
        md = ImageDraw.Draw(mask)
        for xx in range(int(tw * 0.55)):
            md.line([(xx, 0), (xx, th)], fill=int(255 * (xx / (tw * 0.55)) ** 1.4))
        img.paste(src, (W - tw, 0), mask)
        text_w = int(W * 0.56)
        shade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        sd = ImageDraw.Draw(shade)
        for yy in range(H):
            a = int(150 * max(0, (yy - H * 0.55) / (H * 0.45)))
            sd.line([(0, yy), (W, yy)], fill=(5, 6, 10, a))
        img.alpha_composite(shade)
    elif lab:
        glow(img, 1020, 40, 260, (200, 107, 240), 60)
        glow(img, 120, 600, 220, (63, 213, 230), 40)
    else:
        glow(img, 1080, -20, 300, (214, 140, 74), 46)
        glow(img, 40, 40, 220, (236, 196, 148), 40)
    if o.get('portrait'):
        p = Image.open(ROOT / 'public' / 'images' / 'profile.webp').convert('RGB')
        d = 300
        side = min(p.size)
        p = p.crop(((p.width - side) // 2, (p.height - side) // 2, (p.width + side) // 2, (p.height + side) // 2)).resize((d, d), Image.LANCZOS)
        m = Image.new('L', (d * 4, d * 4), 0)
        ImageDraw.Draw(m).ellipse([0, 0, d * 4 - 1, d * 4 - 1], fill=255)
        m = m.resize((d, d), Image.LANCZOS)
        px, py = W - PAD - d, (H - d) // 2 - 10
        ring = ImageDraw.Draw(img)
        ring.ellipse([px - 14, py - 14, px + d + 14, py + d + 14], outline=pal['rule'], width=2)
        img.paste(p.convert('RGBA'), (px, py), m)
        text_w = W - 2 * PAD - d - 56
    draw = ImageDraw.Draw(img)
    # wordmark
    dot_c = pal['accent']
    draw.ellipse([PAD, PAD + 10, PAD + 12, PAD + 22], fill=dot_c)
    draw.text((PAD + 24, PAD), 'Seth Pratt', font=font('geist-600.ttf', 30), fill=pal['ink'])
    # eyebrow
    ey = font('geist-500.ttf', 20)
    eyebrow = o.get('eyebrow', '').upper()
    x = PAD
    for ch in eyebrow:  # manual letter-spacing
        draw.text((x, PAD + 118), ch, font=ey, fill=pal['accent'] if not lab else pal['muted'])
        x += draw.textlength(ch, font=ey) + 2.6
    if lab:
        iri_line(draw, PAD, PAD + 104, PAD + 64, 2)
    # title
    bottom = draw_title(draw, o['title'], o.get('em'), PAD, PAD + 158, text_w, pal)
    # result / line
    line = o.get('line') or ''
    if line:
        lf = font('geist-400.ttf', 26)
        lines = wrap(draw, line, lf, text_w)
        rows = max(1, min(2, (H - PAD - 24 - 10 - (bottom + 22)) // 36))  # never run into the footer rule
        if len(lines) > rows:
            lines = lines[:rows]
            lines[-1] = lines[-1].rstrip('.,;') + '…'
        for i, ln in enumerate(lines):
            draw.text((PAD, bottom + 22 + i * 36), ln, font=lf, fill=pal['muted'])
    # footer
    ff = font('geist-500.ttf', 22)
    draw.text((PAD, H - PAD - 8), 'sethpratt.com', font=ff, fill=pal['ink'])
    if lab:
        iri_line(draw, PAD, H - PAD - 24, W - PAD, 2)
    else:
        draw.line([(PAD, H - PAD - 24), (W - PAD, H - PAD - 24)], fill=pal['rule'], width=2)
        draw.line([(PAD, H - PAD - 24), (PAD + 120, H - PAD - 24)], fill=pal['accent'], width=2)
    return img.convert('RGB')


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    routes = json.loads((ROOT / 'scripts' / 'og-routes.json').read_text())
    for o in routes:
        path = OUT / f"{o['key']}.jpg"
        card(o).save(path, quality=86, optimize=True, progressive=True)
        print(f"{path.relative_to(ROOT)}  {path.stat().st_size // 1024} KB")


if __name__ == '__main__':
    main()
