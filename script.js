const allSeats = document.querySelectorAll('.seat ,.book-seat');
const statusSeats = document.querySelectorAll('.seat');
const bookSeats = document.querySelectorAll('.book-seat');
var showCaption = false;

var occupiedSeat;
function startLiveUpdate() {
  setInterval(function() {
    fetch('default.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      allSeats.forEach(seat => {
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

  },2000); 
}
document.addEventListener('DOMContentLoaded', function() {
  startLiveUpdate();
});

statusSeats.forEach(seat => {
  seat.addEventListener('click', function handleClick(event) {
    // console.log(seat.childNodes);
    var popup = seat.childNodes[1];
    // console.log(popup.classList);
    if (popup.textContent!='') popup.classList.toggle("show");
    // console.log(popup.parentNode.style.background);
  });
});

document.getElementById("caption-btn").addEventListener('click',toggleCaption);
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

document.getElementById("floor-btn").addEventListener('click',toggleFloor);
function toggleFloor() {
  var btn = document.getElementById("floor-btn");
  if (btn.innerHTML == 'first floor') {
    btn.innerHTML = 'second floor';
  } else {
    btn.innerHTML = 'first floor';
  }
};


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