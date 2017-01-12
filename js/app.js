var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, next, previous, error){
       if (error === 'AUTH_REQUIRED'){
           $location.path('/login');
       } 
    });
}]);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController'
    }).
    when('/search', {
        templateUrl: 'views/moviesearch.html',
        controller: 'MovieController',
        resolve: {
            currentAuth: function(Authentication){
                return Authentication.requireAuth();
            }
        }
    }).
    when('/moviesdetails/:mId', {
        templateUrl: 'views/moviedet.html',
        controller: 'MovieDetailsController'
    }).
    when('/register', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationController'
    }).
    when('/favorites', {
        templateUrl: 'views/favorites.html',
        controller: 'FavoriteController',
        resolve: {
            currentAuth: function(Authentication){
                return Authentication.requireAuth();
            }
        }
    }).
    when('/details/:uId/:mId', {
        templateUrl: 'views/moviedetails.html',
        controller: 'FavoriteController'
    }).
    otherwise({
        redirectTo: '/login'
    });
}]);
