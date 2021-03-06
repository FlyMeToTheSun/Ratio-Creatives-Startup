import { getAuth,
createUserWithEmailAndPassword,
signOut,
signInWithEmailAndPassword,
onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
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

import { auth, db, storage  } from "./firebaseConfig.js";

const colRefUser = collection(db, 'userProfile') //collection reference

onAuthStateChanged(auth, user=> {
	if (user != null){
		const emailRef = user.email;
		const q = query(colRefUser, where("userEmail", "==", emailRef));

			onSnapshot(q, (snapshot) => {
		    snapshot.docs.forEach((doc) => {
					let nameRef = doc.data().userName;
					document.cookie = "userEmail="+emailRef+"+ userName="+nameRef;
				})
			})

		console.log(document.cookie);
		const cookieEmail = document.cookie
  	.split('+ ')
  	.find(row => row.startsWith('userEmail='))
  	.split('=')[1];

		const cookieName = document.cookie
		.split('+ ')
		.find(row => row.startsWith('userName='))
		.split('=')[1];


		console.log('logged in: ' + cookieEmail);
	} else {
		console.log('No user')
	}
});

//login
const loginForm = document.querySelector('.userLogin')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm.userEmail.value
	const password = loginForm.userPassword.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})
