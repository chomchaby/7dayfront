window.onload = function(){
    var img = document.getElementById("popcat1");
    var count = document.getElementById("score");
    var score = 0;
 
    img.addEventListener('mousedown', function(){
        increaseScore();
        img.src = "Popcat Wow png.png";
    });
    
    img.addEventListener('mouseup', function(){
        img.src = "Popcat png.png";
    });

    function increaseScore(){
            score++;
            count.innerHTML = score;
        
    }

    var counter=30;
    setInterval( function(){
        counter--;

        if(counter>=0) {
            id = document.getElementById("countdown");
            id.innerHTML = counter;
        }

        if(counter ===0){
            id.innerHTML = "Your score is "+ score;
        }
    },1000);
   
}