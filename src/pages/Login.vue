<template>
  <div class="page">
    <LoginHeader></LoginHeader>
    <LoginForm></LoginForm>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
import WelcomeFooter from "../components/WelcomeFooter";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";

export default {
  components: { WelcomeFooter, LoginHeader, LoginForm }
};
</script>

<style>
</style>