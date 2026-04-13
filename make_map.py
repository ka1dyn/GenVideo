import json

def smooth(points):
    if len(points) < 3:
        return ""
    # points = [(x,y)]
    # Use simple quadratic interpolations
    path = f"M {points[0][0]} {points[0][1]}"
    for i in range(1, len(points)):
        p0 = points[i-1]
        p1 = points[i]
        path += f" L {p1[0]} {p1[1]}"
    path += " Z"
    return path

na = [(15, 25), (30, 15), (55, 12), (75, 10), (85, 15), (75, 25), (65, 25), (60, 35), (55, 45), (40, 50), (35, 48), (30, 40), (25, 35), (15, 25)]
greenland = [(85, 8), (105, 5), (100, 15), (85, 15)]
sa = [(45, 55), (60, 55), (75, 75), (60, 115), (50, 120), (45, 80), (40, 60)]
eu_asia_af = [(125, 45), (120, 35), (135, 25), (145, 15), (180, 12), (250, 15), (265, 20), (250, 30), (240, 45), (235, 60), (220, 65), (205, 60), (195, 55), (175, 50), (180, 70), (165, 95), (155, 115), (140, 105), (125, 75), (140, 55), (145, 45), (135, 40)]
uk = [(118, 28), (125, 22), (130, 26), (122, 32)]
japan = [(260, 35), (265, 45), (255, 50)]
madagascar = [(175, 85), (180, 95), (170, 100)]
australia = [(235, 95), (265, 90), (270, 110), (245, 115), (230, 105)]
nz = [(280, 120), (285, 130), (280, 135)]

paths = [smooth(x) for x in [na, greenland, sa, eu_asia_af, uk, japan, madagascar, australia, nz]]

print("const paths = [")
for p in paths:
    print(f'  "{p}",')
print("];")
