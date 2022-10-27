// -------------- function to be done first ----------------- //

  // ------------------- all variable ----------------// 
  var friendList = new Map(); // id -> name
  var selectedFriendList = new Map(); // id -> name
  var indexOfCurrentSelectedFriend;
    
  // ------- funciton for booking step 1 : choose your friend --------- //
  
  async function updateFriendList() {
    var url = "http://demo.api.booking.vtneil.space/api/users/" + localStorage.getItem('current_id');
    await fetch(url).then(function(response) {
        return response.json();
      }).then(function(data) {

        // create selector
        let select = document.getElementById("friend-list-selector");
        select.innerHTML = '';
        select.innerHTML += `<option value="" selected disabled hidden>-- select course --</option>`;
        for (var i in data.friends) {
          loadFriendName(data.friends[i])
        }

    });
  }
  async function loadFriendName(friend_id) {
    var url = "http://demo.api.booking.vtneil.space/api/users/" + friend_id;
    await fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
        friendList.set(friend_id,data.name);
        var option = document.createElement("option");
        option.text = data.name;
        option.value = friend_id;
        document.getElementById("friend-list-selector").add(option);
    });
  }


  function selectFriend() {
    let friendId = document.getElementById('friend-list-selector').value;
    let friendName = friendList.get(friendId);
    selectedFriendList.set(friendId,friendName);
    createSelectedFriendTable();
  }
  function createSelectedFriendTable() {
    let table = document.getElementById('friend-to-book-table');
    table.innerHTML = `<tr>
                          <th>Student Id</th>
                          <th>Name</th>
                          <th></th>
                        </tr>`;

    selectedFriendList.forEach((name, id) => {
      table.innerHTML += `
      <tr id='${id+" row"}'>
          <td>${id}</td>
          <td>${name}</td>
          <td><div class="red-bt" id='${id}' >x</div></td>
      </tr>
      `
    });
    
    var btn = document.querySelectorAll(".red-bt");
    btn.forEach( b=> {
        b.addEventListener('click', function handleClick(event) {
          deleteSelectedFriendRow(b.id);
          selectedFriendList.delete(b.id);
          console.log(selectedFriendList)
        });
    });
  }
  function deleteSelectedFriendRow(id) {
    var element = document.getElementById(id+" row");
    element.parentNode.removeChild(element);
  }
  
  function addNextBtnLoadFriendToNextHTML() {
    const form = document.getElementById('form-select-seat');
    form.addEventListener('submit',function(e) {
      e.preventDefault();
      if (selectedFriendList.size==0) return;
      // set selected friend list to local storage
      var json = JSON.stringify(Array.from(selectedFriendList.entries()));
      localStorage.setItem('selected-friend-list',json);

      window.location.href = "index-book-2.html";
    })
  }
  // ------------ coding begin here -------------------- //
  // booking step 1 - select friend (id : select-friend)

    // SOMETHING WEONG HERE
    // get the old selection from local storage if exists
    if (localStorage.getItem('selected-friend-list')!=null) selectedFriendList = new Map(JSON.parse(localStorage.getItem('selected-friend-list')));
        
    // add user to selected-friend-map (just in case it there is no)
    else selectedFriendList.set(localStorage.getItem('current_id'),localStorage.getItem('current_name'));
  
    // update and create selector for all friends
    updateFriendList();

    // create table from old selection
    createSelectedFriendTable();
    
    // add event listener to select btn
    document.getElementById('select-friend-btn').addEventListener('click',selectFriend);
    
    // add event to next btn
    addNextBtnLoadFriendToNextHTML() 
  
  
  //-------------------------------------//
  
  