<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSocket } from '@/composables/useSocket';
import Product from '@/components/TheShop/OneProduct.vue';

interface Category {
    name: string
}

interface Product {
    id: number
    title: string
    price: number
    description: string
    images: string[]
    category: Category
}

const products = ref<Product[]>([]);
const { emit, on, isConnected } = useSocket('ws://localhost:8001');

on('set-state', (payload: Product[]) => {
  products.value = payload;
});

watch(isConnected, (connected) => {
  if (connected) {
    emit('get-state');
  }
});
</script>

<template>
  <p v-if="!isConnected">
    Товары загружаются ...
  </p>
  <div
        v-else
        class="product-selection"
        v-for="product in products"
        :key="product.id"
    >
        <Product
            :product="product"
        />
    </div>
</template>

<style scoped>
.product-selection {
    display: flex;
    gap: 20px;
}
</style>