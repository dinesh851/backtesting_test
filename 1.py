import os
import json

def get_filenames_in_folder(folder_path):
    file_names = []
    for filename in os.listdir(folder_path):
        if os.path.isfile(os.path.join(folder_path, filename)):
            file_names.append(filename)
    return file_names

def process_folders(parent_folder_path):
    for folder in os.listdir(parent_folder_path):
        folder_path = os.path.join(parent_folder_path, folder)
        if os.path.isdir(folder_path):
            folder_name = os.path.basename(folder_path)
            file_names = get_filenames_in_folder(folder_path)

            with open(f'{folder_name}.json', 'w') as f:
                json.dump(file_names, f)

            print(f"File names successfully written to {folder_name}.json.")

if __name__ == "__main__":
    parent_folder_path = "test_sort/market_data_2018"  # Replace this with the path to your parent folder
    process_folders(parent_folder_path)
