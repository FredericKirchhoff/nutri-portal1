<template>
  <div>
    <v-row class="d-flex black justify-center">
      <v-col cols="0" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-row class="d-flex black justify-center text-h4 white--text">
          WORKSHOP DECOLA NUTRI
        </v-row>
        <v-row class="d-flex black justify-center text-h6 grey--text">
          Inscrições abertas
        </v-row>
        <v-row class="d-flex black justify-center text-h3 white--text">
          <!-- <v-sheet class="mx-auto" min-width="600" color="black">
            <v-slide-group
              v-model="model"
              dark
              class="pa-4"
              active-class="success"
              :prev-icon="icons.mdiArrowLeftBoldCircle"
              :next-icon="icons.mdiArrowRightBoldCircle"
              show-arrows
            >
              <v-slide-item
                v-for="course in courses"
                :key="course"
                v-slot:default="{ active, toggle }"
              > -->
          <v-card
            :color="active ? undefined : 'black'"
            class="ma-4"
            height="500"
            width="350"
            @click="toggle"
            :to="course.id"
          >
            <v-img :src="course.imgUrl" height="100%">
              <v-row class="text-h6 ml-4 mr-1 mt-2">
                {{ course.nome }}
              </v-row>
              <v-card-subtitle> {{ course.descrShort }} </v-card-subtitle>
            </v-img>
          </v-card>
          <!-- </v-slide-item>
            </v-slide-group>
          </v-sheet> -->
        </v-row>
        <v-row class="d-flex black justify-center">
          <v-btn large outlined color="#c5d13f" :to="course.id" class="my-3">
            Matricule-se
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="0" md="2"></v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiArrowRightBoldCircle, mdiArrowLeftBoldCircle } from "@mdi/js";
import firebase from "firebase";

export default {
  data: () => ({
    model: null,
    icons: {
      mdiArrowRightBoldCircle,
      mdiArrowLeftBoldCircle,
    },
    // courses: [],
    course: {},
  }),
  firestore() {
    return {
      // courses: firebase.firestore().collection("coursesFree"),
      course: firebase
        .firestore()
        .collection("coursesFree")
        .doc("WorkshopDecolaNutri"),
    };
  },
};
</script>

<style scoped>
</style>