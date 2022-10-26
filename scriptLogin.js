function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function loginn(){
  localStorage.setItem('current_id',document.getElementById("inn").value);
  window.location.href='index-home.html';
}