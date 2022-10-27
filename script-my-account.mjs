// to use $ must include jQuery library in html file
function displaytext(){
    var userid = localStorage.getItem("current_id");
    var url = 'http://demo.api.booking.vtneil.space/api/users/'+ userid;
    $.get(url ,function(data){
        document.getElementById("username").innerHTML = data.name;
        document.getElementById("studentid").innerHTML = data.id;
        document.getElementById("seatbutton").innerHTML = data.current_seat_id;
        document.getElementById("seattext").innerHTML = "My seat: " + data.current_seat_id;
        var whatsup = data.whatsup;
        if(whatsup == ""){
            document.getElementById("whatsup-btn").className = "want-normal-btn";
            document.getElementById("whatsuptext").innerHTML = "no description";
        }
        else {
            document.getElementById("whatsup-btn").className = whatsup;
            var text = whatsup.replace("-", " ");
            document.getElementById("whatsuptext").innerHTML = text;
        } 
    });
}
displaytext();

function disableTxt(){
    var userid = localStorage.getItem("current_id");
    var url = 'http://demo.api.booking.vtneil.space/api/users/'+ userid;
    var newcap = document.getElementById("myCaption").innerHTML;
    $.ajax({ 
        url:  url,
        type:"POST",
        data: JSON.stringify({"caption": newcap}),
        contentType: "application/json",
        dataType: "json",
        success: function (textStatus) {
            console.log(textStatus);
        },
        error: function (result, status) {
            console.log(result);
          }
    });
}

function undisableTxt() {
    document.getElementById("myCaption").disabled = false;
}

function logoutt(){
    localStorage.clear();
    window.location.href='indexlogout.html';
  }

