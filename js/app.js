$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');
  let $points = $('.points');
  let gameSwitch = true;

  let gravityIntervalId;
  let hoopIntervalId;
  let divMoverIntervalId;

  function divCreator(){
    const $div = $('<div />');
    $div.addClass('hoop');
    $div.addClass('detectable');
    $playField.append($div);
    // divMover can be stopped but might remove the "const" later
    divMoverIntervalId = setInterval(function(){
      $div.css('left', '-=5px');
      $('.hoop').each(function(index, hoop){
        collisionDetector(hoop)
      });
    },50);
  }

  // function to move game Character up by pressing space
  function moveCharacter(){
    $(document).on('keydown', function(e){
      if(gravityIntervalId){
        clearInterval(gravityIntervalId);
      }
      if (e.which === 32 && $gameCharacter.position().top > 0){
        console.log('space');
        e.preventDefault();
        $gameCharacter.css('top', '-=20px');
        gravityIntervalId = setInterval(function(){
          $gameCharacter.css('top', '+=2px');
        },50);
      }else if(e.which === 32){
        e.preventDefault();
      }
    });
  }

  function collisionDetector(shape){
    //--> is this code even needed?
    // const left = parseInt($gameCharacter.css('left'));
    // const top = parseInt($gameCharacter.css('top'));

    const $elOffset = $gameCharacter.offset();
    const $el_2 = $(shape);
    const $el_2_Offset = $el_2.offset();

    //detecting collisions for hoop itself
    if ($elOffset.left < $el_2_Offset.left + $el_2.width() &&
    $elOffset.left + $gameCharacter.width() > $el_2_Offset.left &&
    $elOffset.top > $el_2_Offset.top &&
    $gameCharacter.height() + $elOffset.top < $el_2_Offset.top + 145) {
      if($el_2.hasClass('detectable')){
        $points.text(+$points.text()+1);
        $el_2.removeClass('detectable');
      }
    }
    //detecting collisions for bar
    if ($elOffset.left < $el_2_Offset.left + $el_2.width() &&
    $elOffset.left + $gameCharacter.width() > $el_2_Offset.left + 24 &&
    $elOffset.top > $el_2_Offset.top +145 &&
    $gameCharacter.height() + $elOffset.top > $el_2_Offset.top + 145) {
      console.log('game over');
      gameOver();
    }
    //detecting collision for top part of hoop
    if ($elOffset.left < $el_2_Offset.left + $el_2.width() &&
    $elOffset.left + $gameCharacter.width() > $el_2_Offset.left &&
    $elOffset.top > $el_2_Offset.top &&
    $gameCharacter.height() + $elOffset.top < $el_2_Offset.top + 2) {
      console.log('game over');
      gameOver();
    }
  }

  function init(){
    $(document).on('keydown', function(e){
      if (e.which === 13){
        console.log('enter');
        e.preventDefault();
        moveCharacter();
        const hoopDispatcher = function(){
          divCreator();
          hoopIntervalId = setInterval(divCreator, 4000 );
        };
        hoopDispatcher();
      }
    });
  }

//function to reset the game conditions
  function gameOver(){
    $('div.hoop').remove();
    clearInterval(hoopIntervalId);
    alert('Game Over!');
    clearInterval(divMoverIntervalId);
    clearInterval(gravityIntervalId);
    $gameCharacter.css('top', '50%');
    $gameCharacter.css('left', '40%');
  }

  init();
});

// Math.floor(Math.random()*6000)


//detecting collisions general
// if ($elOffset.left < $el_2_Offset.left + $el_2.width() &&
// $elOffset.left + $gameCharacter.width() > $el_2_Offset.left &&
// $elOffset.top < $el_2_Offset.top + $el_2.height() &&
// $gameCharacter.height() + $elOffset.top > $el_2_Offset.top) {
//   $gameCharacter.css('background-color', '#'+Math.floor(Math.random()*16777215).toString(16));
// }
