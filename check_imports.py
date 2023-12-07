import importlib
import ast
import pathlib
import logging
import argparse
import os

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

# Parse command-line arguments
parser = argparse.ArgumentParser(description="Check imports in .py files")
parser.add_argument("directory", help="directory to check")
args = parser.parse_args()

def check_imports(directory_path):
    # Use pathlib to get a Path object for the directory
    directory = pathlib.Path(directory_path)
    # Use glob to find all the .py files in the directory
    for file in directory.glob("*.py"):
        # Use os.path.splitext to get the file extension
        _, ext = os.path.splitext(file)
        if ext == ".py":
            # Use try-except-else-finally to handle exceptions and close the file
            try:
                # Use read_text to get the file contents as a string
                file_contents = file.read_text()
            except IOError as e:
                # Log the error
                logging.error(f"Could not read file {file}: {e}")
            else:
                # Use ast to parse the file contents and get the import nodes
                import_nodes = [node for node in ast.walk(file_contents) if isinstance(node, (ast.Import, ast.ImportFrom))]
                # Loop through the import nodes
                for node in import_nodes:
                    # Get the module name from the node
                    module_name = node.module.split(".")[0]
                    # Try to import the module using importlib
                    try:
                        importlib.import_module(module_name)
                    # If the module is not found, log the error
                    except ImportError:
                        logging.error(f"Incorrect import in file {file}: {node}")
            finally:
                # Close the file
                file.close()

check_imports(args.directory)
