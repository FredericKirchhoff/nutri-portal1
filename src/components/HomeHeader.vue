<template>
  <v-app-bar>
    <v-img
      src="https://www.linkpicture.com/q/logogogo.png"
      contain
      max-height="60"
      max-width="180"
    ></v-img>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-chip class="mx-2 blue white--text" v-bind="attrs" v-on="on"
          >PREMIUM</v-chip
        >
      </template>
      <span>Ver todos os planos deste Software!</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-chip
          class="mx-2 white--text"
          color="#c5d13f"
          v-bind="attrs"
          v-on="on"
          href="https://www.clubedanutricionista.com.br/franquia"
          >FRANQUIA</v-chip
        >
      </template>
      <span>Seja Franqueado!</span>
    </v-tooltip>
    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-1"
          value="patients"
          v-bind="attrs"
          v-on="on"
          color="#c5d13f"
        >
          <v-icon color="#614021" left>{{ icons.mdiAccountGroup }}</v-icon
          >Pacientes
        </v-btn>
      </template>
      <span>Ver Pacientes / Iniciar atendimento</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-1"
          value="agenda"
          v-bind="attrs"
          v-on="on"
          color="#c5d13f"
        >
          <v-icon color="#614021" left>{{ icons.mdiCalendar }}</v-icon
          >Agenda
        </v-btn>
      </template>
      <span>Agenda de Pacientes</span>
    </v-tooltip>
    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-1"
          value="patients"
          v-bind="attrs"
          v-on="on"
          color="#c5d13f"
        >
          <v-icon color="#614021">{{ icons.mdiAccountHeartOutline }}</v-icon>
        </v-btn>
      </template>
      <span>Acessar rede social do Clube</span>
    </v-tooltip>

    <v-btn
      class="mx-1 white--text"
      color="#614021"
      value="logout"
      to="/"
      @click="logout"
    >
      <span>Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import {
  mdiCalendar,
  mdiAccountGroup,
  mdiAccountHeartOutline,
  mdiCardAccountDetailsOutline,
} from "@mdi/js";

import firebase from "firebase";
import router from "../router";

export default {
  data: function () {
    return {
      icons: {
        mdiCalendar,
        mdiAccountGroup,
        mdiAccountHeartOutline,
        mdiCardAccountDetailsOutline,
      },
    };
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(function () {
          router.replace("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>


