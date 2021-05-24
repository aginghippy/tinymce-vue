<template>
  <div class="hello">
  
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
 
    <h2>Inline Editor</h2>
    <editor :api-key="apiKey"  inline :initialValue="content"/>

  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
//const apiKey = "rso1c77gamhg1jssil5cuuob1j3zyz66ldpf94x3pxdkzhgc";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {

    Editor
  },
  mounted() {
        this.$nextTick(() => {
            
        });
  },
  data() {
        return {
          apiKey: "rso1c77gamhg1jssil5cuuob1j3zyz66ldpf94x3pxdkzhgc",
          content: `
<h2 style="text-align: center;">
  TinyMCE provides a <span style="text-decoration: underline;">full-featured</span> rich text editing experience, and a featherweight download.
</h2>
<p style="text-align: center;">
  <strong><span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span></strong>
</p>`,
            dfreeHeaderConfig : {
              selector: '.dfree-header',
              menubar: false,
              inline: true,
              theme: 'inlite',
              insert_toolbar: 'undo redo',
              selection_toolbar: 'italic underline',
            },
            dfreeBodyConfig : {
              selector: '.dfree-body',
              menubar: false,
              inline: true,
              theme: 'inlite',
              plugins: [
               /* 'autolink',
                'codesample',
                'contextmenu',
                'link',
                'linkchecker',
                'lists',
                'mediaembed',
                'powerpaste',
                'table',
                'textcolor',*/
                'image' 
              ],
              toolbar: [
                'undo redo | bold italic underline | fontselect fontsizeselect',
                'forecolor backcolor | alignleft aligncenter alignright alignfull | link unlink | numlist bullist outdent indent'
              ],
              insert_toolbar: 'quicktable image',
              selection_toolbar: 'bold italic | h2 h3 | blockquote quicklink',
              contextmenu: 'inserttable | cell row column deletetable',
              powerpaste_word_import: 'clean',
              powerpaste_html_import: 'clean'
            }
      };
  },
  created() {
        this.initComponent();
       
  },
  methods: {
        initComponent() {
          console.log(this.dfreeBodyConfig)
            
        },

    },
  watch: {
        node_data() {
           
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
