<template>
  <v-app-bar app>
    <v-img src="https://www.linkpicture.com/q/logogogo.png" contain max-height="60" max-width="180"></v-img>
    <v-spacer></v-spacer>

    <v-btn class="mx-1" color="#c5d13f" value="cadastrar" to="/cadastrar">
      <span>Cadastrar</span>
    </v-btn>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-1" color="#c5d13f" value="home" to="/" v-bind="attrs" v-on="on">
          <v-icon color="#614021">{{icons.mdiHome}}</v-icon>
        </v-btn>
      </template>
      <span>Página Inicial</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mdiHome } from "@mdi/js";

export default {
  data: function() {
    return {
      icons: {
        mdiHome
      }
    };
  }
};
</script>

<style scoped>
</style>


