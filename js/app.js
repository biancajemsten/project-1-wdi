$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');
  const hoopArray = ['hoop1', 'hoop2','hoop3', 'hoop4'];
  const audio = document.querySelector('#audio');
  const $themes = document.querySelectorAll('img');
  const $gamePage = $('.gamePage');
  const $welcomePage = $('.welcomePage');
  const $points = $('.points');
  const noDuplicateScore = [];
  const gravity = 1;
  const $resetButton = $('.resetButton');
  const $loadGamePage = $('.loadGamePage');
  let $endScore;
  let $playerName;
  let vSpeed = 0;
  let gravityIntervalId;
  let hoopIntervalId;
  let divMoverIntervalId;
  let scoreValues;

  $gamePage.hide();

  $loadGamePage.on('click', function(){
    $welcomePage.hide();
    $gamePage.show();
    nameHighScore();
  });

  function getPlayerName(){
    $playerName = prompt('Game Over! What\'s your name?');
  }

  //function to create hoops in different sizes
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

  // function to make character jump

  //function to detect if player hits the top
  function borderDetection(){
    if ($gameCharacter.css('top') < '0' || $gameCharacter.css('bottom') < '0'){
      gameOver();
    }
  }

  //function to detect point scoring and hitting the bars
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
  $(document).on('keydown', function(e){
    if (e.which === 13){
      console.log('enter');
      e.preventDefault();
      const hoopDispatcher = function(){
        divCreator();
        hoopIntervalId = setInterval(divCreator, 4000 );
      };
      hoopDispatcher();
      gravityIntervalId = setInterval(function(){
        vSpeed -= gravity;
      },50);
      $(document).on('keydown', function(e){
        if (e.which === 32){
          e.preventDefault();
          vSpeed = 8;
        }
      });
    }
  });

  //function to reset the game conditions
  function gameOver(){
    getPlayerName();
    clearInterval(hoopIntervalId);
    clearInterval(divMoverIntervalId);
    clearInterval(gravityIntervalId);
    vSpeed = 0;
    $endScore = $points.text();
    localStorage.setItem(`${$playerName}`, `${$endScore}`);
    nameHighScore();
    reset();
  }

  // function to sort the high scores by value
  function highScoreSorter(scoreValues){
    scoreValues.sort(function (a, b){
      return b - a;
    });
    return scoreValues;
  }

  //function to prevent names getting printed twice if they have the same score
  function duplicateCheck(scoreValues){
    $.each(scoreValues, function(i, el){
      if($.inArray(el, noDuplicateScore) === -1) noDuplicateScore.push(el);
    });
  }

  //function that updates the high score board
  function nameHighScore(){
    $('ol').text('');
    scoreValues = Object.values(localStorage);
    highScoreSorter(scoreValues);
    duplicateCheck(scoreValues);
    for (let m=0; m< noDuplicateScore.length; m++){
      for(var key in localStorage){
        if(localStorage[key] === noDuplicateScore[m]) {
          const $name = $('<li />');
          $name.text(key);
          $name.appendTo('.nameList');
          const $score = $('<li />');
          $score.text(noDuplicateScore[m]);
          $score.appendTo('.pointList');
        }
      }
    }
  }

  function reset(){
    $points.text('0');
    $gameCharacter.css('left', '40%');
    $gameCharacter.css('top', '50%');
    $('div.hoop').remove();
  }

  function hoopSwoosh(){
    audio.src = 'sounds/hoopSwoosh.wav';
    audio.play();
  }

  //theme changer
  for(let i = 0;i < $themes.length; i++){
    $themes[i].addEventListener('click', function(){
      $gameCharacter.css('background-image', `url(./images/${this.className}.png)`);
      $playField.css('background-image', `url(./images/${this.className}.jpg)`);
      audio.src = `sounds/${this.className}.mp3`;
      audio.play();
    });
  }

  $resetButton.on('click', function(){
    localStorage.clear();
    nameHighScore();
  });

});
