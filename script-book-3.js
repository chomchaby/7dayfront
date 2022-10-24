// -------------- function to be done first ----------------- //
// ------------------- all variable ----------------//

  
// ------------- function for booking step 3 : confirm booking ------------------- //
function createSummaryTable() {
    let table = document.getElementById('seat-to-book-table');
    table.innerHTML = '';
    for (const [person, seatId] of pendingBookingSeat) {
        table.innerHTML += `
        <tr id='${"selected-"+person}'>
            <td>${person}</td>
            <td>${seatId}</td>
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
pendingBookingSeat = new Map([...pendingBookingSeat].sort())
createSummaryTable();
