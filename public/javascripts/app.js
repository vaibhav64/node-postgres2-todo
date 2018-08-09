angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {
  $scope.formitem = {};
  $scope.items = {};
  // Get all todos
  $http.get('/api/v1/todos')
  .success((data) => {    
    $scope.items = data;    
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  // Create a new todo
$scope.createItem = function()
{
    $http.post('/api/v1/todos', $scope.formitem)
    .success((data) => {
      $scope.formitem = {};
      $scope.items = data;     
    })
    .error((error) => {
      console.log('Error: ' + error);
    });
  };
  // Delete a todo
  $scope.deleteTodo = function(todoID){
    $http.delete('/api/v1/todos/' + todoID)
    .success((data) => {
      $scope.todoData = data;      
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
  
});
