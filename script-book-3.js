// -------------- function to be done first ----------------- //
// ------------------- all variable ----------------//

  
// ------------- function for booking step 3 : confirm booking ------------------- //
function createSummaryTable() {
    var selectedFriendList = new Map(JSON.parse(localStorage.getItem('selected-friend-list')))
    let table = document.getElementById('seat-to-book-table');
    table.innerHTML = `<tr>
                        <th>Seat Number</th>
                        <th>Student Id</th>
                        <th>Name</th>
                        </tr>`;
    for (const [studentId, seatId] of pendingBookingSeat) {
        table.innerHTML += `
        <tr id='${studentId + " row"}'>
            <td>${seatId}</td>
            <td>${studentId}</td>
            <td>${selectedFriendList.get(studentId)}</td>
        </tr>
        `
    }
}



// ---------------- coding begins here -------------------- //

// set default value

// booking step 3 - confirm booking (id : )
  
// receive seat-list from previous page, convert to array 
var pendingBookingSeat = JSON.parse(localStorage.getItem('selected-seat-map'));
pendingBookingSeat = new Map(Object.entries(pendingBookingSeat));
// sort by value(seat id) from low to high
pendingBookingSeat = new Map([...pendingBookingSeat].sort((a, b) =>(a[1] > b[1] ? 1 : -1)));
createSummaryTable(); 




var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
var theUrl = "http://demo.api.booking.vtneil.space/api/users/001";
xmlhttp.open("POST", theUrl);
// xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(JSON.stringify({ "current_seat_id": "F1-C64"}));

// var data = new Map();
// data.set("current_seat_id","F1-C64");
// fetch('http://demo.api.booking.vtneil.space/api/users/001', {
//    method: 'POSTman',
//    body: JSON.stringify(data),
//  })
//  .then(response => response.json())
//  .then(data => {
//    console.log('Success:', data);
//  })
//  .catch((error) => {
//    console.error('Error:', error);
//  });