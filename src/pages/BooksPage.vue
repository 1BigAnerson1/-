<script setup>
import {inject, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

import PROVIDE from '@/constants/provides.js';

const router = useRouter();
const domInputFile = ref(null);
const domBtnUpload = ref(null);

const isReady = ref (false);
const isUploading = ref(false);
const isBooksLoading = ref (false);

const books = ref ([]);
const pageIndex = ref(parseInt(router.currentRoute.value.query.page) || 1);
const pagesMax = ref(0);

const pb = inject(PROVIDE.PB);
const booksCollection = pb.collection('Books');

const loadBooks =async () => {
  isBooksLoading.value = true;
  return booksCollection.getList(pageIndex.value, 10).then((result) => {
    console.log('> result', result);
    pagesMax.value = result.totalPages;
    books.value = result.items;
    isBooksLoading.value = false;
  });
};

const insertBooks = async (booksList) => {
  const result = [];
  for await (const booksListElement of booksList) {
    await booksCollection.create(booksListElement).then((record) => {
      console.log ('> \t record created:', record);
      result.push(record);
    }).catch((e) => console.log(e));
  }
  return result;
};

const onUploadClick = () => {
  console.log('>BooksPage -> onUploadClick:', domInputFile.value);

  const setActiveUploadUI = (value, negativeValue = !value) => {
      domBtnUpload.value.disabled = negativeValue;
      domInputFile.value.disabled = negativeValue;
      isUploading.value = negativeValue;
  };
  domInputFile.value.oninput = () => {
    console.log('> files', domInputFile.value.files);
    const btn = domBtnUpload.value;
    const input = domInputFile.value;
    const fileList = input.files;
    const selectedFile = fileList[0];
    const reader = new FileReader();

    console.log('selectedFile:', selectedFile);
    setActiveUploadUI(false);

    reader.onload = async () => {
      const booksRaw = JSON.parse(reader.result.toString());
      console.log('selectedFile:', booksRaw);
      try {
        const booksInserted = await insertBooks(booksRaw);
        console.log ('inserted:', booksInserted);
        books.value = booksInserted;
      } catch (e) {
        console.log(e);
      }
      setActiveUploadUI(true);
      reader.onload = null;
      input.onchange = null;
    };
    reader.readAsText(selectedFile);
  };
  domInputFile.value.click();
};

const onChangePage = (delta) => {
  console.log('> BooksPage -> onChangePage', {delta});
  pageIndex.value += delta;
  loadBooks().then(()=> {
    router.replace({
      ... router.currentRoute,
      query: { page: pageIndex.value}
    });
  });
};

onMounted(() => {
  loadBooks().then(() => {
    isReady.value = true;
  });
});

</script>
<template>
  <div v-if="!isReady">
    Page Loading...
  </div>
  <div v-else>
    <div v-if="books.length > 0">
      <div>
        <button
          :disabled="pageIndex === 1"
          @click="onChangePage(-1)"
        >
          Prev
        </button>
        <button
          :disabled="pageIndex === pagesMax"
          @click="onChangePage(1)"
        >
          Next
        </button>
      </div>
      <b>Books ( {{ pageIndex }} / {{ pagesMax }} )</b>
      <div
        v-for="book in books"
        :key="book.id"
      >
        {{ book.title }}
      </div>
    </div>
    <div v-else>
      <input
        ref="domInputFile"
        hidden
        type="file"
        accept=".json"
      >
      <button
        ref="domBtnUpload"
        @click="onUploadClick"
      >
        Upload
      </button>
      <div v-if="isUploading">
        In progess, wait please ...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodosPage'
};
</script>