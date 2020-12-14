<template>
  <v-app-bar app color="black">
    <v-img
      src="https://www.linkpicture.com/q/logogogo.png"
      contain
      max-height="60"
      max-width="180"
    ></v-img>
    <v-spacer></v-spacer>

    <v-btn class="mx-1" color="#614021" value="franquia">
      <span class="white--text">Franquia</span>
    </v-btn>

    <v-btn
      outlined
      class="mx-1"
      color="#c5d13f"
      value="cadastrar"
      to="/cadastrar"
    >
      <span>Cadastrar</span>
    </v-btn>

    <v-btn outlined class="mx-1" color="#c5d13f" value="login" to="/login">
      <span>Login</span>
    </v-btn>

    <v-btn outlinedclass="mx-1" color="#c5d13f" value="login" to="/login">
      <v-icon color="#614021">{{ icons.mdiCartVariant }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mdiCartVariant } from "@mdi/js";

export default {
  data: function () {
    return {
      icons: {
        mdiCartVariant,
      },
    };
  },
};
</script>

<style scoped>
</style>


