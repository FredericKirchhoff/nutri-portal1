const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// const { Logging } = require('@google-cloud/logging');
// const logging = new Logging({
//   projectId: "",
// });

const stripe = require("stripe")(functions.config().stripe.secret, {
  apiVersion: "2020-03-02",
});

exports.createStripeCustomerSA = functions
  .region("southamerica-east1")
  .auth.user()
  .onCreate(async (user) => {
    const customer = await stripe.customers.create({ email: user.email });
    const intent = await stripe.setupIntents.create({
      customer: customer.id,
    });
    await admin
      .firestore()
      .collection("users")
      .doc(user.email)
      .set({
        customer_id: customer.id,
        setup_secret: intent.client_secret,
        joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    return;
  });

exports.createStripePaymentSA = functions
  .region("southamerica-east1")
  .firestore.document("users/{userId}/payments/{pushId}")
  .onCreate(async (snap, context) => {
    const { amount, payment_method } = snap.data();
    try {
      // Look up the Stripe customer id.
      const customer = (await snap.ref.parent.parent.get()).data().customer_id;
      const setup_secret = (await snap.ref.parent.parent.get()).data()
        .setup_secret;

      const { setupIntent, error } = await stripe.confirmCardSetup(
        await setup_secret,
        {
          payment_method,
        }
      );

      if (error) {
        await snap.ref.set({ confirmCardSetupError: "1" });
        return;
      }

      // Create a charge using the pushId as the idempotency key
      // to protect against double charges.
      const idempotencyKey = context.params.pushId;
      const payment = await stripe.paymentIntents.create(
        {
          amount: amount,
          currency: "BRL",
          customer: customer,
          payment_method: setupIntent.payment_method,
          off_session: false,
          confirm: true,
          confirmation_method: "manual",
        },
        { idempotencyKey }
      );
      // If the result is successful, write it back to the database.
      await snap.ref.set(payment);

      //CREAT THE COLLECTION OF PAID ITEMS
      await snap.ref.parent.parent
        .collection("wantedCourses")
        .map(function(course) {
          return course.update({ paid: 1 });
        });
    } catch (error) {
      // We want to capture errors and render them in a user-friendly way, while
      // still logging an exception with StackDriver

      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
      // await reportError(error, { user: context.params.userId });
    }
  });

exports.confirmStripePaymentSA = functions
  .region("southamerica-east1")
  .firestore.document("users/{userId}/payments/{pushId}")
  .onUpdate(async (change, context) => {
    if (change.after.data().status === "requires_confirmation") {
      const payment = await stripe.paymentIntents.confirm(
        change.after.data().id
      );
      change.after.ref.set(payment);
    }
  });

exports.addContentSA = functions
  .region("southamerica-east1")
  .firestore.document("users/{userId}/wantedCourses/{pushId}")
  .onUpdate(async (change) => {
    // async function copyCollection(currentUser, currentCourse) {
    //   const documents = await admin.firestore()
    //     .collection("courses")
    //     .doc(currentCourse)
    //     .collection("conteudo")
    //     .get();

    //   let writeBatch = admin.firestore().batch();
    //   const destCollection = admin.firestore()
    //     .collection("users")
    //     .doc(currentUser)
    //     .collection("wantedCourses")
    //     .doc(currentCourse)
    //     .collection("conteudo");

    //   let i = 0;
    //   for (const doc of documents.docs) {
    //       writeBatch.set(destCollection.doc(doc.id), doc.data());
    //       i++;
    //       if (i > 100) {  // write batch only allows maximum 100 writes per batch
    //           i = 0;
    //           console.log('Intermediate committing of batch operation');
    //           writeBatch.commit();
    //           writeBatch = admin.firestore().batch();
    //       }
    //   }
    //   if (i > 0) {
    //       console.log('Firebase batch operation completed. Doing final committing of batch operation.');
    //       await writeBatch.commit();
    //   }
    //   else {
    //       console.log('Firebase batch operation completed.');
    //   }
    // }

    // async function contents(courseId, user) {
    //   const content = await admin.firestore()
    //     .collection("courses")
    //     .doc(courseId)
    //     .collection("conteudo")
    //     .get();

    //     content.forEach(function(doc) {
    //       admin.firestore()
    //         .collection("users")
    //         .doc(user)
    //         .collection("wantedCourses")
    //         .doc(courseId)
    //         .collection("conteudo")
    //         .set(doc.data());
    //     });

    //     return null;
    //   }

    if (change.after.data().paid > 0) {
      // copyCollection(change.before.data().user, change.before.data().courseId)

      var writeBatch = admin.firestore().batch();

      const destCollection = admin
        .firestore()
        .collection("users")
        .doc(change.before.data().user)
        .collection("wantedCourses")
        .doc(change.before.data().courseId)
        .collection("conteudo");

      const contents = await admin
        .firestore()
        .collection("courses")
        .doc(change.before.data().courseId)
        .collection("conteudo")
        .get();

      contents.forEach(function(doc) {
        writeBatch.set(destCollection.doc(doc.id), doc.data());
      });

      return writeBatch.commit();

      // admin.firestore()
      //   .collection("courses")
      //   .doc(change.before.data().courseId)
      //   .collection("conteudo")
      //   .get()
      //   .then(function (query) {
      //     query.forEach(function(doc) {
      //       admin.firestore()
      //         .collection("users")
      //         .doc(change.before.data().user)
      //         .collection("wantedCourses")
      //         .doc(change.before.data().courseId)
      //         .collection("conteudo")
      //         .set(doc.data());
      //     });
      //     return null;
      //   }).catch(function (error) {
      //     console.log(error.message)
      //   });

      // contents(change.before.data().courseId, change.before.data().user);
    }
  });

function userFacingMessage(error) {
  return error.type
    ? error.message
    : "An error occurred, developers have been alerted";
}
