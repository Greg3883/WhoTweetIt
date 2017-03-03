var app = angular.module('whoTweetItApp');
var refreshTime = 20;


// Game controller to set the timer and all actions
app.controller('GameController', function($scope, $timeout){
	
	$scope.timerStarted = false;
	$scope.timerGoingOn = false;
	
	$scope.startTimer = function() {
		$scope.timerStarted = true;
		$scope.timerGoingOn = true;
		$timeout(timer, refreshTime); 
	};
	
	$scope.stopTimer = function() {
		$scope.timerGoingOn = false;
	};
	
	$scope.resumeTimer = function() {
		$scope.timerGoingOn = true;
	};

    //time
    $scope.time = 0;
    
    //timer callback
    var timer = function() {
    	if ($scope.timerGoingOn) {
    		$scope.time += refreshTime;
    	}
        $timeout(timer, refreshTime);
    }        
    
});

// App run for all Google authentification
app.run(['GAuth', 'GApi', 'GData', '$rootScope',
    function(GAuth, GApi, GData, $rootScope) { 

        $rootScope.gdata = GData;

        var CLIENT = '1089531170408-a34nij0c1mtg9ge30lc9vkkqtssrclk1.apps.googleusercontent.com';
        var BASE = 'http://1-dot-tweetstorming-159213.appspot.com/_ah/api'; // TO MODIFY WITH YOUR OWN APP ENGINE HOST

        GApi.load('endpoint','v1',BASE).then(
				function(resp) {
					if (resp)
					console.log('API: ' + resp.api + ', version: '
							+ resp.version + ' loaded');
				},
				function(resp) {
					console.log('An error occurred while loading API: '
							+ resp.api + ', resp.version: ' + version);
				}
		);
        GAuth.setClient(CLIENT)
        GAuth.setScope('https://www.googleapis.com/auth/userinfo.email');

        // load the auth api so that it doesn't have to be loaded asynchronously
        // when the user clicks the 'login' button.
        // That would lead to popup blockers blocking the auth window
        GAuth.load();

        // or just call checkAuth, which in turn does load the oauth api.
        // if you do that, GAuth.load(); is unnecessary
        GAuth.checkAuth().then(
            function (user) {
                console.log(user.name + ' is logged in');
            },
            function() {
            	console.log('not logged in');
            }
        );
        
        $rootScope.login = function() {
			GAuth.login().then(function(user) {
				console.log(user);
				$rootScope.user = user;
			}, function() {
				console.log("Failure to connect");
			});
		};

		$rootScope.logout = function() {
			GAuth.logout();
			$rootScope.user = null;
		};
    }
]);
