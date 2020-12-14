<template>
  <v-footer app fixed color="#614021" width="100%">
    <v-card
      flat
      tile
      class="white--text text-center"
      color="#614021"
      width="100%"
    >
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }}
        <strong>Clube da Nutricionista</strong>
        <v-spacer></v-spacer>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import { mdiFacebook, mdiInstagram, mdiYoutube } from "@mdi/js";

export default {
  data: function () {
    return {
      icons: [mdiInstagram, mdiFacebook, mdiYoutube],
    };
  },
};
</script>