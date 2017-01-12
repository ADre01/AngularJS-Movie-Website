myApp.controller('MovieDetailsController', ['$scope', '$rootScope', '$http','$firebaseArray', '$firebaseObject', '$routeParams', function($scope, $rootScope, $http,$firebaseArray, $firebaseObject, $routeParams){
    $scope.whichmovie = $routeParams.mId;
    $scope.load = function(){
        $http.get("https://api.themoviedb.org/3/movie/+" + $scope.whichmovie + "?api_key=a0ec166fd47282024cdb32ae4d1326e8&language=en-US")
        .then(function(response){
            $scope.moviedetails = response.data;
            
        });
    }
}]);