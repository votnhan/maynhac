var UserInfo = (function() {
    var full_name = "";
    var user_name = "";
    var user = null;
    var jwt = null;
  
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

    var setJWT = function(j) {
      jwt = j;
    }

    var getJWT = function() {
      return jwt;
    }

    var getUser = function() {
      return user;
    }

    var setUser = function(u) {
      user = u;
    }
  
    return {
      getName: getName,
      setName: setName,
      getUserName: getUserName,
      setUserName: setUserName,
      setJWT: setJWT,
      getJWT: getJWT,
      setUser: setUser,
      getUser: getUser
    }
  })();
  
  export default UserInfo;