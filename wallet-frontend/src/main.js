import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import homepage from './components/homepage.vue'
import 'element-plus/dist/index.css';
import{
    ElButton,
    ElInput,
    ElSelect, 
    ElForm,
    ElFormItem,
    ElTable,
    ElTableColumn,
    

} from 'element-plus';

const app = createApp(App)



app.component(ElTableColumn.name, ElTableColumn);
app.component(ElTable.name , ElTable);
app.component(ElForm.name, ElForm);
app.component(ElFormItem.name, ElFormItem);
app.component(ElButton.name, ElButton);
app.component(ElInput.name, ElInput);
app.component(ElSelect.name, ElSelect);
app.component(homepage)

app.use(router)

app.mount('#app')
