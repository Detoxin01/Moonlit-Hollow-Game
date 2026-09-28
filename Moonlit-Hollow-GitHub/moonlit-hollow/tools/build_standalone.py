"""Build an offline HTML game using only the Python standard library."""
from pathlib import Path
import base64
import json
import re


def main():
    root = Path(__file__).resolve().parent.parent
    html = (root / 'index.html').read_text(encoding='utf-8')
    css = (root / 'style.css').read_text(encoding='utf-8')
    engine = (root / 'engine.js').read_text(encoding='utf-8')
    game = (root / 'game.js').read_text(encoding='utf-8')
    filenames = sorted(set(re.findall(r"'([\w]+\.png)'", game)))
    assets = {
        name: 'data:image/png;base64,' + base64.b64encode(
            (root / 'assets' / name).read_bytes()
        ).decode('ascii')
        for name in filenames
    }
    html = html.replace(
        '<link rel="stylesheet" href="style.css">', '<style>' + css + '</style>'
    )
    html = html.replace(
        '<script src="engine.js"></script>',
        '<script>window.EMBEDDED_ASSETS=' + json.dumps(assets) + ';</script>'
        '<script>' + engine + '</script>'
    )
    html = html.replace(
        '<script src="game.js"></script>', '<script>' + game + '</script>'
    )
    out = root / 'dist' / 'Play Moonlit Hollow.html'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding='utf-8')
    print(f'Created {out} ({out.stat().st_size:,} bytes, {len(assets)} images)')


if __name__ == '__main__':
    main()
