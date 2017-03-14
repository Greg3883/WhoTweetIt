var app = angular.module('whoTweetItApp');
var refreshTime = 20;

//Permet de passer des variable entre 2 controlleurs
app.factory('Data', function () {

    var data = {
        FirstName: ''
    };

    return {
        getFirstName: function () {
            return data.FirstName;
        },
        setFirstName: function (firstName) {
            data.FirstName = firstName;
        }
    };
});


//Controler du header
app.controller('HeaderController', ['$scope', function($scope) {
	 $scope.greeting = 'Hola!';
	 function onSignIn(googleUser) {
		    var profile = googleUser.getBasicProfile();
		    $scope.userId = profile.getId();
		    $scope.userName = profile.getName();
		    $scope.userImg = profile.getImageUrl();
		    $scope.userEmail = profile.getEmail();
	  }
	 window.onSignIn = onSignIn;
}]);

//Controller du choix de la diffuclté
app.controller('DifficultyController', ['$scope','$routeParams', function($scope, $routeParams) {
	  $scope.category = $routeParams.category;
	 
}]);

//Controller du jeu
app.controller('GameController', ['$scope','$routeParams', function($scope, $routeParams) {
	var init = function() {
		var rootApi = '1-dot-whotweetit-158715.appspot.com/_ah/api/';
		gapi.client.load('tweetentityendpoint', 'v1', function() {
			console.log("todos api loaded");

			
			gapi.client.tweetenityendpoint.listTweet().execute(
				      function(resp) {
				        if (!resp.code) {
				          resp.items = resp.items || [];
				          for (var i = 0; i < resp.items.length; i++) {
				        	  console.log(resp.items[i]);
				          }
				        }
				      });
		}, rootApi);
	}
	
	
	  $scope.difficulty = $routeParams.difficulty;
	  $scope.category = $routeParams.category;
}]);




