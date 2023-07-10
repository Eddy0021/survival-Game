<template>
  <div class="nav">
    <div id="power" class="power">
      Power: 3
    </div>
    <div class="left">
      <p class="importantText">Health:</p>
      <div class="hleath"></div>
      <div class="hleath"></div>
      <div class="hleath"></div>
      <div class="hleath"></div>
    </div>
    <div id="timer" class="center importantText">10</div>
    <div id="score" class="right importantText">Score: 0</div>
  </div>
  <div class="game-container" @keydown="movePlayer" tabindex="0">
    <div class="grid" :style="gridStyle">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
        <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell">
          <!-- Render different components based on the cell type -->
          <div v-if="cell === 'player'" class="player">
            <img v-if="playIMG != null" :src="playIMG" class="player-image" alt="Player">
          </div>
          <div v-if="cell === 'resource'" class="resource">
            <img v-if="wallIMG != null" :src="wallIMG" class="wall-image" alt="Wall">
          </div>
          <div v-if="cell === 'enemy'" class="enemy">
            <img v-if="enemyIMG != null" :src="enemyIMG" class="enemy-image" alt="Enemy">
          </div>
          <div v-if="cell === 'booster'" class="booster">
            <img v-if="boosterIMG != null" :src="boosterIMG" class="booster-image" alt="Booster">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount, computed } from 'vue';
import { interval, clearIntervaL } from '@/interval';
import { useRouter } from 'vue-router';

export default {
  data(){
    return{
      playIMG: '',
      enemyIMG: '',
      boosterIMG: '',
      wallIMG: '',
    }
  },
  mounted(){
    this.playIMG = localStorage.getItem('player');
    this.enemyIMG = localStorage.getItem('enemy');
    this.boosterIMG = localStorage.getItem('booster');
    this.wallIMG = localStorage.getItem('wall');


    document.querySelector('#power').innerHTML = 'Power: '+ 3;
    document.querySelector('#score').innerHTML = "Score: " + 0;
    for (let index = 0; index < 5; index++) {
      document.querySelector('.left').childNodes[index].classList.remove('lostHealth');
    }
  },
  setup() {
    const router = useRouter();

    const numColumns = Math.floor(window.innerWidth / 100);
    const numRows = Math.floor(window.innerHeight / 100);

    let enemy = 1, resource = 2, killed = 0, score = 0, time = 10, health = 4,power = 3;

    const generateGrid = (numColumns, numRows) => {
      const grid = [];

      for (let i = 0; i < numRows; i++) {
        const row = new Array(numColumns).fill('');
        grid.push(row);
      }

      return grid;
    };

    const myInterval = () => {
        document.querySelector('#timer').innerHTML = time;
        time--;
        if(time == -1){
          document.querySelector('.left').childNodes[health].classList.add('lostHealth');
          health--;
          time = 10;
          clearGrid();
          const availablePositions = generateAvailablePositions();
          randomPlacement('player', availablePositions);
          randomPlacement('resource', availablePositions, resource);
          randomPlacement('enemy', availablePositions, enemy);
          randomPlacement('booster', availablePositions, 1);
          if(health == 0){
            clearIntervaL('myInterval');
            //alert("Your score is: " + score);
            clearGrid();
            router.push({name: 'home', query: { score: score } });
          }
        }
    };

    interval(myInterval, 1000, 'myInterval')

    const grid = reactive(generateGrid(numColumns, numRows));

    const gridStyle = computed(() => {
      return {
        //gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`
      };
    });

    const movePlayer = (event) => {
      const playerPosition = findPlayerPosition();
      let newPosition = { x: playerPosition.x, y: playerPosition.y };

      let movementOccurred = false; // Track whether a movement has occurred

      if (event.key === 'ArrowUp' && playerPosition.y > 0) {
        newPosition.y -= 1;
        movementOccurred = true;
      } else if (event.key === 'ArrowDown' && playerPosition.y < numRows - 1) {
        newPosition.y += 1;
        movementOccurred = true;
      } else if (event.key === 'ArrowLeft' && playerPosition.x > 0) {
        newPosition.x -= 1;
        movementOccurred = true;
      } else if (event.key === 'ArrowRight' && playerPosition.x < numColumns - 1) {
        newPosition.x += 1;
        movementOccurred = true;
      }

      if (movementOccurred) {
        const newCell = grid[newPosition.y][newPosition.x];

        if (newCell === 'enemy') {
          handleEnemyEncounter();
          grid[newPosition.y][newPosition.x] = '';
        } else if (newCell === 'resource') {
          handleResourceInteraction();
          if(power != 0){
            grid[newPosition.y][newPosition.x] = '';
            power--;
            document.querySelector('#power').innerHTML = 'Power: '+ power;
            if(power == 0) document.querySelector('#power').classList.add('red');
          }
        } else if (newCell === 'booster') {
          handleBoosterInteraction();
          grid[newPosition.y][newPosition.x] = '';
        } else {
          grid[playerPosition.y][playerPosition.x] = '';
          const occupiedCell = grid[newPosition.y][newPosition.x];

          if (occupiedCell !== 'enemy' && occupiedCell !== 'resource' && occupiedCell !== 'booster') {
            grid[newPosition.y][newPosition.x] = 'player';
          }
        }
      }
    };

    const handleEnemyEncounter = () => {
      //console.log('Player encountered an enemy!');
      score++;
      document.querySelector('#score').innerHTML = "Score: " + score;
      handlePlayerKillEnemy();
    };

    const handleResourceInteraction = () => {
      //console.log('Player found a resource! Cannot pass through.');
    };

    const handleBoosterInteraction = () => {
      time += 5;
      document.querySelector('#timer').innerHTML = time;
      //console.log('Player found a booster!.');
    };

    const handlePlayerKillEnemy = () => {
      killed += 1;
      console.log("Killed: " + killed);
      console.log("Enemy: " + enemy);
      if(killed != enemy) return;
      time = 10;
      document.querySelector('#timer').innerHTML = time;
      clearGrid();
      const availablePositions = generateAvailablePositions();
      killed = 0;
      enemy += 1;
      resource += 4;
      randomPlacement('player', availablePositions);
      randomPlacement('resource', availablePositions, resource);
      randomPlacement('enemy', availablePositions, enemy);
      randomPlacement('booster', availablePositions, 1);
    };

    const clearGrid = () => {
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
          grid[i][j] = '';
        }
      }
    };

    const generateAvailablePositions = () => {
      const positions = [];

      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
          positions.push({ x: j, y: i });
        }
      }

      return positions;
    };

    const randomPlacement = (cellType, availablePositions, count = 1) => {
    const positions = [...availablePositions]; // Create a copy of available positions

    for (let i = 0; i < count; i++) {
      let randomIndex = Math.floor(Math.random() * positions.length);
      let { x, y } = positions[randomIndex];
      let isValidPlacement = true;

      // Check if the random position is already occupied by another cell
      if (grid[y][x] !== '') {
        isValidPlacement = false;
        // Find an available position starting from the random index
        for (let j = randomIndex + 1; j < positions.length; j++) {
          const { x: newX, y: newY } = positions[j];
          if (grid[newY][newX] === '') {
            x = newX;
            y = newY;
            isValidPlacement = true;
            break;
          }
        }
        // If no available position found after the random index, search from the beginning
        if (!isValidPlacement) {
          for (let j = 0; j < randomIndex; j++) {
            const { x: newX, y: newY } = positions[j];
            if (grid[newY][newX] === '') {
              x = newX;
              y = newY;
              isValidPlacement = true;
              break;
            }
          }
        }
      }

      if (isValidPlacement) {
        grid[y][x] = cellType;
        // Remove the placed position from available positions
        positions.splice(randomIndex, 1);
      }
    }
  };

    const generateElements = () => {
      const availablePositions = generateAvailablePositions();
      randomPlacement('player', availablePositions);
      randomPlacement('resource', availablePositions, 2);
      randomPlacement('enemy', availablePositions, 1);
      randomPlacement('booster', availablePositions, 1);
    };

    const findPlayerPosition = () => {
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
          if (grid[i][j] === 'player') {
            return { x: j, y: i };
          }
        }
      }

      return null;
    };

    onMounted(() => {
      generateElements();
      window.addEventListener('keyup', movePlayer);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keyup', movePlayer);
    });

    return {
      grid,
      gridStyle
    };
  }
};
</script>

<style scoped>
img{
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
