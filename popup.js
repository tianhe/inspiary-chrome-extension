var Popup = {
  appendInspiration: function(inspiration) {
    $("#inspirations-list").append(
      "<div class='inspiration'>"+
      "<div class='quote'>"+inspiration.quote+"</div>"+"<div class='source'>"+"-&nbsp;"+inspiration.source+"</div>"+
      "<div class='clear'/>"+
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
    window.location.href="login.html";

  } else if (!localStorage.apiToken) {
    Inspiary.authenticate();
    
  } else {
    Inspiary.fetchInspiration(Popup.appendInspiration);
  }

  $("#logout").on('click', function() {
    Inspiary.logout();    
  });

  $("#inspiration #submit-btn").on('click', function() { 
    quote  = $('form#inspiration #quote').val()
    source = $('form#inspiration #source').val()
    note   = $('form#inspiration #note').val()

    Inspiary.postInspiration({quote: quote, source: source, note: note}, Popup.loadInspirations);
  });

});

