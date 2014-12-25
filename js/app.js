angular
	.module('cms.page',[])
	.value('title', "CMS Limp")
	.factory('splitTag', function(){
		return function (input){
			return input.split(/\,?\s/)
		};
	})
	.factory('createPage', function($http,splitTag){
		return function (page){
			page.tag = splitTag(page.tag);

			return $http({
				url : 'http://localhost:3000/api/page',
				method : 'POST',
				data : page
			});
		};
	})
	.controller('CreatePageCrtl', function($scope, createPage, title , $log){
		$scope.title = title;
		$scope.page = {};
		
		function savePage(page) {
			createPage(page).success(function(data) {
					$log.debug(data);
				});
		}
		$scope.savePage = savePage;
	})
	.run(function($log) {
		$log.debug('Cms page started!');
	});

angular
	.module('cms',['cms.page'])
	.run(function($log) {
		$log.debug('Cms started!');
	});

angular.bootstrap(document,['cms']);