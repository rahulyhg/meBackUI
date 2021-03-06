// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ngRoute',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(
    function ($routeProvider, uiSelectConfig) {

        //        uiSelectConfig.theme = 'bootstrap';
        //        uiSelectConfig.resetSearchInput = true;
        //        uiSelectConfig.appendToBody = true;

        $routeProvider
            .when('/login', {
                templateUrl: 'views/template.html',
                controller: 'login'
            }).when('/home', {
                templateUrl: 'views/template.html',
                controller: 'home'
            }).when('/user', {
                templateUrl: 'views/template.html',
                controller: 'UserCtrl'
            }).when('/createuser', {
                templateUrl: 'views/template.html',
                controller: 'createUserCtrl'
            }).when('/edituser/:id', {
                templateUrl: 'views/template.html',
                controller: 'editUserCtrl'
            }).when('/client', {
                templateUrl: 'views/template.html',
                controller: 'ClientCtrl'
            }).when('/createclient', {
                templateUrl: 'views/template.html',
                controller: 'createClientCtrl'
            }).when('/editclient/:id', {
                templateUrl: 'views/template.html',
                controller: 'editClientCtrl'
            }).when('/job', {
                templateUrl: 'views/template.html',
                controller: 'JobCtrl'
            }).when('/createjob', {
                templateUrl: 'views/template.html',
                controller: 'createJobCtrl'
            }).when('/editjob/:id', {
                templateUrl: 'views/template.html',
                controller: 'editJobCtrl'
            }).when('/category', {
                templateUrl: 'views/template.html',
                controller: 'CategoryCtrl'
            }).when('/createcategory', {
                templateUrl: 'views/template.html',
                controller: 'createCategoryCtrl'
            }).when('/editcategory/:id', {
                templateUrl: 'views/template.html',
                controller: 'editCategoryCtrl'
            }).when('/pages', {
                templateUrl: 'views/template.html',
                controller: 'PagesCtrl'
            }).when('/createpages', {
                templateUrl: 'views/template.html',
                controller: 'createPagesCtrl'
            }).when('/editpages/:id', {
                templateUrl: 'views/template.html',
                controller: 'editPagesCtrl'
            }).when('/testimonial', {
                templateUrl: 'views/template.html',
                controller: 'TestimonialCtrl'
            }).when('/createtestimonial', {
                templateUrl: 'views/template.html',
                controller: 'createTestimonialCtrl'
            }).when('/edittestimonial/:id', {
                templateUrl: 'views/template.html',
                controller: 'editTestimonialCtrl'
            }).when('/slider', {
                templateUrl: 'views/template.html',
                controller: 'SliderCtrl'
            }).when('/createslider', {
                templateUrl: 'views/template.html',
                controller: 'createSliderCtrl'
            }).when('/editslider/:id', {
                templateUrl: 'views/template.html',
                controller: 'editSliderCtrl'
            }). //Add New Path

        otherwise({
            redirectTo: '/login'
        });
    });
firstapp.filter('uploadpath', function () {
    return function (input) {
        if (input.indexOf("/") == -1)
            return adminurl + "uploadfile/resize?file=" + input;
        else
            return input;
    };
});

firstapp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9\-.\\]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});

firstapp.directive('array', function () {
    return {
        restrict: 'EA',
        scope: {
            GalleryStructure: "=objval",
            EditVal: "=editval",
            ModelObj: "=modelobj"
        },
        replace: false,
        templateUrl: "views/directive/array.html",
        link: function ($scope, element, attr) {
            console.log($scope.EditVal);
            var GalleryStructure = $scope.GalleryStructure;
            var EditVal = $scope.EditVal;
            $scope.label = attr.label;
            $scope.GalleryStrucObj = {};
            $scope.GalleryStrucObj.keyOf = _.pluck(GalleryStructure, "name");
            $scope.GalleryStrucObj.structure = GalleryStructure;
            $scope.GalleryStrucObj.valuesOf = [];
            $scope.GalleryStrucObj.valuesOf = EditVal;
            $scope.GalleryStrucObj.nullObj = {};
            _.each($scope.GalleryStrucObj.keyOf, function (n, key) {
                $scope.GalleryStrucObj.nullObj[n] = "";
            });
            $scope.GalleryStrucObj.add = function () {
                $scope.GalleryStrucObj.valuesOf.push(_.clone($scope.GalleryStrucObj.nullObj, true));
            };
            $scope.GalleryStrucObj.remove = function (obj) {
                var objkey = _.remove($scope.GalleryStrucObj.valuesOf, obj);
            };
            $scope.EditVal = $scope.GalleryStrucObj.valuesOf;
        }
    }
});

firstapp.directive('createovalidation', function () {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attr) {
            $element = $(element);
            var validation = $scope[attr.createovalidation].structure[attr.objkey].validation;
            _.each(validation, function (n) {
                var m = n.split("=");
                if (!m[1]) {
                    m[1] = "";
                }
                $element.attr(m[0], m[1]);
            });
        }
    }
});

firstapp.directive('capitalizeFirst', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue === undefined) {
                    inputValue = '';
                }
                var capitalized = inputValue.charAt(0).toUpperCase() +
                    inputValue.substring(1);
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
        }
    };
});
firstapp.filter('touppercase', function () {
    return function (input) {
        var firstletter = input.substr(0, 1);
        var remaining = input.substr(1);
        return firstletter.toUpperCase() + remaining;
    };
});
