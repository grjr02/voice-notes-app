<template>
<div style ="display: flex; height: 350px">

  <!-- SIDEBAR IF A USER IS LOGGED IN -->
  <div v-if="userLoggedIn" style ="flex: .8">

    <div  class="noteHeader"
      v-for ="(n) in notes" :key="n">
      {{n.title}}
    </div>

  </div>

  <!-- SIDEBAR IF NO USER IS LOGGED IN -->
  <div v-else style="flex: .8">

    <div class="noteHeader">
      Login To Save Notes +
    </div>

  </div>

  <!-- SIDE PADDING -->
  <div style="flex: .2; background: teal: height: 100%"></div>

</div>  
</template>

<script>

import axios from 'axios'

export default {
  name: 'NotesList',
  components: {},
  props: {},
  data () {
    return {
      notes: [],
      userLoggedIn: false
    }
  },
  async created(){
    
  },
  async mounted () { 
    let res = await axios.get('https://us-central1-notes-48bea.cloudfunctions.net/notes');
    console.log(res);
    this.notes = res.data;
    console.log(this.notes)
},
  watch:{ },
  methods: { },
 
}
</script>

<style scoped>

.noteHeader{
  background: orange; 
  padding: 10px 20px;
  cursor: pointer;
}
.noteHeader:hover{
    opacity: .7;
}

</style>
