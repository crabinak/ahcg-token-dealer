<template>
  <button class="btn">{{ props.text }}</button>
</template>
<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  text:String
})

</script>
<style>
.btn{
  border:1px solid #b4d2ee;
  padding:10px;
  background:#2f4668;
  color:#fff3df;
  box-sizing: border-box;
  cursor:pointer;
  box-shadow: inset 0px 0px 15px #151816;
  text-transform: uppercase;
  flex-grow: 1;
}
.btn:active{
  background:#131d2b;
}
</style>