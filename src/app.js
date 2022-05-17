let app = angular.module("gitHubApp", ["ngRoute", "infinite-scroll"]);

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
  $scope.page = 1;
  $scope.users = [];
  $scope.searchString = "";
  $scope.loading = false;
  $scope.isDisabled = false;

  $scope.scrollFunction = (pageNumber) => {
    $scope.page = pageNumber;
    $scope.isDisabled = true;

    $scope.searchUser($scope.searchString);
  };

  $scope.searchUser = (searchText) => {
    if ($scope.searchString !== searchText) {
      $scope.page = 1;
      $scope.users = [];
      $scope.searchString = searchText;
    }

    if (searchText) {
      $scope.loading = true;
      let URL = `https://api.github.com/search/users?q=${searchText}&page=${$scope.page}&per_page=10`;
      $http
        .get(URL)
        .then((response) => {
          response.data &&
            response.data.items.forEach((item) => {
              $scope.users.push(item);
            });
          $scope.isDisabled = false;
          $scope.loading = false;
        })
        .catch((e) => {
          $scope.loading = false;
          console.log(e);
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
