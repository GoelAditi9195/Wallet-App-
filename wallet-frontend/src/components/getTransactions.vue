<template>
    <div class="getForm">
        <el-form class="getTform" :model="FormData">
     <h3>Get Transactions:</h3> 
     <div class="walletC">
        <el-label for="walletId">Wallet ID :</el-label>
        <el-input type="number" id="walletId" v-model="walletId" clearable />
     </div>
        <el-form-item>
            <el-input v-model="selectedPage" placeholder="Select Page" type="number"></el-input>
        </el-form-item>
        <el-form-item>
     <el-button round @click="getTransactions">Get Transactions</el-button>
     <el-button  round @click="convertToExcel">Export to Excel</el-button>
     </el-form-item>
     
        </el-form>
    </div>

</template>

<script>


import transactionList from '../components/transactionList.vue';


export default{
    data(){ 
        return{
       walletId: 0,
       selectedPage: 1,
       
    }},
    components: {
        'transaction-list' : transactionList,
    },
    methods :{ 
           getTransactions(){
            try{
             this.$router.push({ name: 'transaction-list', params: { walletId: this.walletId}, query: {page: this.selectedPage} });
             }catch(error){
                console.log(error);
             } },
             
    }
};
</script>


<style scoped>
.getTform{
    color: bisque;
    
    display: flex;
    flex-direction: column;
    height: 250px;
    align-items: center;
    
}
.walletC{
    margin: 10px;
}
button{
    margin: 10px;
    background-color: bisque;
    color: black;
    border-color: white;
    border-width: 2.5px;
}

</style>