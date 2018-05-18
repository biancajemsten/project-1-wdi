console.log('working');

$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');

  function divCreator(){
    const $div = document.createElement('div');
    $playField.append($div);
  }

  $(document).on('click', divCreator);



  //this how you would do gravity?
  // $gameCharacter.throwable({gravity: {x: 0, y: -0.1}});

  function moveCharacter(){
    $(document).on('keydown', function(e){
      if (e.which === 32 && $gameCharacter.position().top > $playField.position().top){
        console.log('space');
        e.preventDefault();
        $gameCharacter.css('top', '-=5px');
      }else if(e.which === 32){
        e.preventDefault();
      }
    });
  }

  moveCharacter();
});
