//This way to encapsulate authentication in a service

gApp.factory('Authentication', ['$rootScope', '$firebaseAuth',
    'FIREBASE_URL',
    function($rootScope, $firebaseAuth, FIREBASE_URL) {

        var fbRef = new Firebase(FIREBASE_URL);
        var fbAuth = $firebaseAuth(fbRef);

        return {
            login: function(user) {
                $rootScope.message = "Welcome " + user.email;

            },
            register: function(user) {
                var fbPromise = fbAuth.$createUser({
                    email: user.email,
                    password: user.password
                });

                fbPromise.then(function(fbUserReg) {
                    $rootScope.message = "Hello " + user.firstname + ", Thanks for registering";
                }).catch(function(error) {
                    $rootScope.message = "ERROR: " + error.message;
                });
            }
        };

    }
]);

