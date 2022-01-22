<template>
    <nav class="navbar">
        <div id=first>
            <img src='../assets/logo.png' @click="iconClick">
        </div>
        <div class="series-button">
            <!--Button User-->
            <button class="button" @click="userClick">
                <span class="icon">
                    <i class="fab fa fa-user"></i>
                </span>
                <span>{{userName}}</span>
            </button>

            <!--Button Whish List-->
            <button class="button fa fa-heart" @click="whishClick"></button>

            <!--Button Log-out-->
            <button class="button is-danger" @click="logoutClick">
                <span class="icon">
                    <i class="fab fa fa-sign-out"></i>
                </span>
                <span>Log Out</span>
            </button>
        </div>
    
    </nav>
</template>

<script>


export default {
    name: 'Navbar',
    data() { 
        let user = JSON.parse(sessionStorage.getItem('user'));
        return {
            userName: user.displayName,
            }
        },
    components:{
    },
    props: {        
    },
    methods: {
        iconClick() {
            console.log('Icon clicked')
            this.$router.push("/")
        },
        userClick(){
            console.log('User clicked')
            this.$router.push("")
            
        },
        whishClick(){
            console.log('Whish clicked')
            this.$router.push("whish")
        },
        logoutClick(){
            console.log('LogOut clicked')
            //remove information ov the user
            sessionStorage.clear()
            this.$router.push("login")
        }
    }
}
</script>

<style scoped>
img{
    max-width: 50px;
    margin: 10px 0 10px 10px;
    border-radius: 50%;
}
nav #first{
    width: 30%;
    display: flex;
}
.series-button{
    margin-right: 5px;
}
nav{
    display: flex;
    max-width: 100%;
    margin: 0 auto 1% auto;
    background-color: black;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
}

button{
    margin: 0 2px;
}

@media screen and (max-width: 800px) {
	nav{
		max-width:100%;
	}
}
</style>
