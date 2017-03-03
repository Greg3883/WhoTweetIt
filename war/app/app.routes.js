angular.module('whoTweetItApp')
    .config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "app/components/home/views/home.view.html"
        })
        .when("/game", {
        	templateUrl : "app/components/home/views/home.game.html"
        })
});