myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$location', '$firebaseObject', function($rootScope, $firebaseAuth, $location, $firebaseObject){
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    
    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
            var userRef = firebase.database().ref('users/' + authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
        } else {
            $rootScope.currentUser = '';
        }
    });
    
    var myObject = {        //Object to hold add Authentication fucntions
        login: function(user){
            auth.$signInWithEmailAndPassword(user.email, user.password)
            .then(function(regUser){
                $location.path('/search')
            }).catch(function(error){
                $rootScope.errorMessage = error.message;
            });
        },
        
        
        logout: function(){
            return auth.$signOut().then(function(){$location.path('/landing')});
        },
        
        requireAuth: function(){
            return auth.$requireSignIn();  
        },
        
       register: function(user){
           auth.$createUserWithEmailAndPassword(user.email, user.password)
           .then(function(regUser){
               var userRef = firebase.database().ref('users')
               .child(regUser.uid).set({
                   regUser: regUser.uid,
                   firstname: user.firstname,
                   lastname: user.lastname,
                   email: user.email
               });
               myObject.login(user);
           }).catch(function(error){
               var errorCode = error.code;
               var errorMessage = error.message;
               if(errorCode === 'auth/weak-password'){
                   alert('Password is too weak');
               } else{
                   alert(errorMessage);
               }
               console.log(error);
           });
       }    
    };
    return myObject;
    
}]);