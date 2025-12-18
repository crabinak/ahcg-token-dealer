<template>
  <ul class="token-list">
    <li v-for="index in tokenData.token_count">
        <div class="token-list-item">
          <Token @click="store.addToken(index)" class="clickable" :key="index" :id="index" :size="75" />
          <div class="total-tokens">
            <Token v-for="token in store.tokens.filter(token => token.id==index)" @click="store.removeToken(index)" class="clickable token-small" :key="index" :id="token.id" :size="40" />
          </div>
        </div>
    </li>
  </ul>
</template>
<script setup>
  import {inject, defineEmits} from 'vue'
  import Token from './Token.vue';
  import { useTokenStore } from '@/stores/tokens';

  const store = useTokenStore()

  const emits = defineEmits(["remove-token", "add-token"])

  const tokenData = inject("token_data")

</script>
<style scoped>
ul{
  padding:0;
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
  }
</style>