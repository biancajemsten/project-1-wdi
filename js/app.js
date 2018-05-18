$(()=>{
  const $gameCharacter = $('.gameCharacter');
  const $playField = $('.playField');

  function divCreator(){
    const $div = $('<div />');
    $div.addClass('obstacle');
    $playField.append($div);
    console.log($div);
    // divMover();
    const divMover = setInterval(function(){
      console.log($div);
      $div.css('left', '-=10px');
    },1000);

  }


  //Pseudo
  //

  // setInterval(function(){
  //       if(direction){
  //         if($bowser.position().left + bowserWidth > windowWidth) direction = false;
  //         $bowser.css('left', '+=10px');
  //       }else{
  //         if($bowser.position().left < 0) direction = true;
  //         $bowser.css('left', '-=10px');
  //       }
  //     }, 30);



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

  function init(){
    moveCharacter();
    $(document).on('click', divCreator);
  }

  init();
});
