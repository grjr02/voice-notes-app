<template>
  <div class="home">

    <button  @click="enterText" class="hints">Record</button> <br>

    <div id ="box" contenteditable="true" style="height: 300px; width: 700px; overflow-Y: auto; text-align: justify; margin-left: 50%; transform:translateX(-50%);">
        <!-- <p class="output" v-for="(p, i) in paragraph" :key="i">
          <span  class="sentenceContainer" v-for="(w,j) in p" :key="j" @click="switchToInput(j)">
            
            <input ref="in" id="in" v-if="input && temp == j" v-on:keyup.enter="check(i,j)" :value="w.text" type="text">
            <span style="position: relative" > {{w.text}}
              <button class='xButton'>x</button>
            </span>
          </span>
        </p>
        <p class="p">32;</p> -->
    </div>
    <button  @click="enterText" class="hints">Save</button>

  </div>
</template>

<script>

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
// var diagnostic = document.querySelector('.output');
// var bg = document.querySelector('html');
// var hints = document.querySelector('.hints');

export default {
  name: 'Home',
  components: {},
  props: {},
  data () {
    return {
      error: false,
      speaking: false,
      toggle: false,
      runtimeTranscription: '',
      sentences: [],
      colorB: 'red',
      paragraph: [],
      text:[],
      index: 0,
      input: false,
      temp:-1
    }
  },
  created(){

  },
  watch:{
    input(){
      if(this.input){
        this.$nextTick(() => {
          // this.$refs.in.focus()
          document.getElementById('in').focus();
        })
      }
    }
  },
  methods: {
    enterText(){
      
      recognition.start();
      console.log('Waiting for command.');
      
      let box = document.getElementById("box");
      

        recognition.onresult = (event) => {

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
      box.innerHTML += `<h4>${result.substring(end)}</h4>`
    },
    createNewLineElement(command, box, result){
      const partition = result.indexOf(command)
      const end = command.length
      if(result.substring(0,partition).length > 0){
        box.innerHTML += result.substring(0,partition) + '. '
      }
      box.innerHTML += result.substring(0,partition) + '. '
      box.innerHTML += `<br/>${result.substring(end)}`
    },
    removeLastNoteSentence(){

    },
    createNewParagraph(){

    }
  },
  mounted () {
    // console.log(diagnostic, bg, hints)
  }

}
</script>

<style scoped>
.home{
  background: white;
  padding: 30px 100px;
  color: black;
}
.sentenceContainer{
  padding: 2px;

}
button{
  float: right;
}

.sentenceContainer:hover .xButton{
  display: inline;
  position: absolute;
  background: rgba(255, 255, 255, 0);
  color: red;
  float: right;
  border: none;
  margin-left: -10px;
}

.sentenceContainer:hover{
  background: rgba(226, 234, 243, 0.541);
  cursor: pointer;

}
.xButton{
  display: none;
}
.p:hover{
  background: rgba(226, 234, 243, 0.541);
  /* white-space: pre; */

}
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
  background: rgb(248, 248, 248);
}


</style>
