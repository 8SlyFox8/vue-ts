<template>
    <div class="header">
        <RouterLink :to="{name: 'productList'}">Магазин</RouterLink>
        <RouterLink :to="{name: 'cart'}">Корзина</RouterLink>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    gap: 10px;
}
</style>