'use strict';

var bidfireServices = angular.module('bidfireServices', ['ngResource']);

bidfireServices.factory('AngularUtil', 
	function() {
		return {
			safeApply: function (scope, fn) {
			    (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
		       }
		};	
	}
);
bidfireServices.factory('FirebaseRef', ['Settings', 
	function(Settings) {
		return {
			auctions: function() {
				return new Firebase(Settings.FIREBASE_URL + '/auctions');	
			},
			bids: function(auctionId) {
				return new Firebase(Settings.FIREBASE_URL + '/auctions/' + auctionId + '/bids');
			},
			auction: function(auctionId) {
				return new Firebase(Settings.FIREBASE_URL + '/auctions/' + auctionId);
			}
		};
	}
]);
