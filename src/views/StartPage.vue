<template>
<div class="warrning">
    <h4 class="warning-h4">Currently only compatible with PC browsers.</h4>
</div>
  <div class="container">
        <h1>Welcome</h1>
        <h4>Thank you for checking out my game.</h4>
        <p>In this game, you have 10 seconds to step on all the enemies (<span class="red">red</span><span class="importantText"> cubes</span>).</p>
        <p>Each round, you have one booster (<span class="yellow">yellow</span><span class="importantText"> cube</span>) which will give you +5 seconds.</p>
        <p>To make it a bit harder, each round has +2 randomly placed walls (<span class="green">green</span><span class="importantText"> cubes</span>).</p>
        <p>Player has 3 power moves, it means he can remove 3 walls (<span class="green">green</span><span class="importantText"> cubes</span>)</p>
        <p>If you run out of time, you'll lose one health.</p>
        <p>You start with <span class="importantText">4 healths</span> in total. If you lose all your healths, you lose, and your score will be shown on the top.</p>
        <hr>
        <p>Controls:</p>
        <p>Use the arrow keys on your keyboard to move around.</p>
        <hr>
        <h3>You don't like the look?</h3>
        <div class="cubes">
            <div class="cubes-column">
                <p class="importantText">Player</p>
                <label for="player-image" class="clickable">
                    <div v-if="!playerImageSelected" class="player"></div>
                    <img v-else :src="playerImage" class="selected-image player" alt="Selected Player Image">
                    <input type="file" style="display:none;" id="player-image" accept="image/jpeg,image/png" @change="handlePlayerImageSelect">
                </label>
            </div>
            <div class="cubes-column">
                <p class="importantText">Enemy</p>
                <label for="enemy-image" class="clickable">
                    <div v-if="!enemyImageSelected" class="enemy"></div>
                    <img v-else :src="enemyImage" class="selected-image enemy" alt="Selected Enemy Image">
                    <input type="file" style="display:none;" id="enemy-image" accept="image/jpeg,image/png" @change="handleEnemyImageSelect">
                </label>
            </div>
            <div class="cubes-column">
                <p class="importantText">Booster</p>
                <label for="booster-image" class="clickable">
                    <div v-if="!boosterImageSelected" class="booster"></div>
                    <img v-else :src="boosterImage" class="selected-image booster" alt="Selected Booster Image">
                    <input type="file" style="display:none;" id="booster-image" accept="image/jpeg,image/png" @change="handleBoosterImageSelect">
                </label>
            </div>
            <div class="cubes-column">
                <p class="importantText">Wall</p>
                <label for="wall-image" class="clickable">
                    <div v-if="!wallImageSelected" class="resource"></div>
                    <img v-else :src="wallImage" class="selected-image resource" alt="Selected Wall Image">
                    <input type="file" style="display:none;" id="wall-image" accept="image/jpeg,image/png" @change="handleWallImageSelect">
                </label>
            </div>
        </div>
        <h6>(Change it by clicking on the cube, and picking your own image)</h6>
        <a @click="this.$router.push('game')" class="button">Start</a>
    </div>
    <div class="container">
        <h3><span v-if="score > 0" class="red">Game Over</span> Score:</h3>
        <p class="importantText">{{score}}</p>
    </div>
</template>

<script>
import { clearAllIntervals } from '@/interval';

export default {
    props: ['score'],
    data() {
        return {
        playerImageSelected: false,
        playerImage: null,

        enemyImageSelected: false,
        enemyImage: false,

        boosterImageSelected: false,
        boosterImage: false,

        wallImageSelected: false,
        wallImage: false,
        };
    },
    mounted(){
        clearAllIntervals();
        this.playerImage = localStorage.getItem('player');
        if(this.playerImage != null) this.playerImageSelected = true;
        this.enemyImage = localStorage.getItem('enemy');
        if(this.enemyImage != null) this.enemyImageSelected = true;
        this.boosterImage = localStorage.getItem('booster');
        if(this.boosterImage != null) this.boosterImageSelected = true;
        this.wallImage = localStorage.getItem('wall');
        if(this.wallImage != null) this.wallImageSelected = true;
    },
    methods:{
        // PLAYER IMAGE
        handlePlayerImageSelect(event) {
            const file = event.target.files[0];
            
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
            // Invalid file type, display an error message or ignore the file selection
            console.log('Invalid file type. Only JPEG and PNG files are allowed.');
            return;
            }

            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.playerImageSelected = true;
                    this.playerImage = e.target.result;
                    localStorage.setItem('player', this.playerImage);
                };
                reader.readAsDataURL(file);
            }
        },
        //ENEMY IMAGE
        handleEnemyImageSelect(event) {
            const file = event.target.files[0];

            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
            // Invalid file type, display an error message or ignore the file selection
            console.log('Invalid file type. Only JPEG and PNG files are allowed.');
            return;
            }

            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.enemyImageSelected = true;
                    this.enemyImage = e.target.result;
                    localStorage.setItem('enemy', this.enemyImage);
                };
                reader.readAsDataURL(file);
            }
        },
        //BOOSTER IMAGE
        handleBoosterImageSelect(event) {
            const file = event.target.files[0];

            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
            // Invalid file type, display an error message or ignore the file selection
            console.log('Invalid file type. Only JPEG and PNG files are allowed.');
            return;
            }
        
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.boosterImageSelected = true;
                    this.boosterImage = e.target.result;
                    localStorage.setItem('booster', this.boosterImage);
                };
                reader.readAsDataURL(file);
            }
        },
        //WALL IMAGE
        handleWallImageSelect(event) {
            const file = event.target.files[0];

            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
            // Invalid file type, display an error message or ignore the file selection
            console.log('Invalid file type. Only JPEG and PNG files are allowed.');
            return;
            }
        
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.wallImageSelected = true;
                    this.wallImage = e.target.result;
                    localStorage.setItem('wall', this.wallImage);
                };
                reader.readAsDataURL(file);
            }
        }
    }
}
</script>

<style>
body {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h1,h4 {
    font-size: 32px;
    color: #333333;
}

p {
    font-size: 16px;
    color: #666666;
    margin-bottom: 20px;
}

.button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 18px;
    color: #ffffff;
    background-color: #007bff;
    border-radius: 4px;
    text-decoration: none;
}

.button:hover {
    background-color: #0056b3;
}

.green{
    color: green;
    filter: drop-shadow(0px 1px 2px black);
}

.yellow{
    color: yellow;
    filter: drop-shadow(0px 1px 2px black);
}

.red{
    color: red;
    filter: drop-shadow(0px 1px 2px black);
}

.importantText{
    font-weight: bold;
    padding: unset;
    margin: unset;
}
</style>