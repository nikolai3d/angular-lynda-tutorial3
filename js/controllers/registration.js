gApp.controller('RegistrationController', ['$scope', function($scope){
    $scope.message = "Welcome To MyApp";
    
    $scope.login = function() {
        $scope.message = "Welcome " + $scope.user.email;
    }
    
    $scope.register = function() {
        $scope.message = "Welcome " + $scope.user.firstname;
    }
    
}]);

