var studentApp = angular.module('student', []);

studentApp.controller('MainController', ['$scope', 'WebService', function ($scope, WebService) {

    // Setup a view model 
    var vm = {};
	
    vm.list = [];
	
    // Start the initial load of lists
    WebService.getAllItems().then(function (response) {
       
	   vm.list = response.data;
	   //vm.tableParams= new NgTableParams({},{dataset: vm.list});
	   console.log(vm.list);
    });

    vm.addItem = function () {
        var item = {
            firstName: vm.newItemDetails.firstName, middleName: vm.newItemDetails.middleName, lastName: vm.newItemDetails.lastName,
            grade: vm.newItemDetails.grade, nationality: vm.newItemDetails.nationality, gender: vm.newItemDetails.gender,
            userName: vm.newItemDetails.userName
        };

        // Clear it from the UI
        //vm.newItemDetails = '';

        // Send the request to the server and add the item once done
        WebService.addItem(item).then(function (response) {
            vm.list.push({
                _id: response.data.itemId,
                details: item.details
            });
        });
    };

    vm.removeItem = function (itemToRemove) {
        // Remove it from the list and send the server request
        vm.list = vm.list.filter(function (item) { return item._id !== itemToRemove._id; });
        WebService.removeItem(itemToRemove);
    };

    // For new items: 
    vm.newItemDetails = '';

    // expose the vm using the $scope
    $scope.vm = vm;
}]);

studentApp.service('WebService', ['$http', function ($http) {
    return {
		
        getItems: function (id) {
            dd=$http.get('/getById/5a02f535c897d5fa520f5a6f');
			
			return dd;
        },
		getAllItems: function (id) {
            dd=$http.get('/get');
			return dd;
        },
        addItem: function (item) {
			console.log(item);
            return $http.post('/create/', item); 
        },
		updateItem: function (grade) {
            return $http.post('/updateGrade/', grade); 
        },
        removeItem: function (id) {
            return $http.delete('/deleteById/:' + id);
        }
    }
}]);