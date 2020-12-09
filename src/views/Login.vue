<template>
  <div id="main">

      <div  v-if="!loginFormIsSignUp" class="signIn">
        
        <div class="input_values">
            <div class="input_container">
                <h3>Username</h3>
                <input type="text"><br>
                <h3>Password</h3>        
                <input type="password"><br>
            </div>
        </div>
        
        <div class="button_layout">
            <span class="buttonContainer">
                <button @click="loginFormIsSignUp = !loginFormIsSignUp">Sign Up</button>
                <button>Login</button>
            </span>
        </div>
        

      </div>
      <div v-else class="signIn">

          <div class="input_values">
            <div class="input_container">
                <h4>Username</h4>
                <input type="text"><br>
                <h4>First Name</h4>
                <input type="text"><br>
                <h4>Last Name</h4>
                <input type="text"><br>
                <h4>Password</h4>        
                <input type="password"><br>
            </div>
        </div>
        
        <div class="button_layout">
            <span class="buttonContainer">
                <button @click="loginFormIsSignUp = !loginFormIsSignUp">Login</button>
                <button>Create</button>
            </span>
        </div>

      </div>
    

  </div>
</template>

<script>

export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    return {
        loginFormIsSignUp: false,
        newUser: {
            username:'',
            password: '',
            firstname:'',
            lastname: ''
        },
        logInUser: {
            username: '',
            password: ''
        }
    }
  },
  created(){

  },
  watch:{ },
  methods: {
    createNewUser(){
        if(!this.newUser.username || !this.newUser.password) return;
        if(!this.newUser.firstname || !this.newUser.lastname) return;

        //POST REQUEST
    },
    logInUser(){

        if(!this.newUser.username || !this.newUser.password) return;
         //POST REQUEST

    }    
  }
}
</script>

<style scoped>
#main{
    display: flex;
    text-align: center;
    color: #2c3e50;
}
.signIn{
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 400px;
    margin: 50px 0;
    margin-left: 50%;
    transform: translateX(-50%);
    vertical-align: middle;
    background: #a9bad388;
}
input{
    outline: none;
    border: none;
    padding: 8px;
    border-radius: 2px;
}
input:focus{
   outline: none;
}
h3{
    /* padding: 10px; */
    margin: 10px;
}
h4{
    margin: 5px;
    padding: 0;
}
.buttonContainer{
    margin: 10px;
    padding: 10px;
    vertical-align: middle;
}
.input_values{
    flex: .7;
    display: inline-block;
}
.input_container{
    display: inline-block;
    margin-top: 35px;
    vertical-align: middle;
}
.button_layout{
    flex: .3;
}
button{
  padding:0.7em 2em;
  margin: 5px;
  border: none;
  /* margin:0 0.3em 0.3em 0; */
  box-sizing: border-box;
  text-decoration:none;
  font-weight:600;
  color:white;
  background:#2c3e50;
  cursor: pointer;
}
button:hover{
  opacity: .6;
}
button:focus{
    outline: none;
    border: none;
}

</style>
