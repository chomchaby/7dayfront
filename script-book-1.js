function updateFriendList() {
    fetch('account.json').then(function(response) {
        return response.json();
      }).then(function(data) {
        let select = document.getElementById("friend-list-selector");
        select.innerHTML = '';
        select.innerHTML += `<option value="" selected disabled hidden>-- select course --</option>`;
        data.friend.forEach(element => {
            var option = document.createElement("option");
             option.text = element.studentId;
             option.value = element.studentId;
             select.add(option);
        }); 
    });
}
updateFriendList();

var selectedFriend = new Set();
document.getElementById('select-friend-btn').addEventListener('click',selectFriend);
function selectFriend() {
    let friend = document.getElementById('friend-list-selector').value;
    selectedFriend.add(friend);
    createSelectedFriendTable();
}
function createSelectedFriendTable() {
    let table = document.getElementById('friend-to-book-table');
    table.innerHTML = '';
    for (const friend of selectedFriend) {
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
                selectedFriend.delete(friend);
          });
    });
}

function deleteSelectedFriend(id) {
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
}
