import {
getFirestore,
collection,
getDocs,
addDoc,
deleteDoc,
doc,
onSnapshot,
query,
where,
orderBy,
getDoc,
updateDoc,
limit,
serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import { db } from "./firebaseConfig.js";

const colRefDelivery = collection(db, 'deliveryMerchandise') //collection reference

const deleteDeliveryForm = document.querySelector('.deleteDelivery')
deleteDeliveryForm.addEventListener('submit', (e) => {
  e.preventDefault()
  //gets the doc as a reference
  const docRef = doc(db, 'deliveryMerchandise', deleteCartForm.cartId.value)
      console.log(docRef);
  deleteDoc(docRef)
    .then(() => {
      deleteCartForm.reset()
    })
});
