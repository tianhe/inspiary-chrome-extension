var Inspiary = {
  //authenticationURL_: 'http://localhost:3000/v1/authentications',
  domain_: 'http://www.inspiaryapp.com',
  authenticationURL_: 'http://www.inspiaryapp.com/v1/authentications',

  authenticate: function() {
    $.post(this.authenticationURL_, { user: { fb_access_token: localStorage.accessToken } }, function (data) {
        localStorage.apiToken = data.user['authentication_token']
        localStorage.email = data.user['email']
        localStorage.userId = data.user['id']
        chrome.browserAction.setPopup({popup: "popup.html"});
    });
  },
  
  logout: function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('apiToken');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    chrome.browserAction.setPopup({popup: "login.html"});
  },

  fetchInspirations: function(success) {
    url =  this.domain_+'/v1/users/'+localStorage.userId+'/inspirations',

    $.get(url, { authentication_token: localStorage.apiToken, email: localStorage.email }, function(data){
      success(data.inspirations);
    });
  },

  postInspiration: function(params, success) {
    url =  this.domain_+'/v1/users/'+localStorage.userId+'/inspirations',

    $.post(url, { inspiration: params, authentication_token: localStorage.apiToken, email: localStorage.email }, function(data){
      success(data.inspiration);
    });
  }
};
