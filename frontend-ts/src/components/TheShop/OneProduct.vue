<script setup lang="ts">
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

const props = defineProps<{ product: Product }>()
</script>

<template>
  <div class="product-card">
    <img
      class="product-image"
      :src="props.product.images[0]"
      alt="Картинка товара"
    />
    <div class="product">
      <h2>{{ props.product.title }}</h2>
      <p>{{ props.product.category.name }}</p>
      <p>{{ props.product.description }}</p>
      <p><span>Цена:</span> {{ props.product.price }}</p>
    </div>
  </div>    
</template>

<style scoped>
.product-card {
  display: flex;
  gap: 10px;
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
}

.product-image {
  min-width: 20%;
  max-width: 20%;
  height: fit-content;
}

.product {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>