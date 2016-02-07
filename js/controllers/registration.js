gApp.controller('RegistrationController', ['$scope',
    '$firebaseAuth',
    'FIREBASE_URL',
    function($scope, $firebaseAuth, FIREBASE_URL) {

        var fbRef = new Firebase(FIREBASE_URL);
        var fbAuth = $firebaseAuth(fbRef);

        $scope.login = function() {
            $scope.message = "Welcome " + $scope.user.email;
        }

        $scope.register = function() {

            var fbPromise = fbAuth.$createUser({
                email: $scope.user.email,
                password: $scope.user.password
            });

            fbPromise.then(function(fbUserReg) {
                $scope.message = "Hello " + $scope.user.firstname + ", Thanks for registering";
            }).catch(function(error){
                $scope.message = "ERROR: " + error.message;
            });

        }//register

    }//Controller function
]);
