def smooth(points):
    # quadratic smoothing
    if len(points) < 3: return ""
    path = f"M {points[0][0]} {points[0][1]}"
    for i in range(1, len(points)):
        path += f" L {points[i][0]} {points[i][1]}"
    return path

# Side profile brain
# Front is left, back is right
outline_points = [
    (80, 120), # Stem bottom
    (80, 105), # Stem top
    # Cerebellum
    (95, 110),
    (110, 105),
    (120, 95),
    # Occipital lobe (Back)
    (125, 80),
    (120, 60),
    # Parietal (Top)
    (110, 40),
    (90, 25),
    (70, 25),
    # Frontal (Front)
    (45, 30),
    (30, 45),
    (25, 60),
    (30, 80),
    # Temporal (Bottom front)
    (45, 95),
    (65, 90),
    (75, 100),
    (80, 105) # Connect back to stem top
]

# Inner grooves (sulci/gyri) to make it look like a brain
groove1 = [(30, 60), (50, 55), (65, 65), (75, 40)]
groove2 = [(115, 80), (100, 75), (90, 50), (100, 30)]
groove3 = [(45, 95), (60, 80), (80, 85), (90, 75)]
groove4 = [(70, 25), (75, 45), (65, 65)]

# Circuitry/Nodes
# Let's add dots and straight lines inside to make it an "AI" brain
circ_line1 = [(40, 70), (55, 70), (70, 85)]
circ_line2 = [(105, 60), (95, 60), (85, 75)]

print('const brainOutline = "%s";' % smooth(outline_points))
print('const grooves = [')
for g in [groove1, groove2, groove3, groove4]:
    print('  "%s",' % smooth(g))
print('];')
print('const circuits = [')
for c in [circ_line1, circ_line2]:
    print('  "%s",' % smooth(c))
print('];')
