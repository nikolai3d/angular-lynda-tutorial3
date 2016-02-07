//This way to encapsulate authentication in a service

gApp.factory('Authentication', ['$rootScope',
    '$firebaseAuth',
    '$firebaseObject',
    '$location',
    'FIREBASE_URL',
    function($rootScope, $firebaseAuth, $firebaseObject, $location, FIREBASE_URL) {

        var fbRef = new Firebase(FIREBASE_URL);
        var fbAuth = $firebaseAuth(fbRef);

        fbAuth.$onAuth(function(fbUserReg){
            //fbUserReg is whatever comes from successful authentication.
            //We are using its uid to query name/email etc from our custom data ("users") database.
            if (fbUserReg){
                var fbUserRef = new Firebase(FIREBASE_URL+"users/"+fbUserReg.uid);
                
// The $firebaseObject service takes a Firebase reference or Firebase Query and returns 
// a JavaScript object which contains the data at the provided Firebase reference and some extra 
// AngularFire-specific fields. 
// Note that the data will not be available immediately since retrieving it is an asynchronous operation. 
// You can use the $loaded() promise to get notified when the data has loaded.
// From https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject   
                var userObj = $firebaseObject(fbUserRef);
                $rootScope.currentUser = userObj;
            } else {
                $rootScope.currentUser = "";
            }
        });

        return {
            login: function(user) {
                var fbAuthPromise = fbAuth.$authWithPassword({
                    email: user.email,
                    password: user.password
                });

                fbAuthPromise.then(function(fbUserReg) {
                    //Redirection in case of success
                    $location.path('/success');
                }).catch(function(error) {
                    $rootScope.message = "AUTH Error: " + error.message;
                });

                $rootScope.message = "Authenticating...";

            }, //login
            
            logout: function() {
                return fbAuth.$unauth();
            }, //logout 
            
            register: function(user) {
                var fbPromise = fbAuth.$createUser({
                    email: user.email,
                    password: user.password
                });

                fbPromise.then(function(fbUserReg) {

                    var fbRegRef = new Firebase(FIREBASE_URL + 'users');
                    var fbNewUserDataEntry = fbRegRef.child(fbUserReg.uid);

                    fbNewUserDataEntry.set({
                        date: Firebase.ServerValue.TIMESTAMP,
                        regUser: fbUserReg.uid,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    });

                    $rootScope.message = "Hello " + user.firstname + ", Thanks for registering";
                }).catch(function(error) {
                    $rootScope.message = "ERROR: " + error.message;
                });
            }
        };

    }
]);
