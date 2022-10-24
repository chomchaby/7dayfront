// -------------- function to be done first ----------------- //

  // ------------------- all variable ----------------// 
  var selectedFriendArray;
  var indexOfCurrentSelectedFriend
    
  // ------- funciton for booking step 1 : choose your friend --------- //
  
  function updateFriendList() {
    fetch('account.json').then(function(response) {
        return response.json();
      }).then(function(data) {
        let select = document.getElementById("friend-list-selector");
        select.innerHTML = '';
        select.innerHTML += `<option value="" selected disabled hidden>-- select course --</option>`;
        data.friend.forEach(element => {
            var option = document.createElement("option");
             option.text = element.name;
             option.value = element.name + " " + element.studentId;
             select.add(option);
        }); 
    });
  }
  function selectFriend() {
    let friend = document.getElementById('friend-list-selector').value;
    selectedFriendSet.add(friend);
    createSelectedFriendTable();
  }
  function createSelectedFriendTable() {
    let table = document.getElementById('friend-to-book-table');
    table.innerHTML = '';
    for (const friend of selectedFriendSet) {
        table.innerHTML += `
        <tr id='${"selected-"+friend}'>
            <td>${friend}</td>
            <td><button class="del-row-btn" id='${"selected-"+friend}' >Delete</button></td>
        </tr>
        `
    }
    var btn = document.querySelectorAll(".del-row-btn");
    btn.forEach( b=> {
        let friend = b.id.slice(9)
        b.addEventListener('click', function handleClick(event) {
          deleteSelectedFriend(b.id);
          selectedFriendSet.delete(friend);
        });
    });
  }
  function deleteSelectedFriend(id) {
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
  }
  
  function addContinueLoadFriendToNextHTML() {
    const form = document.getElementById('form-select-seat');
    form.addEventListener('submit',function(e) {
      if (selectedFriendSet.size==0) return;
      e.preventDefault();
      const json = JSON.stringify(Array.from(selectedFriendSet));
      localStorage.setItem('selected-friend-set',json);
      window.location.href = "index-book-2.html";
    })
  }
  
  // ------------ coding begin here -------------------- //
  // booking step 1 - select friend (id : select-friend)
    var selectedFriendSet = new Set();
    updateFriendList();
    document.getElementById('select-friend-btn').addEventListener('click',selectFriend);
  
    addContinueLoadFriendToNextHTML(); 
  
  
  //-------------------------------------//
  
  