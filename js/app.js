$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');
  const hoopArray = ['hoop1', 'hoop2','hoop3', 'hoop4'];
  const audio = document.querySelector('#audio');
  const $themes = document.querySelectorAll('img');
  const $gamePage = $('.gamePage');
  const $welcomePage = $('.welcomePage');
  const $points = $('.points');
  const $points2 = $('.points2');
  const noDuplicateScore = [];
  const gravity = 1;
  const $resetButton = $('.resetButton');
  const $loadGamePage = $('.loadGamePage');
  const $getPlayerName = $('.getPlayerName');
  const $submit = $('input[type=submit]');
  const $text = $('input[type=text]');
  let $endScore, $playerName, $instruction, gravityIntervalId, hoopIntervalId,
    divMoverIntervalId, characterMoverIntervalId, scoreValues, topHoop,
    hoopSpeedUpIntervalId;
  let vSpeed = 0;
  let gameOngoing = false;
  let hoopSpeed = 50;
  let dispatchSpeed = 3000;
  let gamePageLoaded = false;
  let welcomePageLoaded = true;
  let gameOverPageLoaded = false;

  $gamePage.hide();
  $getPlayerName.hide();

  $loadGamePage.on('click', loadWelcomePage);
  $(window).on('keydown', function(e){
    if(e.which === 13 && welcomePageLoaded === true){
      e.preventDefault();
      loadWelcomePage();
    }
  });


  function loadWelcomePage(){
    $welcomePage.slideUp();
    $gamePage.show();
    nameHighScore();
    $('.logo').css({
      'height': '75px',
      'width': '150px'
    });
    startInstructions();
    gamePageLoaded = true;
    welcomePageLoaded = false;
  }


  function enableLevels(){
    clearInterval(hoopSpeedUpIntervalId);
    hoopSpeedUpIntervalId = setInterval(function(){
      if(hoopSpeed > 10) hoopSpeed -= 10;
      if(dispatchSpeed >1000) dispatchSpeed -= 1000;
    },20000);
  }


  //function to create hoops in different sizes
  function divCreator(){
    const $div = $('<div />');
    $div.addClass('hoop');
    const randomClassNumber = Math.floor(Math.random()*hoopArray.length);
    topHoop = `hoop${randomClassNumber+1}topPart`;
    $div.addClass(hoopArray[randomClassNumber]).addClass('detectable');
    const $topDiv = $('<div />');
    $topDiv.addClass(`${topHoop} topHoop`);
    $playField.append([$div, $topDiv]);
    divMoverIntervalId = setInterval(function(){
      if($.isMobile){
        $div.css('left', '-=2px');
        $topDiv.css('left', '-=2px');
      }else{
        $div.css('left', '-=5px');
        $topDiv.css('left', '-=5px');
      }
      borderDetection();
      $('.hoop').each(collisionDetector);
      hoopRemover();
    },hoopSpeed);
    clearInterval(characterMoverIntervalId);
    characterMoverIntervalId = setInterval(function(){
      $gameCharacter.css('top', function(i, top){
        return `${+(top.replace('px','')) - vSpeed}px`;
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
      const $el = $(item);
      if($el.css('left') === '0px') $el.remove();
    });
  }

  function borderDetection(){
    if ($gameCharacter.css('top') < '0' || $gameCharacter.css('bottom') < '0')
      gameOver();
  }

  function collision(a, b){
    const aOffset = a.offset();
    const bOffset = b.offset();
    return (aOffset.left + a.width() > bOffset.left &&
    aOffset.left < bOffset.left + b.width() &&
    aOffset.top > bOffset.top + $topBarSize &&
    aOffset.top + a.height() < bOffset.top + $hoopSize);
  }

  const $topBarSize = parseFloat($('.playField').css('height'))*(2/700);
  const $hoopSize =  parseFloat($('.playField').css('height'))*(145/700);
  const $widthToBar = parseFloat($('.playField').css('height'))*(23/700);

  //function to detect point scoring and hitting the bars
  function collisionDetector(index, shape){
    const $gameCharacterOffset = $gameCharacter.offset();
    const $hoop = $(shape);
    const $hoopOffset = $hoop.offset();




    // detecting collision for points inside hoop
    if(collision($gameCharacter, $hoop)) {
      if($hoop.hasClass('detectable')){
        $points.text(+$points.text()+1);
        hoopSwoosh();
        $hoop.removeClass('detectable');
      }
    }
    //detecting collisions for bar - top of character vs bar
    if ($gameCharacterOffset.left < $hoopOffset.left + $hoop.width() - $widthToBar &&
    $gameCharacterOffset.left + $gameCharacter.width() > $hoopOffset.left + $widthToBar &&
    $gameCharacterOffset.top > $hoopOffset.top + $hoopSize &&
    $gameCharacter.height() + $gameCharacterOffset.top > $hoopOffset.top + $hoopSize) {
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
    if (e.which === 32 && gameOngoing === false && gamePageLoaded === true){
      e.preventDefault();
      gameOngoing = true;
      hoopDispatcher();
      $instruction.hide();
      clearInterval(gravityIntervalId);
      gravityIntervalId = setInterval(function(){
        vSpeed -= gravity;
      },50);
      enableLevels();
    }
    if (e.which === 32 && gameOngoing === true && gamePageLoaded === true){
      e.preventDefault();
      vSpeed = 9;
    }
  });

  if($.isMobile){
    $playField.on('click', function(){
      if (gameOngoing === false && gamePageLoaded === true && gameOverPageLoaded === false){
        gameOngoing = true;
        console.log(gameOverPageLoaded);
        hoopDispatcher();
        $instruction.hide();
        clearInterval(gravityIntervalId);
        gravityIntervalId = setInterval(function(){
          vSpeed -= gravity;
        },50);
        enableLevels();
      }
      if (gameOngoing === true && gamePageLoaded === true){
        vSpeed = 7;
      }
    });
  }


  function gameOverSubmit(){
    console.log(gameOverPageLoaded);
    $playerName = $text.val();
    localStorage.setItem(`${$playerName}`, `${$endScore}`);
    nameHighScore();
    $getPlayerName.hide();
    $text.val('');
    $points.text('0');
    $points2.text('0');
    setTimeout(function() {
      gameOverPageLoaded = false;
    }, 200);
  }

  function getPlayerName(){
    $getPlayerName.show();
    $submit.on('click', function(e){
      e.preventDefault();
      gameOverSubmit();
    });
    $text.on('keydown', function(e){
      if(e.which === 13){
        e.preventDefault();
        gameOverSubmit();
      }
    });
  }

  //function to reset the game conditions
  function gameOver(){
    gameOverPageLoaded= true;
    console.log(gameOverPageLoaded);
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
    $gameCharacter.css({
      'left': '40%',
      'top': '50%'
    });
    $('div.hoop, div.topHoop').remove();
  }
  function highScoreSorter(scoreValues){
    return scoreValues.sort((a, b) => b - a);
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

  $resetButton.on('click', function(){
    localStorage.clear();
    nameHighScore();
  });

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

  function startInstructions(){
    $instruction = $('<h2 />');
    if($.isMobile){
      $instruction.text('Tap To Start').addClass('instruction');
    }else{
      $instruction.text('Press Space To Start').addClass('instruction');
    }
    $playField.append($instruction);
  }

  $('.showHighScoreButton').on('click', function(){
    $('.highScore').css('display', 'flex');
    $('.showHighScoreButton').hide();
    $('.closeHighScoresButton').show();
  });

  $('.closeHighScoresButton').on('click', function(){
    $('.highScore').css('display', 'none');
    $('.showHighScoreButton').show();
    $('.closeHighScoresButton').hide();
  });

});
