module.exports = {
  default: {
    require: [
      'steps/**/*.js'        
    ],
    format: [
      'progress',            
      'html:reports/cucumber-report.html'
    ],
    publishQuiet: true,
    timeout: 120000          
  }
};
