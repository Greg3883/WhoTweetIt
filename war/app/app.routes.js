angular.module('whoTweetItApp')
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "app/components/home/views/home.view.html"
        })
        
        .when("/category", {
        	templateUrl : "app/components/home/views/home.category.html"
        })
        
        .when("/difficulty/:category", {
        	templateUrl : "app/components/home/views/difficulty.html",
        	controller: "DifficultyController"
        })
        
        .when("/game/:category/:difficulty", {
        	templateUrl : "app/components/home/views/game.html",
        	controller: "GameController"
        })
        
        $locationProvider.hashPrefix('');
});