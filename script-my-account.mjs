// to use $ must include jQuery library in html file
function displaytext(){
    $.get('http://demo.api.booking.vtneil.space/api/users' ,function(data){
        var userid = "001";
        console.log(data[userid]);
        document.getElementById("username").innerHTML = data[userid].name;
        document.getElementById("studentid").innerHTML = data[userid].id;
        document.getElementById("seatbutton").innerHTML = "F1-A01";//data[userid].current_seat_id;
        document.getElementById("seattext").innerHTML = "My seat: " + data[userid].current_seat_id;
    });
}
displaytext();

function updateUserData(newData){
    //should delete old data before put 
    // may wait for backend function 
    request({ //add
        url: 'http://demo.api.booking.vtneil.space/api/users',
        type: "PUT",
        json: newData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // success: function (data, textStatus, jqXHR) {
        //     console.log(data)
        // }
    });
}

function disableTxt() { //save
    document.getElementById("myCaption").disabled = true;
    var newcaption = document.getElementById("savebt").value;
    //wait for caption and set func from api
    var newData = {
        //all data with changed caption
    }
    updateUserData(newData);
}

function undisableTxt() {
    document.getElementById("myCaption").disabled = false;
}

function logoutt(){
    localStorage.clear();
    window.location.href='indexlogout.html';
  }

