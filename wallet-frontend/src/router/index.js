import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import homepage from '../components/homepage.vue';
import transactionList from '../components/transactionList.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: homepage,
      name: 'homepage'

    },
    {
      path: '/transactions/:walletId',
      component : transactionList,
      name: 'transaction-list',
      //props: (route) => ({transactions: route.query.transactions}),
    }
  ]
})

export default router
