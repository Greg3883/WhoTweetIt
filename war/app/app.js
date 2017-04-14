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
		$scope.difficulty = $routeParams.difficulty;
		$scope.category = $routeParams.category;
		var score = 0;
		var resp = '{' +
        '"category" : "music",'+
        '"tweets" : ['+ 
           '{'+
             '"tweet" : "Hi it\'s Rihanna !",'+
             '"r1" : "Justin Bieber",'+
             '"r2" : "Miley Cyrus",'+
             '"r3" : "Rihanna",'+
             '"answer" : "Rihanna",' +
             '"image" : "https://pbs.twimg.com/profile_images/825885653598666753/bZhYbrfX.jpg"' +
           '},'+
           '{'+
             '"tweet" : "Hi it\'s Simon !",'+
             '"r1" : "Justin Bieber",'+
             '"r2" : "Simon",'+
             '"r3" : "Rihanna",'+
             '"answer" : "Simon",' +
             '"image" : "https://pbs.twimg.com/profile_images/776540585314422784/F68Qj8x9_400x400.jpg"' +
           '},'+
           '{'+
             '"tweet" : "Hi it\'s Thomas !",'+
             '"r1" : "Justin Bieber",'+
             '"r2" : "Thomas",'+
             '"r3" : "Rihanna",'+
             '"answer" : "Thomas",' +
             '"image" : "https://pbs.twimg.com/profile_images/809433573652451328/MVmI_MXe_400x400.jpg"' +
           '},'+
           '{'+
             '"tweet" : "Hi it\'s la mère de Sylvain !",'+
             '"r1" : "La mère de Sylvain",'+
             '"r2" : "Miley Cyrus",'+
             '"r3" : "Rihanna",'+
             '"answer" : "La mère de Sylvain",' +
             '"image" : "https://pbs.twimg.com/profile_images/607595584418136064/TigSM93l_400x400.jpg"' +
           '}'+
        ']}';
		var obj = JSON.parse(resp);
		//$scope.game = obj['category'];
		$scope.question = obj.tweets[1].tweet;
		
		$scope.currentPosition = 0;
		
		
		
		
		
		/*for(i = 1; i<= obj.tweets.length; i++)
			{
				$scope.question = obj.tweets[i].tweet;
				$scope.r1 = obj.tweets[i].r1;
				$scope.r2 = obj.tweets[i].r2;
				$scope.r3 = obj.tweets[i].r3;
			
			}*/
		
		
		function refreshQuestions() {
			$scope.question = obj.tweets[$scope.currentPosition].tweet;
			$scope.r1 = obj.tweets[$scope.currentPosition].r1;
			$scope.r2 = obj.tweets[$scope.currentPosition].r2;
			$scope.r3 = obj.tweets[$scope.currentPosition].r3;
			/*$scope.image = obj.tweets[$scope.currentPosition].image;
			$scope.hint1Shown = false;
			$scope.hint2Shown = false;
			$timeout(resetShake, 0);*/
		}
		
		refreshQuestions();
		
		 $scope.valider = function(reponse) {
			 if($scope.currentPosition < obj.tweets.length)
				 {
					 if(reponse == obj.tweets[$scope.currentPosition].answer)
						 {
						 	$scope.test = "yes";
						 	score = score +1;
						 }
					 else
						 {
							$scope.test = "no";
						 }
					 $scope.currentPosition = $scope.currentPosition +1;
					 refreshQuestions();
				 }
			 else
				{
				 $scope.test = "Fin du jeu. Score:" + score;
				}
			 
			  };
			  
			  
			  
			   /*function load() {
					var rootApi = 'https://1-dot-whotweetit-158715.appspot.com/_ah/api';
					gapi.client.load('scoreentityendpoint', 'v1', function() {
						//console.log("todos api loaded");

					/*	gapi.client.scoreentityendpoint.insertScore({id:123456789,score:100,name:"miam"}).execute(
								function(resp) {
									console.log(resp);
								});

						
						gapi.client.scoreentityendpoint.listScore().execute(
								function(resp) {
									console.log(resp);
								});*/
					/*}, rootApi);
				}
			   
			   load();*/
			  
			  
		
		
			
}]);