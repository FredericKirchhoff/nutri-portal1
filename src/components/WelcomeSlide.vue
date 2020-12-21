<template>
  <div>
    <v-row class="d-flex black">
      <v-col cols="0" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-img
          src="https://www.linkpicture.com/q/backportal5.png"
          class="white--text"
        >
          <v-row>
            <v-img
              src="https://www.linkpicture.com/q/logogogo.png"
              contain
              max-height="60"
              max-width="180"
              class="my-16 mx-4"
            ></v-img>
            <v-spacer></v-spacer>
            <div v-if="state.isAuthenticated">
              <v-btn outlined color="#c5d13f" class="mb-12 mx-6" @click="sair">
                Sair
              </v-btn>
              <v-btn
                outlined
                color="#c5d13f"
                class="mb-12 mx-6"
                to="MeusCursos"
              >
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
            <v-col class="d-flex text-left text-h4 my-8" cols="12" md="8">
              O SEU PORTAL DE <br />
              ENSINO EM NUTRIÇÃO, <br />
              ALIMENTAÇÃO SAUDÁVEL <br />
              E EMPREENDEDORISMO
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-center">
              <!-- <v-dialog v-model="dialog" width="80%">
                <template v-slot:activator="{ on, attrs }">
                  <v-card
                    class="transparent"
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-row class="d-flex justify-center">
                      <v-img
                        src="https://www.linkpicture.com/q/playImg.png"
                        height="80"
                        contain
                      ></v-img>
                    </v-row>
                    <v-row class="d-flex justify-center white--text">
                      Vídeo de apresentação
                    </v-row>
                  </v-card>
                </template>
                <v-card width="100%">
                  <youtube :video-id="videoId" player-width="100%"></youtube>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn color="#c5d13f" text @click="dialog = false">
                      Fechar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
            </v-col>
            <v-col class="d-flex text-left text-h6 my-8 mx-4" cols="12" md="8">
              Acesse nossos conteúdos exclusívos e conheça o portal do clube.
            </v-col>
          </v-row>
          <v-dialog v-model="dialogLogin" max-width="80%" scrollable>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                large
                color="#c5d13f"
                class="ml-4"
                id="btn"
                v-bind="attrs"
                v-on="on"
              >
                cadastre-se
              </v-btn>
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
          <!-- <v-btn large color="#c5d13f" class="ml-2" id="btn">
            Use seu Cupom
          </v-btn> -->
        </v-img>
      </v-col>
      <v-col cols="0" md="2"></v-col>
    </v-row>
    <v-row class="d-flex black">
      <v-col cols="0" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-divider color="white"></v-divider>
        <v-row class="d-flex black justify-center mb-4">
          <v-col v-for="obj in objs" :key="obj">
            <v-card class="d-flex black justify-center" color="black" outlined dark>
              <v-card-title class="d-flex black justify-center">
                <v-icon color="white"> {{ obj.icon }} </v-icon>
              </v-card-title>
              <v-card-text>
                <v-row class="d-flex black justify-center white--text">
                  {{ obj.descr }}
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="0" md="2"></v-col>
    </v-row>
  </div>
</template>

<script>
import SlideShow from "../components/SlideShow";
import {
  mdiPlayCircleOutline,
  mdiTelevisionPlay,
  mdiCrown,
  mdiSilverwareClean,
  mdiSchool,
  mdiFaceWomanShimmerOutline,
} from "@mdi/js";

export default {
  components: {
    SlideShow,
  },
  data: function () {
    return {
      dialog: false,
      dialogLogin: false,
      videoId: "ovj4Wzay7-0",
      icons: {
        mdiPlayCircleOutline,
      },
      objs: [
        {
          icon: mdiCrown,
          descr: "Treinamentos para franqueados do Clube da Nutricionista",
        },
        {
          icon: mdiSilverwareClean,
          descr: "Aulas culinárias exclusivas para clientes das franquias",
        },
        {
          icon: mdiTelevisionPlay,
          descr:
            "Cursos para nutricionistas assinantes do nosso software de nutrição",
        },
        {
          icon: mdiSchool,
          descr: "Cursos para nutricionistas que desejam empreender",
        },
        {
          icon: mdiFaceWomanShimmerOutline,
          descr: "Cursos para todos que buscam uma vida mais saudável",
        },
      ],
    };
  },
  computed: {
    fontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "h6";
        case "sm":
          return "h5";
        case "md":
          return "h4";
        case "lg":
          return "h3";
        case "xl":
          return "h2";
        default:
          return "h3";
      }
    },
    state() {
      return this.$store.state;
    },
  },
  methods: {
    sair() {
      this.$store.dispatch("userLogout");
    },
  },
};
</script>

<style>
#btn {
  font-size: 18px;
}
</style>