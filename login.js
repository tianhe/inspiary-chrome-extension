$(document).ready(function () {  
  if (!localStorage.apiToken) {
    Inspiary.authenticate();
  }
});
