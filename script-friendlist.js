function clicksearch(){
    $.get('http://demo.api.booking.vtneil.space/api/users' ,function(data){
        var userid = "6430000121";
        document.getElementById("friendName").innerHTML = data[userid].name;
        //check if the user already have this friend 
        //check if the password is correct and have this user in the data
        //edit the popup -->(delete the button no) searchPopText
        //if not found -> "Not found. Make sure you enter the correct password"
    });
}
function addfriend(){
    //put new friend to the friend list
}
