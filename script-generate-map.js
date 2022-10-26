// -------------- function to be done first ----------------- //
function generateZoneCMap() {
    var table = document.getElementById('zone-C-map');
    for (let r = 1; r <= 8; r++) {
      var idrow = "F1-C-row-" + r;
      table.innerHTML += `<tr id='${idrow}'></tr>`
      var item = document.getElementById(idrow);
      for (let c=8*(r-1)+1; c<=8*(r-1)+8; c++) {
        let idcol = c-r+1;
        let idseat;
        if (c<10) idseat = "F1-C0"+ c;
        else idseat = "F1-C"+ c;
        item.innerHTML += `<td id='${idcol}'>
                            <div class='seat' id='${idseat}'>
                              <span class="popuptext"></span>
                            </div>
                          </td>`
      }
    }
  }
generateZoneCMap();