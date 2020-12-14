<template>
  <div class="page">
    <v-row>
      <v-col cols="4" md="3">
        <v-navigation-drawer permanent>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                <v-img
                  src="https://www.linkpicture.com/q/logogogo.png"
                  class="my-4"
                  contain
                  max-height="60"
                  max-width="180"
                ></v-img>
                <v-divider></v-divider>
                <v-btn
                  outlined
                  color="#c5d13f"
                  class="my-3"
                  to="MeusCursos"
                  dense
                  text
                >
                  Sair desta aula
                </v-btn>
                <v-divider></v-divider>
                    <v-card>
                      <v-card-title>
                        <v-row>Nutrição Esportiva Funcional</v-row>
                      </v-card-title>
                    </v-card>
              </v-list-item-title>
              <v-list-item-subtitle>
                Tayana Vago
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav class="py-0">
            <v-list-item v-for="(item, index) in conteudo" :key="index">
              <router-link
                :to="{ name: item.route }"
                style="text-decoration: none; color: inherit"
                v-slot="{ href, navigate, isActive, isExactActive }"
                replace
              >
                <v-list-item
                  :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                  ]"
                  :href="href"
                  @click="navigate"
                >
                  <v-badge
                    :content="item.progress"
                    :value="item.progress"
                    color="green"
                    left
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-badge>
                </v-list-item>
              </router-link>
            </v-list-item>
          </v-list>
          <v-list dense nav class="py-0">
            <v-list-item>
              <router-link
                to="CausasEndocrinasCertificado"
                style="text-decoration: none; color: inherit"
                v-slot="{ href, navigate, isActive, isExactActive }"
                replace
                ><v-list-item
                  :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                  ]"
                  :href="href"
                  @click="navigate"
                >
                  <v-list-item-title>Certificado</v-list-item-title>
                </v-list-item>
              </router-link>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="8" md="9">
        <router-view></router-view>
      </v-col>
    </v-row>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
import WelcomeFooter from "../components/WelcomeFooter.vue";
// import { mdiViewDashboard, mdiImage, mdiHelpBox } from "@mdi/js";
import firebase from "firebase";

export default {
  components: {
    /*VuetifyPdf,*/ WelcomeFooter,
  },
  data() {
    return {
      right: null,
      conteudo: [],
    };
  },
  firestore() {
    return {
      conteudo: firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .doc("NutricaoEsportiva")
        .collection("conteudo"),
    };
  },
};
</script>

<style>
</style>