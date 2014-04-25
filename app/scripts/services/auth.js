'use strict';

app.factory('Auth',
  function($firebaseSimpleLogin, $firebase, FIREBASE_URL, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);
    var keyRef = new Firebase(FIREBASE_URL + 'keys/registerKey');

    var auth = $firebaseSimpleLogin(ref);
    var key = $firebase(keyRef);

    var Auth = {
      register: function(user) {
        return auth.$createUser(user.email, user.password);
      },
      registerKey: function() {
        return key.$value;
      },
      signedIn: function() {
        return auth.user !== null;
      },
      login: function(user) {
        return auth.$login('password', user);
      },
      logout: function() {
        auth.$logout();
      }
    };

    $rootScope.signedIn = function() {
      return Auth.signedIn();
    };

    return Auth;
  }
);
