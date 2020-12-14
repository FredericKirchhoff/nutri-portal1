<template>
    <div>
        <v-row class="d-flex justify-center">
            <v-col cols="0" md="1"></v-col>
            <v-col cols="12" md="10">
                <v-row class="d-flex justify-center black--text text-h5">
                   Modulação em Epigenética e Bioenergética Mitocondrial
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
                ><div data-plyr-provider="youtube" data-plyr-embed-id="df2a8Q025tc"></div>
                </vue-plyr>
            </v-card>
                </v-row>
            </v-col>
            <v-col cols="0" md="1"></v-col>
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
        .doc("BasicSemana")
        .collection("conteudo")
        .doc("aula7"),
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
//   mounted () {
//     this.player.on('ended', function () {
//         // set to 100%
//     });
//     this.player.on('pause', function () {
//         // set progress to this.player.currentTime
//     });
//   },
  methods: {
    playerReady () {
      this.player.currentTime = Math.round(this.aula.progress / 100 * 4775);
    },
    setProgress() {
        this.$store.dispatch("setProgressBar", {
            progress: Math.round(this.player.currentTime / 4775 * 100),
            course: "BasicSemana",
            aula: "aula7"
        })
    }
  }
};
</script>


