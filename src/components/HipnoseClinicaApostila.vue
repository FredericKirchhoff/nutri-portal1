<template>
    <div v-show="state.isAuthenticated">

        <v-row class="d-flex justify-center black--text text-h5 my-12">
            Apostila de Emagrecimento
        </v-row>
        <v-row class="d-flex justify-center">
          <v-card width="90%">
          <iframe :src="aula.pdfUrl" width="100%" height="1000px">
          </iframe>
          </v-card>
        </v-row>       

    </div>
</template>

<script>
// import VuetifyPdf from "vuetify-pdfjs/src/App.vue";
import firebase from "firebase";

export default {
  // components: {
  //   VuetifyPdf
  // },
  data() {
    return {
      aula: {},
      false: false,
      true: true,
      // model: 0,
    };
  },
  firestore() {
    return {
      aula: firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .doc("HipnoseClinica")
        .collection("conteudo")
        .doc("b_apostila"),
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
  }
};
</script>


