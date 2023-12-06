from setuptools import setup, find_packages

setup(
    name='tk',  # Your package name
    version='1.0.0',  # Your package version
    packages=find_packages(exclude=['tests*']),
    license='MIT',
    description='A Python backend for the tk React project',
    long_description=open('README.md').read(),
    install_requires=[],  # Add the packages that your Python project depends on
    url='https://github.com/yourusername/tk',  # The URL of your project
    author='David Weatherspoon',  # Add your name
    author_email='reconsumeralization@gmail.com'  # Add your email
)
