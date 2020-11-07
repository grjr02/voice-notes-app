<template>
  <div class="home">
    <h1>Title</h1>

    <button @click="enterText" class="hints">Click Me</button>
    <div >
        <p class="output" v-for="(p, i) in paragraph" :key="i">
          <span class="sentenceContainer" v-for="(w,j) in p" :key="j" @click="switchToInput(j)">
            
            <input id="in" v-if="input && temp==j" v-on:keyup.enter="check(i,j)" :value="w.text" type="text">
            <span style="position: relative" v-else> {{w.text}}
              <button class='xButton'>x</button>
            </span>
          </span>
        </p>
    </div>

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

const elementType = {
  SENTENCE: "sentence",
  HEADER: "header",
  LINE_BREAK: "line Break"
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
  methods: {
    enterText(){
      
      recognition.start();
      console.log('Waiting for command.');

        recognition.onresult = (event) => {
          
          let storePreviousText = []

          if(this.paragraph.length > 0) {
            storePreviousText = this.paragraph.pop()
            console.log("Previous Text: ", storePreviousText)
          }
          
          storePreviousText.push({
            type: elementType.SENTENCE, 
            text: event.results[0][0].transcript+'. '
          });

          this.paragraph.push(storePreviousText)

        };
    },
    createHeaderElement(){

    },
    createNewLineElement(){

    },
    removeLastNoteSentence(){

    },
    switchToInput(x){
      this.input = true;
      this.temp = x
    },
    check(x,y){
      
      let temp = this.paragraph


      temp[x][y] = {
        ...temp[x][y],
        text: document.getElementById('in').value
      }
      
      console.log(temp);
      this.paragraph = temp;
      this.input = false;
      this.temp = -1;

    }

  },
  mounted () {
    // console.log(diagnostic, bg, hints)
  }

}
</script>

<style scoped>
.sentenceContainer{
  padding: 2px;

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


</style>
