var UserInfo = (function() {
    var full_name = "";
    var user_name = "";
  
    var getName = function() {
      return full_name;
    };
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };

    var getUserName = function() {
        return user_name;
    }

    var setUserName = function(uname) {
        user_name = uname;
    }
  
    return {
      getName: getName,
      setName: setName,
      getUserName: getUserName,
      setUserName: setUserName
    }
  })();
  
  export default UserInfo;