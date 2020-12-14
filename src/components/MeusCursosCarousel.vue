<template>
  <div>
    <v-row class="d-flex black">
      <v-col cols="0" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-card to="/" color="black">
          <v-img
            src="https://www.linkpicture.com/q/logogogo.png"
            contain
            max-height="60"
            max-width="180"
            class="mb-12 mx-4"
          ></v-img>
          </v-card>
          <v-spacer></v-spacer>
          <div v-if="state.isAuthenticated">
            <v-btn outlined color="#c5d13f" class="mb-12 mx-6" @click="sair">
              Sair
            </v-btn>
            <v-dialog v-model="dialogCart" max-width="80%" scrollable>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="#c5d13f"
                  class="mb-12"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-badge content="!" color="#ff00ff" overlap>
                    <v-tooltip bottom color="#ff00ff">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon large v-bind="attrs" v-on="on"
                          >{{ icons.mdiCartVariant }}
                        </v-icon>
                      </template>
                      <span class="white--text text-subtitle-1"
                        >Finalizar Pagamento!</span
                      >
                    </v-tooltip>
                  </v-badge>
                </v-btn>
              </template>
              <v-card>
                <Checkout></Checkout>
                <v-card-actions class="d-flex justify-center align-end">
                  <v-btn
                    color="#614021"
                    text
                    @click="dialogCart = false"
                    class="d-flex justify-center align-end"
                  >
                    Fechar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <div v-else>
            <v-row class="d-flex justify-center white--text text-h3">
              Acesso negado. Por favor, faça Login!
            </v-row>
            <v-dialog v-model="dialogLogin" max-width="80%" scrollable>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="#c5d13f"
                  class="my-12"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon prefix> {{ icons.mdiLoginVariant }}</v-icon>
                  Login</v-btn
                >
              </template>
              <v-card height="100%">
                <SlideShow></SlideShow>
                <v-card-actions class="d-flex justify-center align-end">
                  <v-btn
                    color="#614021"
                    text
                    @click="dialogLogin = false"
                    class="d-flex justify-center align-end"
                  >
                    Fechar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-row>
        <v-row class="d-flex black justify-center text-h3 white--text">
          ASSISTA AGORA OS SEUS CURSOS!
        </v-row>
        <v-row class="d-flex justify-center text-h3 white--text">
          <v-sheet color="black">
            <v-slide-group
              v-model="model"
              class="pa-4"
              dark
              active-class="success"
              :prev-icon="icons.mdiArrowLeftBoldCircle"
              :next-icon="icons.mdiArrowRightBoldCircle"
              show-arrows
            >
              <v-slide-item
                v-for="curso in meusCursos"
                :key="curso"
                v-slot:default="{ active, toggle }"
              >
                <v-card
                  :color="active ? undefined : 'black'"
                  class="ma-4"
                  height="350"
                  width="250"
                  @click="
                    toggle;
                    displayConteudoArray;
                  "
                  :to="curso.linkCurso"
                >
                  <v-img :src="curso.imgUrl" height="100%">
                    <v-row class="text-h6 ml-4 mr-1 mt-2">
                      {{ curso.course }}
                    </v-row>
                    <v-card-subtitle>
                      {{ curso.descrShort }}
                    </v-card-subtitle>
                  </v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-row>
      </v-col>
      <v-col cols="0" md="2"></v-col>
    </v-row>
  </div>
</template>

<script>
import Checkout from "../components/Checkout";
import SlideShow from "../components/SlideShow";
import firebase from "firebase";
import {
  mdiCartVariant,
  mdiCartPlus,
  mdiArrowRightBoldCircle,
  mdiArrowLeftBoldCircle,
  mdiLoginVariant,
} from "@mdi/js";

export default {
  components: { Checkout, SlideShow },
  data() {
    return {
      dialogCart: false,
      dialogLogin: false,
      model: null,
      icons: {
        mdiCartVariant,
        mdiCartPlus,
        mdiArrowRightBoldCircle,
        mdiArrowLeftBoldCircle,
        mdiLoginVariant,
      },
      meusCursos: [],
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
  },
  firestore() {
    return {
      meusCursos: firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .where("paid", ">", 0),
    };
  },
  methods: {
    sair() {
      this.$store.dispatch("userLogout");
    },
  },
};
</script>

<style scoped>
</style>