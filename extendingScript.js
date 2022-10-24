var counter=10;
    setInterval( function(){
        counter--;

        if(counter>=0) {
            id = document.getElementById("countdown");
            id.innerHTML = counter;
        }

        if(counter ===0){
            id.innerHTML = "Time Out!!";
        }
    },1000);
   
