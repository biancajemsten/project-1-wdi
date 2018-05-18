console.log('working');

$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');


  //this how you would do gravity?
  // $gameCharacter.throwable({gravity: {x: 0, y: -0.1}});

  function moveCharacter(){
    $(document).on('keydown', function(e){
      if (e.which === 32 && $gameCharacter.position().top > $playField.position().top){
        console.log('space');
        e.preventDefault();
        $gameCharacter.css('top', '-=5px');
      }
    });
  }

  moveCharacter(); 
});
