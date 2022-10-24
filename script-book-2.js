// -------------- function to be done first ----------------- //
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

  var bookSeats;
  var redSeatArray;
  var occupiedSeat;
  
  var selectedFriendArray;
  var indexOfCurrentSelectedFriend;
  var pendingBookingSeat = new Map(); // student id -> seat id
  var currentSelectedSeat; // store id
  var currentPerson;
  
  // --------- function for booking step 2 : select seats ------------------- //
  async function loadStatusToMap() {
    redSeatArray = [];
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
        redSeatArray.push(cell.seatId);
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
        
        // select occupied seat, select friend seat -> return
        console.log(isOccupied(seat.id));
        if (isOccupied(seat.id) || isFriendSeat(seat.id)) {
        }

        // general case
        // not select yet
        else if (currentSelectedSeat == null) {
          currentSelectedSeat = seat.id;
          seat.style.background = "orange";
        }
        // unselect seat
        else if (currentSelectedSeat == seat.id) {
          currentSelectedSeat = null;
          seat.style.background = "green";
        }
        // change seat
        else {
          seat.style.background = "orange";
          document.getElementById(currentSelectedSeat).style.background = "green";
          currentSelectedSeat = seat.id;
        }
      });
    });
  }
  function isOccupied(id) {
    for (var i = 0; i < redSeatArray.length; i++) {
        if (redSeatArray[i] == id) return true;
    }
    return false;
  }
  function isFriendSeat(id) {
    for (const [key, value] of pendingBookingSeat) {
      if (value==id) return true;
    }
    return false;
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
  //function to be done first  
  // to create full map
    generateZoneCMap();
  
    // set default value
    bookSeats = document.querySelectorAll('.book-seat');
    
    // booking step 2 - select seat (id : contain-map, book-map)
  
      // receive friend-list from previous page, convert to array 
      selectedFriendArray = JSON.parse(localStorage.getItem('selected-friend-set'));
      indexOfCurrentSelectedFriend = 0;
  
      // update seat and person first time
      updateCurrentPerson();
      updateSeatColor();
      
      // add click event for booking
      addChangeColorWhenClick();
      addPreviousNextAction();
  