from PIL import Image
import os
import sys

SUPPORTED_EXTENSIONS = (".webp", ".webp", ".jpeg", ".bmp", ".tiff", ".gif", ".jpg", ".png")

def convert_to_webp(input_path, output_path=None):
    try:
        img = Image.open(input_path).convert("RGBA")  # preserve alpha if exists

        if not output_path:
            base, _ = os.path.splitext(input_path)
            output_path = base + ".webp"


        img.save(output_path, "WEBP", quality=60)
        print(f"✅ Converted: {input_path} → {output_path}")

    except Exception as e:
        print(f"❌ Failed: {input_path} ({e})")


def process_folder(folder_path):
    for root, _, files in os.walk(folder_path):  
        for file in files:
            if file.lower().endswith(SUPPORTED_EXTENSIONS):
                input_file = os.path.join(root, file)
                convert_to_webp(input_file)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_to_webp.py <image_or_folder_path>")
    else:
        path = sys.argv[1]
        if os.path.isfile(path):
            convert_to_webp(path)
        elif os.path.isdir(path):
            process_folder(path)
        else:
            print("Invalid path provided.")
