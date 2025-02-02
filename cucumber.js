module.exports = {
  default: [
    `--format html:reports/cucumber_report.html`,
    '--require cucumber.setup.js',
    '--require test/steps/*.steps.ts test/feature/*.feature',
  ].join(' '),
}
