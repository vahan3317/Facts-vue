<template>
  <v-app>
    <v-app-bar class="elevation-2">
      <v-app-bar-title>
        <router-link to="/" class="router">CatFacts <v-icon color="primary">mdi-cat</v-icon> </router-link>
      </v-app-bar-title>
      <button @click="changeLanguage" class="btn-ch">{{ $t('changeLanguageButton') }}</button>
      <v-btn icon @click="toggleLike">
        <v-icon :color="isLiked ? 'red' : ''">mdi-heart</v-icon>
      </v-btn>
       
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-dialog v-model="showDialog" max-width="500" class="text-center">
      <v-card>
        <v-card-title>
          <v-icon :color="isLiked ? 'red' : 'primary'" size="72">{{ isLiked ? 'mdi-emoticon-cool' : 'mdi-emoticon-happy' }}</v-icon>
        </v-card-title>
        <v-card-text>
          <div class="text-center">
            <p class="bold">{{ isLiked ? 'Thank you for liking :)' : 'Sorry to hear that you disliked it((((' }}</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="showDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import i18n from './i18n/index';

export default defineComponent({
  name: 'App',
  setup() {
    const { t, locale } = useI18n();

    const selectedLanguage = ref(localStorage.getItem('selectedLanguage') || 'en');
    const isLiked = ref(false);
    const showDialog = ref(false);

    const changeLanguage = () => {
      const newLocale = locale.value === 'en' ? 'ru' : 'en';
      locale.value = newLocale;
      selectedLanguage.value = newLocale;
      localStorage.setItem('selectedLanguage', newLocale);
    };

    const toggleLike = () => {
      if (isLiked.value) {
        localStorage.removeItem('isLiked');
      } else {
        localStorage.setItem('isLiked', 'true');
      }
      isLiked.value = !isLiked.value;
      showDialog.value = true;
    };

    if (localStorage.getItem('isLiked') === 'true') {
      isLiked.value = true;
    }

    const languages = [
      { label: 'English', value: 'en' },
      { label: 'Russian', value: 'ru' },
      // Add more language options as needed
    ];

    // Watch for changes in selectedLanguage and update the locale
    watch(selectedLanguage, (newLanguage) => {
      locale.value = newLanguage;
    });

    return {
      isLiked,
      showDialog,
      toggleLike,
      languages,
      selectedLanguage,
      changeLanguage,
    };
  },
});
</script>



<style scoped>
.router {
  text-decoration: none;
}
.text-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.scale-transition-enter-active,
.scale-transition-leave-active {
  transition: all 1s cubic-bezier(0.5, 0.8, 0.9, 1);
}
.scale-transition-enter,
.scale-transition-leave-to {
  transform: scale(0);
}
.bold{
 font-weight:600;
}
</style>