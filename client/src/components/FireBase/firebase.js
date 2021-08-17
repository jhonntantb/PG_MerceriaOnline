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

    // doCreateAccountWithGoogle = () => {
    //     return 'ok'
    // }
     
    // console.log('this.auth: ' , this.auth)

    doSignInWithGoogle = () => {

        const googleProvider= new app.auth.GoogleAuthProvider();
        console.log('google provider: ', googleProvider)
        

        console.log('ESTO ES APP: ' , app)

        console.log('esto es auth: ' , this.auth)

        return new Promise((resolve, reject) => {
            this.auth.signInWithPopup(googleProvider)
            
            .then(result=>resolve(result))
            .catch(reason=>reject(reason))
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

    doPasswordReset = email => {
        
        try {
            this.auth.sendPasswordResetEmail(email);
            console.log("se envio el mail a la casilla de correo")
        } catch (err) {alert(err)}
    }

    doPasswordUpdate = password =>{
        try {
            this.auth.currentUser.updatePassword(password);
            alert("se actualizó la contraseña")
        } catch (err){alert(err)}
    }

}

export default Firebase;