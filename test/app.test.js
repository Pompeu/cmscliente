describe('cms',function() {
	beforeEach(module('cms'));

	var $httpBackend = null;
	var createPageCrtl = null;
	var content = {
		title : 'Teste case',
		body : 'testinng....',
		tag : 'tag1,tag2',
	};

	var dataResult = {
		title : content.title,
		body : content.body,
		tag : content.tag.split(/\,?\s/)
	};
	
	/*before mocado....de cu  é rola*/
	beforeEach(inject(function($injector, $controller , $rootScope) {
		
		$httpBackend = $injector.get('$httpBackend');
		createPageScope = $rootScope.$new();
		createPageCrtl = $controller('CreatePageCrtl', {
			$scope : createPageScope,
		});
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	})

	it('title value should be equal CMS Limp',inject(function(title) {
		expect(title).toEqual('CMS Limp');
	}));

	it('split function should be result on list', inject(function(splitTag) {
		expect(splitTag('tag1, tag2')).toEqual(['tag1','tag2']);
	}));

	it('createPage function should be create one page' ,
	 inject(function(createPage) {

		$httpBackend
			.expectPOST('http://localhost:3000/api/page',content)
			.respond(200, dataResult);

		createPage(content);
		$httpBackend.flush();
	}));

	it('create paga ctrl should be title',inject(function() {
		
		expect(createPageScope.title).toEqual('CMS Limp')
	}));

	it('savePage ctrl should be exists',function() {
		expect(createPageScope.savePage).toBeDefined();
	})
});