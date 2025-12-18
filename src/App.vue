
<template>
  <div class="main">
    <img class="title-img" src="/img/AH-title.png" alt="Arkham Horror, The Card Game" />
    <p style="text-align: center; margin:0; padding:5px; font-size:.7rem;">version 1.1</p>
     <div class="description">
      <p class="instruction" v-if="store.tokens.length<=0 && !editingTokens">You have no tokens! Add tokens to the token pool.</p>
       <p class="instruction" v-if="editingTokens">Select tokens to add to the pool. Click added tokens to remove them from the pool.</p>
       <p class="instruction" v-if="!editingTokens && store.tokens.length>0">You may draw more than one token by using the amount dropdown.</p>
     </div>
    <div class="btn-container">
      <Btn v-if="!editingTokens" :text="btnLabel" class="block-btn" @click="()=>{editingTokens=true}" />
      <Btn v-if="!editingTokens" text="Draw Token" @click="drawToken()" class="" :class="{warning:store.tokens.length<1}"/>
      <select class="token-count" ref="token-number" v-if="!editingTokens && store.tokens.length>0" name="" id="">
        <option v-for="index in maxTokens || 10" :value="index">{{ index }}</option>
      </select>
    </div>
    <div v-if="!editingTokens" class="drawn-tokens">
      <TransitionGroup name="drawn-tokens">
        <div v-for="token in drawnTokens" class="token-item" :key="token.key">
          <Token :id="token.id" @click="drawToken()" class="block-token" :size="100" />
        </div>
      </TransitionGroup>
    </div>
    <EditTokens v-if="editingTokens" @done="()=>{editingTokens = false}" />
  </div>
</template>

<script setup>
  import {ref, useTemplateRef} from 'vue'
  import tokenData from './data/data.json'
  import Token from './Components/Token.vue'
  import Btn from './Components/Btn.vue';
  import EditTokens from './Components/EditTokens.vue';
  import { useTokenStore } from './stores/tokens';
  

  import {computed, provide} from 'vue'
  
  provide("token_data", tokenData)
  
  const store = useTokenStore()
  const editingTokens = ref(false)
  const tokenNumber = useTemplateRef('token-number')
  
  let drawingToken = false

  const maxTokens = computed(()=>{
    return store.tokens.length>10 ? 10: store.tokens.length
  })

  const btnLabel = computed(()=>{
    return store.tokens.length>0?"Edit Tokens":"Add Tokens"
  })

  const drawnTokens = computed(()=>{
    return store.tokens.filter(token => token.drawn)
  })

  const drawToken = ()=>{
    const waitTime = store.tokens.filter(token=>token.drawn).length>0?500:0
    if(!drawingToken){
      drawingToken = true
      store.hideTokens()
      setTimeout(getTokens, waitTime)
    }
  }

  const getTokens = ()=>{
    let i = 0; while(i++<tokenNumber.value.value){
      const available_tokens = store.tokens.filter(token=>!token.drawn)
      if(available_tokens.length>0)available_tokens[Math.floor(Math.random()*available_tokens.length)].drawn = true
    }
    drawingToken = false
  }
    
</script>

<style scoped>
.title-img{
  width:100%;
}
h1{
  color: #b4d2ee;
  font-weight: 400;
  text-transform: uppercase;
}
.main{
  width:320px;
  max-height:90vh;
  min-height:90vh;
  margin:0 auto;
  border:2px solid #b4d2ee;
  text-align: center;
  background: url("/img/bg.jpg");
  background-size: cover;
  display:flex;
  flex-direction:column;
}
.btn-container{
  display:flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: stretch;
  gap:10px;
  margin:10px;
}
.block-token{
  display:block;
  text-align: center;
  margin:20px auto;
  position: relative;
  transform-origin: center;
}
.block-btn{
  width:100%;
}
.warning{
  opacity:.5;
}
.drawn-tokens{
  overflow-y: scroll;
  scrollbar-color: #b4d2ee #0e1930;
  position: relative;
}
.instruction{
  border:1px solid #b4d2ee;
  padding:10px;
  background:#2f4668;
  color:#fff3df;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 15px #151816;
  margin:10px;
  margin-bottom:0px;
}
.token-item{
  position:relative;
  width:100%;
  text-align: center;
}
.drawn-tokens-enter-active,
.drawn-tokens-leave-active {
  transition: all .5s ease;
}
.drawn-tokens-enter-from,
.drawn-tokens-leave-to{
  transform: scale(0);
}
.token-count{
  border:1px solid #b4d2ee;
  padding:10px;
  background:#2f4668;
  color:#fff3df;
  box-sizing: border-box;
  cursor:pointer;
  box-shadow: inset 0px 0px 15px #151816;
  text-transform: uppercase;
}
</style>
<style>
  body{
    background: #020408;
  }
  *{
    font-family: "Ramabhadra", sans-serif;
  }
  p{
    color: #b4d2ee;
    font-weight: 400;
    line-height: 1.2rem;
    font-size: 12px;
    padding: 10px;
    margin: 0px;
    text-wrap: pretty;
  }
</style>