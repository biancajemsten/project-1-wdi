# WDI 34 Project 1 ~ Hooops

The premise of the first project was to build an in-browser game using HTML, CSS, and JavaScript as well as the jQuery library. I decided to make a version of Flappy Bird where the character goes through hoops instead of between pipes. A point is given each time the character goes through the hoop and if it hits the hoop the game is over. The game is compatible with all devices.

***

#### Playing the game

<p align="center"><img src="https://i.imgur.com/1IyXHLA.gif" width="700"></p>

The game character is affected by gravity. Therefore if the player does not keep pressing the space bar (or tap the screen if on mobile). The hoops are divs which all have collision detection for different parts of them. The character going through the hoop results in a point and hitting the hoop anywhere else will result in a game over. The collisions have been scaled so that the feature works on all size screens.


#### Choosing Themes
<p align="center"><img src="https://i.imgur.com/2zQDeYI.gif" width="700"></p>

The following code allows the player to pick a theme of their liking which changes the background, the game character as well as plays a sound effect relatated to the theme. I am happy with how concise I managed to keep this code by using 'this'.
```
for(let i = 0;i < $themes.length; i++){
  $themes[i].addEventListener('click', function(){
    $gameCharacter.css('background-image', `url(./images/${this.className}.png)`);
    $playField.css('background-image', `url(./images/${this.className}.jpg)`);
    audio.src = `sounds/${this.className}.mp3`;
    audio.play();
  });
}
```

#### Responsiveness  
<table>
  <tr>
    <td><p display= "inline" align="left"><img src="https://i.imgur.com/IC9O0vD.png" width="200"></p></td>
    <td><p display= "inline" align="right"><img src="https://i.imgur.com/97KrRtT.png" width="400"></p></td>
    </tr>
</table>

The game is compatible with laptops as well as tablets and phones. The implementation was lengthier than expected. It pointed out some mistakes I had made building the game to begin with, such as making the collision detection pixel specific.

#### High Scores

On mobile versions the high score pops up when pressing *Show High Scores*. This feature is linked to the local storage which allows the scores to remain on the page even when it's updated. The local storage was a challenge to implement and it still has some bugs.

#### On the to-do list  

Overall I am happy with my game. But there are a couple of things I want to work on going on with it:
* As time passes, the hoops move faster - but after the second or third increase in difficulty the game starts to lag.
* The high scores sometimes override each other when the same name is submitted or when the score is 0.
* I would like to incorporate firebase to enable players to play each other in real time and view each other's high scores.  
