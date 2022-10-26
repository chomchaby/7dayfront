 // -------------- function to be done first ----------------- //

  // ------------------- all variable ----------------//

  var allSeat;
  var redSeatArray;
  var occupiedSeat;

  var currentSelectedSeat; // store id
  
  // --------- function for booking step 2 : select seats ------------------- //
  async function loadStatusToMap() {
    redSeatArray = [];
    await fetch('default.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      // green seat
      allSeat.forEach(seat => {
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
  
  function isOccupied(id) {
    for (var i = 0; i < redSeatArray.length; i++) {
        if (redSeatArray[i] == id) return true;
    }
    return false;
  }
  function addChangeColorWhenClick() {
    allSeat.forEach(seat => {
      seat.addEventListener('click', function handleClick(event) {
        
        // select occupied seat -> return
        if (isOccupied(seat.id)) {
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
  