var successURL = 'https://www.facebook.com/connect/login_success.html';

function onFacebookLogin() {

  if(!localStorage.accessToken) {
    chrome.tabs.getAllInWindow(null, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].url.indexOf(successURL) == 0) {
          var params = tabs[i].url.split('#')[1];
          access = params.split('&')[0]
          localStorage.accessToken = access.split("access_token=")[1];
          chrome.tabs.onUpdated.removeListener(onFacebookLogin);
          Inspiary.authenticate();
          return;
        }
      }
    });
  }
};

chrome.tabs.onUpdated.addListener(onFacebookLogin);
