// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import i18n from './i18n/index';

const app = createApp(App)

registerPlugins(app)

app.use(i18n)

app.mount('#app')