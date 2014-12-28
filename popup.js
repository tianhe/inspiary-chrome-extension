var Popup = {
  appendInspiration: function(inspiration) {
    $("#inspirations-list").append(

      "<div class='inspiration'>"+
      "<div class='quote'>"+inspiration.quote+"</div>"+"<div class='author'>"+
      "-&nbsp;"+(inspiration.authors[0] ? inspiration.authors[0].full_name : "Anonymous")+"</div>"+
      "<div class='clear'/>"+
      "<div class='source'>"+inspiration.source+"</div>"+
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
    name   = $('form#inspiration #name').val()
    source = $('form#inspiration #source').val()
    note   = $('form#inspiration #note').val()

    Inspiary.postInspiration({quote: quote, authors_attributes: [{full_name: name}], source: source, note: note}, Popup.loadInspirations);
  });

});

