<template>
  <div class="black">
    <ConfeitariaFuncionalSlide class="mb-16"></ConfeitariaFuncionalSlide>
    <v-divider dark></v-divider>
    <WelcomeCourseCarousel></WelcomeCourseCarousel>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
import ConfeitariaFuncionalSlide from "../components/ConfeitariaFuncionalSlide";
import WelcomeCourseCarousel from "../components/WelcomeCourseCarousel";
import WelcomeFooter from "../components/WelcomeFooter";

export default {
  components: {
    ConfeitariaFuncionalSlide,
    WelcomeCourseCarousel,
    WelcomeFooter,
  },
};
</script>

<style scoped>
</style>