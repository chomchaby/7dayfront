 // -------------- function to be done first ----------------- //

  // ------------------- all variable ----------------//

  var allSeat;
  var bookedSeatArray;;

  var currentSelectedSeat; // store id
  
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
  
  function isOccupied(id) {
    for (var i = 0; i < bookedSeatArray.length; i++) {
        if (bookedSeatArray[i] == id) return true;
    }
    return false;
  }
  function addChangeColorWhenClick() {
    allSeat.forEach(seat => {
      seat.addEventListener('click', function handleClick(event) {
        
        // select occupied seat, select friend seat -> return
        if (isOccupied(seat.id)) {
        }

        // general case
        // not select yet
        else if (currentSelectedSeat == null) {
          currentSelectedSeat = seat.id;
          seat.style.background = "red";
        }
        // unselect seat
        else if (currentSelectedSeat == seat.id) {
          currentSelectedSeat = null;
          seat.style.background = "#EDE6E6";
        }
        // change seat
        else {
          seat.style.background = "red";
          document.getElementById(currentSelectedSeat).style.background = "#EDE6E6";
          currentSelectedSeat = seat.id;
        }
      });
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
    
  // booking step 2 - select seat (id : contain-map, book-map)

      // update seat and person first time
      await loadStatusToMap();
      // add click event for booking
      addChangeColorWhenClick();

      addSubmitBookingAction();
  