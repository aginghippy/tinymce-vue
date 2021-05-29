<template>
  <div class="tinymce-component">
     <editor :api-key="apiKey" :init="imageEditorConfig" :initialValue="value" />
  </div>
   
 
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { getTinymce } from './TinyMCE';

export default {
  name: 'TinyMCE',
  props: {
    value: {
        required: true,
    }
  },
  computed: {
       
        el() {
            return this.el;
        },
      
  },
  components: {

    Editor
  },
  mounted() {
        this.$nextTick(() => {
          console.log(this.$el);
            
        });
  },
  data() {
        return {
          apiKey: "rso1c77gamhg1jssil5cuuob1j3zyz66ldpf94x3pxdkzhgc",
          contentContainer: `Hi`,
          contentTitle: `<div class="" style="">15% OFF</div>`,
          contentSubtitle: `<div class="" style="">YOUR PURCHASE</div>`,
          contentBody:  `<p id = 'content-body' style="text-align: center;">
                        I agree to receive recurring automated marketing text messages (e.g. cart reminders) at the phone number provided. Consent is not a condition to purchase. Msg & data rates may apply. Msg frequency varies. Reply HELP for help and STOP to cancel
                        </p>`,
          img:'<img class="img" src="https://chalakh-bot-js.s3.us-east-2.amazonaws.com/bhg/images/womans-apparel.webp" alt="">',
          imageEditorConfig : {
              target:this.el,
              menubar: false, // to hide the file menu ()
              toolbar:false, // to hide the default toolbar
              /* enable title field in the Image dialog*/
              image_title: true,
              /* enable automatic uploads of images represented by blob or data URIs*/
              automatic_uploads: true,
              file_picker_types: 'image',
              /* and here's our custom image picker*/
              file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function () {
                  var file = this.files[0];

                  var reader = new FileReader();
                  reader.onload = function () {
                    /*
                      Note: Now we need to register the blob in TinyMCEs image blob
                      registry. In the next release this part hopefully won't be
                      necessary, as we are looking to handle it internally.
                    */
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                  };
                  reader.readAsDataURL(file);
                };
                input.click();
              },
              setup: function (editor) {
                editor.on('change', function (e) {
                  console.log('change event fired');
                  console.log(e);
                  console.log('Content changed to:  ' + editor.getContent());
                });
              },
              plugins: [
              'image imagetools'
              ],
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          },
          formFieldEditorConfig : {
  
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
          textEditorConfig : {
     
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
        img : function() {
         
          console.log(this.img);

        },
        contentTitle: function() 
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
<style "scoped">

</style>
