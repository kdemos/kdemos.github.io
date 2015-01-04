angudo.controller("TasksCtrl", ['$scope', 'Storage', '$filter', function ( $scope, Storage, $filter ){

    $scope.tasks = Storage.getTasks();

    $scope.newTask = {
        description: '',
        color: 'white',
        taskId: Storage.getMaxTaskId(),
        createText: 'Create'
    };

    $scope.pluralizer = {
        0: "",
        1: "Only 1 task",
        other: "Total {} tasks"
    };

    $scope.toggleCompletion = function ( task ) {
        
        Storage.toggleTaskCompletion( task );

        var cacheIndex = $scope.tasks.indexOf( task );
        $scope.tasks[cacheIndex].completed = !$scope.tasks[cacheIndex].completed;
    }

    $scope.choseColor = function ( color ) {
        $scope.newTask.color = color;
    }

    $scope.updateTask = function () {

        Storage.updateTask( $scope.newTask );

        var updateAble = $filter('filter')($scope.tasks, function( t ){
            return t.taskId === $scope.newTask.taskId
        })[0];
    
        // Updating the updateAble object will automatically
        // ..reflect the changes in $scope.tasks        
        updateAble.description = $scope.newTask.description;
        updateAble.color = $scope.newTask.color;

        $scope.resetForm();
    }

    $scope.createTask = function () {
        
        if ( $scope.newTask.taskId !== Storage.getMaxTaskId() ) {
            $scope.updateTask();
            return;
        };

        // Put validation here.
        
        Storage.saveTask( $scope.newTask );
        $scope.tasks.unshift( $scope.newTask );

        $scope.resetForm();
    }

    $scope.resetForm = function () {
        $scope.newTask = {
            description: '',
            color: 'white',
            taskId: Storage.getMaxTaskId(),
            createText: 'Create'
        };
    }

    $scope.toggleHide = function  ( task ) {

        Storage.toggleHideTask( task );

        var cacheIndex = $scope.tasks.indexOf( task );
        $scope.tasks[cacheIndex].hide = !$scope.tasks[cacheIndex].hide;
    }

    $scope.searchTask = function ( searchString ) {
        $scope.filterTask = searchString;
    }

    $scope.edit = function ( task ) {
        $scope.newTask = {
            description: task.description,
            color: task.color,
            taskId: task.taskId,
            createText: 'Update',
            resetText: 'Cancel'
        };
    }
 
    $scope.delete = function ( task ) {
        if (confirm("Once deleted, you will not be able to undo it. \nAre you sure to delete this task?")) {
            Storage.deleteTask( task );
            $scope.tasks.splice( task, 1);            
        };
    }

}]);