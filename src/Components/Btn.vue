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
  /* width:100%; */
  box-sizing: border-box;
  cursor:pointer;
  box-shadow: inset 0px 0px 15px #151816;
  text-transform: uppercase;
  flex-grow: 1;
  /* transition: all .2s ease-in-out; */
}
.btn:active{
  background:#131d2b;
}
.btn-container{
  /* margin:10px; */
}
</style>