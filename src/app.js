let app = angular.module("gitHubApp", []);

app.controller("allUser", function ($scope, $http, $window) {
  const URL = "https://api.github.com/users";
  //making a request to the api

  $http.get(URL).then((response) => {
    console.log(response);

    $scope.users = response.data;
  });
  // goto usedetails page
  $scope.userDetails = function () {

    $window.location.href = "./userDetails.html";
  

  };
});

app.controller("userData", function ($scope, $http, $window) {
  const URL = "https://api.github.com/users/mojombo";

  //making a request to the api

  $http.get(URL).then((response) => {
    $scope.user = response.data;
    $http.get($scope.user.repos_url).then((response) => {
      $scope.userRepo = response.data;
    });
  });

  //back to homepage
  $scope.backHome = function () {
    $window.location.href = "./users.html";
  };
});
