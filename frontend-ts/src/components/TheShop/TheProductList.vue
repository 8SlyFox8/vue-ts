<script setup lang="ts">
import Product from '@/components/TheShop/OneProduct.vue'
import { useProducts } from '@/composables/useProducts.ts'

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

function addProduct(productId: number): void {
    console.log('Товар добавлен')
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
            @click="addProduct(product.id)"
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