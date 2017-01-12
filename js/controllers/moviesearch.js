myApp.controller('MovieController', ['$rootScope','$scope', '$http', '$firebaseAuth', '$firebaseArray', '$location', function($rootScope, $scope, $http, $firebaseAuth, $firebaseArray, $location){
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    
    $scope.load = function(){
        {
        $http.get("https://api.themoviedb.org/3/movie/popular?api_key=a0ec166fd47282024cdb32ae4d1326e8&language=en-US&page=1")
        .then(function(response){
            $scope.movies = response.data.results;
            console.log($scope.movies);
        }); 
        }
    }
    $scope.searchload = function(){
           var title = $scope.search;
           $http.get("https://api.themoviedb.org/3/search/movie?api_key=a0ec166fd47282024cdb32ae4d1326e8&language=en-US&query="+title+"&page=1&include_adult=false}")
           .then(function(response){
                $scope.movies = response.data.results;
            });
    }
    
    $scope.$watch('search', function(){
       if($scope.search === ''){
           $scope.load();
       }
    });
    
    
    /*function searchMovies(){
        var title = $scope.search;
        $http.get("https://api.themoviedb.org/3/search/movie?api_key=a0ec166fd47282024cdb32ae4d1326e8&language=en-US&query="+title+"&page=1&include_adult=false}")
        .then(function(response){
            $scope.movies = response.data.results;
        });
    }*/
    
    
    
  auth.$onAuthStateChanged(function(authUser){
      if(authUser){
          $scope.addToFav = function(movie){
              var favRef = firebase.database().ref('users/' + $rootScope.currentUser.$id + '/favorites');
              var favInfo = $firebaseArray(favRef);
              $scope.favorites = favInfo;   
              $scope.favoriteMovies = [];
              $scope.favoriteMovies.push(movie);
              favInfo.$add({
                title: $scope.favoriteMovies[0].title,
                year: $scope.favoriteMovies[0].release_date,
                dateAdded: firebase.database.ServerValue.TIMESTAMP,
                overview: $scope.favoriteMovies[0].overview,
                rating: $scope.favoriteMovies[0].vote_average,
                id: $scope.favoriteMovies[0].id,    
                poster: $scope.favoriteMovies[0].poster_path
           }).then(function(){
            console.log(favInfo);
        }); //Add Object to datbase 
      } //Add movie to object
    } //If user is authenticated - Creat file path to store data
  });  //Checks User Authentication 
    
}]);
