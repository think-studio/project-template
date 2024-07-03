<template>
  <div>
    <header>{{ $t("header") }}</header>
    <slot />
    <header>{{ $t("footer") }}</header>
  </div>
</template>

<script setup lang="ts"></script>
