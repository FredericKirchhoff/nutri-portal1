import Vue from "vue";
import { store } from "./store";
import App from "./App.vue";
import VueResource from "vue-resource";
import router from "./router";
import Vuetify from "vuetify";
import VueYouTubeEmbed from "vue-youtube-embed";
import "vuetify/dist/vuetify.min.css";
import "@/firebase/";
import { firestorePlugin } from "vuefire";
import VStripeElements from "v-stripe-elements/lib";
import VuePlyr from 'vue-plyr';

router.beforeEach(
  /*async*/ (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (
      requiresAuth &&
      !(/*await firebase.getCurrentUser()*/ store.state.isAuthenticated)
    ) {
      next("/cadastrarRedirected");
    } else {
      next();
    }
  }
);

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ready','ended','pause']
});
Vue.use(VStripeElements);
Vue.use(VueResource);
Vue.use(Vuetify);
Vue.use(firestorePlugin);
Vue.use(VueYouTubeEmbed);

const opts = {
  icons: {
    iconfont: "mdi"
  }
};

new Vue({
  render: (h) => h(App),
  router: router,
  store: store,
  vuetify: new Vuetify(opts)
}).$mount("#app");
