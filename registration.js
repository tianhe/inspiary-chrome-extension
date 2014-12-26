successURL_= 'https://www.facebook.com/connect/login_success.html';
loginTab_ = undefined;

function onFacebookLogin() {
  if(!localStorage.accessToken) {
    chrome.tabs.query({windowId: null}, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {        
        if ((tabs[i].url.indexOf(successURL_) == 0) && !Inspiary.authenticated_) {
          var params = tabs[i].url.split('#')[1];
          access_param = params.split('&')[0]
          localStorage.accessToken = access_param.split("access_token=")[1];                 
          chrome.tabs.onUpdated.removeListener(onFacebookLogin);
          Inspiary.authenticate();
          chrome.tabs.remove(tabs[i]['id']);
          return;
        }
      }
    });    
  }
};

chrome.tabs.onUpdated.addListener(onFacebookLogin);
