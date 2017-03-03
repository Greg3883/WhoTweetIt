angular.module('whoTweetItApp')
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "app/components/home/views/home.view.html"
        })
        
        .when("/game", {
        	templateUrl : "app/components/home/views/home.game.html"
        })
        
        .when("/difficulty", {
        	templateUrl : "app/components/home/views/difficulty.html"
        })
        
        $locationProvider.hashPrefix('');
});