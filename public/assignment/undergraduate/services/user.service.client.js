(function () {
    angular
        .module('WAM')
        .factory('userService', userService);
    
    function userService($http) {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        
        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
        }
        
        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined')
                return null;
            return user;
        }
        
        function updateUser(userId, user) {
            
        }
        
        function deleteUser(userId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index, 1);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();