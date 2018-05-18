$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');
  let $points = $('.points');

  let gravityIntervalId;

  function divCreator(){
    const $div = $('<div />');
    $div.addClass('hoop');
    $playField.append($div);
    // divMover can be stopped but might remove the "const" later
    const divMover = setInterval(function(){
      $div.css('left', '-=5px');
      $('.hoop').each(function(index, hoop){
        collisionDetector(hoop)
      });
    },50);
  }

  // function to move game Character up bt pressing space
  function moveCharacter(){
    $(document).on('keydown', function(e){
      if(gravityIntervalId){
        clearInterval(gravityIntervalId);
      }
      if (e.which === 32 && $gameCharacter.position().top > 0){
        console.log('space');
        e.preventDefault();
        $gameCharacter.css('top', '-=20px');
        // clearInterval(falling);
        gravityIntervalId = setInterval(function(){
          $gameCharacter.css('top', '+=2px');
        },50);
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

    //detecting collisions for hoop itself
    if ($elOffset.left < $el_2_Offset.left + $el_2.width() &&
    $elOffset.left + $gameCharacter.width() > $el_2_Offset.left &&
    $elOffset.top > $el_2_Offset.top &&
    $gameCharacter.height() + $elOffset.top < $el_2_Offset.top + 145) {
      $points.text(+$points.text()+1);
    }
    //detecting collisions for bar
    if ($elOffset.left < $el_2_Offset.left + $el_2.width() &&
    $elOffset.left + $gameCharacter.width() > $el_2_Offset.left &&
    $elOffset.top > $el_2_Offset.top +145 &&
    $gameCharacter.height() + $elOffset.top > $el_2_Offset.top + 145) {
      $gameCharacter.css('background-color', '#FFF');
    }
  }

  function init(){
    moveCharacter();
    $(document).on('keydown', function(e){
      if (e.which === 13){
        console.log('enter');
        e.preventDefault();
        const hoopDispatcher = function(){
          divCreator();
          setInterval(divCreator, 4000 );

        };
        hoopDispatcher();
      }
    });
  }
  init();
});

// $gameCharacter.css('background-color', '#'+Math.floor(Math.random()*16777215).toString(16))


// Math.floor(Math.random()*6000)


//detecting collisions general
// if ($elOffset.left < $el_2_Offset.left + $el_2.width() &&
// $elOffset.left + $gameCharacter.width() > $el_2_Offset.left &&
// $elOffset.top < $el_2_Offset.top + $el_2.height() &&
// $gameCharacter.height() + $elOffset.top > $el_2_Offset.top) {
//   $gameCharacter.css('background-color', '#'+Math.floor(Math.random()*16777215).toString(16));
// }

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
