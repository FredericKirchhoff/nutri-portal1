<template>
    <div>
        <v-row class="d-flex justify-center">
            <v-col cols="0" md="1"></v-col>
            <v-col cols="12" md="10">
                <v-row class="d-flex justify-center black--text text-h5">
                    Aula 1
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
                ><div data-plyr-provider="youtube" data-plyr-embed-id="uRDv3NQyqDQ"></div>
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
          <iframe :src="aula.pdfUrl" width="100%" height="1000px"></iframe>
          </v-card>
        </v-row>
        <v-divider></v-divider>
        <v-row class="d-flex justify-center black--text text-h5 my-12">
            Lista de artigos de referência
        </v-row>
        <v-row class="d-flex justify-center">
            <v-list dense>
                <v-list-item
                    v-for="(item, i) in artigos"
                    :key="i"
                >
                <v-list-item-content>
                    <v-list-item-title v-text="item.title">
                        <a :href="item.link"></a>
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
                </v-list>
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
      artigos: [
        {title: "Mindful eating and common diet programs - Artiles et al", link: "https://drive.google.com/file/d/1xVn8_R3Z2iuBPMWFZ6VPodF4ov5y7WUY/view?usp=sharing"},
        {title: "Mindfulness-based interventions for weight loss - K.Carrière", link: "https://drive.google.com/file/d/1rwKuQ_LWgLyQYOf0HDsz-XwXdVj0ckBn/view?usp=sharing"},
        {title: "Mindfulness in Anorexia Nervosa - Dunne et al", link: "https://drive.google.com/file/d/1QWQWbh3qjXCm_TJmhF1DVcZ74Auh5Wej/view?usp=sharing"},
        {title: "Mindfulness-based interventions for binge eating - Godfrey et al", link: "https://drive.google.com/file/d/1gYJpAG43mxSyb3kRFlQq68EUlyoJ5IQ4/view?usp=sharing"},
        {title: "Mindfulness attenuates the positive association between disorderedeating cognition and disordered eating behavior - Duckhyun et al", 
            link: "https://drive.google.com/file/d/1jWh5OVenNThPMIeAextwJ_CW8XKM2kXD/view?usp=sharing"},
        {title: "Mindfulness meditation as an intervention for binge eating - Kattermann et al", 
            link: "https://drive.google.com/file/d/1GVAfXxC4PyrgeBBPr3FpKSz8opov2QzA/view?usp=sharing"},
        {title: "Mindful Eating: Connecting with the wise self, spirtual self", 
            link: "https://drive.google.com/file/d/1U8y-ZD3EXRzr81k2QSCXuym8AL-vWKWp/view?usp=sharing"},
        {title: "Mindful Eating Intervention to Diabitis Self-Management - Miller et al", 
            link: "https://drive.google.com/file/d/1sNc-hZxs7C82fxG8v1uhwYTVfh8gioUF/view?usp=sharing"},
        {title: "Mindfulness-based interventions for obesity-relatedeating behaviours - O'Reilly et al", 
            link: "https://drive.google.com/file/d/1HIUXoEpjSmaIxc8OmUCAb07brsL6crSo/view?usp=sharing"},
        {title: "Mindfulness-based interventions for adults who areoverweight or obese - Rogers et al", 
            link: "https://drive.google.com/file/d/1N84kxIor-LkauUXayLG5Yn6WTLBsXaht/view?usp=sharing"},
        {title: "The effects of mindfulness training on weight-loss and health-related behaviours - Ruffault et al", 
            link: "https://drive.google.com/file/d/1xespJqUTIGIGvn-KAbuZ0LA0NFh7DI2M/view?usp=sharing"},
        {title: "Mindfulness and eating disorder psychopathology - Sala et al", 
            link: "https://drive.google.com/file/d/1F4w9lGpAG8YFF-5zoQ_DElJBNS5lFNL9/view?usp=sharing"},
        {title: "A structured literature review on the role of mindfulness - Warren et al", 
            link: "https://drive.google.com/file/d/1U4ORs0T1PEFmzhRHocNisHyJRQ3tQunk/view?usp=sharing"},            
      ]
    };
  },
  firestore() {
    return {
      aula: firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .doc("MindfulEating")
        .collection("conteudo")
        .doc("aula1"),
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
      this.player.currentTime = Math.round(this.aula.progress / 100 * 5523);
    },
    setProgress() {
        this.$store.dispatch("setProgressBar", {
            progress: Math.round(this.player.currentTime / 5523 * 100),
            course: "MindfulEating",
            aula: "aula1"
        })
    }
  }
};
</script>


