
  <template>
    
          <h2>Transactions List for Wallet ID: {{ walletId }}</h2>
           <el-button round @click="clearFilter">Reset all Filters</el-button>
           
          <el-table :data="transactions" row-key:transactionId height="500" border style="width: 100%">
          <el-table-column prop="type" label="Type" :filters="[
            {text: 'Credit' , value: 'credit'},
            {text: 'Debit', value: 'debit'}]" 
            :filter-method="filterByType"></el-table-column>
          <el-table-column prop="amount" label="Amount"></el-table-column>
          <el-table-column prop="transactionId" label="Transaction ID"> </el-table-column>
          <el-table-column prop="balance" label="Balance"></el-table-column>
          <el-table-column prop="createdAt" label="Created At"></el-table-column>
          <el-table-column prop="Description" label="Description"></el-table-column>
          
          </el-table>
        
  </template>
  
  <script>
import axios from 'axios';


  export default {
    data() {
      return {
        walletId: this.$route.params.walletId,
        transactions: [],
        filterType : '',
        jpage: this.$route.query.page,
      };
    },
    mounted() {
      this.fetchTransactions();
    },
    methods:{
        async fetchTransactions(){
            try{
              
            const result = await axios.get(`http://localhost:8000/api/wallet/transaction/${this.walletId}`, 
            {
              params: {
              page: this.jpage}
            }
          );
            this.transactions= result.data;
            }catch(error){
                console.log(error);
            }
        },
        filterByType(value, row){
              return row.type === value;
        },
        clearFilter() {
          this.$refs.tableRef.clearFilter(); 
    },
        
    }
  };
  </script>
  <style >

h2{
  color: bisque;
}
e-button{
  background-color: bisque;
  border: 2.5px;
  border-color: black;
  margin: 10px;
}
</style>
  