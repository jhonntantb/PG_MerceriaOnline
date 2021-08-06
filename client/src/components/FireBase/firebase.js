import app from 'firebase/app';
import firebaseConfig from './FBconfig';
import 'firebase/auth';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword =  (email, password) => {

        return new Promise((resolve, reject)=> {
            this.auth.createUserWithEmailAndPassword(email,password)
            .then((userCreds)=>resolve(userCreds))
            .catch((reason)=>reject(reason))
        })
        
    }

    doSignInWithEmailAndPassword = (email, password) =>
    {
        return new Promise((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(email, password)
            .then((res)=>resolve(res))
            .catch((reason)=>reject(reason))
        })
    }
    

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

}

export default Firebase;