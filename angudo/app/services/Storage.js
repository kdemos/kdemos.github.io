angudo.factory('Storage', ['$filter', function ($filter) {
    return {

        getMaxTaskId: function () {
            var tasks = this.getTasks();
            return tasks.length + 1;
        },

        getTasks: function () {
            var tasks = localStorage.getItem('tasks');
            tasks = JSON.parse(tasks) || [];
            return tasks;
        },

        toggleTaskCompletion: function ( toUpdate ) {

            var tasks = this.getTasks();
            var updateAble = $filter('filter')(tasks, function( t ){
                return t.taskId === toUpdate.taskId
            })[0];

            updateAble.completed = !toUpdate.completed;
            this.resetTasks( JSON.stringify(tasks) );
        },

        deleteTask: function ( task ) {
            var tasks = this.getTasks();
            tasks.splice( task, 1 );
            this.resetTasks( JSON.stringify(tasks) );
        },

        toggleHideTask: function ( task ) {

            modifiedTask = Object.create( task );

            var tasks = this.getTasks();
            var updateAble = $filter('filter')(tasks, function( t ){
                return t.taskId === modifiedTask.taskId
            })[0];

            updateAble.hide = !modifiedTask.hide;

            this.resetTasks( JSON.stringify( tasks ) );
        },

        resetTasks: function ( resetWith ) {
            if ( resetWith ) {
                localStorage.setItem('tasks', resetWith);
            } else {
                localStorage.removeItem('tasks');
            }
        },

        saveTask: function ( task ) {
            var tasks = this.getTasks();
            tasks.unshift( task );
            this.resetTasks(JSON.stringify(tasks));
        },

        updateTask: function ( modifiedTask ) {

            var task = Object.create( modifiedTask );

            var tasks = this.getTasks();
            var updateAble = $filter('filter')(tasks, function( t ){
                return t.taskId === modifiedTask.taskId
            })[0];
            
            updateAble = angular.extend(updateAble, angular.copy( modifiedTask ));
            this.resetTasks( JSON.stringify( tasks ) );
        }
    };
}]);