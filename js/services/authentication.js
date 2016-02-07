//This way to encapsulate authentication in a service

gApp.factory('Authentication', ['$rootScope',
    '$firebaseAuth',
    '$location',
    'FIREBASE_URL',
    function($rootScope, $firebaseAuth, $location, FIREBASE_URL) {

        var fbRef = new Firebase(FIREBASE_URL);
        var fbAuth = $firebaseAuth(fbRef);

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

            },
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
