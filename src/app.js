let app = angular.module("gitHubApp", ["ngRoute"]);

app.config([
  "$routeProvider",
  function config($routeProvider) {
    $routeProvider
      .when("/users", {
        templateUrl: "./users.html",
        controller: "allUser",
      })
      .when("/users/:userid", {
        templateUrl: "./userDetails.html",
        controller: "userData",
      })
      .otherwise("/users");
  },
]);

app.controller("allUser", function ($scope, $http) {
  let URL = "https://api.github.com/users";
  //making a request to the api

  $http
    .get(URL)
    .then((response) => {
      $scope.users = response.data;
    })
    .catch((e) => {
      console.log(e);
      $scope.users = [];
    });

  $scope.searchUser = (searchText) => {
    if (searchText.length > 3) {
      URL = `https://api.github.com/users/${searchText}`;
      $http
        .get(URL)
        .then((response) => {
          $scope.users = [response.data];
        })
        .catch((e) => {
          console.log(e);
          $scope.users = [];
        });
    } else if (searchText === "") {
      URL = "https://api.github.com/users";
      $http
        .get(URL)
        .then((response) => {
          $scope.users = response.data;
        })
        .catch((e) => {
          console.log(e);
          $scope.users = [];
        });
    }
  };
});

app.controller("userData", function ($scope, $http, $routeParams) {
  const URL = `https://api.github.com/users/${$routeParams.userid}`;

  //making a request to the api

  $http.get(URL).then((response) => {
    $scope.user = response.data;
    $http.get($scope.user.repos_url).then((response) => {
      $scope.userRepo = response.data;
    });
  });
});
