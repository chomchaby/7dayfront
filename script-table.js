        $(document).ready(function () {

            // FETCHING DATA FROM JSON FILE
            $.get('http://demo.api.booking.vtneil.space/api/users', 
                    function (data) {
                var student = '';
                var userid = localStorage.getItem('current_id');

                // ITERATING THROUGH OBJECTS
                $.each(data[userid].friends, function (key, value) {

                    //CONSTRUCTION OF ROWS HAVING
                    // DATA FROM JSON OBJECT
                    student += '<tr>';
                    student += '<td>' + 
                        data[value].name + '</td>';

                    student += '<td>' + 
                        data[value].current_seat_id + '</td>';

                    student += '</tr>';
                });
                  
                //INSERTING ROWS INTO TABLE 
                $('#table').append(student);
            });
        });
