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
    <tr v-for="movie in moviesFiltered()" :key="movie.id">
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
import { doc, setDoc, onSnapshot, arrayUnion} from "firebase/firestore"; 


export default {
    name: 'Movies',
    data() {
        // set the movies taken from firebase real time database
        this.setMovies()
        let my_user = JSON.parse(sessionStorage.getItem("user"))
        return {
            movies: [],
            whishMovies: [],
            id:0,
            input_text: "",
            loading: true,
            user: my_user
            }
        },

    methods:{
        moviesFiltered(){
            console.log(JSON.stringify(this.movies[0].year).startsWith(this.input_text))
            console.log(JSON.stringify(this.movies[0].year))
            console.log(this.input_text)
            return this.movies.filter(movie => {
                if (JSON.stringify(movie.title).toLowerCase().startsWith('"'+this.input_text.trim().toLowerCase()))
                    return true
                if (JSON.stringify(movie.year).toLowerCase().startsWith(this.input_text.trim().toLowerCase()))
                    return true
                if (JSON.stringify(movie.genre).toLowerCase().startsWith('"'+this.input_text.trim().toLowerCase()))
                    return true
                if(this.input_text == "")
                    return true
                
                return false
            });
        },
        //when the whishlist is clicked
        async whishClick(movieToRemove){

            //get the movie that has to be removed
            movieToRemove = JSON.parse(movieToRemove)

            // firestore instance
            const db = getFirestore();
            // reference inside the firestore db
            const ref = doc(db, "users", this.user.uid)

            //it is used arrayUnion to update the array 
            // there is merge which creates the documents in case it does not exist
            await setDoc(ref, {movies: arrayUnion(movieToRemove)}, {merge: true});
            await setDoc(ref, {movieIds: arrayUnion(movieToRemove.id)}, {merge: true});

            //remove form the this.movies the movie clicked
            this.movies = this.movies.filter( movie => {
                return movie.id !== movieToRemove.id
            })

            //push the new element inside the whishMovies list
            // this is done in case it is not called again setMovies
            this.whishMovies.push(movieToRemove)
            sessionStorage.setItem("whish", JSON.stringify(this.whishMovies))
            console.log("Whish clicked")
        },
        async setMovies(){
           
            // take realtime db instance
            const db_realtime = getDatabase();
            //reference to the movie-òost
            const starCountRef  = ref(db_realtime, 'movies-list/')

            //create a promise for the onValue function
            // which is a listener. called for every change in the real time db
            var getData = function () {
                return new Promise(function (resolve, reject) {
                    onValue(starCountRef , resolve, reject);
                });
            }

            getData()
            //set the fetched movies
            .then((snapshot) => {
                console.log('snapshot real time database triggered')
                this.movies = []
                
                snapshot.forEach((data)=>{
                    this.movies.push(data.val())
                })
            })
            //before to display all the movies, hide the ones in the whish
            .then(()=>{
                //take the user information from the sessionStorage
                let my_user = JSON.parse(sessionStorage.getItem("user"))
                console.log(my_user)

                // firestore instance
                const db = getFirestore();
                // reference inside the firestore db
                const ref = doc(db, "users", this.user.uid)

                //fetch document
                var getData = function () {
                    return new Promise(function (resolve, reject) {
                        onSnapshot(ref , resolve, reject);
                    })
                }

                return getData()
            })
            //update the list of id in the whishlist
            .then((snapshot) => {
                console.log("snapshot firestore trigged")
                // in case the movies list is empty, do anything
                if(snapshot.data().movies != null)
                {   
                    console.log('entered')
                    let removeIds = snapshot.data().movieIds
                    this.movies = this.movies.filter( movie => {return !removeIds.includes(movie.id)} )
                    
                    this.whishMovies = snapshot.data().movies
                    console.log("Movies: ", snapshot.data().movies)
                    sessionStorage.setItem("whish", JSON.stringify(this.whishMovies))
                }
                else{
                    this.whishMovies = []
                    sessionStorage.setItem("whish", JSON.stringify(this.whishMovies))
                }
            })
            //after set, update the UI
            .then(()=>{console.log("finished"); this.loading = false; })

            .catch(() =>{
                console.log('error')
            })

            
        },
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
    height: 500px;
    display: block;
    overflow-y:scroll;
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