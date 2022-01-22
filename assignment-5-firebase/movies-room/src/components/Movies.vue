<template>

<input v-model="input_text" class="input is-hovered" type="text" name="movie-search" placeholder="Search Movies" >

<table>
    <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Genre</th>
        <th>Add to whishlist</th>
    </tr>
    <tr v-for="movie in movies" :key="movie.id">
        <td>{{ movie.title }}</td>
        <td>{{ movie.year }}</td>
        <td>{{ movie.genre }}</td>
        <td><Button :onClick="whishClick" class_name="button fa fa-heart is-small is-white" text=""></Button></td>
    </tr>
</table>
    
</template>

<script>
import Button from "./Button"

export default {
    name: 'Movies',
    data() { 
        return {
            input_text: '',
            }
        },
    props: {
        movies: Array,
    },
    methods:{
        whishClick(){
            console.log("Whish clicked")
        }
    },
    components:{
        Button
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


@media screen and (max-width: 800px) {
	table th:first-child{
    width:35%;
    }

}

</style>