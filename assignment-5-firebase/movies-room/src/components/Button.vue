<template>
    <button :class="class_name" @click="onClick">
    {{text}}
    </button>
</template>

<script>
export default {
    props: {
        onClick: {
            type: Function,
            required: true
        },
        class_name:{
            type: String,
            required:true
        },
        text:String,
        source: String
    }
}
</script>

<style scoped>
button{
    margin: 0 5px 0 5px;
    
}
</style>