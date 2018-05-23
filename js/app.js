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
  const $getPlayerName = $('.getPlayerName');
  const $submit = $('input[type=submit]');
  const $text = $('input[type=text]');
  let $endScore;
  let $playerName;
  let $instruction;
  let vSpeed = 0;
  let gravityIntervalId;
  let hoopIntervalId;
  let divMoverIntervalId;
  let characterMoverIntervalId;
  let scoreValues;
  let topHoop;
  let gameOngoing = false;
  let hoopSpeed = 50;
  let dispatchSpeed = 4000;
  let hoopSpeedUpIntervalId;

  $gamePage.hide();
  $getPlayerName.hide();


  $loadGamePage.on('click', function(){
    $welcomePage.slideUp();
    $gamePage.show();
    nameHighScore();
    $('.logo').css('height', '75px');
    $('.logo').css('width', '150px');
    startInstructions();
  });

  function enableLevels(){
    clearInterval(hoopSpeedUpIntervalId);
    hoopSpeedUpIntervalId = setInterval(function(){
      if(hoopSpeed > 10){
        hoopSpeed -= 10;
      }
      if(dispatchSpeed >1000){
        dispatchSpeed -= 1000;
      }
    },20000);
  }


  //function to create hoops in different sizes
  function divCreator(){
    const $div = $('<div />');
    $div.addClass('hoop');
    const randomClassNumber = Math.floor(Math.random()*hoopArray.length);
    switch(randomClassNumber){
      case 0:
        topHoop = 'hoop1topPart';
        break;
      case 1:
        topHoop = 'hoop2topPart';
        break;
      case 2:
        topHoop = 'hoop3topPart';
        break;
      case 3:
        topHoop = 'hoop4topPart';
        break;
    }
    $div.addClass(hoopArray[randomClassNumber]);
    $div.addClass('detectable');
    const $topDiv = $('<div />');
    $topDiv.addClass(topHoop);
    $topDiv.addClass('topHoop');
    $playField.append($div);
    $playField.append($topDiv);
    divMoverIntervalId = setInterval(function(){
      $div.css('left', '-=5px');
      $topDiv.css('left', '-=5px');
      borderDetection();
      $('.hoop').each(function(index, hoop){
        collisionDetector(hoop);
      });
      hoopRemover();
    },hoopSpeed);
    clearInterval(characterMoverIntervalId);
    characterMoverIntervalId = setInterval(function(){
      $gameCharacter.css('top', function(i, top){
        const newTop = `${+(top.replace('px','')) - vSpeed}px`;
        return newTop;
      });
    },50);
  }

  function hoopDispatcher(){
    divCreator();
    hoopIntervalId = setInterval(divCreator, dispatchSpeed );
  }

  //remove hoop when it leaves the window 
  function hoopRemover(){
    $('div').each(function(i, item){
      const el = $(item);
      if(el.css('left') === '0px'){
        el.remove();
      }
    });
  }

  function borderDetection(){
    if ($gameCharacter.css('top') < '0' || $gameCharacter.css('bottom') < '0'){
      gameOver();
    }
  }

  //function to detect point scoring and hitting the bars
  function collisionDetector(shape){
    const $gameCharacterOffset = $gameCharacter.offset();
    const $hoop = $(shape);
    const $hoopOffset = $hoop.offset();

    // detecting collision for points inside hoop
    if($gameCharacterOffset.left + $gameCharacter.width() > $hoopOffset.left &&
    $gameCharacterOffset.left < $hoopOffset.left + $hoop.width() &&
    $gameCharacterOffset.top > $hoopOffset.top + 2 &&
    $gameCharacterOffset.top + $gameCharacter.height() < $hoopOffset.top +145) {
      if($hoop.hasClass('detectable')){
        $points.text(+$points.text()+1);
        hoopSwoosh();
        $hoop.removeClass('detectable');
      }
    }
    //detecting collisions for bar - top of character vs bar
    if ($gameCharacterOffset.left < $hoopOffset.left + $hoop.width() - 23 &&
    $gameCharacterOffset.left + $gameCharacter.width() > $hoopOffset.left + 23 &&
    $gameCharacterOffset.top > $hoopOffset.top +145 &&
    $gameCharacter.height() + $gameCharacterOffset.top > $hoopOffset.top + 145) {
      console.log('game over');
      gameOver();
    }

    //detecting collision for top part of hoop ---> Detects too early on top part
    if ($gameCharacterOffset.left + $gameCharacter.width() > $hoopOffset.left &&
    $gameCharacterOffset.left < $hoopOffset.left + $hoop.width() &&
    $gameCharacterOffset.top < $hoopOffset.top &&
    $gameCharacterOffset.top + $gameCharacter.height() > $hoopOffset.top) {
      console.log('game over');
      gameOver();
    }
  }

  //function that loads start of game
  $(document).on('keydown', function(e){
    if (e.which === 13 && gameOngoing === false){
      console.log('enter');
      e.preventDefault();
      gameOngoing = true;
      hoopDispatcher();
      $instruction.hide();
      clearInterval(gravityIntervalId);
      gravityIntervalId = setInterval(function(){
        vSpeed -= gravity;
      },50);
      enableLevels();
      $(document).on('keydown', function(e){
        if (e.which === 32){
          e.preventDefault();
          vSpeed = 8;
        }
      });
    }
  });

  function getPlayerName(){
    $getPlayerName.show();
    $submit.on('click', function(e){
      e.preventDefault();
      $playerName = $text.val();
      localStorage.setItem(`${$playerName}`, `${$endScore}`);
      nameHighScore();
      $getPlayerName.hide();
      $text.val('');
      $points.text('0');
    });
  }

  //function to reset the game conditions
  function gameOver(){
    getPlayerName();
    clearInterval(hoopIntervalId);
    clearInterval(divMoverIntervalId);
    clearInterval(gravityIntervalId);
    clearInterval(characterMoverIntervalId);
    clearInterval(hoopSpeedUpIntervalId);
    $endScore = $points.text();
    vSpeed = 0;
    $instruction.show();
    gameOngoing = false;
    resetGame();
  }

  function resetGame(){
    $gameCharacter.css('left', '40%');
    $gameCharacter.css('top', '50%');
    $('div.hoop').remove();
    $('div.topHoop').remove();
  }
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

  function startInstructions(){
    $instruction = $('<div />');
    $instruction.text('Press Enter To Start').addClass('instruction');
    $playField.append($instruction);
  }
});
