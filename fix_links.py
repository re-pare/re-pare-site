from pathlib import Path
root = Path('.')
count = 0
for path in root.glob('*.html'):
    text = path.read_text(encoding='utf-8')
    if 'repare-landing.html' in text:
        path.write_text(text.replace('repare-landing.html', 'index.html'), encoding='utf-8')
        print(f'Updated {path}')
        count += 1
print(f'Done: {count} files updated')
