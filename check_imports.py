import importlib.util
import os
import re
import subprocess
import sys


def check_imports(directory_path):
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith(".py"):
                with open(os.path.join(root, file), 'r') as f:
                    file_contents = f.read()
                    imports = re.findall(r'^(import|from) [\w.]+$', file_contents, re.MULTILINE)
                    for import_line in imports:
                        module_name = import_line.split()[1].split('.')[0]
                        try:
                            spec = importlib.util.find_spec(module_name)
                            if spec is None:
                                subprocess.run([sys.executable, '-m', 'pip', 'install', module_name])
                        except ImportError:
                            print(f"Incorrect import in file {file}: {import_line}")

check_imports('.')
