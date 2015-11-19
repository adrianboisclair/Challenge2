// Code goes here

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);

function MyController($scope, $http){

    $scope.currentPage = 1;
    $scope.pageSize = 12;
    $scope.results = [];
    $scope.products = [];
    $scope.defaultImage = 'http://lorempixel.com/250/250/abstract/No-Image-Available';

    var url = "http://api.vip.supplyhub.com:19000/products";


    $scope.pageChangeHandler = function(num) {
        console.log('results page changed to ' + num);
    };

    $scope.search = function(searchTerm){
        console.log('searching...', searchTerm);

        $http({
            method: 'GET',
            url: url+'?search='+searchTerm
        })
            .then(function successCallback(response){
                console.log(response.data);
                $scope.products = response.data;
            }, function errorCallback(response){
                console.log(response);
            });

    };
}

function OtherController($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
}




myApp.controller('MyController', MyController);
myApp.controller('OtherController', OtherController);


