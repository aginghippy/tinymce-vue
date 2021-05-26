<template>
  <div class="hello">
  
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
 
    <h2>Inline Editor</h2>
    <div class="content-title" :ref="'content-body'">
      <editor v-model= "contentTitle" :api-key="apiKey" :init="contentTitleConfig" inline :initialValue="contentTitle"/>
    </div>
    <div class="content-body" :ref="'content-body'">
      <editor v-model= "contentBody" :api-key="apiKey" :init="contentBodyConfig" inline :initialValue="contentBody"/>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { getTinymce } from './TinyMCE';
//import tinymce from 'tinymce/tinymce'
//import tinymce from '@tinymce';
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
          contentTitle: `<div class="" style="">15% OFF</div>`,
          contentBody:  `<p id = 'content-body' style="text-align: center;">
                    <strong><span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span></strong>
                  </p>`,
            /* content: `
            <h2 id = 'content-title' style="text-align: center;">
              15% OFF.
            </h2>
            <p id = 'content-body' style="text-align: center;">
              <strong><span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span></strong>
            </p>`, */
            /*dfreeHeaderConfig : {
              selector: '.dfree-header',
              menubar: false,
              inline: true,
              theme: 'inlite',
              insert_toolbar: 'undo redo',
              selection_toolbar: 'italic underline',
            }, */
            contentTitleConfig : {
                height: 500,
                width:600,
                menubar: false,
                fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 60pt',
                toolbar: [
                    'undo redo | formatselect | bold italic strikethrough | forecolor backcolor | \
                    alignleft aligncenter alignright alignjustify',
                  'weight | subscript superscript |fontselect | fontsizeselect font-weight lineheight |removeformat'
                ],

                //https://www.tiny.cloud/docs/demo/custom-toolbar-menu-button/
                setup: function (editor) {
                  /* Menu items are recreated when the menu is closed and opened, so we need
                     a variable to store the toggle menu item state. */
                  var toggleState = false;

                  /* example, adding a toolbar menu button */
                  editor.ui.registry.addMenuButton('weight', {
                    text: 'Weight',
                    fetch: function (callback) {
                      var items = [
                        {
                          type: 'menuitem',
                          text: 'Light',
                          onAction: function () {
                            let content = getTinymce().activeEditor.selection.getContent();
                            console.log(content);
                            editor.insertContent( '<span style ="font-weight :300;">'  + content + '</span>' );
                    
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Normal',
                          onAction: function () {
                            let content = getTinymce().activeEditor.selection.getContent();
                            console.log(content);
                             editor.insertContent( '<span style ="font-weight :400;">'  + content + '</span>' );
                          }
                  
                        },
                        {
                          type: 'menuitem',
                          text: 'Bold',
                          onAction: function () {
                            let content = getTinymce().activeEditor.selection.getContent();
                            console.log(content);
                             editor.insertContent( '<span style ="font-weight :500;">'  + content + '</span>' );
                          }
                  
                        },
                        {
                          type: 'menuitem',
                          text: 'Extra Bold',
                          onAction: function () {
                            let content = getTinymce().activeEditor.selection.getContent();
                            console.log(content);
                             editor.insertContent( '<span style ="font-weight :700;">'  + content + '</span>' );
                          }
                  
                        },
                        {
                          type: 'menuitem',
                          text: 'Super Bold',
                          onAction: function () {
                            let content = getTinymce().activeEditor.selection.getContent();
                            console.log(content);
                             editor.insertContent( '<span style ="font-weight :900;">'  + content + '</span>' );
                          }
                        },
                    ];
                    callback(items);
                  }
                });

              },
            },
            contentBodyConfig : {
                height: 500,
                width:600,
                menubar: false,
                fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 60pt',
                toolbar: [
                    'undo redo | formatselect | bold italic strikethrough | forecolor backcolor | \
                    alignleft aligncenter alignright alignjustify',
                  'weight | subscript superscript |fontselect | fontsizeselect font-weight lineheight |removeformat'
                ],

                //https://www.tiny.cloud/docs/demo/custom-toolbar-menu-button/
                setup: function (editor) {
                  /* Menu items are recreated when the menu is closed and opened, so we need
                     a variable to store the toggle menu item state. */
                  var toggleState = false;

                  /* example, adding a toolbar menu button */
                  editor.ui.registry.addMenuButton('weight', {
                    text: 'Weight',
                    fetch: function (callback) {
                      var items = [
                        {
                          type: 'menuitem',
                          text: 'Light',
                          onAction: function () {
                            let content = getTinymce().activeEditor.selection.getContent();
                            console.log(content);
                            editor.insertContent( '<span style ="font-weight :300;">'  + content + '</span>' );
                    
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Normal',
                          onAction: function () {
                            let content = getTinymce().activeEditor.selection.getContent();
                            console.log(content);
                             editor.insertContent( '<span style ="font-weight :400;">'  + content + '</span>' );
                          }
                  
                        },
                        {
                          type: 'menuitem',
                          text: 'Bold',
                          onAction: function () {
                            let content = getTinymce().activeEditor.selection.getContent();
                            console.log(content);
                             editor.insertContent( '<span style ="font-weight :500;">'  + content + '</span>' );
                          }
                  
                        },
                        {
                          type: 'menuitem',
                          text: 'Extra Bold',
                          onAction: function () {
                            let content = getTinymce().activeEditor.selection.getContent();
                            console.log(content);
                             editor.insertContent( '<span style ="font-weight :700;">'  + content + '</span>' );
                          }
                  
                        },
                        {
                          type: 'menuitem',
                          text: 'Super Bold',
                          onAction: function () {
                            let content = getTinymce().activeEditor.selection.getContent();
                            console.log(content);
                             editor.insertContent( '<span style ="font-weight :900;">'  + content + '</span>' );
                          }
                        },
                    ];
                    callback(items);
                  }
                });

            },
          }
      };
  },
  created() {
        this.initComponent();
       
  },
  methods: {
        initComponent() {
          //console.log(this.dfreeBodyConfig, getTinymce());

            
        },

    },
  watch: {
        content: function() 
          {
      
           // var myContent = this.Editor.activeEditor.getContent();

           let a = getTinymce(),
               b = a.util,
               c = b.JSON;
            console.log(c);

            console.log(this.contentTitle, this.contentBody);
            //let content_div = this.$refs['content-body'];
           // console.log(content_div);
            //let first_div =  document.getElementById("content-title");
            //console.log(window.getComputedStyle(first_div));
            //console.log(window.getComputedStyle(content_div));
            /**
             * pass editor content to vuex state
             * and get that in parent component (watch vuex state)
             */

            //this.$store.commit("editorContent", this.content);
          },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
.tox-tinymce-inline {
    width:600px;
    left: 100px !important;
    right: 0px !important;
    top:0px !important;
    margin-left: auto !important;
    margin-right: auto !important;
}
</style>
