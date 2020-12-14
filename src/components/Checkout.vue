<template>
<div>
<!-- <v-stepper v-model="e1">
  <v-stepper-header>
    <v-stepper-step
      :complete="e1 > 1"
      step="1"
    >
      Dados de pagamento
    </v-stepper-step>

    <v-divider></v-divider>

    <v-stepper-step
      :complete="e1 > 2"
      step="2"
    >
      Comfirmar pagamento
    </v-stepper-step>

    <v-divider></v-divider>

    <v-stepper-step step="3">
      Fim
    </v-stepper-step>
  </v-stepper-header>

  <v-stepper-items>
    <v-stepper-content step="1"> -->
      <v-row class="d-flex justify-center text-h6 grey--text my-6">
        Finalize a compra dos cursos que mudarão a sua vida profissional!
      </v-row>
      <v-row class="d-flex justify-center">
        <v-sheet color="white" height="100%">
          <v-row
            v-for="element in cartElements"
            :key="element"
            class="d-flex align-center"
          >
            <v-card>
              <v-row
                class="d-flex justify align-center text-subtitle-1 mx-1 black--text"
              >
                {{ element.course }} : R$ {{ element.price }},00
              </v-row>
            </v-card>

            <v-btn icon @click="removeElement">
              <v-tooltip bottom color="#afafaf">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    @click="removeElement(element.id)"
                    >{{ icons.mdiClose }}</v-icon
                  ></template
                >
                <span class="white--text text-subtitle-1">Retirar item..</span>
              </v-tooltip></v-btn
            >
          </v-row>
          <!-- <v-row class="d-flex justify-center">
            Soma: R$ {{ soma }},00
          </v-row> -->

          <v-row class="d-flex justify-center">
            <v-col cols="12">
              <v-row class="d-flex justify-center black--text text-h6 mt-4">
                Insere as informações do seu cartão de crédito
              </v-row>
              <v-row class="d-flex justify-center">
                <v-text-field
                  v-model="nomeCartao"
                  label="Nome no Cartão"
                  required
                >
                </v-text-field>
              </v-row>
              <v-row class="d-flex justify-center">
                <v-stripe-card
                  v-model="cardElement"
                  api-key="pk_live_51HbFJ0GkUXTqQoyNv5tRV8E5meLvdmVwnMDYsz3iqwo2qOTyhMnsSlttd00sLo2KjWzEy3xeIyIaeBEUybpOAQxQ00om469Qzt"
                  create="token"
                ></v-stripe-card>
              </v-row>
              <v-row class="d-flex justify-center">
                <v-btn large color="grey" class="black--text">
                  Confirmar Dados de pagamento
                </v-btn>
              </v-row>
              <v-row class="d-flex justify-center mt-8">
                <!-- <v-tooltip v-model="alerts.cardInfoError" bottom color="#ff0000">
                  <template v-slot:activator="{}">
                    <v-btn large color="#c5d13f" class="black--text" @click="e1++">
                      Confirmar Dados
                    </v-btn>
                  </template>
                  <span>informações do cartão incoherente!</span>
                </v-tooltip> -->
                <v-tooltip v-model="alerts.cardInfoError" bottom color="#ff0000">
                  <template v-slot:activator="{}">
                    <v-btn large color="#c5d13f" class="black--text" @click="confirm" :disabled="disabled">
                      Pagar R$ {{ soma }},00
                    </v-btn>
                  </template>
                  <span>Erro no pagamento! Verifique os dados do seu cartão</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-row>
    <!-- </v-stepper-content>

    <v-stepper-content step="2"> -->
      <!-- <v-tooltip v-model="alerts.cardInfoError" bottom color="#ff0000">
        <template v-slot:activator="{}">
          <v-btn large color="#c5d13f" class="black--text" @click="confirm">
            Pagar R$ {{ soma }},00
          </v-btn>
        </template>
        <span>Erro no pagamento! Verifique os dados do seu cartão</span>
      </v-tooltip> -->

      <!-- <v-btn large color="grey" class="black--text" @click="e1--">
        Voltar
      </v-btn>

    </v-stepper-content>

    <v-stepper-content step="3">
      Sucesso
    </v-stepper-content>    
  </v-stepper-items>
          
  </v-stepper> -->
</div>
</template>

<script>
import firebase from "firebase";
import { mdiClose } from "@mdi/js";

export default {
  data() {
    return {
      e1: 1,
      model: null,
      cartElements: [],
      stripeError: "",
      cardElement: null,
      nomeCartao: "",
      disabled: this.soma < 10,
      // soma: 0,
      icons: {
        mdiClose,
      },
      // setup_secret: {}
    };
  },
  firestore() {
    return {
      cartElements: firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .where("paid", "<", 1)
      // setup_secret: firebase
      //   .firestore()
      //   .collection("users")
      //   .doc(firebase.auth().currentUser.email),
    };
  },
  computed: {
    alerts() {
      return this.$store.state.alerts;
    },
    state() {
      return this.$store.state;
    },
    soma: function () {
      let sum = 0;
      this.cartElements.forEach(function (item) {
        sum += parseFloat(item.price);
      });

      return sum;
    },
  },
  methods: {
    removeElement(id) {
      this.$store.dispatch("removeFromCart", { elementId: id });
    },
    confirm() {
      this.$store.dispatch("confirmPayment", {
        cardElement: this.cardElement,
        nomeCartao: this.nomeCartao,
        soma: this.soma,
      });
      // const stripe = require("stripe");
      // const { setupIntent, error } = await stripe.confirmCardSetup(
      //   this.setup_secret.setup_secret,
      //   {
      //     payment_method: {
      //       card: this.cardElement,
      //       billing_details: {
      //         name: this.nomeCartao,
      //       },
      //     },
      //   }
      // );

      // if (error) {
      //   this.$store.dispatch("cardInfoError", { bool: true });
      //   return;
      // }
      //   this.$store.dispatch("cardInfoError", { bool: false });

      //   const data = {
      //     payment_method: setupIntent.payment_method,
      //     amount: this.soma,
      //     status: "new",
      //   };

      //   await firebase
      //     .firestore()
      //     .collection("users")
      //     .doc(firebase.auth().currentUser.email)
      //     .collection("payments")
      //     .add(data);

      //   console.log(data)

      // // const amount = this.soma;
      // // const payment_method = stripe
      // //   .createPaymentMethod({
      // //     type: "card",
      // //     card: this.source,//cardElement,
      // //     billing_details: {
      // //       name: this.nomeCartao,
      // //     },
      // //   })
      // //   .then(function (result) {
      // //     // Handle result.error or result.paymentMethod
      // //     return result.paymentMethod;
      // //   });
    },
  },
};
</script>
