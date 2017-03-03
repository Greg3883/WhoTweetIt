var app = angular.module('whoTweetItApp');
var refreshTime = 20;


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
	  var category = $routeParams.category;
	  //passCat.set(category);
	  console.log('Cat: ' + category);
}]);



//Permet de passer des variable entre 2 controlleurs
app.factory('passCat', function() {
 var catSaved = {}
 function set(data) {
   catSaved = data;
 }
 function get() {
  return catSaved;
 }

 return {
  set: set,
  get: get
 }

});

