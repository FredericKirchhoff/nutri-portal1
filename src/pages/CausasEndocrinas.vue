<template>
  <div class="black">
    <CausasEndocrinasSlide class="mb-16"></CausasEndocrinasSlide>
    <v-divider dark></v-divider>
    <WelcomeCourseCarousel></WelcomeCourseCarousel>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
import CausasEndocrinasSlide from "../components/CausasEndocrinasSlide";
import WelcomeCourseCarousel from "../components/WelcomeCourseCarousel";
import WelcomeFooter from "../components/WelcomeFooter";

export default {
  components: {
    CausasEndocrinasSlide,
    WelcomeCourseCarousel,
    WelcomeFooter,
  },
};
</script>

<style scoped>
</style>