src="https://unpkg.com/axios/dist/axios.min.js"

async function getUsers() {
    let url = 'http://demo.api.booking.vtneil.space/api/users';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
getUsers();
