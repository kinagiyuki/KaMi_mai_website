//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',
	frameworks: ['jasmine'],
    files: [
	  'lib/jquery.min.js',
      'lib/angular.min.js',
      'lib/angular-route.min.js',
      'lib/angular-mocks.js',
	  'lib/firebase.js',
	  'lib/angularfire.min.js',	  
	  'js/*.js',
      'unit_tests/*.js',
	  'https://www.gstatic.com/firebasejs/ui/live/0.5/firebase-ui-auth.js'
    ],
	exclude: [
	],
	preprocessors: {	 	
		 'js/site.js' : ['coverage'],		
		 'js/index.js' : ['coverage'],
		 'js/admin.js' : ['coverage'],
		 'js/team.js' : ['coverage'],
		 'js/member.js' : ['coverage'],
		 'js/check_login.js' :['coverage'],
		 'js/profile.js' :['coverage'],
		 'js/verify.js' :['coverage']
	},
	reporters: ['progress', 'coverage'],
	coverageReporter: {
			type: 'html',
			dir: 'coverage/',
			subdir: '.'
	},
	port: 8080,
	colors: true,
    browsers: ['Chrome'],
	singleRun: false,
    plugins: [
      'karma-chrome-launcher',      
      'karma-jasmine',
	  'karma-coverage'
    ]    

  });
};
