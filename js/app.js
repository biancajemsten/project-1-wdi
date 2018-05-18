$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');
  let gravityIntervalId;



  function divCreator(){
    const $div = $('<div />');
    $div.addClass('hoop');
    $playField.append($div);
    // divMover can be stopped but might remove the "const" later
    const divMover = setInterval(function(){
      $div.css('left', '-=10px');
      $('.hoop').each(function(index, hoop){
        collisionDetector(hoop)
      });
    },500);
  }

  //this how you would do gravity?
  // $gameCharacter.throwable({gravity: {x: 0, y: -0.1}});

  // function to move game Character up bt pressing space
  function moveCharacter(){
    $(document).on('keydown', function(e){
      if(gravityIntervalId){
        clearInterval(gravityIntervalId);
      }
      if (e.which === 32 && $gameCharacter.position().top > 0){
        console.log('space');
        e.preventDefault();
        $gameCharacter.css('top', '-=10px');
        // clearInterval(falling);
        gravityIntervalId = setInterval(function(){
          $gameCharacter.css('top', '+=2px');
        },250);
      }else if(e.which === 32){
        e.preventDefault();
      }
    });
  }

  function collisionDetector(shape){
    const left = parseInt($gameCharacter.css('left'));
    const top = parseInt($gameCharacter.css('top'));

    const $elOffset = $gameCharacter.offset();
    const $el_2 = $(shape);
    const $el_2_Offset = $el_2.offset();

    //detecting collisions
    if ($elOffset.left < $el_2_Offset.left + $el_2.width() &&
    $elOffset.left + $gameCharacter.width() > $el_2_Offset.left &&
    $elOffset.top < $el_2_Offset.top + $el_2.height() &&
    $gameCharacter.height() + $elOffset.top > $el_2_Offset.top) {
      $gameCharacter.css('background-color', '#'+Math.floor(Math.random()*16777215).toString(16));
    }
  }







  //Current Problems
  //sets new interval everytime the button is clicked - need to clear

  // MAthRandom not working
  // Math.floor(Math.random()*6000)

  // // clearInterval(falling);
  // const falling = setInterval(function(){
  //   $gameCharacter.css('top', '+=2px');
  // },500);


  function init(){
    moveCharacter();
    $(document).on('keydown', function(e){
      if (e.which === 13){
        console.log('enter');
        e.preventDefault();
        const hoopDispatcher = function(){
          divCreator();
          setInterval(divCreator,Math.floor(Math.random()*6000));

        };
        hoopDispatcher();
      }
    });
    // collisionDetector();
  }
  init();
});


  // ******************
  // gravity
  // ******************
  //
  // // let context = $playField.getContext('2d');
  //
  // // physical variables
  // let g = 0.1; // gravity
  // let fac = 0.8; // velocity reduction factor per bounce
  // let radius = 20; // ball radius
  // let color = "#0000ff"; // ball color
  //
  // // initialise position and velocity of ball
  // let x = 50;
  // let y = 50;
  // let vx = 2;
  // let vy = 0;
  //
  // // function gravInit() {
  // // // set up a timer
  // //   setInterval(update, 1000/60); // 60 frames per second
  // // }
  //
  // function update() {
  //   // update velocity
  //   vy += g; // gravity
  //
  //   // update position
  //   x += vx;
  //   y += vy;
  //
  //   // handle bouncing
  //   if (y > $playField.height - radius){
  //     y = $playField.height - radius;
  //     vy *= -fac;
  //   }
  //
  //
  //   // wrap around
  //   if (x > $playField.width + radius){
  //     x = -radius;
  //   }
  //
  //   // update the ball
  //   // drawBall();
  // }
  // //
  // // function drawBall() {
  // //     with (context){
  // //         clearRect(0, 0, $playField.width, $playField.height); // clear canvas
  // //         fillStyle = color;
  // //         beginPath();
  // //         arc(x, y, radius, 0, 2*Math.PI, true);
  // //         closePath();
  // //         fill();
  // //     };
  // // };
  //
  // gravInit();
