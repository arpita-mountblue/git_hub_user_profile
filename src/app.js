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
  const URL = "https://api.github.com/users";
  //making a request to the api

  $http.get(URL).then((response) => {
    console.log(response);

    $scope.users = response.data;
  });
  // goto usedetails page
  // $scope.userDetails = function () {
  //   $window.location.href = "./userDetails.html";
  // };
});

app.controller("userData", function ($scope, $http, $routeParams) {
  const URL = `https://api.github.com/users/${$routeParams.userid}`;
  // console.log(URL, $routeParams);

  //making a request to the api

  $http.get(URL).then((response) => {
    $scope.user = response.data;
    $http.get($scope.user.repos_url).then((response) => {
      $scope.userRepo = response.data;
    });
  });

  //back to homepage
  // $scope.backHome = function () {
  //   $window.location.href = "./users.html";
  // };
});
