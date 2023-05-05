<template>
  <div class="neomorphism">
  
    <v-select v-model="selectedRowsPerPage" :items="rowsPerPageOptions" label="Rows per page" class='itemsPer'></v-select>
  
    <v-data-table v-if="!isLoading" :headers="headers" :items="visibleCatFacts" class="elevation-2" disable-pagination hide-default-footer>
      <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ header }">
        <div class="header-text">{{ header.text }}</div>
      </template>
      <tr v-for="(item, index) in visibleCatFacts" :key="item._id" :class="{'grey lighten-2': index % 2 === 0}" class="table-row-animation">
        <td><router-link :to="`/details/${item._id}`" class="router">{{ item.text }}</router-link></td>
        <td>{{ item.type }}</td>
        <td>{{ item._id }}</td>
      </tr>
    </v-data-table>
    
    <div v-else class="d-flex justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
      
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { VSelect } from 'vuetify/lib/components/VSelect/VSelect'


import axios from 'axios';

interface CatFact {
  _id: string;
  text: string;
  type: string;
}

export default defineComponent({
  name: 'CatFactsTable',
  components: {
    VDataTable,
    VSelect,
  },
  setup() {
    const catFacts = ref<CatFact[]>([]);
    const isLoading = ref<boolean>(true);
    const selectedRowsPerPage = ref<number>(2);

    const fetchData = async () => {
      try {
        const response = await axios.get<CatFact[]>('https://cat-fact.herokuapp.com/facts');
        catFacts.value = response.data ?? [];
        isLoading.value = false;
        console.log(catFacts.value)
      } catch (error) {
        console.log(error);
        catFacts.value = [];
        isLoading.value = false;
      }
    };

    watchEffect(async () => {
      try {
        isLoading.value = true;
        await fetchData();
      } catch (error) {
        console.log(error);
      }
    });

    const visibleCatFacts = computed(() => {
      const startIndex = 0;
      const endIndex = Math.min(startIndex + selectedRowsPerPage.value, catFacts.value.length);
      return catFacts.value.slice(startIndex, endIndex);
    });

    const rowsPerPageOptions = computed(() => {
      return [2, 4, catFacts.value.length];
    });

    return { catFacts, isLoading, selectedRowsPerPage, visibleCatFacts, rowsPerPageOptions };
  },
  computed: {
    headers(): { text: string; value: string }[] {
      const catFactKeys = Object.keys({} as CatFact);
      return catFactKeys.map((key) => ({
        text: key.toUpperCase(),
        value: key,
      }));
    },
  },
});
</script>



<style scoped>
/* Neomorphism styles */
.neomorphism {
  background-color: #d4d4d4;
  box-shadow: 3px 3px 7px #bfbfbf, -3px -3px 7px #ffffff;
  border-radius: 12px;
  padding: 100px;
  
}

/* Table styles */
table {
  border-collapse: collapse;
  margin: 20px auto ;
  
}
.router{
  
  text-decoration: none;

}
.itemsPer{
  width:100%;
  display:flex;
  justify-content:end;
  margin-bottom:6px;
}

table th, table td {
  
  padding: 5px;
  width:33.3333333%;
  text-align:center;
  border-radius:12px;
  
  
  
}
td:hover{
  border: 0.05px solid lightblue;
  
}
  


table th {
  background-color: #f2f2f2;
  ;
}

/* Table row animation */
.table-row-animation {
  animation: slide-in 0.5s ease;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Additional animations */
.v-data-table__wrapper {
  animation: fade-in 1s;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.v-data-table__wrapper tr {
  animation: slide-in 1s;
}

@keyframes slide-in {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.v-data-table__wrapper tr:nth-child(even) {
  animation: slide-in-right 1s;
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.v-data-table__wrapper td {
  animation: fade-in-quick 0.5s;
}

@keyframes fade-in-quick {
  from { opacity: 0; }
  to { opacity: 1; }
}

.v-data-table__wrapper td:nth-child(2) {
  animation-delay: 0.1s;
}

.v-data-table__wrapper td:nth-child(3) {
  animation-delay: 0.2s;
}



</style>
