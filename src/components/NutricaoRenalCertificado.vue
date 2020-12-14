<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="0" md="1"></v-col>
      <v-col cols="12" md="10">
        <v-row class="d-flex justify-center black--text text-h5">
          Nutrição Renal
        </v-row>
        <v-row class="d-flex justify-center black--text text-h6">
          <v-card elevation="0">
            <v-card-title>
              Percentual completado total: {{ progressSum }}%
            </v-card-title>
            <v-progress-linear
              :value="progressSum"
              color="#c5d13f"
              background-color="#614021"
              rounded
              absolute
              height="12"
            ></v-progress-linear>
          </v-card>
        </v-row>
        <v-row class="d-flex justify-center">
          <div v-if="enoughProgress">
            <v-row class="d-flex justify-center">
              <div id="pdf">
                <!-- <img id="logo" src="https://www.linkpicture.com/q/certificado_cru.png"/> -->
                <!-- <br/><br/>
                <p class="plainText">
                  Certificamos que
                </p> -->
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h2 id="nome">
                  {{ nome.displayName }}
                </h2>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <!-- <p class="plainText">
                  concluiu com total aproveitamento do curso
                </p> -->
                <h2 id="titulo">
                  Nutrição Renal
                </h2>
                <br/>
                <br/>
                <p class="plainText">
                  com carga horária de 2 horas
                </p>
                <br/>
                <br/>
                <p class="plainText">
                  {{ date.getDate() }}/{{ date.getMonth() }}/{{ date.getFullYear() }}
                </p>
                <!-- <img id="assinatura" src="https://www.linkpicture.com/q/assinature_thayana_2-small4.png"/>
                <p class="plainText">
                  MSc Thayana Albuquerque Kirchhoff
                </p> -->
              </div>
              <!-- <div id="pdf">
                <img scr="https://www.linkpicture.com/q/certificado_cru.png">
                <div> Thayana Albuquerque </div>
                <div> Causas endócrinas de obesidade </div>
                <div> {{ date.getDate() }}/{{ date.getMonth() }}/{{ date.getFullYear() }} </div>
              </div> -->
            </v-row>
            <v-row class="d-flex justify-center">
              <v-btn
                elevation="2"
                color="#c5d13f"
                class="black--text mt-8"
                @click="download"
              >
                Baixar certificado
              </v-btn>
            </v-row>
          </div>
          <div v-else>
            <v-row class="d-flex justify-center black--text text-h5">
              <v-col>
                Continue assistindo as aulas até que o "percentual completado
                total" é maior que 90% para poder receber o certificado
              </v-col>
            </v-row>
          </div>
        </v-row>
      </v-col>
      <v-col cols="0" md="1"></v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import * as htmlToImage from 'html-to-image';
// import { toJpeg } from 'html-to-image';
// import html2canvas from "html2canvas";
const { jsPDF } = require("jspdf");

export default {
  data() {
    return {
      aulas: [],
      nome: {},
      date: new Date()
    };
  },
  firestore() {
    return {
      nome: firebase.auth().currentUser,
      aulas: firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .doc("NutricaoRenal")
        .collection("conteudo")
    };
  },
  computed: {
    // alerts() {
    //     return this.$store.state.alerts;
    // },
    // state() {
    //     return this.$store.state;
    // },
    progressSum: function () {
      let sum = 0;
      this.aulas.forEach(function (item) {
        sum += parseFloat(item.progress);
      });

      return sum / this.aulas.length;
    },
    enoughProgress: function () {
      return this.progressSum > 90;
    },
  },
  methods: {
    download() {
      htmlToImage.toJpeg(document.getElementById("pdf")).then(function (
        dataUrl
      ) {
        var img = new Image();
        img.src = dataUrl;
        let pdfName = "certificado_Causas_endocrinas_da_obesidade";
        var doc = new jsPDF({ orientation: "l", unit: "pt", format: "a4" });
        doc.addImage(img, "JPEG", 0, 0, 1024, 768);
        doc.save(pdfName + ".pdf");
      }).catch(function (error) {
        console.error('Error creating Certificado', error);
      });
    }
    // download() {
    //   html2canvas(document.getElementById("pdf")).then(function (canvas) {
    //     let img = canvas.toDataURL('image/jpeg');
    //     let pdfName = "certificado_Causas_endocrinas_da_obesidade";
    //     var doc = new jsPDF({ orientation: "l", unit: "pt", format: "a4" });
    //     doc.addImage(img, "JPEG", 0, 0, 1024, 768);
    //     doc.save(pdfName + ".pdf");
    //   })
    // }
  },
};
</script>

<style scoped>
#pdf {
  display: inline-block;
  width: 1024px;
  height: 768px;
  background-image: url("https://www.linkpicture.com/q/certificado_cru.jpeg"); 
  background-size: 100%;
}
p {
  margin: auto;
  text-align: center;
}

h2 {
  margin: auto;
  text-align: center;
}
</style>