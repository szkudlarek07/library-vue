<template>
    <div id="app">
      <h1>Lista Książek</h1>
      <Button class='addbutton' severity="success" @click="showAddBookModal = true">Dodaj książkę</button>
      <DataView :value="books" :sortOrder="sortOrder" :sortField="sortField">
        <template #list="slotProps">
          <div v-for="(item, index) in slotProps.items" :key="index" class="book-item">
            <!-- Obrazek książki -->
            <img class="book-image"
              :src="`https://img.freepik.com/premium-wektory/otwarta-ksiazka-do-czytania-recznie-rysowane-symbol_599395-224.jpg?w=360`"
              :alt="item.name" />
  
            <!-- Informacje o książce -->
            <div class="book-info">
              <div class="book-author">{{ item.author }}</div>
              <div class="book-title">{{ item.title }}</div>
            </div>
  
            <!-- Cena i przyciski -->
            <div class="book-actions">
              <span class="book-price"><i class="pi pi-star"></i> {{ Math.round(item.avg_rate * 10) / 10 }}/5</span>
              <div class="book-buttons">
                <Button severity="success" icon="pi pi-heart" outlined></Button>
                <Button @click.prevent="$event => $router.push('/books/' + item.id)" severity="success" icon="pi pi-book" label="Details"></Button>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  
  export default {
    data() {
      return {
        books: [],
        loading: true,
        showAddBookModal: false,
        isEditing: false,
        currentBook: {
          id: null,
          title: '',
          author: '',
          year: '',
          image: ''
        }
      };
    },
    async created() {
      await this.fetchBooks();
    },
    methods: {
      async fetchBooks() {
        try {
          const response = await axios.get('http://localhost:8000/api/books');
          this.books = response.data.data;
          await this.fetchReviews();
        } catch (error) {
          console.error('Błąd podczas pobierania książek:', error);
        } finally {
          this.loading = false;
        }
      },
      async addBook() {
        try {
          const response = await axios.post('http://localhost:8000/api/books', this.currentBook);
          this.books.push(response.data);
          this.showAddBookModal = false;
          this.resetCurrentBook();
        } catch (error) {
          console.error('Błąd podczas dodawania książki:', error);
        }
      },
      async updateBook() {
        try {
          const response = await axios.put(`http://localhost:8000/api/books/${this.currentBook.id}`, this.currentBook);
          const index = this.books.findIndex(book => book.id === this.currentBook.id);
          this.books.splice(index, 1, response.data);
          this.showAddBookModal = false;
          this.resetCurrentBook();
        } catch (error) {
          console.error('Błąd podczas aktualizacji książki:', error);
        }
      },
      async deleteBook(bookId) {
        try {
          await axios.delete(`http://localhost:8000/api/books/${bookId}`);
          this.books = this.books.filter(book => book.id !== bookId);
        } catch (error) {
          console.error('Błąd podczas usuwania książki:', error);
        }
      },
      editBook(book) {
        this.currentBook = { ...book };
        this.isEditing = true;
        this.showAddBookModal = true;
      },
      resetCurrentBook() {
        this.currentBook = {
          id: null,
          title: '',
          author: '',
          year: '',
          image: ''
        };
        this.isEditing = false;
      }
    }
  };
  </script>
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
    border-bottom: 1px solid #e0e0e0;
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
  