const seats = document.querySelectorAll('.seat');

seats.forEach(seat => {
  seat.addEventListener('click', function handleClick(event) {
    var popup = seat.childNodes[1];
    // console.log(popup.classList);
    popup.classList.toggle("show");
    // console.log(popup.parentNode.style.background);
  });
});

function startLiveUpdate() {
  setInterval(function() {
    fetch('default.php').then(function(response) {
      return response.json();
    }).then(function(data) {
      seats.forEach(seat => {
        seat.style.background = data.seatStatus;
      });
    }).catch(function (error) {
      console.log(error);
    })
  },500); 
}
document.addEventListener('DOMContentLoaded', function() {
  startLiveUpdate();
});


document.getElementById("floor-btn").addEventListener('click',toggleFloor);
function toggleFloor() {
  var btn = document.getElementById("floor-btn");
  if (btn.innerHTML == 'first floor') {
    btn.innerHTML = 'second floor';
  } else {
    btn.innerHTML = 'first floor';
  }
};

document.getElementById("caption-btn").addEventListener('click',toggleCaption);
function toggleCaption() {
  var btn = document.getElementById("caption-btn");
  if (btn.innerHTML == 'caption') {
    seats.forEach(seat => {
      seat.childNodes[1].classList.add('show');
    });
    btn.innerHTML = 'no caption';
  } else {
    seats.forEach(seat => {
      seat.childNodes[1].classList.remove('show');
    });
    btn.innerHTML = 'caption';
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