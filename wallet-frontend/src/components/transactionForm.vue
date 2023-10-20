<template>
    <div class="Tform">
    <h3>Create Transaction:</h3>
    <el-form  @submit.prevent="createTransaction" :model="FormData">
        <div class="walletC">
            <el-label for="walletId" >WalletID:</el-label>
        <el-input type="number" id="walletId" v-model="walletId" clearable />
      
        </div>
        <div class="amountC">
      <label for="amount">Amount:</label>
      <el-input type="number" id="amount" v-model="amount" clearable/>
        </div>
        <div class="descriptionC">
      <label for="description">Description:</label>
      <el-input type="text" id="description" v-model="description" clearable/>
        </div>
        <el-form-item>
      <el-button round id="button" type="submit">Create Transaction</el-button>
    </el-form-item>
      <p v-if="output1===true">{{ message }} -            {{ t }} </p>
      <p v-else-if="output1==-false">{{ errorM }}</p>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
    return {
      amount: 0,
      description: '',
      walletId : null,
      output1 : null,
      errorM : '',
      message : '',
      t: []
      
    }
  },
  methods: {
    async createTransaction() {
        try{
            console.log(this.amount, this.description);
      const result = await axios.patch(`http://localhost:8000/api/wallet/${this.walletId}` , {amount: this.amount, Description : this.description}); 
      this.message = result.data.message; 
      this.t = result.data.transaction[0];
      console.log(result);
      this.output1 = true;
      }catch(error){
        this.errorM = error.response.data.message;
        this.output1 = false;
      }
  },
}
};
</script>

<style lang="scss">
.Tform{
    display: flex;
    flex-direction: column;
    color: bisque;
    align-items: center;
    justify-content: space-evenly;
    
    height: 300px;
}
.walletC{
    margin: 10px;
}
.amountC{
    margin: 10px;
}
.descriptionC{
    margin: 10px;
    
}
#button {
    margin: 10px;
    background-color: bisque;
    color: black;
    border-color : white;
    border-width: 2.5px;
}

</style>