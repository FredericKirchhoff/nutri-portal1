<template>
  <div class="black">
    <MeusCursosCarousel></MeusCursosCarousel>
    <v-divider dark></v-divider>
    <!-- <WelcomeCourseCarousel></WelcomeCourseCarousel> -->
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
import MeusCursosCarousel from "../components/MeusCursosCarousel";
// import WelcomeCourseCarousel from "../components/WelcomeCourseCarousel";
import WelcomeFooter from "../components/WelcomeFooter";

export default {
  components: {
    MeusCursosCarousel,
    // WelcomeCourseCarousel,
    WelcomeFooter,
  },
};
</script>

<style scoped>
</style>