<<<<<<< HEAD
let countTime = new Date("Oct 27, 2022 18:30:00").getTime();
||||||| 7f9587d
let countTime = new Date("Oct 26, 2022 21:00:00").getTime();
=======
let countTime = new Date("Oct 27, 2022 18:10:00").getTime();
>>>>>>> f96b1102013eb8abd2a06031333d27dc49837800

let timer = setInterval(function(){
    var now = new Date().getTime();
    var distance = countTime - now;
    var days = Math.floor(distance/ (1000*60*60*24));
    var hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    var minutes = Math.floor((distance% (1000*60*60)) / (1000*60));
    var seconds = Math.floor((distance% (1000*60)) / 1000);

    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (minutes==0 && seconds==0) {
        console.log("helo");
        window.location.href = "index-home.html";
    }
},1000)


/*var counter=10;
    setInterval( function(){
        counter--;

        if(counter>=0) {
            id = document.getElementById("countdown");
            id.innerHTML = counter;
        }

        if(counter ===0){
            id.innerHTML = "Time Out!!";
            window.location.href = "index-home.html";
        }
    },1000);*/
   
