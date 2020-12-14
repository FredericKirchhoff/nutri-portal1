<template>
  <div class="black">
    <NutricaoRenalSlide class="mb-16"></NutricaoRenalSlide>
    <v-divider dark></v-divider>
    <WelcomeCourseCarousel></WelcomeCourseCarousel>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
import NutricaoRenalSlide from "../components/NutricaoRenalSlide";
import WelcomeCourseCarousel from "../components/WelcomeCourseCarousel";
import WelcomeFooter from "../components/WelcomeFooter";

export default {
  components: {
    NutricaoRenalSlide,
    WelcomeCourseCarousel,
    WelcomeFooter,
  },
};
</script>

<style scoped>
</style>