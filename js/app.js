$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');
  const hoopArray = ['hoop1', 'hoop2','hoop3', 'hoop4'];
  const audio = document.querySelector('#audio');
  const $themes = document.querySelectorAll('img');
  const $gamePage = $('.gamePage');
  const $welcomePage = $('.welcomePage');
  const $submit = $('input[type=submit]');
  const $text = $('input[type=text]');
  let $points = $('.points');
  let vSpeed = 0;
  let gravity = 1;
  let gravityIntervalId;
  let hoopIntervalId;
  let divMoverIntervalId;
  let playerName;

  $gamePage.hide();

  $submit.on('click', function(e){
    e.preventDefault();
    playerName = $text.val();
    $welcomePage.hide();
    $gamePage.show();
  });

  function divCreator(){
    const $div = $('<div />');
    $div.addClass('hoop');
    $div.addClass(hoopArray[Math.floor(Math.random()*hoopArray.length)]);
    $div.addClass('detectable');
    $playField.append($div);
    divMoverIntervalId = setInterval(function(){
      $div.css('left', '-=5px');
      borderDetection();
      $gameCharacter.css('top', function(i, top){
        const newTop = `${+(top.replace('px','')) - vSpeed}px`;
        return newTop;
      });
      $('.hoop').each(function(index, hoop){
        collisionDetector(hoop);
      });
    },50);
  }

  $(document).on('keydown', function(e){
    if (e.which === 32){
      console.log('space');
      e.preventDefault();
      vSpeed = 8;
    }
  });

  function borderDetection(){
    if ($gameCharacter.css('top') < '0' || $gameCharacter.css('bottom') < '0'){
      gameOver();
    }
  }

  function collisionDetector(shape){
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
    //detecting collisions for bar - top of character vs bar
    if ($elOffset.left < $el_2_Offset.left + $el_2.width() - 23 &&
    $elOffset.left + $gameCharacter.width() > $el_2_Offset.left + 23 &&
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

  //function that loads start of game
  function init(){
    $(document).on('keydown', function(e){
      if (e.which === 13){
        console.log('enter');
        e.preventDefault();
        // moveCharacter();
        const hoopDispatcher = function(){
          divCreator();
          hoopIntervalId = setInterval(divCreator, 4000 );
        };
        hoopDispatcher();
        gravityIntervalId = setInterval(function(){
          vSpeed -= gravity;
        },50);
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
    vSpeed = 0;
  }

  function hoopSwoosh(){
    audio.src = 'sounds/hoopSwoosh.wav';
    audio.play();
  }

  for(let i = 0;i < $themes.length; i++){
    $themes[i].addEventListener('click', function(){
      $gameCharacter.css('background-image', `url(./images/${this.className}.png)`);
      $playField.css('background-image', `url(./images/${this.className}.jpg)`);
      audio.src = `sounds/${this.className}.mp3`;
      audio.play();
      console.log('click');
    });
  }

  init();
});
