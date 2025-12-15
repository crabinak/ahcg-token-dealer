
<template>
  <div class="main">
    <img class="title-img" src="/img/AH-title.png" alt="Arkham Horrow, The Card Game" />
    <!-- <h1>Token Dealer</h1> -->
     <div class="description">
       <p>This is a tool for creating and drawing from token pools for the Arkham Horror Card Game, replacing the awkwardness of using a token bag to draw from.</p>
       <p class="instruction" v-if="!editingTokens">To start, seed a pool of tokens by choosing "Add/Edit Tokens". Then choose "Draw Token" to draw a random token from your pool (or draw multiple tokens). You may click on tokens to remove them.</p>
       <p class="instruction" v-if="editingTokens">Click on a token from the list below to add it to your token pool. Clicking on created tokens will remove them. Click "Done" when finished to return to the "Draw Token" screen.</p>
     </div>
    <div class="btn-container">
      <Btn v-if="!editingTokens" :text="btnLabel" @click="()=>{editingTokens=true}" />
      <Btn v-if="store.tokens.length>0 && !editingTokens" text="Clear Tokens" @click="clearTokens" />
      <Btn v-if="store.tokens.length>0 && !editingTokens" text="Draw Token" @click="drawToken" />
    </div>
    <div v-if="!editingTokens" class="drawn-tokens">
      <Token v-for="token, index in store.drawnTokens.slice().reverse()" :id="token.id" :key="index" @click="removeDrawnToken(token)" class="block-token" :size="index==0?100:50" />
    </div>
    <TokenPanel v-if="editingTokens" :tokens="tokenData.tokens" @done="()=>{editingTokens=false}" @clear-tokens="()=>{store.clearTokenPool()}" />
    <!-- .slice().reverse() -->
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import tokenData from './data/data.json'
  import Token from './Components/Token.vue'
  import Btn from './Components/Btn.vue';
  import TokenPanel from './Components/TokenPanel.vue';
  import { useTokenStore } from './stores/tokens';
  

  import {reactive, computed, provide} from 'vue'

  //tokens available in the pool
  const store = useTokenStore()
  const tokens = reactive([1,-1,0,0, "doom", "doom"])

  const editingTokens = ref(false)

  //tokens that have been drawn
  const drawn_tokens = reactive([])

  provide("tokens", tokens)
  provide("drawn_tokens", drawn_tokens)
  provide("token_data", tokenData.tokens)

  const btnLabel = computed(()=>{
    return store.tokens.length>0?"Edit Tokens":"Add Tokens"
  })
  const drawToken = ()=>{
    store.drawToken()
  }

  const removeDrawnToken = (id)=>{
    store.removeDrawnToken(id)
  }
  const clearTokens = ()=>{
    store.clearTokens()
    
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
    margin:0 auto;
    border:2px solid #b4d2ee;
    text-align: center;
    background: url("/img/bg.jpg");
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
    
  }
  .block-token:not(:first-child){
    width:50px !important;
    height:50px !important;
    background-size: auto 50px !important;
    display:inline-block;
    margin:10px;
  }
 
  .drawn-tokens{
    overflow-y: scroll;
    scrollbar-color: #b4d2ee #0e1930;
  }
  .drawn-token-list-enter-active,
.drawn-token-list-leave-active {
  transition: all 0.5s ease;
}
.drawn-token-list-enter-from,
.drawn-token-list-leave-to {
  transform:scale(0)
}
.instruction{
  border:1px solid #b4d2ee;
  padding:10px;
  background:#2f4668;
  color:#fff3df;
  /* width:100%; */
  box-sizing: border-box;
  box-shadow: inset 0px 0px 15px #151816;
  margin:10px;
  margin-bottom:0px;
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