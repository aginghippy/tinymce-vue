import Vue from 'vue'
import App from './App.vue'
//import tinymce from '@tinymce';

//Vue.use(tinymce);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
