<template>
    <div>
        <v-row class="d-flex justify-center">
            <v-col cols="0" md="1"></v-col>
            <v-col cols="12" md="10">
                <v-row class="d-flex justify-center black--text text-h5">
                    Aula ao vivo do dia 05/01/2021
                </v-row>
                <v-row class="d-flex justify-center black--text text-h6">
                    <v-card elevation="0">
                        <v-card-title>
                            Percentual completado: {{aula.progress}}%
                        </v-card-title>
                    <v-progress-linear 
                        :value="aula.progress" 
                        color="#c5d13f" 
                        background-color="#614021"
                        rounded
                        absolute
                        height="12"
                    ></v-progress-linear>
                    </v-card>
                </v-row>
                <v-row>
            <v-card width="100%" v-show="state.isAuthenticated" elevation="0">
                <vue-plyr 
                    ref="plyr" 
                    @ready="playerReady" 
                    @ended="setProgress" 
                    @pause="setProgress" 
                    :emit="['ready','ended','pause']"
                ><div data-plyr-provider="youtube" data-plyr-embed-id="FOx_t0nKuws"></div>
                </vue-plyr>
            </v-card>
                </v-row>
            </v-col>
            <v-col cols="0" md="1"></v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="d-flex justify-center black--text text-h5 my-12">
            Materiais da aula
        </v-row>
        <v-row class="d-flex justify-center">
          <v-card width="90%">
          <iframe :src="aula.pdfUrl" width="100%" height="1000px">

          </iframe>
          </v-card>
          <!-- <v-window v-model="model">
            <v-window-item
              v-for="(pagina, i) in paginas"
              :key="pagina"
            >
              <v-card>

              </v-card>
            </v-window-item>
          </v-window> -->
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
        .doc("WorkshopDecolaNutri")
        .collection("conteudo")
        .doc("aula2"),
    };
  },
  computed: {
    player () {
      return this.$refs.plyr.player
    },
    state() {
      return this.$store.state;
    },
  },
  methods: {
    playerReady () {
      this.player.currentTime = Math.round(this.aula.progress / 100 * 3600);
    },
    setProgress() {
        this.$store.dispatch("setProgressBar", {
            progress: Math.round(this.player.currentTime / 3600 * 100),
            course: "WorkshopDecolaNutri",
            aula: "aula2"
        })
    }
  }
};
</script>


