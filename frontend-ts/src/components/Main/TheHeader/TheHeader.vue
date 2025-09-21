<template>
    <div class="header">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink :to="{name: 'shop'}">Магазин</RouterLink>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    gap: 10px;
}
</style>