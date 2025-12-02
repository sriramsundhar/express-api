module.exports = {
  default: [
    `--format html:reports/cucumber_report.html`,
    '--require test/cucumber.setup.js',
    '--require test/steps/*.steps.ts test/feature/*.feature',
  ].join(' '),
}
