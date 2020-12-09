<template>
  <div class="home">
    
    <!-- <button  @click="enterText" class="hints">Record</button> <br> -->
  <!-- <div style="width: 90%; background: salmon"> -->
    <div style="flex: .8;">
      <div id ="box" contenteditable="true" style="height: 300px; width: 60%; overflow-Y: auto; text-align: justify; margin-left: 50%; transform:translateX(-50%); ">
      
      </div>
    </div>
    <div style="flex: .2; position: relative">
      

      <!-- <div style="position: absolute; display: inline; width: 15%; right: 0; top: 25px"> -->
        <span style="position: absolute; right: 50%; transform: translateX(50%);">
          <svg @click="enterText" style="width:50px;height:50px" viewBox="0 0 24 24">
            <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" />   
          </svg>
        </span>
        <span v-if="active" >...</span>
        <br>
        <span style="position: absolute; bottom: 0; right: 50%; transform: translateX(50%);">
        <button  @click="save" class="hints">Save</button>
        <button  @click="add" class="hints">Add</button>
        </span>
      <!-- </div> -->
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
      temp:-1,
      stringVal: '',
      active: false
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
  /* display: flex; */
  flex: .8;
  display: flex;
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
  /* display: inline-flex ; */
}
svg{
  cursor: pointer;
  /* background: red; */
  /* border-radius: 40px; */
}
svg:hover{
  opacity: .4;
}
path{
  fill: rgb(253, 110, 110);
}
/* path:hover{
  fill: rgba(255, 97, 97, 0.4)
} */

</style>
