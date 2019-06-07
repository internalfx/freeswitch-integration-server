// import '@fortawesome/fontawesome-free/css/brands.css' // Ensure you are using css-loader
// import '@fortawesome/fontawesome-free/css/regular.css' // Ensure you are using css-loader
// import '@fortawesome/fontawesome-free/css/solid.css' // Ensure you are using css-loader
// import '@fortawesome/fontawesome-free/css/fontawesome.css' // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

import Vue from 'vue'
import Vuetify from 'vuetify'

const ICONS = {
  // 'complete': '',
  // 'cancel': '',
  // 'close': '',
  // 'delete': '', // delete (e.g. v-chip close)
  // 'clear': '',
  // 'success': '',
  // 'info': '',
  // 'warning': '',
  // 'error': '',
  // 'prev': '',
  // 'next': '',
  // 'checkboxOn': '',
  // 'checkboxOff': '',
  // 'checkboxIndeterminate': '',
  // 'delimiter': '', // for carousel
  // 'sort': '',
  // 'expand': '',
  // 'menu': '',
  // 'subgroup': '',
  // 'dropdown': '',
  // 'radioOn': '',
  // 'radioOff': '',
  // 'edit': ''
}

Vue.use(Vuetify, {
  iconfont: 'fa',
  icons: ICONS,
  theme: {
    primary: '#1D4F90',
    secondary: '#669EBA',
    accent: '#F15922'
  }
})
