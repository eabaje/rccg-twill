require('./bootstrap');

window.Vue = require('vue');



/* Register our new component: */
Vue.component('offering-form', require('../components/givingForm.vue'));

Vue.component('feedback-form', require('../components/form/feedbackForm.vue'));

const app = new Vue({
    el: '#app'
});