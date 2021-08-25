import app from 'firebase/app';
import firebaseConfig from './FBconfig';
import 'firebase/auth';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            this.auth.createUserWithEmailAndPassword(email, password)
                .then((userCreds) => resolve(userCreds))
                .catch((reason) => reject(reason))
        })
    }


    doSignInWithGoogle = () => {

        const googleProvider = new app.auth.GoogleAuthProvider();
        return new Promise((resolve, reject) => {
            this.auth.signInWithPopup(googleProvider)
                .then(result => resolve(result))
                .catch(reason => reject(reason))
        })
    }

    doSignInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(email, password)
                .then((res) => resolve(res))
                .catch((reason) => reject(reason))
        })
    }


    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => {
        try {
            this.auth.sendPasswordResetEmail(email);
        } catch (err) { alert(err) }
    }

    doPasswordUpdate = password => {
        try {
            this.auth.currentUser.updatePassword(password);
            alert("se actualizó la contraseña")
        } catch (err) { alert(err) }
    }

    doSendSignInLinkToEmail(email) {

        var actionCodeSettings = {
            url: 'http://localhost:3000/twoSteps',
            handleCodeInApp: true
        }

        this.auth.sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                alert("revisa tu casilla de correo para continuar")
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log("ERROR: ", errorMessage)
            });
    }

}

export default Firebase;