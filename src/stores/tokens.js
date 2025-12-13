import {defineStore} from 'pinia'

export const useTokenStore = defineStore('tokens', {
  state:()=>({
    tokens:[], drawnTokens:[]
  }),
  getters:{
    getTokens: (state)=>{
      this.tokens
    },
    randomToken: (state)=>{
      state.tokens[Math.floor(Math.random()*state.tokens.length)]
    }
  },
  actions:{
    drawToken(){
      if(this.tokens.length>0){
        const token = this.tokens[Math.floor(Math.random()*this.tokens.length)]
        // if(this.drawnTokens.length>0)this.drawnTokens.splice(0, 1)
        this.drawnTokens.push(token)
      }
    },
    resetTokens(){
      this.drawnTokens.length = 0
    },
    removeDrawnToken(id){
      var tokenIndex = this.drawnTokens.indexOf(id)
      if(tokenIndex>-1) this.drawnTokens.splice(tokenIndex, 1)
    },
    removeToken(id){
      var tokenIndex = this.tokens.indexOf(id)
      if(tokenIndex>-1) this.tokens.splice(tokenIndex, 1)
    },
    addToken(id){
      console.log(id)
      this.tokens.push(id)
    },
    clearTokens(){
      this.drawnTokens.length=0
    },
    clearTokenPool(){
      this.tokens.length = 0
    }
  }
})