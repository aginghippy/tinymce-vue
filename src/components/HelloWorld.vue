<template>
  <div class="optin-widget-container">
       <v-card
        border="top"
        color="red lighten-2"
        dark
      >
        I'm an alert with a top border and red color
      </v-card>

      <div class="img-container">
        <editor v-model= "img" :api-key="apiKey" :init="imageEditorConfig" inline :initialValue="img" />  
      </div>

      
      <div class="body-container">
        <div class="content-title">
            <editor v-model= "contentTitle" :api-key="apiKey" :init="textEditorConfig" inline :initialValue="contentTitle"/>
        </div>
        <div class="content-subtitle">
            <editor v-model= "contentSubtitle" :api-key="apiKey" :init="textEditorConfig" inline :initialValue="contentSubtitle"/>
        </div>
        <div class="content-body">
            <editor v-model= "contentBody" :api-key="apiKey" :init="textEditorConfig" inline :initialValue="contentBody"/>
        </div>
        <div class="form-container">
          <input class="input-field" type="email" placeholder="Your Email Address" value="" name="emailAddress" required="">
          <input class="submit-button" type="submit" value="Download" data-next-node="nextNodeInTheme">
        </div>
      </div>
  </div>
   
 
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import VueTinyMCE from './TinyMceVue'
import { getTinymce } from './TinyMCE';
import { VCard} from 'vuetify/lib'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {

    Editor,
    VueTinyMCE,
    VCard
  },
  mounted() {
        this.$nextTick(() => {
          console.log(this.$el);
            
        });
  },
  directives: {
    bindtinymce: {
      // directive definition
      bind: function (el) {
        console.log(getTinymce());
        if (getTinymce() != null) {
          console.log('init');
             getTinymce().init(textEditorConfig)

        }
     
      }
    }
  },

  
  data() {
        return {
          apiKey: "rso1c77gamhg1jssil5cuuob1j3zyz66ldpf94x3pxdkzhgc",
          contentContainer: `Hi`,
          contentTitle: `<span class="" style="">15% OFF</span>`,
          contentSubtitle: `<div class="" style="">YOUR PURCHASE</div>`,
          contentBody:  `<p id = 'content-body' style="text-align: center;">
                        I agree to receive recurring automated marketing text messages (e.g. cart reminders) at the phone number provided. Consent is not a condition to purchase. Msg & data rates may apply. Msg frequency varies. Reply HELP for help and STOP to cancel
                        </p>`,
          img:'<img class="img" src="https://chalakh-bot-js.s3.us-east-2.amazonaws.com/bhg/images/womans-apparel.webp" alt="">',
          imageEditorConfig : {
            force_p_newlines : true,
              menubar: false, // to hide the file menu ()
              toolbar:false, // to hide the default toolbar
              resize_img_proportional: false, // so original aspect ratio is not maintained
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
                  console.log(e);
                  console.log('Content image to:  ' + editor.getContent());
                });
              },
              plugins: [
              'image imagetools'
              ],
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img {max-width: 100%}'
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
                forced_root_block : false,
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
.optin-widget-container {
  width: 600px;
  display: flex;
  justify-content: center;
  margin: auto;
}
.img-container {
 /* flex: 1 1 50%; */
    
  }
.img {
    /*width: 100%;
    height: 100%; */
}
.body-container {
  flex:  1 1 50%; 
  padding-left: 0.5rem;

}

.content-title {
  font-size: 3.7rem;
  padding-top: 4rem;
  font-weight: 600;
  color: black;
  text-align: center;
  align-self: center;
 
}
.content-subtitle {
  padding-top: 2rem;
  text-transform: uppercase;
  font-size: 1.5rem;
  padding-bottom: 2rem;
    
 }
.content-body {
  color: #212529;
  text-align: center;
  font-size: 11px;
  line-height: 13px;

}
.form-container {
  display: flex;
  flex-direction: column;
      align-items: center;
}
.input-field {
  border: none;
  border-bottom: 1px solid;
  border-color: #9c9999;
  text-align: center;
  padding: .375rem .75rem;
  line-height: 1.5;
  background-color: #fff;

}
.submit-button {
  margin-top: 1.5rem;
  min-height: 2.5rem;
  width: 70%;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  box-shadow: 0 1px 4px rgb(57 73 76 / 35%);
  margin-bottom: 0;
  background-color: white;
  color: black;
  border-radius: 20px;
  font-size: 1.0rem;
  font-weight: 500;
  border: 1px solid blue;

}

.content-container {
  max-width:400px;
  height:400px;
  min-height: 400px;
  background-color:blue;
}
</style>
