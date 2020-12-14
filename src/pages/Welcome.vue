<template>
  <div>
    <WelcomeSlide></WelcomeSlide>
    <WelcomeCourseCarousel></WelcomeCourseCarousel>
    <WelcomeCategories></WelcomeCategories>
    <WelcomeSejaProf></WelcomeSejaProf>
    <WelcomeExclusivo></WelcomeExclusivo>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
import WelcomeFooter from "../components/WelcomeFooter";
import WelcomeCourseCarousel from "../components/WelcomeCourseCarousel";
import WelcomeSlide from "../components/WelcomeSlide";
import WelcomeSejaProf from "../components/WelcomeSejaProf";
import WelcomeCategories from "../components/WelcomeCategories";
import WelcomeExclusivo from "../components/WelcomeExclusivo";

export default {
  components: {
    WelcomeFooter,
    WelcomeCourseCarousel,
    WelcomeSlide,
    WelcomeSejaProf,
    WelcomeCategories,
    WelcomeExclusivo,
  },
  data() {
    return {
      bottomNav: "recent",
    };
  },
};
</script>

<style scoped>
</style>


