<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <editor
       api-key="rso1c77gamhg1jssil5cuuob1j3zyz66ldpf94x3pxdkzhgc"
       :init="{
         height: 500,
         menubar: false,
         /*plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ], 
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help' */
           toolbar:
           'undo redo | formatselect | bold italic strikethrough | forecolor backcolor | \
           alignleft aligncenter alignright alignjustify  \
           | subscript superscript |fontselect | fontsizeselect lineheight |removeformat'
       }"
     />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Editor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
