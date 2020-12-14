<template>
  <div class="black">
    <BasicSemanaSlide class="mb-16"></BasicSemanaSlide>
    <v-divider dark></v-divider>
    <WelcomeCourseCarousel></WelcomeCourseCarousel>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
import BasicSemanaSlide from "../components/BasicSemanaSlide";
import WelcomeCourseCarousel from "../components/WelcomeCourseCarousel";
import WelcomeFooter from "../components/WelcomeFooter";

export default {
  components: {
    BasicSemanaSlide,
    WelcomeCourseCarousel,
    WelcomeFooter,
  },
};
</script>

<style scoped>
</style>