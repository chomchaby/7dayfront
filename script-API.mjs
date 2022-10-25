import fetch from "node-fetch"

fetch('http://demo.api.booking.vtneil.space/api/users')
    .then((res) => res.json())
    .then((data) => {
            console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
      });