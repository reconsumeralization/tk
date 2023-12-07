import importlib
import os
import re
import subprocess
import sys


def check_imports(directory_path):
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.py'):
                with open(os.path.join(root, file), 'r') as f:
                    content = f.read()
                    imports = re.findall(r'^import [\w.]+|^from [\w.]+ import [\w.]+', content, re.MULTILINE)
                    for import_line in imports:
                        module_name = import_line.split()[1].split('.')[0]
                        try:
                            if importlib.util.find_spec(module_name) is None:
                                subprocess.run([sys.executable, '-m', 'pip', 'install', module_name])
                        except ImportError:
                            print(f'Incorrect import statement in {file}: {import_line}')

check_imports('.')
