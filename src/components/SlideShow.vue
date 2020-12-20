<template>
  <v-carousel
    v-model="state.buySlide"
    hide-delimiters
    :next-icon="false"
    :prev-icon="false"
    :cycle="false"
  >
    <v-carousel-item>
      <v-row class="d-flex justify-center my-4 text-h6 black--text">
        Antes de adicionar o item ao carrinho é preciso fazer Login.
      </v-row>
      <v-row class="d-flex justify-center my-4 text-h6 black--text">
        Ainda não criou um cadastro no nosso portal de ensino?
      </v-row>
      <v-row class="d-flex justify-center">
        <v-btn @click="buySildeCadastro" color="#614021" large
          >Criar novo Cadastro</v-btn
        >
      </v-row>
      <v-row class="d-flex justify-center mt-4 text-h6 black--text">
        Já tem um cadastro? Faça Login
      </v-row>
      <v-form v-model="validLogin">
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="6">
            <v-text-field
              solo
              color="#614021"
              background-color="grey"
              :prepend-icon="icons.mdiEmail"
              v-model="email"
              label="Email"
              :rules="mandatory"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="6">
            <v-text-field
              solo
              color="#614021"
              background-color="grey"
              :prepend-icon="icons.mdiLock"
              v-model="senha"
              :append-icon="show ? icons.mdiEye : icons.mdiEyeOff"
              :type="show ? 'text' : 'password'"
              :rules="mandatory"
              label="Senha"
              required
              @click:append="show = !show"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <!-- <v-row class="d-flex justify-center">
          <v-col cols="12" md="6">
            <v-alert
              v-show="alerts.loginOk"
              dense
              type="error"
              :icon="icons.mdiAlert"
              dismissible
              >Email ou senha errada</v-alert
            >
          </v-col>
        </v-row> -->
      <v-row align="d-flex justify-center">
        <v-col class="d-flex justify-center" cols="12">
          <v-tooltip v-model="alerts.loginOk" bottom color="#ff0000">
            <template v-slot:activator="{}">
              <v-btn
                large
                color="#c5d13f"
                @click="submitLogin"
                class="black--text"
                >Login</v-btn
              >
            </template>
            <span>Email ou senha errada!</span>
          </v-tooltip>

          <v-tooltip v-model="alerts.resetEmailsent" right color="#ff0000">
            <template v-slot:activator="{}">
              <v-btn
                v-show="alerts.loginOk"
                class="mx-4 white--text"
                large
                color="#614021"
                @click="resetPassword"
                >Esqueci minha senha</v-btn
              >
            </template>
            <span
              >Verifique seu Email! Uma mensagem foi enviado para criar uma nova
              senha.</span
            >
          </v-tooltip>
        </v-col>
      </v-row>
      <!-- <v-row class="d-flex justify-center">
        <v-col cols="12" md="6">
          <v-alert
            v-show="alerts.resetEmailsent"
            dense
            type="error"
            :icon="icons.mdiAlert"
            >Verifique seu Email! Uma mensagem foi enviado para criar uma nova
            senha.</v-alert
          >
        </v-col>
      </v-row> -->
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet height="100%" color="white">
        <div v-if="state.isAuthenticated">
          <v-row class="d-flex justify-center align-center black--text mt-16">
            <v-icon color="green" size="32%">
              {{ icons.mdiCheckCircle }}
            </v-icon>
          </v-row>
          <v-row class="d-flex justify-center align-center black--text text-h6">
            Login feito com sucesso!
          </v-row>
          <v-row class="d-flex justify-center align-center mt-12">
            <v-btn color="#614021" large @click="buySildeForward">
              Continuar
            </v-btn>
          </v-row>
        </div>
        <div v-else>
          <v-form ref="form" v-model="validCadastro">

            <v-row class="d-flex justify-center">
              <v-col cols="12" md="6">
                <v-text-field
                  color="#614021"
                  background-color="grey"
                  solo
                  :prepend-icon="icons.mdiAccount"
                  v-model="nome"
                  label="Nome completo"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
              <v-col cols="12" md="4">
                <v-alert
                  v-show="alerts.emailOk"
                  dense
                  type="error"
                  :icon="icons.mdiAlert"
                  >Email indisponível</v-alert
                >
              </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
              <v-col cols="12" md="6">
                <v-text-field
                  color="#614021"
                  background-color="grey"
                  solo
                  :prepend-icon="icons.mdiEmail"
                  v-model="emailCad"
                  :rules="rules.emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
              <v-col cols="12" md="6">
                <v-text-field
                  color="#614021"
                  background-color="grey"
                  solo
                  :prepend-icon="icons.mdiLock"
                  v-model="senhaCad"
                  :append-icon="show ? icons.mdiEye : icons.mdiEyeOff"
                  :type="show ? 'text' : 'password'"
                  :rules="rules.passwordLength"
                  label="Senha"
                  required
                  @click:append="show = !show"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="d-flex justify-center">
              <v-col class="d-flex justify-center" cols="12">
                <v-btn
                  large
                  color="grey"
                  @click="buySildeBackward"
                  class="black--text"
                  >Voltar</v-btn
                >
              </v-col>
            </v-row>

            <v-row align="d-flex justify-center">
              <v-col class="d-flex justify-center" cols="12">
                <v-btn
                  large
                  color="#c5d13f"
                  @click="submitCadastro"
                  class="black--text"
                  >Cadastrar</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item class="d-flex justify-center">
      <v-sheet height="100%" color="white">
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="6">
            <v-row class="d-flex justify-center align-center black--text mt-16">
              <v-icon color="green" size="32%">
                {{ icons.mdiCheckCircle }}
              </v-icon>
            </v-row>
            <v-row
              class="d-flex justify-center align-center black--text text-h6"
            >
              Login feito com sucesso!
            </v-row>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import {
  mdiLock,
  mdiEmail,
  mdiEye,
  mdiEyeOff,
  mdiAlert,
  mdiCheckCircle,
  mdiAccount
} from "@mdi/js";

export default {
  data: function () {
    return {
      false: false,
      validLogin: false,
      validCadastro: false,
      show: false,
      email: "",
      emailCad: "",
      nome: "",
      senha: "",
      senhaCad: "",
      mandatory: [(v) => !!v || "Campo obrigatório"],
      rules: {
        passwordLength: [(v) => v.length >= 8 || "Senha com mais que 8 letras"],
        emailRules: [
          (v) => !!v || "E-mail obrigatório",
          (v) => /.+@.+/.test(v) || "E-mail invalido",
        ],
      },
      icons: { mdiLock, mdiEmail, mdiEye, mdiEyeOff, mdiAlert, mdiCheckCircle, mdiAccount },
    };
  },
  computed: {
    alerts() {
      return this.$store.state.alerts;
    },
    state() {
      return this.$store.state;
    },
  },
  methods: {
    submitLogin() {
      this.$store.dispatch("userLogin", {
        email: this.email,
        password: this.senha,
      });
    },
    submitCadastro() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("userJoin", {
          email: this.emailCad,
          password: this.senhaCad,
          nome: this.nome
        });
      }
    },
    resetPassword() {
      this.$store.dispatch("userResetPassword", {
        email: this.email,
      });
    },
    buySildeForward() {
      this.$store.dispatch("setBuySlide", {
        nr: 2,
      });
    },
    buySildeBackward() {
      this.$store.dispatch("setBuySlide", {
        nr: 0,
      });
    },    
    buySildeCadastro() {
      this.$store.dispatch("setBuySlide", {
        nr: 1,
      });
    },
  },
};
</script>