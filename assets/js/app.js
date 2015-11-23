'use stric';
//Load The Application into myApp
var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ngAnimate']);
//Create MyController
function MyController($scope, $http, $location){
    //inject all dependencies as well ^
    var url = "http://api.vip.supplyhub.com:19000/products";  //API Endpoint
    var termKey = 'query'; // Query termKey used in URL/Location provider
    var pageKey = 'page'; // Page term used in URL/Location provider
    // Set $scope variables to be used in application
    $scope.currentPage = 1;
    $scope.pageSize = 12;
    $scope.results = [];
    $scope.products = [];
    //Get image to use when no image is available in results
    $scope.defaultImage = 'http://lorempixel.com/250/250/abstract/No-Image-Available';
    // Bind location to search params, or query, and page/pagination
    $scope.$watch(function(){
        return $location.search();
    }, function(){
        $scope.searchTerm = $location.search()[termKey] || "";
        $scope.currentPage = $location.search()[pageKey] || "1";
    });

    $scope.$watch('searchTerm', function(term){
        $location.search(termKey, term);
    });

    $scope.$watch('searchPage', function(page){
        $location.search(pageKey, page);
    });

    $scope.$watch('searchTerm', function(searchTerm){
        $scope.search(searchTerm);
    });
    // Create a search function
    $scope.search = function(searchTerm){
    //get searchTerm
        console.log('searching...', searchTerm);
        $http({
            method: 'GET',
            url: url+'?search='+searchTerm})
            .then(function successCallback(response){
                console.log(response.data);
                $scope.products = response.data;  // Set products variable to response data
                $scope.searchPage = 1;},  // Set pagination page to first page of results
            function errorCallback(response){
                //if an error occurs then log it.
                console.log(response);
            });
    };
    // pageChangeHandler - does something when page is changed.
    $scope.pageChangeHandler = function(num) {
        $scope.searchPage = num;
        console.log('going to page ' + num);
    };
}

myApp.controller('MyController', MyController);  //Instantiate controller