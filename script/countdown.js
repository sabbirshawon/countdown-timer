function updateTimer(deadline){
    var time = deadline - new Date();
    return{
        'days': Math.floor( time/(1000*60*60*24) ),
        'hours': Math.floor( (time/(1000*60*60)) % 24 ),
        'minutes': Math.floor( (time/1000/60) % 60 ),
        'seconds': Math.floor( (time/1000) % 60 ),
        'total': time
    };
}

function animateClock(span){
    span.className = "turn";
    setTimeout(function(){
        span.className = "";
    }, 700);
}

function startTimer(id, deadline){
    var timeInterval = setInterval(function(){
        var clock = document.getElementById(id);
        var timer = updateTimer(deadline);

        if(timer.total == ''){
            clearInterval(timeInterval);
            clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>'
        }
        
        clock.innerHTML = '<span>' + timer.days + '</span>'
                        + '<span>' + timer.hours + '</span>'
                        + '<span>' + timer.minutes + '</span>'
                        + '<span>' + timer.seconds + '</span>';
        
        //animations to clock
        var spans = clock.getElementsByTagName("span");
        animateClock(spans[3]);
        if(timer.seconds == 59) animateClock(spans[2]);
        if(timer.minutes == 59 && timer.seconds == 59) animateClock(span[1]);
        if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);



        //check for end of timer
        if(timer.total < 1){
            clearInterval(timeInterval);
            clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>'
        }

    }, 1000);

    //clearInterval(timeInterval);
}

window.onload = function(){
    var deadline = new Date("July 01, 2019 00:00:00");
    startTimer("clock", deadline);
}



var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;
  
  translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

  $('body').css({
    '-webit-transform': translate,
    '-moz-transform': translate,
    'transform': translate
  });

  window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;

});

moveBackground();