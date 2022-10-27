function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

async function loginn(){
  localStorage.clear();
  var userid = document.getElementById("inn").value;
  var url = "http://demo.api.booking.vtneil.space/api/users";
  await fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
        for (var id in data){
          if (id == userid)
          localStorage.setItem('current_id',userid);
          localStorage.setItem('current_name',data[userid].name);
          var unique_id = getUniqueId(userid);
          localStorage.setItem('current_unique_id',unique_id);
          window.location.href='index-home.html';
        }
  });
}
function getUniqueId(user_id) {
  $.ajax({
    type: "POST",
    url: "http://demo.api.booking.vtneil.space/api/custom/get_unique_id",
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    data: JSON.stringify({"user" : user_id}),
    statusCode: {
      200: function (response) {
        alert('Successfully booking');
        console.log(result)
      }
    },
    dataType: "json",
    contentType : "application/json"
    
  });


}
getUniqueId('001');