$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');
  const hoopArray = ['hoop1', 'hoop2','hoop3', 'hoop4'];
  const audio = document.querySelector('#audio');
  const $themes = document.querySelectorAll('img');
  let $points = $('.points');
  let vSpeed = 0;
  let gravity = 1;
  let gravityIntervalId;
  let hoopIntervalId;
  let divMoverIntervalId;

  function divCreator(){
    const $div = $('<div />');
    $div.addClass('hoop');
    $div.addClass(hoopArray[Math.floor(Math.random()*hoopArray.length)]);
    $div.addClass('detectable');
    $playField.append($div);
    divMoverIntervalId = setInterval(function(){
      $div.css('left', '-=5px');
      $gameCharacter.css('top', function(i, top){
        const newTop = `${+(top.replace('px','')) - vSpeed}px`;
        return newTop;
      });
      $('.hoop').each(function(index, hoop){
        collisionDetector(hoop)
      });
    },50);
  }

  $(document).on('keydown', function(e){//<-------------------
    if (e.which === 32){
      console.log('space');
      e.preventDefault();
      vSpeed = 5;
    }
  });


  // function to move game Character up by pressing space
  // function moveCharacter(){
  //   $(document).on('keydown', function(e){
  //     if(gravityIntervalId){
  //       clearInterval(gravityIntervalId);
  //     }
  //     if (e.which === 32 && $gameCharacter.position().top > 0){
  //       console.log('space');
  //       e.preventDefault();
  //       $gameCharacter.css('top', '-=20px');
  //       gravityIntervalId = setInterval(function(){
  //         $gameCharacter.css('top', '+=4px');
  //       },50);
  //     }else if(e.which === 32){
  //       e.preventDefault();
  //     }
  //   });
  // }

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
    //detecting collisions for bar - top of character vs bar
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
    //MAKE THIS WORK
    // $themes[i].addEventListener('hover', function(){
    //   this.innerHTML(`${this.className}`);
    // });
  }

  init();
});
