'use strict';

angular.module('bidfireApp', [
  'ngCookies',
  'ngResource',
  'ngRoute',
  
  'firebase',
  'bidfireControllers',
  'bidfireServices'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/auctions.html',
        controller: 'AuctionsListCtrl'
      })
      .when('/bid/:auctionId', {
        templateUrl: 'views/bid.html',
        controller: 'BidCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .constant('Settings', {
	  FIREBASE_URL: 'https://bidfire.firebaseio.com'
  });
