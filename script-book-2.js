 // -------------- function to be done first ----------------- //

  // ------------------- all variable ----------------//

  var allSeat;
  var bookedSeatArray;
  
  var selectedFriendList; // (map) student id -> student name
  var idArray; // keys of selectedFriendList (student id)
  var indexOfCurrentSelectedFriend;
  var pendingBookingSeat = new Map(); // student id -> seat id
  var currentSelectedSeat; // store id
  var currentPerson;
  
  // --------- function for booking step 2 : select seats ------------------- //
  async function loadStatusToMap() {
    bookedSeatArray = [];
    await fetch('status.json').then(function(response) {
      return response.json();
    }).then(function(data) {
        // set default 
        allSeat.forEach(seat => {
          seat.style.background = "#EDE6E6";
          seat.style.border = "2px solid black";
        });   
        for (var id in data) {
          bookedSeatArray.push(id);
          var seat = document.getElementById(id);
          // occupied
          if(data[id].whatsup=='occupied') {
            seat.style.background = "#D2B48C";
              seat.childNodes[1].textContent = data[id].caption;
          }
          // concentrate
          else if(data[id].whatsup=='concentrate') {
            seat.style.background = "#F5DEB3";
              seat.childNodes[1].textContent = data[id].caption;
          }
          // entertain
          else if(data[id].whatsup=='entertain') {
            seat.style.background = "#FFD700";
              seat.childNodes[1].textContent = data[id].caption;
          }
          // want_date
          else if(data[id].whatsup=='want_date') {
            seat.style.background = "#FFA07A";
              seat.childNodes[1].textContent = data[id].caption;
          }
          // want_friend
          else if(data[id].whatsup=='want_friend') {
            seat.style.background = "#D2691E";
              seat.childNodes[1].textContent = data[id].caption;
          }
          // want_friend
          else if(data[id].whatsup=='want_study_friend') {
            seat.style.background = "#B22222";
              seat.childNodes[1].textContent = data[id].caption;
          }
        }      

     
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
        s.style.background = "#8FBC8F";
      }
      else {
        s.style.background = "#b4ee69";;
      }
    }
  }
    
  function updateCurrentPerson() {
    // update current person
    currentPerson = idArray[indexOfCurrentSelectedFriend];
    document.getElementById("choosed-friend").textContent = selectedFriendList.get(currentPerson);
    // update current selected seat
    currentSelectedSeat = pendingBookingSeat.get(currentPerson);
  }
  
  function isOccupied(id) {
    for (var i = 0; i < bookedSeatArray.length; i++) {
        if (bookedSeatArray[i] == id) return true;
    }
    return false;
  }
  function isFriendSeat(id) {
    for (const [key, value] of pendingBookingSeat) {
      if (value == currentSelectedSeat) continue;
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
          pendingBookingSeat.set(currentPerson,currentSelectedSeat);
          seat.style.background = "#8FBC8F";
        }
        // unselect seat
        else if (currentSelectedSeat == seat.id) {
          currentSelectedSeat = null;
          pendingBookingSeat.delete(currentPerson);
          seat.style.background = "#EDE6E6";
        }
        // change seat
        else {
          seat.style.background = "#8FBC8F";
          document.getElementById(currentSelectedSeat).style.background = "#EDE6E6";
          currentSelectedSeat = seat.id;
          pendingBookingSeat.set(currentPerson,currentSelectedSeat);
        }
      });
    });
  }
  
  function addPreviousNextAction() {
    document.getElementById("previous-friend").addEventListener('click',function() {
      if (indexOfCurrentSelectedFriend==0) indexOfCurrentSelectedFriend = idArray.length-1;
      else indexOfCurrentSelectedFriend--;
      updateCurrentPerson();
      updateSeatColor();
    });
    document.getElementById("next-friend").addEventListener('click',function() {
      if (indexOfCurrentSelectedFriend==idArray.length-1) indexOfCurrentSelectedFriend = 0;
      else indexOfCurrentSelectedFriend++;
      updateCurrentPerson();
      updateSeatColor();
    });
  }
  function addContinueBookingAction() {
    const form = document.getElementById('form-submit-booking');
    form.addEventListener('submit',function(e) {
      e.preventDefault();

      if (pendingBookingSeat.get(localStorage.getItem('current_id')) == null) {
        console.log(document.getElementById('wanning-text'));
        // document.getElementsById('wanning-text').textContent = "You must choose your seat";
      }
      else {
        const json = JSON.stringify(Object.fromEntries(pendingBookingSeat));
        localStorage.setItem('selected-seat-map',json);
        window.location.href = "index-book-3.html";
      }
    })
  }
  
  // set default value
  allSeat = document.querySelectorAll('.seat');
  // receive friend-list from previous page, convert to array 
  selectedFriendList = new Map(JSON.parse(localStorage.getItem('selected-friend-list')));
  // always includes yourself when booking
  selectedFriendList.set(localStorage.getItem('current_id'),localStorage.getItem('current_name'));

  // set idArray to loop through
  idArray = Array.from(selectedFriendList.keys());
  // choose your seat first
  indexOfCurrentSelectedFriend = idArray.length-1;
    
  // booking step 2 - select seat (id : contain-map, book-map)

  // update seat and person first time
  updateCurrentPerson();
  updateSeatColor();
      
  // add click event for booking
  addChangeColorWhenClick();
  addPreviousNextAction();
  addContinueBookingAction();
  