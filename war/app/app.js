var app = angular.module('whoTweetItApp');
var refreshTime = 20;
console.log("first load");
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
	  
	  if($routeParams.category == 'cinema'){
		  $scope.category = 'Cinema';
		  var resp = '{' +
          '"category" : "media",'+
          '"tweets" : ['+ 
             '{'+
               '"content" : "Je vous donne rendez-vous demain matin sur @RFOfr à 8h https://t.co/JjRdEudITq",'+
               '"authorScreen" : "benoithamon",'+
               '"authorName" : "Benoît Hamon",'+
               '"date" : "2017-04-13T21:13:30.000Z",'+
               '"category" : "media",' +
               '"urlImgAuhtor" : "http://pbs.twimg.com/profile_images/846787408712646657/cxRnGUlS_normal.jpg"' +
             '},'+
             '{'+
             '"content" : "A la veille du grand rassemblement annuel d\'islamistes radicaux organisé par l’#UOIF, je réclame son interdiction ! https://t.co/k6LASfby4C",'+
             '"authorScreen" : "MLP_officiel",'+
             '"authorName" : "Marine Le Pen",'+
             '"date" : "2017-04-13T17:55:02.000Z",'+
             '"category" : "media",' +
             '"urlImgAuhtor" : "http://pbs.twimg.com/profile_images/806157043677724672/0Pe1Xh_U_normal.jpg"' +
             '},'+
             '{'+
             '"content" : "Des associations, ONG et spécialistes ont évalué notre programme. De tous côtés, nous recevons d\'excellentes notes… https://t.co/xaYG0urqGY",'+
             '"authorScreen" : "JLMelenchon",'+
             '"authorName" : "Jean-Luc Mélenchon",'+
             '"date" : "2017-04-13T18:33:56.000Z",'+
             '"category" : "media",' +
             '"urlImgAuhtor" : "http://pbs.twimg.com/profile_images/846345918710460416/6_IxAsw9_normal.jpg"' +
             '},'+
             '{'+
             '"content" : "Merci Toulouse pour votre accueil ! Maintenant, tous à l\'action, car c\'est ensemble que nous gagnerons.… https://t.co/Jn2gEq6p6X",'+
             '"authorScreen" : "FrancoisFillon",'+
             '"authorName" : "François Fillon",'+
             '"date" : "2017-04-13T19:23:16.000Z",'+
             '"category" : "media",' +
             '"urlImgAuhtor" : "http://pbs.twimg.com/profile_images/845229246280863745/U3jdwWGz_normal.jpg"' +
             '}'+

             ']}';
	  } else if ($routeParams.category == 'media'){
		  $scope.category = 'Media';
	  } else if ($routeParams.category == 'music'){
		  $scope.category = 'Music';
	  } else if ($routeParams.category == 'sport'){
		  $scope.category = 'Sport';
	  } else if ($routeParams.category == 'all'){
		  $scope.category = 'All';
	  }
	  
	  obj_resp = JSON.parse(resp);
	  $scope.content = obj_resp.tweets[1].content;
	  $scope.authorScreen = obj_resp.tweets[1].authorScreen;
	  $scope.authorName = obj_resp.tweets[1].authorName;
	  $scope.date = obj_resp.tweets[1].date;
	  $scope.category = obj_resp.tweets[1].category;
	  $scope.urlImgAuthor = obj_resp.tweets[1].urlImgAuthor;
}]);




