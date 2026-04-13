import glob, re
from collections import defaultdict

counts = defaultdict(list)
files = glob.glob('src/projects/aiwar/*/sequences.tsx')

for f in files:
    section = f.split('/')[-2]
    with open(f, 'r') as file:
        lines = file.readlines()
        scene = "Unknown"
        for line in lines:
            if '* [Scene ' in line:
                scene = line.strip().replace('* ', '').replace('[', '').replace(']', '')
            if '필요한 그림' in line:
                components_str = line.split('컴포넌트:')[1].strip()
                components = [c.strip() for c in components_str.split(',')]
                for c in components:
                    counts[c].append(f"{section}/{scene}")

print("=== COMMON COMPONENTS (>1) ===")
for c, locations in sorted(counts.items(), key=lambda x: len(x[1]), reverse=True):
    if len(locations) > 1:
        print(f"[{len(locations)}x] {c}: {', '.join(locations)}")
