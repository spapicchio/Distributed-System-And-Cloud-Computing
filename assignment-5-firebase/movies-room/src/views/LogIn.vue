<template>

    <div class="login">
        <h1 class="title is-1">Movies Room</h1>
        <img src='../assets/logo.png' @click="iconClick">
        <h3 class="subtitle is-3">Sign-in with Google</h3>
        <button class=social-button @click="googleLogIn">
            <img alt="Google logo" src="../assets/google-logo.png">
        </button>
    </div>
       
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const provider = new GoogleAuthProvider();


  export default {
    name: 'login',
    data() {
        
      return {
      }
    },
    methods: {
        googleLogIn(){
            const auth = getAuth();
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                
                console.log("CREDENTIAL ", credential);
                console.log("TOKEN ", token);
                console.log("USER ", user);
                
                //put the information of the user inside the sessionStorage
                sessionStorage.setItem('user', JSON.stringify(user));

                return user;
            })
            .then(() => {
                this.$router.push('/home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);   
                console.log(errorCode);
                console.log(errorMessage);
                console.log(email);
                console.log(credential);
            });
        }
    }
}
</script>

<style scoped>
 .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }

  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }

  .social-button{
      width: 75px;
      background: white;
      padding: 10px;
      border-radius: 100%;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
      outline:0;
      border: 0;
  }
  .social-button:active{
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);;
  }
  .social-button img{
      width: 100%;
  }
h1{
    width:100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 2em;
    text-align: center;
    color: #2c3e50;
}

div{
    width:100%
}

.container{
    display:block;
    margin-top: 10%;
}
</style>


