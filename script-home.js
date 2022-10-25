  // -------------- function to be done first ----------------- //

  // ------------------- all variable ----------------//
  var statusSeats;
  var showCaption;
  var occupiedSeat;
  var myInterval;
    
  // ---------------- function for home page --------------//
  function seatStatusUpdate() {
    // color
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
  
      // action
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
  
  // ------------ coding begins here -------------------- //
  
    // set default value
    statusSeats = document.querySelectorAll('.seat');
    showCaption = false;
  
    // home page (id : contain-map, status-map)
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