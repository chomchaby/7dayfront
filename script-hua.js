// const http = axios.create({
//     baseURL: 'http://demo.api.booking.vtneil.space',
//     timeout: 2000,
//     headers: {
//       'content-type': 'application/json',
//       'app-id': 'GET-THE-SECRET-KEY'
//     }
//   });
  
//   // Basic Async Call
//   http
//     .get('/api/users/6430000121')
//     .then((resp) => {
//       // Perform some action with response data
//       console.log(resp.data.booked_time);
//     })
//     .catch((error) => {
//       // Handle the error scenario
//       console.log(error);
//     });


// const http = axios.create({
//     baseURL: 'https://dummyapi.io/data/api',
//     timeout: 2000,
//     headers: {
//       'content-type': 'application/json',
//       'app-id': 'GET-THE-SECRET-KEY'
//     }
//   });
  
//   // Basic Async Call
//   http
//     .get('user?limit=10')
//     .then((resp) => {
//       // Perform some action with response data
//       console.log(resp.data.data[0]);
//     })
//     .catch((error) => {
//       // Handle the error scenario
//       console.log(error);
//     });

function getWeb() {
    axios.get('http://demo.api.booking.vtneil.space/api/users').then(function(response) {
        console.log(response.data.booked_item);
    }).catch(function(error) {
        console.log('error');
    })
}
getWeb();
