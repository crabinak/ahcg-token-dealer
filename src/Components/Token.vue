<template>
  <div class="token" :style="{backgroundPositionX:props.id*-size+'px', width: size+'px', height: size+'px', backgroundSize: bgSize}"></div>
</template>
<style scoped>
  .token{
    /* width:100px;
    height:100px; */
    background:url('/img/token-sprites.jpg');
    border-radius:100%;
    background-size: cover;
    box-shadow: 2px 5px 5px rgba(0,0,0,.5);
    margin:10px;
    display:inline-block;
    flex: 0 0 auto;
  }
  
</style>
<script setup>

import {defineProps, computed} from 'vue'

const props = defineProps({
  id:Number,
  size:Number
})

const size = computed(()=>{
  return props.size || 100
})

const bgSize = computed(()=>{
  // return 1600*(props.size/100) || 1600
  return `auto ${props.size || 100}px`
})

</script>