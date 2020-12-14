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
            <v-btn outlined color="#c5d13f" class="mb-12 mx-6" to="MeusCursos">
              Meus cursos
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
                  <v-badge
                    content="!"
                    color="#ff00ff"
                    overlap
                  >
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
            <v-dialog v-model="dialogLogin" max-width="80%" scrollable>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="#c5d13f"
                  class="mb-12 mx-12"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon prefix> {{ icons.mdiLoginVariant }}</v-icon>
                  entrar</v-btn
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
        <v-row>
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-card class="ma-4" height="350" width="250">
              <v-img :src="course.imgUrl" height="100%">
                <v-row class="text-h6 ml-4 mr-1 mt-2 white--text">
                  {{ course.nome }}
                </v-row>
                <v-card-subtitle class="white--text">
                  {{ course.descrShort }}
                </v-card-subtitle>
              </v-img>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            md="4"
            class="d-flex justify-center white--text align-center"
          >
            <v-row class="d-flex justify-center white--text align-center">
              <h1>
                {{ course.priceStr }}
              </h1>

              <div v-if="state.isAuthenticated">
                <v-dialog v-model="dialogBuy" max-width="80%" scrollable>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#c5d13f"
                      class="mx-2"
                      outlined
                      large
                      v-bind="attrs"
                      v-on="on"
                      @click="acquireCourse"
                    >
                      <v-icon prefix>{{ icons.mdiCartVariant }}</v-icon>
                      COMPRAR
                    </v-btn>
                    
                  </template>
                  <v-card height="100%">
                    <v-sheet color="white">
                      <v-row
                        class="d-flex justify-center align-center black--text"
                      >
                        <v-icon color="green" size="32%" class="mt-8">
                          {{ icons.mdiCartPlus }}
                        </v-icon>
                      </v-row>
                      <v-row
                        class="d-flex justify-center align-center black--text text-h6 mt-8"
                      >
                        Curso foi adicionado ao seu carrinho!
                      </v-row>

                      <v-row class="d-flex justify-center text-h6 grey--text">
                        Veja também estes cursos
                      </v-row>
                      <v-row class="d-flex justify-center text-h3 white--text">
                        <v-sheet color="white">
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
                              v-for="veja in vejas"
                              :key="veja"
                              v-slot:default="{ active, toggle }"
                            >
                              <v-card
                                :color="active ? undefined : 'black'"
                                class="ma-4"
                                height="350"
                                width="250"
                                @click="toggle"
                                :to="veja.id"
                              >
                                <v-img :src="veja.imgUrl" height="100%">
                                  <v-row class="text-h6 ml-4 mr-1 mt-2">
                                    {{ veja.nome }}
                                  </v-row>
                                  <v-card-subtitle>
                                    {{ veja.descrShort }}
                                  </v-card-subtitle>
                                </v-img>
                              </v-card>
                            </v-slide-item>
                          </v-slide-group>
                        </v-sheet>
                      </v-row>
                    </v-sheet>
                    <v-card-actions class="d-flex justify-center">
                      <v-btn color="#614021" text @click="dialogBuy = false">
                        Fechar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <div v-else>
                <v-dialog v-model="dialogLoginBuy" max-width="80%">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#c5d13f"
                      class="mx-2"
                      outlined
                      large
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon prefix> {{ icons.mdiLoginVariant }}</v-icon>
                      COMPRAR
                    </v-btn>
                  </template>
                  <v-card height="100%">
                    <SlideShow></SlideShow>
                    <v-card-actions class="d-flex justify-center align-end">
                      <v-btn
                        color="#614021"
                        text
                        @click="dialogLoginBuy = false"
                      >
                        Fechar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            md="4"
            class="d-flex justify-center white--text align-center"
          >
            <v-row class="d-flex justify-center white--text text-h6">
              <v-card class="ma-4" height="350" width="250">
                <v-img
                  src="https://www.linkpicture.com/q/fernanda_ok_1.png"
                  height="100%"
                >
                  <v-row class="d-flex align-bottom text-h6 ml-4 mr-1 mt-2 white--text">
                    {{ course.prof }}
                  </v-row>
                </v-img>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center text-center white--text mt-12"
          >
            <v-row class="d-flex justify-center text-h6 white--text">
              Importância:<br />
              Como identificar praticas alimentares inadequadas e como lidar com
              a ambivalência do paciente na adesão do tratamento.
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center text-center white--text mb-12"
          >
            <v-row class="d-flex justify-center text-h6 white--text">
              Tópicos: <br />
              Anorexia<br />
              Bulimia<br />
              Vigorexia<br />
              Compulsão alimentar <br />
              Alexitimia<br />
              Ortorexia<br />
              Drunkorexia<br />
              Comer noturno<br />
              Dismorfia
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center text-center white--text"
          >
            <v-text class="text-h5"> CONTEÚDO </v-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center text-center white--text"
          >
            <v-text class="text-h6"> Aula ao vivo do 04/09/2020 </v-text>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="0" md="2"></v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import SlideShow from "../components/SlideShow";
import Checkout from "../components/Checkout";
import {
  mdiCartVariant,
  mdiCartPlus,
  mdiArrowRightBoldCircle,
  mdiArrowLeftBoldCircle,
  mdiLoginVariant,
} from "@mdi/js";

export default {
  components: { SlideShow, Checkout },
  data() {
    return {
      dialogCart: false,
      dialogLogin: false,
      dialogLoginBuy: false,
      dialogBuy: false,
      model: null,
      course: {},
      // cartElements: [],
      icons: {
        mdiCartVariant,
        mdiCartPlus,
        mdiArrowRightBoldCircle,
        mdiArrowLeftBoldCircle,
        mdiLoginVariant,
      },
      vejas: {},
    };
  },
  firestore() {
    return {
      course: firebase
        .firestore()
        .collection("courses")
        .doc("CausasEndocrinas"),
      vejas: firebase
        .firestore()
        .collection("courses")
        .doc("CausasEndocrinas")
        .collection("vejatambem")
        .doc("vejatambem"),
      // cartElements: firebase
      //   .firestore()
      //   .collection("users")
      //   .doc(this.$store.state.user)
      //   .collection("wantedCourses"),
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
  },
  methods: {
    acquireCourse() {
      this.$store.dispatch("userAcquireCourse", {
        descrShort: "Quando o problema vai além da dieta!",
        imgUrl: "https://www.linkpicture.com/q/causasendocrinas.png",
        courseId: "CausasEndocrinas",
        course: "Causas endócrinas da obesidade",
        price: 60,
        linkCurso: "Curso-Causas-endocrinas-da-obesidade" 
        // ref: await firebase.firestore().collection("courses").doc("CausasEndocrinas").ref
      });
    },
    sair() {
      this.$store.dispatch("userLogout");
    },
  },
};
</script>

<style scoped>
</style>