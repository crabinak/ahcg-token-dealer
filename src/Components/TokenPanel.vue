<template>
<div class="token-panel">
  <div class="description">
    
  </div>
  <div class="header">
    <div class="btn-container">
      <Btn class="btn" text="done" @click="emit('done')" />
      <Btn class="btn" text="clear all" @click="emit('clearTokens')" />
    </div>
  </div>
  <TokenList :tokens="props.tokens" @remove-token="removeToken" />
  <div class="bottom-shadow"></div>
  <div class="bottom-shadow"></div>
</div>
</template>
<script setup>

  import Btn from './Btn.vue';
  import TokenList from './TokenList.vue';
  import {defineProps, defineEmits} from 'vue'

  const props = defineProps({
    tokens:Array
  })

  const emit = defineEmits(['done', 'clearTokens'])


</script>
<style scoped>
.header{
  display:flex;
  flex-direction:row;
  
  text-align: left;
}
h2{
  padding:0;
  margin:0;
  flex-grow: 1;
  color: #b4d2ee;
  font-weight: 400;
  text-transform: uppercase;
}
.btn{
  flex: 1;
  /* flex: 0 0 auto;
  width:auto; */
}
.token-panel{
  overflow:hidden;
  display:flex;
  flex-direction:column;
  position:relative;
}
  .btn-container{
    display:flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: stretch;
    gap:10px;
    padding:10px;
    width:100%;
  }
  .bottom-shadow{
    position:absolute;
    bottom:0;
    width:100%;
    height:100px;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.35));
    pointer-events:none;
  }
</style>