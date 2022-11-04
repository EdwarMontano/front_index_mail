<template>
  
  <h1>Home</h1>
  <p>{{ userStore.userData }}</p>
  <a-input-search v-model:value="buscar" placeholder="input search text" enter-button="Buscar" size="large"
  @search="onSearch" />
  <a-divider />
  <a-row>
  <a-col 
  :xs="{ span: 24 }"
  :sm="{ span: 11, offset: 1 }"
  :lg="{ span: 11, offset: 1 }">
    <a-table :columns="columns" :row-key="record => record.login.uuid" :data-source="dataSource"
      :pagination="pagination" :loading="loading" @change="handleTableChange">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
      </template>
    </a-table>
  </a-col>
  <a-col 
  :xs="{ span: 24 }"
  :sm="{ span: 11, offset: 1 }"
  :lg="{ span: 11, offset: 1 }">
    <a-card :loading="loading2" title="Cuerpo del correo">{{datap}}</a-card>
    <a-button style="margin-top: 16px" @click="handleClick">Leer más</a-button>
  </a-col>
  </a-row>
  
</template>

<script setup>
import { useUserStore } from "../stores/user"
import { usePagination } from 'vue-request';
import { computed, defineComponent  , ref , onMounted} from 'vue';
import axios from 'axios';
import TutorialDataService from "../services/enronmailDataService";


const userStore = useUserStore()
const loading2 = ref(true);
const buscar = ref('');


const handleClick = () => {
  loading2.value = !loading2.value;
};

const onSearch = searchValue => {
  TutorialDataService.findByTitle(this.buscar)
        .then(response => {
          // this.tutorials = response.data;
          // this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
};

const columns = [{
  title: 'Subject',
  dataIndex: 'name',
  sorter: true,
}, {
  title: 'From',
  dataIndex: 'gender',
  sorter: true,
  width: '20%',
}, {
  title: 'To',
  dataIndex: 'email',
  sorter: true,
  width: '20%',

}];

const queryData = params => {
  return axios.get('https://randomuser.me/api?noinfo', {
    params,
  });
};




const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
} = usePagination(queryData, {
  formatResult: res => res.data.results,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
});
const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}));

const handleTableChange = (pag, filters, sorter) => {
  run({
    results: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};




</script>