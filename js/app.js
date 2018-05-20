$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');
  const hoopArray = ['hoop1', 'hoop2','hoop3', 'hoop4'];
  const audio = document.querySelector('#audio');
  const $pokemonTheme = document.querySelector('.pokemonball');
  const $spiderPigTheme = document.querySelector('.spiderPig');
  const $themes = document.querySelectorAll('img');
  let $points = $('.points');
  let gameSwitch = true;

  let gravityIntervalId;
  let hoopIntervalId;
  let divMoverIntervalId;

  console.log($themes);

  function divCreator(){
    const $div = $('<div />');
    $div.addClass('hoop');
    $div.addClass(hoopArray[Math.floor(Math.random()*hoopArray.length)]);
    $div.addClass('detectable');
    $playField.append($div);
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
          $gameCharacter.css('top', '+=4px');
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


    // detecting collision for points inside hoop
    if($elOffset.left + $gameCharacter.width() > $el_2_Offset.left &&
    $elOffset.left < $el_2_Offset.left + $el_2.width() &&
    $elOffset.top > $el_2_Offset.top + 2 &&
    $elOffset.top + $gameCharacter.height() < $el_2_Offset.top +145) {
      if($el_2.hasClass('detectable')){
        $points.text(+$points.text()+1);
        hoopSwoosh();
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
    //detecting collision for top part of hoop ---> Detects too early on top part
    if ($elOffset.left + $gameCharacter.width() > $el_2_Offset.left &&
    $elOffset.left < $el_2_Offset.left + $el_2.width() &&
    $elOffset.top < $el_2_Offset.top &&
    $elOffset.top + $gameCharacter.height() > $el_2_Offset.top) {
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
    $points.text('0');
  }

  function hoopSwoosh(){
    audio.src = 'sounds/hoopSwoosh.wav';
    audio.play();
  }

  for(let i = 0;i < $themes.length; i++){
    $themes[i].addEventListener('click', function(){
      $gameCharacter.css('background-image', `url(./images/${this.className}.png)`);
      console.log('click');
    });
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


// //detecting collisions for hoop itself
// if ($elOffset.left < $el_2_Offset.left + $el_2.width() &&
// $elOffset.left + $gameCharacter.width() > $el_2_Offset.left &&
// $elOffset.top > $el_2_Offset.top &&
// $gameCharacter.height() + $elOffset.top < $el_2_Offset.top + 145) {
//   if($el_2.hasClass('detectable')){
//     $points.text(+$points.text()+1);
//     $el_2.removeClass('detectable');
//   }
// }
