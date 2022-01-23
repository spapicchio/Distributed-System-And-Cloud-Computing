<template>
    <Navbar />
    
    <input v-model="input_text" class="input is-hovered" type="text" name="movie-search" placeholder="Search Movies" >
    <div class=loading v-if="!loading">
        <h1 class="title is-2">You did not add any movie to whishlist!</h1>
        <button class="button is-medium is-dark" @click="clickMovieList">Movies List</button>
        </div>
    <table v-if="loading">
        <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Remove from whishlist</th>
        </tr>
        <tr v-for="movie in moviesFiltered()" :key="movie.id">
            <td>{{ movie.title }}</td>
            <td>{{ movie.year }}</td>
            <td>{{ movie.genre }}</td>
            <td><button @click="removeClick(JSON.stringify(movie))" class="button fa fa-minus-circle is-small is-white"></button></td>
        </tr>
    </table>


</template>

<script>
import Navbar from "../components/Navbar"
import { getFirestore } from "firebase/firestore"
import { doc, setDoc, arrayRemove} from "firebase/firestore";

export default {
    name: "App",
    components: {
        Navbar
    },
    data() {
            let movies = JSON.parse(sessionStorage.getItem('whish'))
            let loading = false;
            let user = JSON.parse(sessionStorage.getItem("user"))
            if (movies.length != 0) loading=true;
        
            return {
                movies: movies,
                whishMovies: [],
                id:0,
                input_text: "",
                loading: loading,
                user: user
        }   
    },
    methods: {
        clickMovieList(){
            this.$router.push("/home")
        },
        moviesFiltered(){
            console.log(JSON.stringify(this.movies[0].year).startsWith(this.input_text))
            console.log(JSON.stringify(this.movies[0].year))
            console.log(this.input_text)
            return this.movies.filter(movie => {
                if (JSON.stringify(movie.title).startsWith('"'+this.input_text.trim()))
                    return true
                if (JSON.stringify(movie.year).startsWith(this.input_text.trim()))
                    return true
                if (JSON.stringify(movie.genre).startsWith('"'+this.input_text.trim()))
                    return true
                if(this.input_text == "")
                    return true
                
                return false
            });
        },

        async removeClick(movieToRemove){
            //get the movie that has to be removed
            movieToRemove = JSON.parse(movieToRemove)

            // firestore instance
            const db = getFirestore();
            // reference inside the firestore db
            const ref = doc(db, "users", this.user.uid)

            await setDoc(ref, {movies: arrayRemove(movieToRemove)}, {merge:true});
            await setDoc(ref, {movieIds: arrayRemove(movieToRemove.id)}, {merge:true});

            //remove form the this.movies the movie clicked
            this.movies = this.movies.filter( movie => {
                return movie.id !== movieToRemove.id
            })

            if (this.movies.length == 0) this.loading =false;
            
            console.log("removed");
        }

  }
};
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
table td button{
    width: 100px;
    margin-bottom: 10px;
}

.loading{
    background-color: lightgrey;
    width: 70%;
    height: 300px;
    margin: 5px auto 0 auto;
    display: inline-block;
    }
.loading button{
    margin: 10px;
}

.loading h1{
    margin: 50px;
}

@media screen and (max-width: 800px) {
	table th:first-child{
    width:35%;
    }

}
</style>