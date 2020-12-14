<template>
  <div class="black">
    <TranstornosAlimentaresSlide class="mb-16"></TranstornosAlimentaresSlide>
    <v-divider dark></v-divider>
    <WelcomeCourseCarousel></WelcomeCourseCarousel>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
import TranstornosAlimentaresSlide from "../components/TranstornosAlimentaresSlide";
import WelcomeCourseCarousel from "../components/WelcomeCourseCarousel";
import WelcomeFooter from "../components/WelcomeFooter";

export default {
  components: {
    TranstornosAlimentaresSlide,
    WelcomeCourseCarousel,
    WelcomeFooter,
  },
};
</script>

<style scoped>
</style>