<template>
  <div class="token" :style="{backgroundPositionX:props.id*-size+'px', width: size+'px', height: size+'px', backgroundSize: bgSize}">
    <div class="locked-icon" v-if="locked"></div>
  </div>
</template>
<style scoped>
  .token{
    background:url('/img/token-sprites-02.jpg');
    border-radius:100%;
    background-size: cover;
    box-shadow: 2px 5px 5px rgba(0,0,0,.5);
    margin:10px;
    display:inline-block;
    flex: 0 0 auto;
    position: relative;
  }
  .locked-icon{
    width:30px;
    height:30px;
    position:absolute;
    border-radius: 100%;
    border:2px solid #b0a383;
    background:#2f2f2f;
    box-sizing: border-box;
  }
  
</style>
<script setup>

import {defineProps, computed} from 'vue'

const props = defineProps({
  id:Number,
  size:Number,
  locked:Boolean = false
})

const size = computed(()=>{return props.size || 100})

const bgSize = computed(()=>{return `auto ${props.size || 100}px`})

</script>