<template>
<div>
  <header>

    <nav>
      <div id="header">
        <router-link to="/">NOODLE</router-link> 

        <span id ="links">
          <router-link to="/">Log In</router-link> 
        </span>
      </div>
      <!-- <router-link to="/about">About</router-link> -->
    </nav>

  </header>
  
  <div id="app">
    <div id="sidebar">
      <NotesList/>
    </div>
    <router-view/>
  </div>
  <div class="footer">
    Commands: 
    <br>
    <p> Header: hey noodle title...</p>
    <p>New Line: hey noodle line...</p>
  </div>
</div>
</template>

<script>

import NotesList from './components/NotesList.vue'


export default {
  name: 'App',
  components: {NotesList},
  props: {},
  data () {
    return {
      
    }
  }
}
</script>

<style>

#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  /* background: blue; */
  display: flex;
}
#sidebar {
  background: red;
  flex: .2;
  margin-top: 50px;
}
nav {
  margin: 0;
  text-align: left;
  width: 100%;
}
#header{
  background: hsl(216, 100%, 99%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.11);
  position: relative;
  z-index: 999999;
  font-size: 35px;
}

#links{
  font-size: 18px;
  height: 50px;
  display: flex;
  align-items: center;
  float: right;
  vertical-align: middle;
  /* height: 100%; */
}

#header #links:hover{
  background: #2c3e5020;
}

#header a {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  height: 100%;
  padding: 0 25px;
}

#nav a.router-link-exact-active {}
#header a.router-link-exact-active {}

.footer{
  position: fixed; 
  bottom: 25px; 
  width: 600px; 
  margin-left: 50%; 
  transform: translateX(-50%); 
  background: #FAFCFF;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: #a9bad388 3px solid;
  padding: 20px 40px;
}

</style>
