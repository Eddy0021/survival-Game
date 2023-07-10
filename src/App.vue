<template>
  <router-view></router-view>
</template>

<script>
</script>

<style>
.game-container {
  width: 100%;
  height: 96vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  outline: none;
}

.grid {
  display: grid;
  grid-gap: 2px;
  border: 1px solid #333;
}

.row {
  display: flex;
}

.cell {
  flex: 1;
  height: 100px;
  width: 100px;
  background-color: lightgray;
}

.player {
  border:1px solid blue;
  background-color: blue;
  width: 100%;
  height: 100%;
}

.resource {
  border:1px solid green;
  background-color: green;
  width: 100%;
  height: 100%;
}

.booster{
  border:1px solid yellow;
  background-color: yellow;
  width: 100%;
  height: 100%;
}

.enemy {
  border:1px solid red;
  background-color: red;
  width: 100%;
  height: 100%;
}

.selected-image{
  background-color: unset !important;
  width: 100%;
  height: 100%;
}

.nav{
  display: flex;
  justify-content: space-evenly;
  padding-top: 1rem;
}

.left{
  display: flex;
}

.hleath{
  width: 1rem;
  height: 1rem;
  background-color: black;
  margin: 0 0.25rem 0 0.25rem;
}

.lostHealth{
  background-color: white;
  border: 1px solid black;
}

.power{
  position: absolute;
  left: 0;
  font-weight: bold;
}

.warrning{
  position: absolute;
  top: 0;
}

.warning-h4{
  color: red;
  font-weight: bold;
  font-size: medium;
}

/* CUBES FOR EDIT */
.cubes{
  display: flex;
  flex-flow: row;
  justify-content: space-around;
}

.cubes-column{
  width: 10rem;
  height: 10rem;
}

.clickable{
  cursor: pointer;
}

.clickable:hover{
  border:2px solid gold;
}
</style>
