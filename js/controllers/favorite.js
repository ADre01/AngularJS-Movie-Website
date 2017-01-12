myApp.controller('FavoriteController', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseObject', '$routeParams','$firebaseArray', '$location',function($rootScope, $scope, $firebaseAuth, $firebaseObject, $routeParams, $firebaseArray, $location){
    
    var firstref = firebase.database().ref('users/' + $rootScope.currentUser.$id + '/favorites');
    var userFav = $firebaseArray(firstref);
    $scope.favorites = userFav;
    
    
    $scope.whichuser = $routeParams.uId;
    $scope.whichmovie = $routeParams.mId;
    var ref = firebase.database().ref('users/' + $scope.whichuser + '/favorites' + $scope.whichmovie);
    
    $scope.displayMovie = function(favorite){
        var userRef = $firebaseArray(ref);
        console.log(favorite);
        $rootScope.movie = favorite.title;
        $rootScope.overview = favorite.overview;
        $rootScope.year = favorite.year;
        $rootScope.vote_average = favorite.rating;
        $rootScope.poster_path = "https://image.tmdb.org/t/p/w154"+favorite.poster;
    }
    
    $scope.deleteMovie = function(key){
        userFav.$remove(key);
    } //Delete Movie 
    
    
    $scope.likebutton = function(like){
        if(like){
            likeInfo.$save({like: true});
        }
        else{
            likeref.$save({
                like: false
            })
            .then(function(){
                console.log(userFav);
            });
        }
    }
    
    
    $scope.showLove = function(favorite){
        favorite.show = !favorite.show;
        if(favorite.userState == 'expanded'){
            favorite.userState = '';
        }else{
            favorite.userState = 'expanded';
        }
    }
   
    $scope.giveLove = function(favorite, comment){
        var refLove = firebase.database().ref('users/' + $rootScope.currentUser.$id + '/favorites/' + favorite.$id + '/comments');
        var commentArray = $firebaseArray(refLove);
        var myData = {
            comment: comment
        }; //My Data
        commentArray.$add(myData);
    }
    
    $scope.deleteLove = function(favorite, key){
        var refLove = firebase.database().ref('users/' + $rootScope.currentUser.$id + '/favorites/' + favorite.$id + '/comments/' + key);
        var record = $firebaseObject(refLove);
        record.$remove(key);
    }
    
}]);    