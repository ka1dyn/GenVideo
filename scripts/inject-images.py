import os
import sys
import re
import argparse
try:
    from PIL import Image
except ImportError:
    print("Error: PIL library is required. Please run: pip install Pillow")
    sys.exit(1)

def process_section(project_id, section):
    images_dir = f"public/{project_id}/{section}/images"
    mapping_path = os.path.join(images_dir, "image_mapping.md")
    plans_dir = f"src/projects/{project_id}/{section}/plans"

    if not os.path.exists(mapping_path):
        return 0 # Skip quietly if no mapping file exists

    with open(mapping_path, 'r', encoding='utf-8') as f:
        mapping_content = f.readlines()

    # Regex to match: - Scene 1 (...): [ image.png, other.jpg ]
    scene_pattern = re.compile(r'- Scene (\d+) \(".*?"\):\s*\[(.*?)\]')

    updates_count = 0

    for line in mapping_content:
        match = scene_pattern.search(line)
        if match:
            scene_num = match.group(1)
            images_raw = match.group(2).strip()
            
            if not images_raw:
                continue # No images specified for this scene

            # Split by comma if multiple images are provided
            image_filenames = [img.strip() for img in images_raw.split(',') if img.strip()]
            
            if not image_filenames:
                continue

            scene_plan_path = os.path.join(plans_dir, f"Scene{scene_num}.md")
            if not os.path.exists(scene_plan_path):
                print(f"Warning: {scene_plan_path} not found. Skipping.")
                continue

            metadata_lines = []
            
            for filename in image_filenames:
                img_path = os.path.join(images_dir, filename)
                public_path = f"public/{project_id}/{section}/images/{filename}"
                
                if not os.path.exists(img_path):
                    print(f"Warning: Image file not found at {img_path}")
                    metadata_lines.append(f"  - ⚠️ 이미지 파일 없음: `{public_path}`")
                    continue

                try:
                    with Image.open(img_path) as img:
                        width, height = img.size
                        ratio = width / height

                        line = f"  - `{public_path}` {width}×{height} ({ratio:.2f})"
                        metadata_lines.append(line)
                except Exception as e:
                    print(f"Error processing image {img_path}: {e}")
                    metadata_lines.append(f"  - ⚠️ 이미지 분석 실패: `{public_path}` ({e})")

            # Read the existing plan
            with open(scene_plan_path, 'r', encoding='utf-8') as f:
                plan_content = f.read()

            # Find and replace the image count line and insert metadata
            target_line_pattern = re.compile(r'- 이미지: \d+개.*?(?=\n\n)', re.DOTALL)
            
            if target_line_pattern.search(plan_content):
                img_count = len(image_filenames)
                new_image_section = f"- 이미지: {img_count}개\n" + "\n".join(metadata_lines)
                
                new_content = target_line_pattern.sub(new_image_section, plan_content)
                
                with open(scene_plan_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Injected image metadata into {section}/Scene{scene_num}.md")
                updates_count += 1
            else:
                print(f"Warning: Could not find target line '- 이미지: 0개' in {section}/Scene{scene_num}.md")

    return updates_count

def main():
    parser = argparse.ArgumentParser(description="Inject image metadata from image_mapping.md into SceneX.md plans for all sections.")
    parser.add_argument("project_id", help="The ID of the project")

    args = parser.parse_args()
    project_id = args.project_id

    project_dir = f"public/{project_id}"
    if not os.path.isdir(project_dir):
        print(f"Error: Project directory '{project_dir}' does not exist.")
        sys.exit(1)

    total_updates = 0
    
    for item in sorted(os.listdir(project_dir)):
        item_path = os.path.join(project_dir, item)
        if os.path.isdir(item_path):
            updates = process_section(project_id, item)
            total_updates += updates

    if total_updates > 0:
        print(f"\n🎉 Successfully updated {total_updates} Scene plans with image metadata across all sections.")
    else:
        print("\nℹ️ No images were specified or injected in any section.")

if __name__ == "__main__":
    main()
