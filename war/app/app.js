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
		var arrayRespName = [];
		var arrayRespScreen = [];
		var arrayRespImg = [];
		var arrayVerif = [];
		function getValue(){
			   var value= $.ajax({ 
			      url: 'https://1-dot-whotweetit-158715.appspot.com/_ah/api/tweetentityendpoint/v1/tweetentity/', 
			      async: false
			   }).responseText;
			   return value;
		}

		var resp = getValue();
	
	  	var count_tweet = 0;
	  	var questions = {};
	  	questions.category = $routeParams.category;
	  	questions.items = [];
	  	var obj = JSON.parse(resp);
		$scope.currentPosition = 0;
		var categorie;
		var position = 0;
		var trouve = false;
		
		if($routeParams.category == 'cinema'){
			  $scope.category = 'Cinema';
			  categorie ="Cinema";
			  console.log(resp)		  	
		  } else if ($routeParams.category == 'media'){
			  $scope.category = 'Media';
			  categorie ="Media";
		  } else if ($routeParams.category == 'music'){
			  $scope.category = 'Music';
			  categorie ="Music";
		  } else if ($routeParams.category == 'sport'){
			  $scope.category = 'Sport';
			  categorie ="Sport";
		  } else if ($routeParams.category == 'all'){
			  $scope.category = 'All';
			  categorie ="All";
		  }
		
		
		
		
		var shuffledQuestionArray = shuffle(obj.items);
		

		

		function shuffle(sourceArray) {
		    for (var i = 0; i < sourceArray.length - 1; i++) {
		        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

		        var temp = sourceArray[j];
		        sourceArray[j] = sourceArray[i];
		        sourceArray[i] = temp;
		    }
		    return sourceArray;
		}
		
		
		
		
		if(categorie == "All")
			{
				 
				while(obj.items[count_tweet] != null){
					
				  		arrayRespName.push(obj.items[count_tweet].authorName);
				  		arrayRespScreen.push(obj.items[count_tweet].authorScreen);
				  		arrayRespImg.push(obj.items[count_tweet].urlImgAuthor);
						count_tweet++;
			  	}
			}
		else 
			{
				while(obj.items[count_tweet] != null){
					if(obj.items[count_tweet].category == categorie)
					{
				  		arrayRespName.push(obj.items[count_tweet].authorName);
				  		arrayRespScreen.push(obj.items[count_tweet].authorScreen);
				  		arrayRespImg.push(obj.items[count_tweet].urlImgAuthor);
					}
			  		count_tweet++;
			  	}
			}
				
		
		if($scope.difficulty == "medium" || $scope.difficulty == "hard")
		{
			count_tweet = 0;
		
		  	while(obj.items[count_tweet] != null){
		  		var author = obj.items[count_tweet].authorName;
		  		var stop = false;
		  		console.log(obj.items[count_tweet].category);
		  		
				  		while(stop == false){
				  			var answr = Math.floor(Math.random() * 4);
				  			if(answr == 1)
				  				{
				  				var r1 = obj.items[count_tweet].authorName;
				  				var r2 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
						  		var r3 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
						  		var r4 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
				  				}
				  			else if(answr == 2){
				  				var r1 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
				  				var r2 = obj.items[count_tweet].authorName;
						  		var r3 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
						  		var r4 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
				  			}
				  			else if(answr == 3){
				  				var r1 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
				  				var r2 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
						  		var r3 = obj.items[count_tweet].authorName;
						  		var r4 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
				  			}
				  			else
				  				{
				  				var r1 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
				  				var r2 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
						  		var r3 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
						  		var r4 = obj.items[count_tweet].authorName;
				  				}
				  			if(r2 != r1 && r3 != r1 && r4 != r1 && r2 != r3 && r3 != r4 && r2 != r4){
							  			stop = true;
							  		}else{
							  			stop = false;
							  		}
				  				}
		  			
		  		
		  		questions.items.push({"tweet":obj.items[count_tweet].content,"r1":r1,"r2":r2,"r3":r3,"r4":r4,"answer":obj.items[count_tweet].authorName,"category":obj.items[count_tweet].category, "image":obj.items[count_tweet].urlImgAuthor});
		  		count_tweet++;
		  	}
	  	
		}
		else if($scope.difficulty == "easy")
			{
			count_tweet = 0;
			
		  	while(obj.items[count_tweet] != null){
		  		var author = obj.items[count_tweet].authorName;
		  		var stop = false;
		  		
				  		while(stop == false){			  			
				  			var answr = Math.floor(Math.random() * 4);
				  			if(answr == 1)
				  				{
				  				var r1 = obj.items[count_tweet].authorName;
				  				var r2 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
				  				}
				  			else
				  				{
				  				var r1 = arrayRespName[Math.floor(Math.random() * arrayRespName.length)];
				  				var r2 = obj.items[count_tweet].authorName;
				  				}							  		
							  	if(r2 != r1 ){
							  			stop = true;
							  		}else{
							  			stop = false;
							  		}
				  				}
		  			
		  		
		  		questions.items.push({"tweet":obj.items[count_tweet].content,"r1":r1,"r2":r2,"answer":obj.items[count_tweet].authorName,"category":obj.items[count_tweet].category, "image":obj.items[count_tweet].urlImgAuthor});
		  		count_tweet++;
		  	}
			}
		
	  	
	
	
		
	    refreshQuestions(categorie);
		  
		function refreshQuestions(categorie) {
			while($scope.currentPosition <= questions.items.length && trouve == false )
				{
						if(questions.items[$scope.currentPosition].category == categorie)
						{
							$scope.question = questions.items[$scope.currentPosition].tweet;
							$scope.r1 = questions.items[$scope.currentPosition].r1;
							$scope.r2 = questions.items[$scope.currentPosition].r2;
							$scope.r3 = questions.items[$scope.currentPosition].r3;
							$scope.r4 = questions.items[$scope.currentPosition].r4;
							trouve = true;
							document.getElementById('r1').checked = false;
							document.getElementById('r2').checked = false;
							document.getElementById('r3').checked = false;
							document.getElementById('r4').checked = false;
						
						}
						else if(categorie == "All")
						{
							$scope.question = questions.items[$scope.currentPosition].tweet;
							$scope.r1 = questions.items[$scope.currentPosition].r1;
							$scope.r2 = questions.items[$scope.currentPosition].r2;
							$scope.r3 = questions.items[$scope.currentPosition].r3;
							$scope.r4 = questions.items[$scope.currentPosition].r4;
							trouve = true;
							document.getElementById('r1').checked = false;
							document.getElementById('r2').checked = false;
							document.getElementById('r3').checked = false;
							document.getElementById('r4').checked = false;
							
						}	
						else
						{
							$scope.currentPosition = $scope.currentPosition +1;
						}
				}
		
		}
		
		
		
		 $scope.name = "John Doe";
		
		 $scope.valider = function(reponse) {
			   
				var rep1 = document.getElementById('r1').checked;
				var rep2 = document.getElementById('r2').checked;
				var rep3 = document.getElementById('r3').checked;
				var rep4 = document.getElementById('r4').checked;
				
				if  (rep1 == false  && rep2 == false && rep3 == false && rep4 == false) 
				{
					alert("Please select a response");
				}
				else
				{
						document.getElementById('r1').checked = false;
						document.getElementById('r2').checked = false;
						document.getElementById('r3').checked = false;
						document.getElementById('r4').checked = false;
					trouve = false;
					 if($scope.currentPosition < questions.items.length)
						 {
							 if(reponse == questions.items[$scope.currentPosition].answer)
								 {
								 	$scope.test = "yes";
								 	score = score +1;
								 }
							 else
								 {
									$scope.test = "no";
								 }
							 $scope.currentPosition = $scope.currentPosition +1;
							 
							 refreshQuestions(categorie);
						 }
					 else
						{
						 $scope.test = "Fin du jeu. Score:" + score;
						}
				}
			};
			
			
			
			
			$scope.validerH = function(reponse) {
				var rep = document.getElementById('rep').value;				
				if  (rep == "") 
				{
					alert("Please enter a response");
				}
				else
				{
					trouve = false;
					 if($scope.currentPosition < questions.items.length)
						 {
							 if(reponse == questions.items[$scope.currentPosition].answer)
								 {
								 	$scope.test = "yes";
								 	score = score +1;
								 }
							 else
								 {
									$scope.test = "no";
								 }
							 $scope.currentPosition = $scope.currentPosition +1;
							 refreshQuestions(categorie);
						 }
					 else
						{
						 $scope.test = "Fin du jeu. Score:" + score;
						}
				}
			};
			
			
		/*
		 $scope.valider = function(reponse) {
			
			 trouve = false;
			 if($scope.currentPosition < questions.items.length)
				 {
					 if(reponse == questions.items[$scope.currentPosition].answer)
						 {
						 	$scope.test = "yes";
						 	score = score +1;
						 }
					 else
						 {
							$scope.test = "no";
						 }
					 $scope.currentPosition = $scope.currentPosition +1;
					 refreshQuestions(categorie);
				 }
			 else
				{
				 $scope.test = "Fin du jeu. Score:" + score;
				}
			 
			  };*/
		
}]);