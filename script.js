window.addEventListener('DOMContentLoaded', (event) => {
    var els = document.querySelectorAll('.seat');
    els.forEach(function(cell) {
      if (cell.textContent == "Occupied") {
        cell.style.background ='red';
      }
      if (cell.textContent == "Vacant") {
        cell.style.background = 'green';
      }
    })
  })

const seats = document.querySelectorAll('.seat');
seats.forEach(seat => {
  seat.addEventListener('click', function handleClick(event) {
    var popup = seat.childNodes[1];
    // console.log(popup.classList);
    popup.classList.toggle("show");
    console.log(popup.parentNode.style.background);
  });
});
