import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
// import router from "./router";
// import { db } from "./firebase/index";
// import { Timestamp } from "./firebase/index";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: "test@gmail.com",
    isAuthenticated: false,
    alerts: {
      resetEmailsent: false,
      emailOk: false,
      loginOk: false,
      cardInfoError: false,
    },
    buySlide: 0,
    wantedCourses: [],
    //     apiUrl: 'https://api.edamam.com/search'
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setAlertsEmailOk(state, payload) {
      state.alerts.emailOk = payload;
    },
    setAlertsLoginOk(state, payload) {
      state.alerts.loginOk = payload;
    },
    setResetEmailsent(state, payload) {
      state.alerts.resetEmailsent = payload;
    },
    setBuySlideNr(state, payload) {
      state.buySlide = payload;
    },
    setCardInfoError(state, payload) {
      state.cardInfoError = payload;
    },
    // setRecipes(state, payload) {
    //     state.recipes = payload;
    // }
  },
  actions: {
    userJoin({ commit }, { email, password, nome }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function(user) {
          user.updateProfile({
            displayName: nome,
          });
          commit("setUser", email);
          commit("setIsAuthenticated", true);
          commit("setBuySlideNr", 2);
        })
        .catch(function() {
          commit("setUser", "test@gmail.com");
          commit("setIsAuthenticated", false);
          commit("setBuySlideNr", 0);
          // if (error.code === "FIRAuthErrorCodeEmailAlreadyInUse") {
          commit("setAlertsEmailOk", true);
          // }
        });
    },
    userLogin({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function() {
          commit("setUser", email);
          commit("setIsAuthenticated", true);
          commit("setAlertsLoginOk", false);
          commit("setBuySlideNr", 2);
        })
        .catch((error) => {
          console.log(error.message);
          commit("setUser", "test@gmail.com");
          commit("setIsAuthenticated", false);
          commit("setAlertsLoginOk", true);
          commit("setBuySlideNr", 0);
        });
    },
    userLogout({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(function() {
          commit("setUser", "test@gmail.com");
          commit("setIsAuthenticated", false);
          commit("setAlertsLoginOk", false);
          commit("setBuySlideNr", 0);
        })
        .catch(function(error) {
          console.log(error.message);
        });
    },
    userResetPassword({ commit }, { email }) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function() {
          commit("setResetEmailsent", true);
          commit("setAlertsLoginOk", false);
          commit("setBuySlideNr", 0);
        })
        .catch(function(error) {
          console.log(error.message);
        });
    },
    userAcquireCourse(
      { arg },
      { courseId, course, price, imgUrl, descrShort, linkCurso }
    ) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        // .doc(course).set(course, price, ref) ... conteudoArray.forEach(function (aula) {...}) batch
        // .add({
        .doc(courseId)
        .set({
          course: course,
          price: price,
          paid: 0,
          courseId: courseId,
          imgUrl: imgUrl,
          descrShort: descrShort,
          linkCurso: linkCurso,
          user: firebase.auth().currentUser.email,
        });
      console.log(arg);
    },
    userAcquireCourseFree(
      { arg },
      { courseId, course, imgUrl, descrShort, linkCurso }
    ) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        // .doc(course).set(course, price, ref) ... conteudoArray.forEach(function (aula) {...}) batch
        // .add({
        .doc(courseId)
        .set({
          course: course,
          paid: 1,
          free: true,
          courseId: courseId,
          imgUrl: imgUrl,
          descrShort: descrShort,
          linkCurso: linkCurso,
          user: firebase.auth().currentUser.email,
        });

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .doc(courseId)
        .collection("conteudo")
        .doc("aula1")
        .set({
          nome: "Dia 1",
          route: "WorkshopDecolaNutriAula2",
          title: "Aula ao vivo do dia 05/01/2021",
          videoUrl: "",
          pdfUrl: "",
        });

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .doc(courseId)
        .collection("conteudo")
        .doc("aula2")
        .set({
          nome: "Dia 2",
          route: "WorkshopDecolaNutriAula2",
          title: "Aula ao vivo do dia 06/01/2021",
          videoUrl: "",
          pdfUrl: "",
        });

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .doc(courseId)
        .collection("conteudo")
        .doc("aula3")
        .set({
          nome: "Dia 3",
          route: "WorkshopDecolaNutriAula3",
          title: "Aula ao vivo do dia 07/01/2021",
          videoUrl: "",
          pdfUrl: "",
        });

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .doc(courseId)
        .collection("conteudo")
        .doc("ebookProcrastinacao")
        .set({
          route: "EbookProcrastinacao",
          pdfUrl: "https://nutri.online/EbookProcrastinacao.pdf",
        });

      console.log(arg);
    },
    setBuySlide({ commit }, { nr }) {
      commit("setBuySlideNr", nr);
    },
    removeFromCart({ arg }, { elementId }) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .doc(elementId)
        .delete()
        .then(function() {
          console.log("element removed from cart");
        })
        .catch(function(error) {
          console.log(error.message);
        });

      console.log(arg);
    },
    cardInfoError({ commit }, { bool }) {
      commit("setCardInfoError", bool);
    },
    confirmPayment({ commit }, { cardElement, nomeCartao, soma }) {
      // const stripe = Stripe("pk_test_51HbFJ0GkUXTqQoyNB2YiZTZLbrwIg71Xs2sob0JWG2jmrSE8NPIKBW6IL9ENGXx442QDrTtQiuAqzpYUTbaNHnI100glM3gd5Y");

      // const setup_secret = firebase.firestore().collection("users").doc(
      //   firebase.auth().currentUser.email
      //     ).get().then(function (doc){
      //       return doc.data().setup_secret;
      //     });

      // const { setupIntent, error } = await stripe.confirmCardSetup(
      //   await setup_secret,
      //   {
      const payment_method = {
        card: cardElement,
        billing_details: {
          name: nomeCartao,
        },
      };
      //   }
      // );

      // if (error) {
      //   commit("setCardInfoError", true);
      //   return;
      // }
      //   commit("setCardInfoError", false);

      const data = {
        payment_method: /*setupIntent.*/ payment_method,
        amount: soma,
        status: "new",
      };

      console.log(data);

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("payments")
        .add(data);

      console.log(commit);
    },
    setProgressBar({ commit }, { progress, course, aula }) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("wantedCourses")
        .doc(course)
        .collection("conteudo")
        .doc(aula)
        .update({
          progress: progress,
        });
      console.log(commit);
    },
    // async getRecipes({ state, commit }, plan) {
    //     try {
    //         let response = await axios.get('${state.apiurl}', {
    //             params: {
    //                 q: plan,
    //                 app_id: '<yourAppIdHere>',
    //                 app_key: '<yourAppKeyHere>',
    //                 from: 0,
    //                 to: 9
    //             }
    //         });
    //         commit('setRecipes', response.data.hits);
    //     } catch (error) {
    //         commit('setRecipes', \[\]);
    //     }
    // }
  },
});
