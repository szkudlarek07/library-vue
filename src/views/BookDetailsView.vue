<script setup>
import Comments from '../components/Comments.vue';
import {onMounted} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
const route = useRoute();
const bookid = route.params.book;
console.log(bookid);
const props = ref();
// onMounted(() => {
axios.get(`http://localhost:8000/api/books/${bookid}`).then(response => { props.value = response.data.data})
console.log(props);
// });
const book = props;


const newReview = ref({ name: '', rating: 5, comment: '' });
const selectedRatingFilter = ref(null);

const addReview = () => {
    if (newReview.value.name && newReview.value.comment) {
        props.book.reviews.push({ ...newReview.value });
        newReview.value = { name: '', rating: 5, comment: '' };
    }
};

const filteredReviews = computed(() => {
    return selectedRatingFilter.value
        ? props.book.reviews.filter(r => r.rating === selectedRatingFilter.value)
        : props.book.reviews;
});

const averageRating = computed(() => {
    if (props.book.reviews.length === 0) return "Brak ocen";
    const total = props.book.reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / props.book.reviews.length).toFixed(1);
});
</script>

<template>
<Card style="width: 100%; overflow: hidden" v-if="props">
    <template #header>
        <img alt="user header" src="https://img.freepik.com/free-photo/beautiful-landscape-from-magazine-coming-life_23-2151158557.jpg" style="width:100%; height:300px; object-fit:cover" />
    </template>
    <template #title>
  <div class="flex justify-between items-center w-full">
    <div class="flex w-full font-bold">{{ book.title }}</div>
    <i class="pi pi-star-fill text-yellow-500"> {{ "&nbsp;"+(Math.round(book.avg_rate * 10) / 10) }}</i>
  </div></template>
    <template #subtitle>{{book.author}}, {{book.year}}</template>
    <template #content>
        <p class="m-0">
            {{book.description}}
        </p>
    </template>
    <template #footer>
        <div class="flex gap-4 mt-1">
    <Button label="Delete" severity="danger" outlined class="w-full m-1" />
    <Button label="Edit" severity="warn" outlined class="w-full m-1" />
    <Button label="Rate" severity="success" outlined class="w-full m-1" />
</div>
    </template>
</Card>
<Comments/>
</template>