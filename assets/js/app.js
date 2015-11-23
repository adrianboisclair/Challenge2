var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ngAnimate']);
function MyController($scope, $http, $location){
    var url = "http://api.vip.supplyhub.com:19000/products";
    var termKey = 'query';
    var pageKey = 'page';

    $scope.currentPage = 1;
    $scope.pageSize = 12;
    $scope.results = [];
    $scope.products = [];
    $scope.defaultImage = 'http://lorempixel.com/250/250/abstract/No-Image-Available';


    $scope.pageChangeHandler = function(num) {
        console.log('results page changed to ' + num);
    };
    $scope.$watch(function(){
        return $location.search();
    }, function(){
        $scope.searchTerm = $location.search()[termKey] || "";
    });
    $scope.$watch('searchTerm', function(term){
        $location.search(termKey, term);
    });
    $scope.$watch('searchPage', function(page){
        $location.search(pageKey, page);
    });

    $scope.search = function(searchTerm){
        console.log('searching...', searchTerm);
        $http({
            method: 'GET',
            url: url+'?search='+searchTerm
        })
            .then(function successCallback(response){
                console.log(response.data);
                $scope.products = response.data;
                $scope.searchPage = 1;
            }, function errorCallback(response){
                console.log(response);
            });
    };
    $scope.pageChangeHandler = function(num) {
        $scope.searchPage = num;
        console.log('going to page ' + num);
    };
}
function OtherController($scope, $location) {
}
myApp.controller('MyController', MyController);
myApp.controller('OtherController', OtherController);