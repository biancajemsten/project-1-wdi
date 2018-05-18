$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');

  function divCreator(){
    const $div = $('<div />');
    $div.addClass('hoop');
    $playField.append($div);
    // divMover can be stopped but might remove the "const" later
    const divMover = setInterval(function(){
      $div.css('left', '-=10px');
    },500);
  }

  //this how you would do gravity?
  // $gameCharacter.throwable({gravity: {x: 0, y: -0.1}});


  // function to move game Character up bt pressing space
  function moveCharacter(){
    $(document).on('keydown', function(e){
      if (e.which === 32 && $gameCharacter.position().top > 0){
        console.log('space');
        e.preventDefault();
        $gameCharacter.css('top', '-=5px');
      }else if(e.which === 32){
        e.preventDefault();
      }
    });
  }

  Math.floor(Math.random()*6000);

  function init(){
    moveCharacter();
    $(document).on('keydown', function(e){
      if (e.which === 13){
        console.log('enter');
        e.preventDefault();
        const hoopDispatcher = function(){
          divCreator();
          setInterval((divCreator),Math.floor(Math.random()*6000));
        };
        hoopDispatcher();
      }
    });
  }

  init();
});
