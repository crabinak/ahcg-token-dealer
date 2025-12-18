import {defineStore} from 'pinia'

export const useTokenStore = defineStore('tokens', {
  state:()=>({
    tokens:[]
  }),
  actions:{
    addToken(token_id){
      this.tokens.push({id:token_id, locked:false, drawn:false, key:Date.now()})
    },
    clearTokens(){
      this.tokens.length = 0
    },
    hideTokens(){
      this.tokens.forEach(token=>{
        token.drawn = false
      })
    },
    removeToken(id){
      const token = this.tokens.find(t=>t.id===id)
      if(token) this.tokens.splice(this.tokens.indexOf(token),1)
    }
  }
})