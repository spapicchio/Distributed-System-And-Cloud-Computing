<template>

<input v-model="input_text" class="input is-hovered" type="text" name="movie-search" placeholder="Search Movies" >
<div class=loading v-if="loading"><h1 class="title is-2">Loading Movies...</h1></div>
<table v-if="!loading">
    <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Genre</th>
        <th>Add to whishlist</th>
    </tr>
    <tr v-for="(movie, index) in movies" :key="index">
        <td>{{ movie.title }}</td>
        <td>{{ movie.year }}</td>
        <td>{{ movie.genre }}</td>
        <td><button @click="whishClick(JSON.stringify(movie))" class="button fa fa-heart is-small is-white"> </button></td>
    </tr>
</table>
    
</template>

<script>

import {getDatabase, ref, onValue} from "firebase/database";
import { getFirestore } from "firebase/firestore"
import { doc, setDoc, getDoc } from "firebase/firestore"; 


export default {
    name: 'Movies',
    data() {
        this.setMovies()
        let my_user = JSON.parse(sessionStorage.getItem("user"))
        return {
            movies: [],
            id:0,
            input_text: "",
            loading: true,
            user: my_user
            }
        },

    methods:{
        async whishClick(movieToRemove){
            const db = getFirestore();
            movieToRemove = JSON.parse(movieToRemove)
            let id = movieToRemove.id

            await setDoc(doc(db, "users", this.user.uid), {
            id: id,
            name:"movieToRemove.title",
            });

            this.movies = this.movies.filter( movie => {
                return movie.id !== id
            })

            console.log("Whish clicked")
        },
        async setMovies(){

            let my_user = JSON.parse(sessionStorage.getItem("user"))
            
            //take whish list from firestore
            let db = getFirestore();
            const docRef = doc(db, "users", my_user.uid);
            const docSnap = await getDoc(docRef);
            
            // take realtime db
            db = getDatabase();
            const starCountRef = ref(db, 'movies-list');

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }

            var getData = function () {
                return new Promise(function (resolve, reject) {
                onValue(starCountRef, resolve, reject);
                });
            }

            getData()
            .then((snapshot) => {
                console.log('changed')
                this.movies = []
                
                snapshot.forEach((data)=>{
                    this.movies.push(data.val())
                })
            })
            .then(()=>{console.log("finished"); this.loading = false; })

            
        }
    },
    components:{
    }
}

</script>

<style scoped>
input{
    max-width: 65%;
    margin: 2% auto 1% auto;
   
}
table{
    max-width: 60%;
    margin: 0% auto 0% auto;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0px 7px;
    
}

table td,
table th{
    padding:0 15px 0 15px;
}

table th:first-child{
    width:60%;
}
table th:second-child,
table th:third-child
{   
    text-align: center;
    width:10%;
}
table th:fourth-child{
 width: 5%;
}

table th{
    border-bottom: 2pt solid black;
}

table td{
    border-bottom: 0.1pt solid gray;
}
 .loading{
     background-color: lightgrey;
     width: 70%;
     height: 300px;
     margin: 5px auto 0 auto;
     display: flex;
     text-align: center;
     justify-content: center;
     align-items: center
 }

@media screen and (max-width: 800px) {
	table th:first-child{
    width:35%;
    }

}

</style>