<template>
  <v-main>
  <button @click="changeLanguage" class="btn-ch">{{ $t('changeLanguageButton') }}</button>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
  //
</script>
