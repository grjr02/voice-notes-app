<template>
<div>
  <div id="header">
      <router-link to="/">NOODLE</router-link> 
      <!-- <router-link to="/about">About</router-link> -->
  </div>
  <div id="app">
    <router-view/>
  </div>
  <div class="footer">
    dgdgd
  </div>
</div>
</template>

<script>
  

</script>

<style>
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: white;
  background: blue;

}
#header{

  background: #FAFCFF;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.11);
/* box-shadow: 0px 10px 5px #27272780;
-webkit-box-shadow: 0px 10px 5px #27272780;
-moz-box-shadow: 0px 10px 5px #27272780; */
position: relative;
z-index: 999999;
font-size: 22px;
}

#nav {
  /* position: absolute; */
  margin: 0;
  /* padding: 10px; */
  text-align: left;
  background: #b020d8;
  width: 100%;
}

#header a {
  font-weight: bold;
  color: #2c3e50;
    color: white;

  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
  color: #2c3e50;
    color: white;


}
#header a.router-link-exact-active {
  color: #42b983;
  color: #2c3e50;
}

.footer{
  position: fixed; 
  bottom: 25px; 
  /* height: 50px;  */
  width: 600px; 
  margin-left: 50%; 
  transform: translateX(-50%); 
  background: #FAFCFF;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: #a9bad388 3px solid;
  padding: 40px;

}
</style>
