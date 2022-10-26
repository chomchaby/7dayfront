 // -------------- function to be done first ----------------- //

  // ------------------- all variable ----------------//

  var allSeat;
  var occupiedSeat;
  var concentrateSeat
  var entertainSeat;
  var want_dateSeat;
  var want_friendSeat;
  var want_study_friendSeat;
  
  var bookedSeatArray;
  var selectedFriendArray;
  var indexOfCurrentSelectedFriend;
  var pendingBookingSeat = new Map(); // student id -> seat id
  var currentSelectedSeat; // store id
  var currentPerson;
  
  // --------- function for booking step 2 : select seats ------------------- //
  async function loadStatusToMap() {
    bookedSeatArray = [];
    await fetch('default.json').then(function(response) {
      return response.json();
    }).then(function(data) {
        // set default 
        allSeat.forEach(seat => {
          seat.style.background = "#EDE6E6";
          seat.style.border = "2px solid black";
        });
        // occupied seat
        occupiedSeat = data.seatStatus.occupied
        occupiedSeat.forEach(cell =>{
          var seats = document.querySelectorAll('#'+cell.seatId);
          seats.forEach(seat => {
            bookedSeatArray.push(seat.seatId);
            seat.style.background = "#D2B48C";
            if (seat.classList.contains('seat')) {
              seat.childNodes[1].textContent = cell.caption;
            }
          });
        });
        // concentrate seat
        concentrateSeat = data.seatStatus.concentrate
        concentrateSeat.forEach(cell =>{
          var seats = document.querySelectorAll('#'+cell.seatId);
          seats.forEach(seat => {
            bookedSeatArray.push(seat.seatId);
            seat.style.background = "#F5DEB3";
            if (seat.classList.contains('seat')) {
              seat.childNodes[1].textContent = cell.caption;
            }
          });
        });
        // entertain seat
        entertainSeat = data.seatStatus.entertain
        occupiedSeat.forEach(cell =>{
          var seats = document.querySelectorAll('#'+cell.seatId);
          seats.forEach(seat => {
            bookedSeatArray.push(seat.seatId);
            seat.style.background = "#FFD700";
            if (seat.classList.contains('seat')) {
              seat.childNodes[1].textContent = cell.caption;
            }
          });
        });
        // want_date seat
        want_dateSeat = data.seatStatus.want_date
        want_dateSeat.forEach(cell =>{
          var seats = document.querySelectorAll('#'+cell.seatId);
          seats.forEach(seat => {
            bookedSeatArray.push(seat.seatId);
            seat.style.background = "#FFA07A";
            if (seat.classList.contains('seat')) {
              seat.childNodes[1].textContent = cell.caption;
            }
          });
        });
        // want_friend seat
        want_friendSeat = data.seatStatus.want_friend
        want_friendSeat.forEach(cell =>{
          var seats = document.querySelectorAll('#'+cell.seatId);
          seats.forEach(seat => {
            bookedSeatArray.push(seat.seatId);
            seat.style.background = "#D2691E";
            if (seat.classList.contains('seat')) {
              seat.childNodes[1].textContent = cell.caption;
            }
          });
        });
        // want_study_friend seat
        want_study_friendSeat = data.seatStatus.want_study_friend
        want_study_friendSeat.forEach(cell =>{
          var seats = document.querySelectorAll('#'+cell.seatId);
          seats.forEach(seat => {
            bookedSeatArray.push(seat.seatId);
            seat.style.background = "#B22222";
            if (seat.classList.contains('seat')) {
              seat.childNodes[1].textContent = cell.caption;
            }
          });
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
        s.style.background = "red";
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
    document.getElementById("choosed-friend").textContent = selectedFriendArray[indexOfCurrentSelectedFriend];
    // update current selected seat
    currentSelectedSeat = pendingBookingSeat.get(currentPerson);
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
  function isOccupied(id) {
    for (var i = 0; i < bookedSeatArray.length; i++) {
        if (bookedSeatArray[i] == id) return true;
    }
    return false;
  }
  function isFriendSeat(id) {
    for (const [key, value] of pendingBookingSeat) {
      if (value==id) return true;
    }
    return false;
  }
  function addChangeColorWhenClick() {
    allSeat.forEach(seat => {
      seat.addEventListener('click', function handleClick(event) {
        
        // select occupied seat, select friend seat -> return
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
  function addSubmitBookingAction() {
    const form = document.getElementById('form-submit-booking');
    form.addEventListener('submit',function(e) {
      if (pendingBookingSeat.size==0) return;
      e.preventDefault();
      const json = JSON.stringify(Object.fromEntries(pendingBookingSeat));
      localStorage.setItem('selected-seat-map',json);
      window.location.href = "index-book-3.html";
    })
  }

  
  // set default value
    allSeat = document.querySelectorAll('.seat');
    // receive friend-list from previous page, convert to array 
    selectedFriendArray = JSON.parse(localStorage.getItem('selected-friend-set'));
    indexOfCurrentSelectedFriend = 0;
    
  // booking step 2 - select seat (id : contain-map, book-map)

      // update seat and person first time
      updateCurrentPerson();
      updateSeatColor();
      
      // add click event for booking
      addChangeColorWhenClick();
      addPreviousNextAction();
      addSubmitBookingAction();
  