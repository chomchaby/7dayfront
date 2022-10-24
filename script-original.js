// This is the ORIGINAL, mixed script file of [home, book-1, book-2] pages
// Please see it as a memorial

// ทำไมไม่แยกตั้งแต่แรก นั่นนะสิ คือคิดว่า ใช้ function, variable ร่วมกัน ที่ไหนได้ เปิดหน้าใหม่ variable ก็ต้องรีเซทค่าสิ อหเอ้ยยย
// เขียนเอง งงเอง จัดเรียงนานมาก ถถถถ สุดท้าย function แต่ละpage มันก้อไม่ได้เหมือนกันขนาดน้านนนน
// เขียน function ยำรวมกัน 300 lines สุดจัดดดด ไม่น่าทำไมบัคเยอะ 
// อันนี้ไม่ใช้นะ อิอิ 
// ปล.เพิ่งเริ่มเขียน js ง้าบบบ

// -------------- things to done first ----------------- //
function generateZoneCMap() {
  var seatType = "seat";
  var elems = document.getElementById('book-map');
  if (elems!=null) {
    seatType = "book-seat";
  }
  var table = document.getElementById('zone-C-map');
  for (let r = 1; r <= 8; r++) {
    var idrow = "r" + r;
    table.innerHTML += `<tr id='${idrow}'></tr>`
    var item = document.getElementById(idrow);
    for (let c=1; c<=8; c++) {
      let idcol = "c" + c;
      let idseat = "zone-C-"+idrow + "-"+ idcol;
      item.innerHTML += `<td id='${idcol}'>
                          <div class='${seatType}' id='${idseat}'>
                            <span class="popuptext"></span>
                          </div>
                        </td>`
    }
  }
}
// ------------------- all variable ----------------//
var allSeats;
var statusSeats;
var bookSeats;
var showCaption;
var occupiedSeat;
var myInterval;

var selectedFriendArray;
var indexOfCurrentSelectedFriend

// ---------------- function for home page --------------//
function seatStatusUpdate() {
    fetch('default.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      statusSeats.forEach(seat => {
        seat.style.background = "green";
      });
      occupiedSeat = data.seatStatus.occupied
      occupiedSeat.forEach(cell =>{
        var seats = document.querySelectorAll('#'+cell.seatId);
        seats.forEach(s => {
          s.style.background = "red";
          if (s.classList.contains('seat')) {
            s.childNodes[1].textContent = cell.caption;
          }
        });
      });

    }).catch(function (error) {
      console.log(error);
    })

    statusSeats.forEach(function(seat) {
      var popup = seat.childNodes[1];
      if (!showCaption) return;
      if (popup.textContent == "") {
        popup.classList.remove('show');
      }
      else {
        popup.classList.add('show');
      }
    });
 
}

function addClickToShowCaption() {
  statusSeats.forEach(seat => {
    seat.addEventListener('click', function handleClick(event) {
      var popup = seat.childNodes[1];
      if (popup.textContent!='') popup.classList.toggle("show");
      // console.log(popup.parentNode.style.background);
    });
  });
}

function toggleCaption() {
  var btn = document.getElementById("caption-btn");
  if (!showCaption) {
    statusSeats.forEach(seat => {
      if (seat.childNodes[1].textContent !='') {
        seat.childNodes[1].classList.add('show');
      }
    });
    btn.innerHTML = 'no caption';
    showCaption = true;
  } else {
    statusSeats.forEach(seat => {
      seat.childNodes[1].classList.remove('show');
    });
    btn.innerHTML = 'caption';
    showCaption = false;
  }
};

// ------- funciton for booking step 1 : choose your friend --------- //

function updateFriendList() {
  fetch('account.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      let select = document.getElementById("friend-list-selector");
      select.innerHTML = '';
      select.innerHTML += `<option value="" selected disabled hidden>-- select course --</option>`;
      data.friend.forEach(element => {
          var option = document.createElement("option");
           option.text = element.name;
           option.value = element.name + " " + element.studentId;
           select.add(option);
      }); 
  });
}
function selectFriend() {
  let friend = document.getElementById('friend-list-selector').value;
  selectedFriendSet.add(friend);
  createSelectedFriendTable();
}
function createSelectedFriendTable() {
  let table = document.getElementById('friend-to-book-table');
  table.innerHTML = '';
  for (const friend of selectedFriendSet) {
      table.innerHTML += `
      <tr id='${"selected-"+friend}'>
          <td>${friend}</td>
          <td><button class="del-row-btn" id='${"selected-"+friend}' >Delete</button></td>
      </tr>
      `
  }
  var btn = document.querySelectorAll(".del-row-btn");
  btn.forEach( b=> {
      let friend = b.id.slice(9)
      b.addEventListener('click', function handleClick(event) {
        deleteSelectedFriend(b.id);
        selectedFriendSet.delete(friend);
      });
  });
}
function deleteSelectedFriend(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}

function addContinueLoadFriendToNextHTML() {
  const form = document.getElementById('form-select-seat');
  form.addEventListener('submit',function(e) {
    if (selectedFriendSet.size==0) return;
    e.preventDefault();
    const json = JSON.stringify(Array.from(selectedFriendSet));
    localStorage.setItem('selected-friend-set',json);
    window.location.href = "book-2.html";
  })
}

// --------- function for booking step 2 : select seats ------------------- //
async function loadStatusToMap() {
  await fetch('default.json').then(function(response) {
    return response.json();
  }).then(function(data) {
    // green seat
    bookSeats.forEach(seat => {
      seat.style.background = "green";
    });
    // red seat
    occupiedSeat = data.seatStatus.occupied;
    occupiedSeat.forEach(cell =>{
      var s = document.getElementById(cell.seatId);
      s.style.background = "red";
    });
  }).catch(function (error) {
    console.log(error);
  })
}
async function updateSeatColor() {
  // default status
  await loadStatusToMap();
  for (const [key, value] of pendingBookingSeat) {
    var s = document.getElementById(value);
    if (key == currentPerson) {
      s.style.background = "orange";
    }
    else {
      s.style.background = "navy";;
    }
  }
}
  
function updateCurrentPerson() {
  // update current person
  var person = selectedFriendArray[indexOfCurrentSelectedFriend].split(" ");
  currentPerson  = person[person.length-1];
  document.getElementById("choose-friend").textContent = selectedFriendArray[indexOfCurrentSelectedFriend];
  // update current selected seat
  currentSelectedSeat = pendingBookingSeat.get(currentPerson);
}

function addChangeColorWhenClick() {
  bookSeats.forEach(seat => {
    seat.addEventListener('click', function handleClick(event) {
      // occupied seat -> return
      if (occupiedSeat.hasOwnProperty(seat.id)) return;
      // friend seat -> return
      if (currentSelectedSeat == null && pendingBookingSeat.get(seat.id)!=null) return;
      // general case
      if (currentSelectedSeat == null) {
        seat.style.background = "orange";
        currentSelectedSeat = seat.id;
      }
      else if (currentSelectedSeat == seat.id) {
        currentSelectedSeat = null;
        seat.style.background = "green";
      }
    });
  });
}

function addPreviousNextAction() {
  document.getElementById("previous-friend").addEventListener('click',function() {
    updatePendingSeat();
    if (indexOfCurrentSelectedFriend==0) indexOfCurrentSelectedFriend = selectedFriendArray.length-1;
    else indexOfCurrentSelectedFriend--;
    updateCurrentPerson();
    updateSeatColor();
  });
  document.getElementById("next-friend").addEventListener('click',function() {
    updatePendingSeat();
    if (indexOfCurrentSelectedFriend==selectedFriendArray.length-1) indexOfCurrentSelectedFriend = 0;
    else indexOfCurrentSelectedFriend++;
    updateCurrentPerson();
    updateSeatColor();
  });
}

function updatePendingSeat() {
  // store in pending seat map
  if (currentSelectedSeat!=null) {
    pendingBookingSeat.set(currentPerson,currentSelectedSeat);
  }
  else {
    pendingBookingSeat.delete(currentPerson);
  }
}

// ------------ coding begin here -------------------- //
if (document.getElementById('contain-map')!=null) {
  // to create full map
  generateZoneCMap();

  // set default value
  allSeats = document.querySelectorAll('.seat ,.book-seat');
  statusSeats = document.querySelectorAll('.seat');
  bookSeats = document.querySelectorAll('.book-seat');
  showCaption = false;

  // home page
  if (document.getElementById('book-map')==null) {
     // real time status and caption
      document.addEventListener('DOMContentLoaded', function() {
        myInterval = setInterval(seatStatusUpdate, 2000);
      });
    // click event on seats;
    addClickToShowCaption();
    // add click event on caption toggle btn
    if (document.getElementById("caption-btn")!=null) {
      document.getElementById("caption-btn").addEventListener('click',toggleCaption);
    } 
  }
  // booking step 2 - select seat
  else {
    var pendingBookingSeat = new Map(); // student id -> seat id
    var currentSelectedSeat; // store id
    var currentPerson;

    // receive friend-list from previous page, convert to array 
    selectedFriendArray = JSON.parse(localStorage.getItem('selected-friend-set'));
    indexOfCurrentSelectedFriend = 0;

    // update seat and person first time
    updateCurrentPerson();
    updateSeatColor();
    
    // add click event for booking
    addChangeColorWhenClick();
    addPreviousNextAction();
  }
}

// booking step 1 - select friend
else if (document.getElementById("select-friend")!=null){
  var selectedFriendSet = new Set();
  updateFriendList();
  document.getElementById('select-friend-btn').addEventListener('click',selectFriend);

  addContinueLoadFriendToNextHTML(); 

}


//-------------------------------------//


// document.getElementById("floor-btn").addEventListener('click',toggleFloor);
// function toggleFloor() {
//   var btn = document.getElementById("floor-btn");
//   if (btn.innerHTML == 'first floor') {
//     btn.innerHTML = 'second floor';
//   } else {
//     btn.innerHTML = 'first floor';
//   }
// };

// window.addEventListener('DOMContentLoaded', (event) => {
//     var els = document.querySelectorAll('.seat');
//     els.forEach(function(cell) {
//       if (cell.textContent == "Occupied") {
//         cell.style.background ='red';
//       }
//       if (cell.textContent == "Vacant") {
//         cell.style.background = 'green';
//       }
//     })
//   })