import { defineStore } from 'pinia'
import router from "../router"

import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut, onAuthStateChanged} from "firebase/auth";
import  { auth } from '../firebaseConfig'

export const useUserStore = defineStore('userStore', {
  // arrow function recommended for full type inference
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession:false,
  }),
  getters:{
    minuscula(state){
        return state.userData.toLowerCase()
    },
  },
  actions:{
    async registerUser(email, password) {
        this.loadingUser = true;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(auth.currentUser);
            router.push("/login");
        } catch (error) {
            // console.log(error);
            return error.code;
        } finally {
            this.loadingUser = false;
        }
    },
    async loginUser(email, password) {
        this.loadingUser = true;
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            this.userData = { email: user.email, uid: user.uid };
            router.push("/");
        } catch (error) {
            // console.log(error.code);
            return error.code;
        } finally {
            this.loadingUser = false;
        }
    },
    async logoutUser(){
        
        try{
            await signOut(auth)
            this.userData = null
            router.push('/login')

        }catch(error){
            console.log(error)
        }
        
    },
    currentUser(){
        return new Promise((resolve, reject)=>{
            const unsubcribe = onAuthStateChanged(
                auth,
                (user) => {
                if (user){
                    this.userData = {email:user.email, uid:user.uid}
                }else{
                    this.userData = null
                }
                resolve(user);
            },
            (e) =>reject(e)
            );
            unsubcribe()
        })
    }
    // loginUser(email,password){
    //     const {user} = signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         // ...
    //       })
    //       .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(errorMessage)
    //       });
        
    // },
  },
})