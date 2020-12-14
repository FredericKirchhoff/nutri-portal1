<template>
  <div align="center">
    <v-form v-model="valid">
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="6">
            <v-text-field
              solo
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
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="6">
            <v-alert
              v-show="alerts.loginOk"
              dense
              type="error"
              :icon="icons.mdiAlert"
              >Email ou senha errada</v-alert
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-row align="center">
      <v-col class="text-center" cols="12">
        <v-btn large color="#c5d13f" @click="submit">Login</v-btn>
        <v-btn
          large
          class="mx-4 white--text"
          color="#614021"
          value="cadastrar"
          to="/cadastrar"
        >
          <span>Criar Cadastro</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="text-center" cols="12">
        <v-btn
          v-show="alerts.loginOk"
          class="mx-4 white--text"
          large
          color="#614021"
          @click="resetPassword"
          >Esqueci minha senha</v-btn
        >
      </v-col>
    </v-row>

    <v-dialog v-model="alerts.resetEmailsent" width="50%">
      <v-card>
        <v-card-title class="red white--text"
          >Verifique seu Email!</v-card-title
        >

        <v-card-text class="px-4"
          >Uma mensagem enviado para o seu Email (possívelmente na pasta
          "Notificações"). Abre a mensagem para poder criar uma nova
          senha.</v-card-text
        >

        <!-- <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="!dialoge">OK, vou verificar</v-btn>
        </v-card-actions>-->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiLock, mdiEmail, mdiEye, mdiEyeOff, mdiAlert } from "@mdi/js";

export default {
  data: function () {
    return {
      valid: false,
      show: false,
      email: "",
      senha: "",
      mandatory: [
        (v) => !!v || "Campo obrigatório",
        // v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      icons: { mdiLock, mdiEmail, mdiEye, mdiEyeOff, mdiAlert },
    };
  },
  computed: {
    alerts() {
      return this.$store.state.alerts;
    },
  },
  methods: {
    submit() {
      this.$store.dispatch("userLogin", {
        email: this.email,
        password: this.senha,
      });
    },
    resetPassword() {
      this.$store.dispatch("userResetPassword", {
        email: this.email,
      });
    },
  },
};
</script>