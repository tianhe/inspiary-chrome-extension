var Popup = {
  appendInspiration: function(inspiration) {
    $("#inspirations-list").append(
      "<div class='inspiration'>"+
      "<div class='quote'>"+inspiration.quote+"</div>"+"<div class='source'>"+"-&nbsp;"+inspiration.source+"</div>"+
      "</div>"
    );
  },

  loadInspirations: function(inspirations) {
    for(i=0; i<inspirations.length; i++) {
      Popup.appendInspiration(inspirations[i]);
    }
  }
}

$(document).ready(function () {
  if (!localStorage.accessToken) {
    chrome.browserAction.setPopup({popup: "login.html"});
    return;

  } else if (!localStorage.apiToken) {
    Inspiary.authenticate();
    
  } else {
    Inspiary.fetchInspirations(Popup.loadInspirations);
  }

  $("#logout").on('click', function() {
    Inspiary.logout();    
  });

  $("#inspiration").submit( function() { 
    event.preventDefault();
    quote  = $('form#inspiration #quote').val()
    source = $('form#inspiration #source').val()
    note   = $('form#inspiration #note').val()

    Inspiary.postInspiration({quote: quote, source: source, note: note}, Popup.loadInspirations);
  });

});

