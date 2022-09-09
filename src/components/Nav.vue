<template>
  <ul class="nav">
    <li><router-link class="router" to="/">Изделия</router-link></li>
    <li><router-link class="router" to="/sticks">Хлысты</router-link></li>
  </ul>
</template>

<style scoped>
.router {
  text-decoration: none;
  color: aliceblue;
}

ul {
  list-style-type: none;
  margin-bottom: 1rem;
  padding-left: 2rem;
  padding: 0;
  overflow: hidden;
  background-color: #0077e6;
  position: fixed;
  top: 0;
  width: 100%;
}

li {
  float: left;
}

li:hover {
  color: #0077e6;
  background-color: rgba(240, 248, 255, 0.137);
}
</style>