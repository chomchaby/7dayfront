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
        var name = selectedFriendList.get(studentId)
        if (studentId == localStorage.getItem('current_id')) {
            name = localStorage.getItem('current_name')
        }
        table.innerHTML += `
        <tr id='${studentId + " row"}'>
            <td>${seatId}</td>
            <td>${studentId}</td>
            <td>${name}</td>
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

var submitBtn = document.getElementsByClassName('next-btn');
submitBtn[0].addEventListener('click',sendBooking);

function sendBooking() {
    var theUrl = "http://demo.api.booking.vtneil.space/api/custom/book";
    for (const [student_id, seat_id] of pendingBookingSeat) {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("GET", theUrl);
        xmlhttp.send(JSON.stringify({ "user": student_id, "seat": seat_id}));
    }
}

