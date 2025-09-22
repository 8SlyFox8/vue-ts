<script setup lang="ts">
import Product from '@/components/TheShop/OneProduct.vue';
import { useProducts } from '@/composables/useProducts.ts';
import { useSocket } from '@/composables/useSocket';

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

const { products, productsLoading } = useProducts()
const { emit, isConnected } = useSocket<Product>('ws://localhost:8001');

function addProduct(product: Product): void {
  emit('add-product', product);
}
</script>

<template>
    <p v-if="productsLoading">
        Товары загружаются ...
    </p>
    <div
        v-else
        class="product-selection"
        v-for="product in products"
        :key="product.id"
    >
        <button
            class="square-button"
            :disabled="!isConnected"
            @click="addProduct(product)"
        >
            Добавить
        </button>
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

.square-button {
  width: 200px;
  height: 40px;
}
</style>