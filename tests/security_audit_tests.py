import json
import os

from w3af.core.controllers.w3afCore import w3afCore
from w3af.core.data.kb.knowledge_base import kb
from zapv2 import ZAPv2


class SecurityAuditTests:
    def __init__(self, backend_endpoints):
        self.backend_endpoints = backend_endpoints
        self.zap_api_key = 'your-zap-api-key'
        self.zap = ZAPv2(apikey=self.zap_api_key)
        self.w3af = w3afCore()

    def scan_with_owasp_zap(self):
        self.zap.urlopen(self.backend_endpoints[0])
        scan_id = self.zap.ascan.scan(url=self.backend_endpoints[0])
        while int(self.zap.ascan.status(scan_id)) < 100:
            pass
        return json.loads(self.zap.core.alerts())

    def scan_with_w3af(self):
        self.w3af.plugins.plugins['audit'].set_plugins(['all'])
        self.w3af.plugins.plugins['crawl'].set_plugins(['web_spider'])
        self.w3af.target.set_options([('target', self.backend_endpoints)])
        self.w3af.start()
        while not self.w3af.status.is_running():
            pass
        vulnerabilities = []
        for info in kb.get_all_infos():
            vulnerabilities.append(info.to_json())
        return vulnerabilities

    def generate_vulnerability_report(self, vulnerabilities):
        report_path = 'vulnerability_report.json'
        with open(report_path, 'w') as report_file:
            json.dump(vulnerabilities, report_file, indent=4)
        return report_path

if __name__ == "__main__":
    backend_endpoints = ['http://example-backend.com']
    security_tests = SecurityAuditTests(backend_endpoints)
    zap_results = security_tests.scan_with_owasp_zap()
    w3af_results = security_tests.scan_with_w3af()
    combined_results = {'owasp_zap': zap_results, 'w3af': w3af_results}
    report_file_path = security_tests.generate_vulnerability_report(combined_results)
    print(f"Vulnerability report generated at: {report_file_path}")
