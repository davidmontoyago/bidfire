'use strict';

var bidfireControllers = angular.module('bidfireControllers', []);

bidfireControllers.controller('BidCtrl', ['$scope', '$routeParams', 'AngularUtil', 'FirebaseRef', '$firebase',
	function($scope, $routeParams, AngularUtil, FirebaseRef, $firebase) {
		$scope.sortBy = '-time';
		$scope.auction = $firebase(FirebaseRef.auction($routeParams.auctionId));
		
		$scope.auction.$on('loaded', function() {
			FirebaseRef.bids($routeParams.auctionId).endAt().limit(1).on('child_added', function(data) {
				AngularUtil.safeApply($scope, function() {
					var bidAmount = parseFloat(data.val().amount);
					$scope.auction.price = bidAmount;

					var newBidAmount = bidAmount + $scope.auction.priceIncrement;
					$scope.amount = newBidAmount.toFixed(2);
					
					$scope.bidsCount = $scope.auction.$child('bids').$getIndex().length;
				});
			});
		});
		
		$scope.bid = function() {
			var bid = {
				bidder: 'Zaphod',
				amount: $scope.amount,
				time: Firebase.ServerValue.TIMESTAMP
			};
			$scope.auction.$child('bids').$add(bid);
		};
	}
]);

bidfireControllers.controller('AuctionsListCtrl', ['$scope', 'FirebaseRef', '$firebase', 'orderByPriorityFilter',
	function($scope, FirebaseRef, $firebase, orderByPriorityFilter) {
		$scope.auctions = $firebase(FirebaseRef.auctions());
		
		$scope.auctions.$on('change', function() {
			var keys = $scope.auctions.$getIndex();
			
			keys.forEach(function(key) {
				var $auction = $scope.auctions[key];
				var bidsArr = orderByPriorityFilter($auction.bids);
				$auction.bidCount = bidsArr.length;
				if (bidsArr && $auction.bidCount > 0) {
					var lastBid = bidsArr[bidsArr.length - 1];
					$auction.price = lastBid.amount;
				} else {
					$auction.price = $auction.startPrice;
				}
			});
		});
	}
]);
