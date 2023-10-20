<template>
    <div id="app">

    <div class="headingContainer">
        <h1>Welcome to Wallet App</h1>
    </div>
    <hr>
    <div class="forms-container">
        <el-form class="createWallet" :model="FormData">
    
            <h3 id="t">Create Wallet:</h3>
    
        <div class="nameContainer">
          <el-label id="nameLabel" label-for="name">Name: </el-label>
          <el-input type="text" id="name" v-model="name" clearable/>
          
        </div>
        <div class="balanceContainer">
          <el-label id="balanceLabel" for="balance">Balance:</el-label>
          <el-input type="number" id="balance" v-model="balance" />
        </div >
        <el-form-item>
        <el-button @click= 'createWallet' type="primary" id="Cbutton" round>Create Wallet</el-button></el-form-item>
        
        <div class="para">
        <p v-if="output == true" >Wallet Created sucessfully</p>
        <p v-else-if="output == false">{{ errorMessage }}</p>
    
        </div>
        </el-form>
      
    
      <transaction-form></transaction-form>
      <get-transactions></get-transactions>
    </div>
    
      </div>
    
</template>

<script>
import axios from 'axios';
import transactionForm from './transactionForm.vue';
import GetTransactions from './getTransactions.vue';
export default {
    data() {
    return {
      name: '',
      balance: 0,
      output : null,
      errorMessage: '',
    };
},
components: {
   'transaction-form': transactionForm,
   'get-transactions': GetTransactions,
},
methods: {

     async createWallet (Event){
        Event.preventDefault();

        console.log(this.name, this.balance);
        try{
        const result = await axios.post('http://localhost:8000/api/wallet', {name: this.name , balance: this.balance}); 
    console.log(result)
this.output= true;}
    
        catch(error){
        
        this.errorMessage = error.response.data.message;
    this.output= false;}
},
        
    
    }
};
</script>

<style >
.forms-container{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
    body{
        background-color: rgb(102, 64, 64);
    }
    .createWallet
    {
        color: bisque;
        justify-content: space-evenly;
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 250px;
    
        
    }
     
    .headingContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: sticky;
        height: 70px;
        color: bisque;
        
    }
    
    .nameContainer {
    
        margin: 10px;
        color: bisque;
        
    }
    .balanceContainer {
        margin: 10px;
    }
    #Cbutton {
        margin: 10px;
        background-color: bisque;
        color: black;
        border-color: white;
        border-width: 2.5px;
    }
    .para{
        color: bisque;
    }
    
    
    
    
</style>