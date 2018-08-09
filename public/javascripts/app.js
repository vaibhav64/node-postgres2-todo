angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {
  $scope.formitem = {};
  $scope.items = {};
  // Get all todos
  $http.get('/api/v1/todos')
  .success((data) => {
    console.log(data);
    $scope.items = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  // Create a new todo
$scope.createItem = function()
{
  alert($scope.formitem);
    $http.post('/api/v1/todos', $scope.formitem)
    .success((data) => {
      $scope.formitem = {};
      $scope.items = data;
      console.log(data);
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
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
  
});
