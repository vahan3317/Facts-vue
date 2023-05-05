<template>
  <v-app>
    <v-app-bar class="elevation-2">
      <v-app-bar-title><router-link to="/" class="router">CatFacts <v-icon color="primary">mdi-cat</v-icon> </router-link></v-app-bar-title>
      <template v-slot:append>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
     <v-main>
    <router-view />
  </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue'
</script>
<style scoped>

.router {
  text-decoration: none;
}

</style>
