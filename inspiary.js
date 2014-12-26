var Inspiary = {
  // domain_: 'http://localhost:3000',
  // authenticationURL_: 'http://localhost:3000/v1/authentications',
  domain_: 'http://www.inspiaryapp.com',
  authenticationURL_: 'http://www.inspiaryapp.com/v1/authentications',
  authenticated_: false,

  authenticate: function() {
    if(localStorage.accessToken === undefined) return;

    $.post(this.authenticationURL_, { user: { fb_access_token: localStorage.accessToken } }, function (data) {
        localStorage.apiToken = data.user['authentication_token'];
        localStorage.email = data.user['email'];
        localStorage.userId = data.user['id'];
    });
    this.authenticated_ = true;
  },
  
  logout: function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('apiToken');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    location.reload(true);
    chrome.extension.getBackgroundPage().location.reload();
    this.authenticated_ = false;
  },

  fetchInspiration: function(success) {
    url =  this.domain_+'/v1/users/'+localStorage.userId+'/inspirations/random',

    $.get(url, { authentication_token: localStorage.apiToken, email: localStorage.email }, function(data){
      success(data.inspiration);
    });
  },

  postInspiration: function(params, success) {
    url =  this.domain_+'/v1/users/'+localStorage.userId+'/inspirations',

    $.post(url, { inspiration: params, authentication_token: localStorage.apiToken, email: localStorage.email }, function(data){
      success(data.inspiration);
    });
  }
};
