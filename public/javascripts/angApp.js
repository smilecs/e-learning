var app = angular.module('elearning', ['ngRoute', 'ngCookies', 'ngFileUpload']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/signin', {
		controller:'loginCtrl',
        templateUrl:'/signin.html'
	}).when('/signup', {
        controller:'RegCtrl',
        templateUrl:'signup.html'
    }).when('/dashboard',{
            controller:'dashCtrl',
            templateUrl:'courseview.html'
    }).when('/addcourse',{
            controller:'addCourseCtrl',
            templateUrl:'addcourse.html'
    }).when('/fulldetails/:id',{
            controller:'Ctrl',
            templateUrl:'fulldetails.html'
    }).when('/library/:dept/:level',{
        controller:'studentCtrl',
        templateUrl:'viewcourses.html'
    }).when('/library/:dept/:level/:dat',{
            controller:'books',
            templateUrl:'books.html'
            }).when('/',{
            templateUrl:'choice.html'
    }).when('/department/courses',{
        templateUrl:'departments.html'
    }).when('/logout',{
        controller:'lgCtrl'
    }).when('/general',{
        controller:'flCtrl',
        templateUrl: 'generalupload.html'
    }).when('/library/:dept',{
        controller:'bk',
        templateUrl:'book.html'
    });
    //$locationProvider.html5mode({ enabled: true, requireBase: true });
}]);


app.controller('lgCtrl', function($cookieStore, $location){
    $cookieStore.remove('staff');
    $location.path('/');
    
});

app.controller('bk', function($scope, $http, $routeParams){
    $http.get('/material/'+$routeParams.dept).success(function(dat){
   $scope.books = dat;     
        $scope.d = dat[0];
        console.log($scope.d);
        $scope.dept = $routeParams.dept;
        
        $scope.val = function(dat){
          $http.get('/pdf/'+dat, {responseType: 'arraybuffer'})
       .success(function (data) {
           var file = new Blob([data], {type: 'application/pdf'});
           var fileURL = URL.createObjectURL(file);
           window.open(fileURL);
    });  
        };
    });
});

app.controller('books', function($scope, $http, $routeParams){
    $http.get('/material/'+$routeParams.dat).success(function(dat){
   $scope.books = dat;     
        $scope.d = dat[0];
        console.log($scope.d);
        $scope.dept = $routeParams.dept;
        
        $scope.val = function(dat){
          $http.get('/pdf/'+dat, {responseType: 'arraybuffer'})
       .success(function (data) {
           var file = new Blob([data], {type: 'application/pdf'});
           var fileURL = URL.createObjectURL(file);
           window.open(fileURL);
    });  
        };
    });
});
app.controller('studentCtrl', function($scope, $http, $location, $cookieStore, $routeParams){
    $scope.nx = function(dat){
     $location.path('/library/'+$routeParams.dept+'/'+$routeParams.level+'/'+dat);
    };   
    $http.get('/library/'+$routeParams.dept+'/'+$routeParams.level).success(function(data){
        $scope.dept = $routeParams.dept;
        $scope.level = $routeParams.level;
        $scope.courses = data;
    });
});
app.controller('addCourseCtrl', function($scope, $http, $location, $cookieStore){
   $scope.subject = {};
    $scope.adding = function(course){
        console.log(course);
       var id = $cookieStore.get('staff');
       $http.post('/course/'+id, course).success(function(data, status){
        if(status != 404){
           $location.path('/dashboard');
        }
       });
   }; 
});
    app.controller('dashCtrl', function($scope, $http, $location, $cookieStore){
        $scope.datas = {}; 
        $scope.books= {};
        $scope.add = function(){
            $location.path('/addcourse');
        };
        $scope.nex = function(data){
            $location.path('/fulldetails/'+data);
        };
        var id = $cookieStore.get('staff');
        $http.get('/courses/'+id).success(function(data){
            $scope.datas = data;
        $scope.datas = data.profile;
            $scope.courses = data.courses;
            //console.log(dat);
        });
    });
	app.controller('loginCtrl', function($scope, $http, $location, $cookieStore){
        
		$scope.error = '';
        $scope.hides = true;
		$scope.sign_in = function(datas){
			console.log(datas);
			$http.post('/sign_in', datas).success(function(data){
								$cookieStore.put('staff', data._id);
				console.log($cookieStore.get('staff'));
				$location.path('/dashboard');
			});
		};
	});
app.controller('Ctrl',function($scope, $http, $location, $http, $routeParams, $cookieStore){
   //$scope.details = {};
    var id = $routeParams.id;
    $http.get('/material/'+id).success(function(data){
        $scope.details = data;
        
    });
});
app.controller('RegCtrl', ['$scope', function($scope, $location, $http){
   $scope.user = {};
    $scope.addUser = function(data){
		console.log(data);
		$http.post('/user/register', data).success(function(data) {
			$location.path('/');
		});
	};
}]);

app.controller('fullCtrl', ['$scope', 'Upload','$routeParams','$location', function ($scope, Upload, $routeParams, $location) {
    $scope.id = $routeParams.id;
    
    
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
   

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url:'/course/material/'+$scope.id,
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                   
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
    $location.path('/dashboard');
                });
            }
        }
    };
   
}]);


app.controller('flCtrl', ['$scope', 'Upload','$routeParams','$location', function ($scope, Upload, $routeParams, $location) {
    $scope.id = $routeParams.id;
    
    
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
   

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url:'/general/material/'+$scope.id,
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                   
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
    $location.path('/dashboard');
                });
            }
        }
    };
   
}]);