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

      // set color by occupying and whatsup key (concentrate, want_friend,...)
      fetch('status.json').then(function(response) {
        return response.json();
      }).then(function(data) {
        // set default 
        allSeat.forEach(seat => {
          seat.style.background = "#EDE6E6";
          seat.style.border = "2px solid black";
        });
        for (var id in data) {
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
  
    // SET SOME ID
    localStorage.setItem('current-user-id','001');
    //localStorage.removeItem("");

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
        document.getElementById("caption-btn").addEventListener('click',toggleCaption); 
      
 
  
  
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