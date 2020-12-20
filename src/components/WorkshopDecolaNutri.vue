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
                      Adquirir
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
                        Curso foi adicionado!
                      </v-row>

                      <!-- <v-row class="d-flex justify-center text-h6 grey--text">
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
                      </v-row> -->
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
                      Adquirir
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
            <v-row class="d-flex justify-center">
              <v-card class="ma-4" height="350" width="250">
                <v-img
                  src="https://www.linkpicture.com/q/IMG_0816.jpg"
                  height="100%"
                >
                </v-img>
              </v-card>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
          <v-tooltip bottom color="#614021">
            <template v-slot:activator="{ on, attrs }">
              <v-card class="ma-4" height="150" width="500" color="black">
                <v-row class="d-flex justify-center text-h6 ml-4 mr-1 mt-2 white--text">
                  {{ course.prof }}
                </v-row>
                <v-card-subtitle class="d-flex justify-center white--text">
                  Nutricionista e Empresária
                </v-card-subtitle>
                <v-card-actions class="d-flex justify-center">
                  <v-btn
                    text
                    color="white"
                    v-bind="attrs"
                    v-on="on"
                    @click.prevent
                  >
                    Currículo
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
            <span>
              <v-row class="text-subtitle-1">
                CEO do Clube da Nutricionista
                <br />
                Nutricionista + Mestre em Neurociências <br />
              </v-row>
            </span>
          </v-tooltip>
        </v-row>

        <!-- <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center text-center white--text mt-12"
          >
            <v-row class="text-h6 white--text">
              1. A hipnoterapia cognitiva estende-se para varias areas. Aqui a
              relevancia para a Nutrição resume-se a ensinar ao profissional
              controle total da ansiedade e gerenciamento do estresse (grande
              vilão). O programa busca a regulação emocional, pois quando a
              emoção está no controle a compulsão e a agula são os carros chefe.
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center text-center white--text my-12"
          >
            <v-row class=" d-flex justify-center text-h6 white--text">
              2. Abrordaremos: <br />
              a. Importancia do rapport <br />
              b. anamnese para hipnose <br />
              c. Ferramentas de avaliação e testagem. <br />
              d. Diagrama de conceitualização. <br />
              e. Preparando o cliente. <br />
              f. Testagem. <br />
              g. Técnicas de indução e aprofundamento. <br />
              h. Controle dos sintomas da ansiedade. <br />
              g. Tecnicas para o emagrecimento e controle emocional de dietas.
              <br />
              h. balão Intragastrico Imaginário. <br />
              i. Tecnica de aversão a alimentos. <br />
              j. Encerramento
            </v-row>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center text-center white--text"
          >
            <v-row class="d-flex justify-center text-h5"> CONTEÚDO </v-row>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center text-center white--text"
          > -->
        <v-row class="d-flex justify-center text-subtitle-1 white--text">
          Aula ao vivo do 05/01/2021
        </v-row>
        <v-row class="d-flex justify-center text-subtitle-1 white--text">
          Aula ao vivo do 06/01/2021
        </v-row>
        <v-row class="d-flex justify-center text-subtitle-1 white--text">
          Aula ao vivo do 07/01/2021
        </v-row>
        <!-- </v-col>
        </v-row> -->
      </v-col>
      <v-col cols="0" md="2"></v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import SlideShow from "../components/SlideShow";
import {
  mdiCartVariant,
  mdiCartPlus,
  mdiArrowRightBoldCircle,
  mdiArrowLeftBoldCircle,
  mdiLoginVariant,
} from "@mdi/js";

export default {
  components: { SlideShow },
  data() {
    return {
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
      //   vejas: {},
    };
  },
  firestore() {
    return {
      course: firebase
        .firestore()
        .collection("coursesFree")
        .doc("WorkshopDecolaNutri"),
      //   vejas: firebase
      //     .firestore()
      //     .collection("courses")
      //     .doc("HipnoseClinica")
      //     .collection("vejatambem")
      //     .doc("vejatambem"),
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
  },
  methods: {
    acquireCourse() {
      this.$store.dispatch("userAcquireCourseFree", {
        descrShort: "",
        imgUrl: "https://www.linkpicture.com/q/decolanutri.png",
        courseId: "WorkshopDecolaNutri",
        course: "Workshop Decola Nutri",
        linkCurso: "Workshop-Decola-Nutri-Curso",
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