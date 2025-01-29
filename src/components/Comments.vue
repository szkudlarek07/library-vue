<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DataView from 'primevue/dataview';



const books = ref([]);
const loading = ref(true);
const error = ref(null);

// onMounted(async () => {
//     try {
//         const response = await axios.get('http://localhost:8000/api/books');
//         console.log(response);
//         if (!response.data) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         books.value = await response.data;
//     } catch (err) {
//         error.value = err;
//     } finally {
//         loading.value = false;
//     }
// });




onMounted(() => {
    axios.get(`http://localhost:8000/api/books/2/reviews`).then(response => { products.value = response.data.data});
    
});

const products = ref();
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
]);
const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    }
    else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};
const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};
</script>

<template>
    <!-- <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div> -->

      <DataView :value="products" :sortOrder="sortOrder" :sortField="sortField">
        <template #list="slotProps">
          <div v-for="(item, index) in slotProps.items" :key="index" class="book-item">
            <!-- Obrazek książki -->
            <img class="book-image"
              :src="`https://img.freepik.com/premium-wektory/otwarta-ksiazka-do-czytania-recznie-rysowane-symbol_599395-224.jpg?w=360`" style="width:50px;"
              :alt="item.name" />
  
            <!-- Informacje o książce -->
            <div class="book-info">
              <div class="book-author">{{ item.user_name }}</div>
              <div class="book-title">{{ item.content }}</div>
            </div>
  
            <!-- Cena i przyciski -->
            <div class="book-actions">
              <span class="book-price"><i class="pi pi-star"></i> {{ item.rate  }}/5</span>
              <div class="book-buttons">
                <Button severity="warn" icon="pi pi-pencil" outlined size="small"></Button>
                <Button severity="danger" icon="pi pi-trash" outlined size="small"></Button>
              </div>
            </div>
          </div>
        </template>
      </DataView>
</template>

<style scoped>
h1 {
  text-align: center;
}

.addbutton {
  min-width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

/* Ustawienie kontenera książki */
.book-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #333333;
}

/* Styl dla obrazka */
.book-image {
  width: 100px;
  height: auto;
  border-radius: 8px;
}

/* Styl dla sekcji informacji o książce */
.book-info {
  flex-grow: 1;
  padding-left: 16px;
}

/* Styl dla autora i tytułu */
.book-author {
  font-size: 14px;
  color: #666;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 4px;
}

/* Styl dla sekcji z ceną i przyciskami */
.book-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* Styl dla ceny */
.book-price {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

/* Styl dla przycisków */
.book-buttons {
  display: flex;
  gap: 8px;
}
</style>
