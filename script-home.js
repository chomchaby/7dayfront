  // -------------- function to be done first ----------------- //

  // ------------------- all variable ----------------//
  var allSeat;
  var occupiedSeat;
  var concentrateSeat
  var entertainSeat;
  var want_dateSeat;
  var want_friendSeat;
  var want_study_friendSeat;

  var showCaption;
  var myIntervalStatus;
  var myIntervalCaption
    
  // ---------------- function for home page --------------//
  function loadStatusToMap() {
      // color
      fetch('status.json').then(function(response) {
        return response.json();
      }).then(function(data) {
        // set default 
        allSeat.forEach(seat => {
          seat.style.background = "#EDE6E6";
          seat.style.border = "2px solid black";
        });
    console.log(data);
        data.forEach( seat => {
          const [id, value] = seat;
          console.log(id);
        })
        // // occupied seat
        // occupiedSeat = data.seatStatus.occupied
        // occupiedSeat.forEach(cell =>{
        //   var seats = document.querySelectorAll('#'+cell.seatId);
        //   seats.forEach(seat => {
        //     seat.style.background = "#D2B48C";
        //     if (seat.classList.contains('seat')) {
        //       seat.childNodes[1].textContent = cell.caption;
        //     }
        //   });
        // });
        // // concentrate seat
        // concentrateSeat = data.seatStatus.concentrate
        // concentrateSeat.forEach(cell =>{
        //   var seats = document.querySelectorAll('#'+cell.seatId);
        //   seats.forEach(seat => {
        //     seat.style.background = "#F5DEB3";
        //     if (seat.classList.contains('seat')) {
        //       seat.childNodes[1].textContent = cell.caption;
        //     }
        //   });
        // });
        // // entertain seat
        // entertainSeat = data.seatStatus.entertain
        // occupiedSeat.forEach(cell =>{
        //   var seats = document.querySelectorAll('#'+cell.seatId);
        //   seats.forEach(seat => {
        //     seat.style.background = "#FFD700";
        //     if (seat.classList.contains('seat')) {
        //       seat.childNodes[1].textContent = cell.caption;
        //     }
        //   });
        // });
        // // want_date seat
        // want_dateSeat = data.seatStatus.want_date
        // want_dateSeat.forEach(cell =>{
        //   var seats = document.querySelectorAll('#'+cell.seatId);
        //   seats.forEach(seat => {
        //     seat.style.background = "#FFA07A";
        //     if (seat.classList.contains('seat')) {
        //       seat.childNodes[1].textContent = cell.caption;
        //     }
        //   });
        // });
        // // want_friend seat
        // want_friendSeat = data.seatStatus.want_friend
        // want_friendSeat.forEach(cell =>{
        //   var seats = document.querySelectorAll('#'+cell.seatId);
        //   seats.forEach(seat => {
        //     seat.style.background = "#D2691E";
        //     if (seat.classList.contains('seat')) {
        //       seat.childNodes[1].textContent = cell.caption;
        //     }
        //   });
        // });
        // // want_study_friend seat
        // want_study_friendSeat = data.seatStatus.want_study_friend
        // want_study_friendSeat.forEach(cell =>{
        //   var seats = document.querySelectorAll('#'+cell.seatId);
        //   seats.forEach(seat => {
        //     seat.style.background = "#B22222";
        //     if (seat.classList.contains('seat')) {
        //       seat.childNodes[1].textContent = cell.caption;
        //     }
        //   });
        // });
        

      }).catch(function (error) {
        console.log(error);
      })
  }
  
  function captionShowUpdate() {
      // action
      allSeat.forEach(function(seat) {
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
    allSeat.forEach(seat => {
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
      allSeat.forEach(seat => {
        if (seat.childNodes[1].textContent !='') {
          seat.childNodes[1].classList.add('show');
        }
      });
      btn.innerHTML = 'no caption';
      showCaption = true;
    } else {
      allSeat.forEach(seat => {
        seat.childNodes[1].classList.remove('show');
      });
      btn.innerHTML = 'caption';
      showCaption = false;
    }
  };
  
  // ------------ coding begins here -------------------- //
  
    // set default value
    allSeat = document.querySelectorAll('.seat');
    showCaption = false;
  
    // home page (id : contain-map, status-map)
       // real time status and caption
        document.addEventListener('DOMContentLoaded', function() {
          myIntervalStatus = setInterval(loadStatusToMap, 2000);
        });
        document.addEventListener('DOMContentLoaded', function() {
          myIntervalCaption = setInterval(captionShowUpdate, 2000);
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