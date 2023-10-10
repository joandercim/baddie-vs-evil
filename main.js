window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    // const evilDude = this.document.getElementById('evil');
  
    const evilDude = document.getElementById('evil');
    const rockford = document.getElementById('baddie1');
    const area = document.getElementById('flash');
  
    const tileSize = 32;
    const gridSize = 24;
  
    // Position variables for rockford (player1)
    var posLeftPlayer1 = 0;
    var posTopPlayer1 = 0;
  
    // Position variables for evilDude (player2)
    var posLeftPlayer2 = 0;
    var posTopPlayer2 = 0;
  
    /**
     * This is the background for the game area.
     */
    let gameArea = [
      13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13,
      14, 12, 13, 14, 12, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13,
      14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 14, 12, 13, 14, 12, 13, 14, 12, 13,
      14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 13, 14, 12, 13,
      14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14,
      12, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14,
      12, 13, 14, 12, 13, 14, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14,
      12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 13, 14, 12, 13, 14, 12, 13, 14,
      12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 12, 13, 14,
      12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12,
      13, 14, 14, 12, 13, 14, 12, 13, 14, 16, 16, 14, 12, 16, 17, 12, 13, 14, 12,
      13, 14, 12, 13, 14, 12, 13, 13, 14, 12, 13, 14, 12, 13, 14, 16, 17, 14, 17,
      13, 15, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 12, 13, 14, 12, 13, 14, 12,
      13, 15, 15, 13, 14, 12, 16, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 14, 12,
      13, 14, 12, 13, 14, 12, 15, 15, 17, 17, 16, 12, 13, 14, 12, 13, 14, 12, 13,
      14, 12, 13, 13, 14, 12, 13, 14, 12, 13, 14, 12, 17, 17, 15, 13, 14, 12, 13,
      14, 12, 13, 14, 12, 13, 14, 12, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13,
      14, 12, 17, 17, 12, 13, 14, 12, 13, 14, 12, 13, 14, 14, 12, 13, 14, 12, 13,
      14, 16, 13, 14, 12, 13, 14, 17, 16, 16, 16, 13, 14, 12, 13, 14, 19, 21, 13,
      14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 17, 13, 14, 12, 16, 16, 12, 13, 19,
      18, 18, 21, 21, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 17,
      12, 13, 19, 18, 21, 21, 21, 21, 21, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14,
      12, 13, 14, 15, 16, 14, 12, 20, 21, 21, 21, 21, 21, 21, 13, 14, 12, 13, 14,
      12, 13, 14, 12, 13, 14, 12, 13, 15, 15, 13, 19, 21, 21, 21, 21, 21, 21, 21,
      12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 20, 21, 21,
      21, 21, 21, 21, 21, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12,
      13, 14, 22, 21, 21, 21, 21, 21, 21, 21, 13, 14, 12, 13, 14, 12, 13, 14, 12,
      13, 14, 12, 13, 14, 12, 13, 14, 22, 21, 21, 21, 21, 21, 21, 12, 13, 14, 12,
      13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 22, 21, 21, 21, 21,
      21, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13,
      14, 22, 21, 21, 21, 21,
    ];
    /**
     * These are blocks that cant be moved to, or something happens when you try to move on them.
     * The blocks are drawn "on top" of the gamearea. Block 10 is empty, should be 0 but looks nicer with two figures.
     */
    let gameBlocks = [
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
      19, 19, 19, 19, 19, 19, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 19, 19, 10, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 19, 19, 10, 10, 10,
      10, 10, 10, 10, 13, 13, 13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      19, 19, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 12,
      13, 10, 10, 10, 10, 19, 19, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 10, 12, 10, 10, 10, 10, 10, 19, 19, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 12, 10, 10, 10, 10, 10, 19, 19, 10, 10,
      10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 10, 10, 10, 10, 10,
      10, 19, 19, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13,
      10, 10, 10, 10, 10, 10, 19, 19, 10, 10, 10, 10, 10, 11, 11, 11, 12, 11, 11,
      10, 10, 10, 10, 13, 10, 10, 10, 10, 10, 10, 19, 19, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 11, 11, 10, 10, 10, 10, 13, 10, 10, 10, 10, 10, 10, 19, 19, 10,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 10, 10, 10, 10, 10,
      10, 10, 19, 19, 10, 10, 10, 13, 10, 10, 10, 10, 10, 10, 10, 10, 13, 13, 10,
      10, 10, 10, 10, 10, 10, 10, 19, 19, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 13, 13, 10, 10, 10, 10, 10, 10, 10, 10, 19, 19, 10, 10, 10, 10, 10,
      12, 12, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 19, 19,
      10, 10, 10, 10, 10, 12, 12, 10, 11, 13, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 19, 19, 10, 10, 10, 10, 10, 12, 14, 10, 10, 13, 10, 10, 10, 10,
      10, 10, 10, 10, 10, 10, 10, 10, 19, 19, 10, 10, 10, 10, 10, 13, 10, 13, 13,
      13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 19, 19, 10, 10, 10, 10,
      10, 13, 13, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 19,
      19, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 10, 19, 19, 10, 10, 10, 10, 10, 13, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 19, 19, 13, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 19, 19, 10, 10, 10,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
      19, 19, 19, 19, 19, 19,
    ];
  
    /**
     * Draw the initial gameplan
     */
    function drawGamePlan(gameArea, gameBlocks) {
      var i, e, b;
      for (i = 0; i < gameArea.length; i++) {
        e = document.createElement('div');
        e.innerHTML = '';
        e.className =
          'tile t' + gameArea[i] + (gameBlocks[i] ? ' b' + gameBlocks[i] : '');
        e.id = 'n' + i;
        area.appendChild(e);
      }
    }
    console.log('Drawing gameplan.');
    drawGamePlan(gameArea, gameBlocks);
  
    function move(moveLeft, moveTop, which, player) {
      let currentPosLeft, currentPosTop, currentPlayer;
      
        setTimeout(() => {
          if (
            posLeftPlayer1 === posLeftPlayer2 &&
            posTopPlayer1 === posTopPlayer2
          ) {
            const audioStab = document.getElementById('stab');
            audioStab.play()

            alert('FÅNGAD');
            if (confirm('Vill du pröva igen?')) {
              posLeftPlayer1 = 0;
              posLeftPlayer2 = 0;
              posTopPlayer1 = 0;
              posTopPlayer2 = 0;
    
              move(21, 2, 'down', 'player2');
              move(2, 2, 'down', 'player1');
          }
        }
        }, 50);
  
      if (player === 'player1') {
        currentPosLeft = posLeftPlayer1;
        currentPosTop = posTopPlayer1;
        currentPlayer = rockford;
      } else {
        currentPosLeft = posLeftPlayer2;
        currentPosTop = posTopPlayer2;
        currentPlayer = evilDude;
      }
  
      if (
        !(
          gameBlocks[
            currentPosLeft + moveLeft + (currentPosTop + moveTop) * gridSize
          ] - 10
        )
      ) {
        currentPosLeft += moveLeft;
        currentPosTop += moveTop;
      } else if (
        gameBlocks[
          currentPosLeft + moveLeft + (currentPosTop + moveTop) * gridSize
        ] === 18
      ) {
        alert('The door is locked');
      } else {
        console.log('Block detected, cant move.');
      }
  
      currentPlayer.style.left =
        area.offsetLeft + currentPosLeft * tileSize + tileSize / 2 + 'px';
      currentPlayer.style.top =
        area.offsetTop + currentPosTop * tileSize + tileSize / 2 + 'px';
  
      if (currentPlayer.classList.contains('baddie')) {
        currentPlayer.className = 'baddie ' + which;
      }
  
      if (player === 'player1') {
        posLeftPlayer1 = currentPosLeft;
        posTopPlayer1 = currentPosTop;
      } else {
        posLeftPlayer2 = currentPosLeft;
        posTopPlayer2 = currentPosTop;
      }
    }
  
    console.log('Moving Mickey Mos (Rockford) to initial spot.');
    move(21, 2, 'down', 'player2');
    move(2, 2, 'down', 'player1');
  
    document.onkeydown = function (event) {
      let key = event.keyCode || event.which;
      switch (key) {
        case 37:
          move(-1, 0, 'left', 'player1');
          break;
        case 39:
          move(1, 0, 'right', 'player1');
          break;
        case 38:
          move(0, -1, 'up', 'player1');
          break;
        case 40:
          move(0, 1, 'down', 'player1');
          break;
        case 65:
          move(-1, 0, 'left', 'player2');
          break;
        case 68:
          move(1, 0, 'right', 'player2');
          break;
        case 87:
          move(0, -1, 'up', 'player2');
          break;
        case 83:
          move(0, 1, 'down', 'player2');
          break;
      }
    };
  
    console.log('Everything is ready.');
  });
  