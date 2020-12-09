<template>
  <div class="home">

    <div id="sidebar">
      <NotesList/>
    </div>
    
    <!-- TEXT EDITOR CONTAINER -->
    <div id="text_editor">

      <div id ="box" contenteditable="true">
      </div>

    </div>

    <!-- CONTROLS CONTAINER -->
    <div id="controls">

      <!-- PADDING RIGHT -->
      <div style="flex: .2;">
      </div>

      <!-- SVG RECORD ICON -->
      <span style="position: absolute; right: 50%; transform: translateX(50%);">
        <svg @click="enterText" style="width:50px;height:50px" viewBox="0 0 24 24">
          <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" />   
        </svg>
      </span>

      <span v-if="active" >...</span>

      <br>

      <span style="position: absolute; bottom: 0; right: 50%; transform: translateX(50%);">
        <button id="save" @click="save" class="hints">Save</button>
      </span>

    </div>

  </div>
</template>

<script>

import NotesList from '../components/NotesList.vue'

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

let recognition = SpeechRecognition? new SpeechRecognition() : false

recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const COMMAND = 'hey noodle'
const commandType = {
  SUBTITLE: 'title',
  NEW_LINE: 'line',
  BOLD: 'bold',
  UNDERLINE: 'underline'
}

export default {
  name: 'Home',
  components: {NotesList},
  props: {},
  data () {
    return {
      stringVal: '',
      active: false
    }
  },
  created(){

  },
  watch:{ },
  methods: {
    enterText(){
      
      recognition.start();
      console.log('Waiting for command.');
      
      let box = document.getElementById("box");

      recognition.onstart = () => {
        this.active = true;
      }
      
      recognition.onresult = (event) => {
        this.active = false;
        const result = event.results[0][0].transcript
        console.log(result)

        if(result.includes(COMMAND)){

          if(result.includes(`${COMMAND} ${commandType.SUBTITLE}`)){
            
            this.createHeaderElement(`${COMMAND} ${commandType.SUBTITLE}`, box, result);
        
          }else if(result.includes(`${COMMAND} ${commandType.NEW_LINE}`)){

            this.createNewLineElement(`${COMMAND} ${commandType.NEW_LINE}`, box, result)
            
          }

        }
        else {
          box.innerHTML += result;
        }
    
      };
    },
    createHeaderElement(command, box, result){
      const partition = result.indexOf(command)
      const end = command.length
      if(result.substring(0,partition).length > 0){
        box.innerHTML += result.substring(0,partition) + '. '
      }
      box.innerHTML += `<br/>`+`<span><h3>${result.substring(end)}</h3></span>`
      console.log(box.innerHTML);
    },
    createNewLineElement(command, box, result){
      const partition = result.indexOf(command)
      const end = command.length
      if(result.substring(0,partition).length > 0){
        box.innerHTML += result.substring(0,partition) + '. '
      }
      // box.innerHTML += result.substring(0,partition) + '. '
      box.innerHTML += `<br/>${result.substring(end)}`
    },
    removeLastNoteSentence(){

    },
    createNewParagraph(){

    },
    save(){

      let box = document.getElementById("box");
       this.stringVal = box.innerHTML;
    },
    add(){
      let box = document.getElementById("box");
      box.innerHTML += this.stringVal;
    }
  },
  mounted () {
    // console.log(diagnostic, bg, hints)
  }

}
</script>

<style scoped>
.home{
  margin-top: 50px;
  display: flex;
  /* padding: 30px 100px; */
  color: black;
  

}
#sidebar {
  flex: .2;
}
#text_editor{
  flex: .6;
  border-top: 2px solid  rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid  rgba(0, 0, 0, 0.1);
  border-left: 2px solid  rgba(0, 0, 0, 0.1);
  /* margin: 0 5px; */
}
#controls{
  flex: .2;
  position: relative; 
  display: flex; 
  background: white;
  border-left: 2px solid  rgba(0, 0, 0, 0.1);

}

/* button{
  float: right;
} */
p{
  margin: 0;
  padding: 0;
}
h3{
  padding: 0;
  margin: 0;
}
div:focus{
  background: white;
  outline: none;
}

#box{
  padding: 25px 80px;
  margin-right: 30px ;
  background: rgba(218, 218, 218, 0.589);
  height: 300px; 
  width: 100%; 
  overflow-Y: auto; 
  text-align: justify;
}
svg{
  cursor: pointer;
}
svg:hover{
  opacity: .4;
}
path{
  fill: rgb(253, 110, 110);
}
#save{
  padding:0.5em 2em;
  border: none;
  /* margin:0 0.3em 0.3em 0; */
  box-sizing: border-box;
  text-decoration:none;
  font-weight:600;
  color:white;
  background: orange;
  cursor: pointer;
}
#save:hover{
  opacity: .6;
}

</style>
