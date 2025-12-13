<template>
  <ul class="token-list">
    <li v-for="token, index in tokenData">
        <div class="token-list-item">
          <Token @click="addToken(token)" class="clickable" :key="token.id" :id="token.id" :size="75" />
          <div class="total-tokens">
            <Token v-for="tokenValue in store.tokens.filter(item => item.value==tokenData[index].value)" @click="removeToken(tokenValue)" class="clickable token-small" :key="token.id" :id="token.id" :size="40" />
          </div>
        </div>
    </li>
  </ul>
</template>
<script setup>
  import {defineProps, inject, defineEmits} from 'vue'
  import Token from './Token.vue';
  import { useTokenStore } from '@/stores/tokens';

  const props = defineProps({
    tokens:Array
  })

  const store = useTokenStore()

  const emits = defineEmits(["remove-token", "add-token"])

  const tokenData = inject("token_data")
  const tokens = inject("tokens")

  const removeToken = (id)=>{
    store.removeToken(id)
  }
  const addToken = (id)=>{
    store.addToken(id)
    console.log(store.tokens)
  }

</script>
<style scoped>
ul{
  padding:0;
  /* margin:10px; */
  list-style: none;
  
  max-width: 100%;
  
}
.clickable{
  transition: all .2s ease-in-out;
  cursor:pointer;
}
.clickable:hover{
    transform:scale(1.1);
  }
  .clickable:active{
    transform:scale(.9);
    filter: brightness(.75);
  }
  .token-list-item {
    display: flex;
    flex-direction: row;
    width:100%;
    align-items: center;
    
  }
  .token-total{
    margin:5px;
  }
  li{
    /* border:1px solid red; */
    border-bottom:2px solid #b4d2ee;
    margin-bottom:10px;
  }
  .remove{
    background:rgba(255,0,0,1);
    color:white;
    font-size:.9rem;
    padding:5px;
    cursor:pointer;
  }
  .remove:active{
    background:rgba(125,0,0,1);
  }
  .total-tokens{
    position:relative;
    text-align: left;
  }
  .token-small{
    margin:5px;
  }
  .token-list{
    overflow-y: scroll;
    scrollbar-color: #b4d2ee #0e1930;
   
    /* scrollbar-width: thin; */
  }
</style>