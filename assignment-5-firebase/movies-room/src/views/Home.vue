<template>
    <Navbar />
    <Movies />
</template>

<script>
import Movies from "../components/Movies"
import Navbar from "../components/Navbar"

export default {
  name: "App",
  components: {
    Movies,
    Navbar
  },

  data() {
    return {
      movies: []
    }
  },
  created() {
    this.movies = [ {
    "genre" : "Biography",
    "id" : 1,
    "title" : "127 Hours",
    "year" : 2010
  }, {
    "genre" : "Documentary",
    "id" : 2,
    "title" : "8: The Mormon Proposition",
    "year" : 2010
  }, {
    "genre" : "Action",
    "id" : 3,
    "title" : "The A-Team",
    "year" : 2010
  }, {
    "genre" : "Comedy",
    "id" : 4,
    "title" : "A Little Help",
    "year" : 2010
  }, {
    "genre" : "Comedy",
    "id" : 5,
    "title" : "Adventures of Power",
    "year" : 2010
  }, {
    "genre" : "Family",
    "id" : 6,
    "title" : "Alice in Wonderland",
    "year" : 2010
  }, {
    "genre" : "Mystery",
    "id" : 7,
    "title" : "All Good Things",
    "year" : 2010
  }, {
    "genre" : "Fantasy",
    "id" : 8,
    "title" : "All My Friends Are Funeral Singers",
    "year" : 2010
  }, {
    "genre" : "Animated",
    "id" : 9,
    "title" : "Alpha and Omega",
    "year" : 2010
  }, {
    "genre" : "Drama",
    "id" : 10,
    "title" : "The American",
    "year" : 2010
  }, {
    "genre" : "Romance",
    "id" : 11,
    "title" : "The Back-up Plan",
    "year" : 2010
  }, {
    "genre" : "Comedy",
    "id" : 12,
    "title" : "Barry Munday",
    "year" : 2010
  }, {
    "genre" : "Comedy",
    "id" : 13,
    "title" : "BearCity",
    "year" : 2010
  }, {
    "genre" : "Comedy",
    "id" : 14,
    "title" : "Big Money Rustlas",
    "year" : 2010
  }, {
    "genre" : "Thriller",
    "id" : 15,
    "title" : "Black Swan",
    "year" : 2010
  }, {
    "genre" : "Romance",
    "id" : 16,
    "title" : "Blue Valentine",
    "year" : 2010
  }, {
    "genre" : "Action",
    "id" : 17,
    "title" : "The Book of Eli",
    "year" : 2010
  }, {
    "genre" : "Documentary",
    "id" : 18,
    "title" : "Bouncing Cats",
    "year" : 2010
  }, {
    "genre" : "Action",
    "id" : 19,
    "title" : "The Bounty Hunter",
    "year" : 2010
  }, {
    "genre" : "Crime",
    "id" : 20,
    "title" : "Brooklyn's Finest",
    "year" : 2010
  }, {
    "genre" : "Documentary",
    "id" : 21,
    "title" : "Brutal Beauty: Tales of the Rose City Rollers",
    "year" : 2010
  }, {
    "genre" : "Thriller",
    "id" : 22,
    "title" : "Buried",
    "year" : 2010
  }, {
    "genre" : "Musical",
    "id" : 23,
    "title" : "Burlesque",
    "year" : 2010
  }, {
    "genre" : "Horror",
    "id" : 24,
    "title" : "Case 39",
    "year" : 2010
  }, {
    "genre" : "Political",
    "id" : 25,
    "title" : "Casino Jack",
    "year" : 2010
  }, {
    "genre" : "Documentary",
    "id" : 26,
    "title" : "Casino Jack and the United States of Money",
    "year" : 2010
  }, {
    "genre" : "Family",
    "id" : 27,
    "title" : "Cats & Dogs: The Revenge of Kitty Galore",
    "year" : 2010
  }, {
    "genre" : "Romance",
    "id" : 28,
    "title" : "Charlie St. Cloud",
    "year" : 2010
  }, {
    "genre" : "Family",
    "id" : 29,
    "title" : "The Chronicles of Narnia: The Voyage of the Dawn Treader",
    "year" : 2010
  }, {
    "genre" : "Comedy",
    "id" : 30,
    "title" : "City Island",
    "year" : 2010
  }, {
    "genre" : "Action",
    "id" : 31,
    "title" : "Clash of the Titans",
    "year" : 2010
  }, {
    "genre" : "Documentary",
    "id" : 32,
    "title" : "Client 9: The Rise and Fall of Eliot Spitzer",
    "year" : 2010
  }, {
    "genre" : "Drama",
    "id" : 33,
    "title" : "The Company Men",
    "year" : 2010
  },
      
    ] 
  }
};
</script>
