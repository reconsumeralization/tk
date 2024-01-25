import json

from bandit.cli.main import bandit


class CodeQualityTests:
    def __init__(self):
        self.bandit_results = None

    def run_bandit_analysis(self, target_directory='.', output_format='json'):
        args = [
            '--format', output_format,
            '--output', 'bandit_output.json',
            '--recursive',
            target_directory
        ]
        self.bandit_results = bandit(args=args)

    def generate_bandit_report(self):
        if self.bandit_results is not None:
            with open('bandit_output.json', 'r') as bandit_output_file:
                results = json.load(bandit_output_file)
            report_path = 'bandit_report.txt'
            with open(report_path, 'w') as report_file:
                for result in results['results']:
                    issue = f"Issue: {result['issue_text']}\n"
                    severity = f"Severity: {result['issue_severity']}\n"
                    confidence = f"Confidence: {result['issue_confidence']}\n"
                    code = f"Code: {result['code']}\n"
                    report_file.write(issue + severity + confidence + code + '\n')
            return report_path
        else:
            raise ValueError("Bandit results not available. Please run the analysis first.")

if __name__ == "__main__":
    code_quality_tests = CodeQualityTests()
    code_quality_tests.run_bandit_analysis()
    report_file_path = code_quality_tests.generate_bandit_report()
    print(f"Bandit report generated at: {report_file_path}")
