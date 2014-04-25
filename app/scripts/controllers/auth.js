'use strict';

app.controller('AuthCtrl',
  function($scope, $location, Auth, User) {
    if (Auth.signedIn()) {
      $location.path('/');
    }

    $scope.$on('$firebaseSimpleLogin:login', function() {
      $location.path('/');
    });

    $scope.login = function() {
      Auth.login($scope.user).then(function() {
        $location.path('/');
      }, function(error) {
        var fireError = error.toString();
        while( fireError.indexOf('Error: ') > -1 ) {
          fireError = fireError.replace('Error: ','');
        }
        while( fireError.indexOf('FirebaseSimpleLogin: ') > -1 ) {
          fireError = fireError.replace('FirebaseSimpleLogin: ','');
        }
        $scope.error = fireError;
      });
    };

    $scope.registerKey = '';

    $scope.register = function() {
      var SHA512 = new Hashes.SHA512();
      // Check register Key Valid
      if( SHA512.hex($scope.registerKey) !== Auth.registerKey() ) {
        $scope.error = 'Invalid Register Key';
        return;
      }

      // Register user on Firebase
      if( !$scope.form.username.$error.taken && !$scope.form.username.$error.invalid ) {
        Auth.register($scope.user).then(function(authUser) {
          User.create(authUser, $scope.user.username);
          $location.path('/');
        }, function(error) {
          var fireError = error.toString();
          while( fireError.indexOf('Error: ') > -1 ) {
            fireError = fireError.replace('Error: ','');
          }
          while( fireError.indexOf('FirebaseSimpleLogin: ') > -1 ) {
            fireError = fireError.replace('FirebaseSimpleLogin: ','');
          }
          $scope.error = fireError;
        });
      }
    };
  });
