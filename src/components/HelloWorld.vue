<template>
  <div class="optin-widget-container">

      <background-color :value="colors" @input="updateBackgroundColor" v-if="displayBGColorPicker" />

      <div class="img-container">
        <editor v-model= "img" :api-key="apiKey" :init="imageEditorConfig" inline :initialValue="img" />  
      </div>

      
      <div class="body-container" @click = "showOrHideBGColorPicker($event)">
        <div class="content-title"  >
            <editor :ref="'content-title'" class= "edit-content-title editor" v-model= "contentTitle" :api-key="apiKey" :init="textEditorConfig" inline :initialValue="contentTitle"/>
        </div>
        <div class="content-subtitle">
            <editor :ref="'content-subtitle'" class= 'edit-content-subtitle editor' v-model= "contentSubtitle" :api-key="apiKey" :init="textEditorConfig" inline :initialValue="contentSubtitle"/>
        </div>
        <div class="content-body">
            <editor :ref="'content-body'" class= "edit-content-body editor" v-model= "contentBody" :api-key="apiKey" :init="textEditorConfig" inline :initialValue="contentBody"/>
        </div>
        <div class="email-field" >
            <editor :ref="'email-field'" class= "edit-email-field editor" v-model= "formFieldEmail" :api-key="apiKey" :init="textEditorConfig" inline :initialValue="formFieldEmail"/>
        </div>       
        <div class="form-button">
            <editor :ref="'form-button'" class= "edit-form-button editor" v-model= "formButton" :api-key="apiKey" inline :init="textEditorConfig" :initialValue="formButton"/>
        </div>
      
      </div>

      <div class="field add-media-button">
          <a href="" class="button -add-audio-video-message"  @click.prevent="saveChanges()">Save Changes</a>
      </div>
  </div>
   
 
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import {Sketch} from 'vue-color'
import VueTinyMCE from './TinyMceVue'
import TinyEditor from './tinyEditor'
import { apiKey, getTinymce, imageEditorConfig,textEditorConfig,formFieldEditorConfig } from './TinyMCE';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {

    Editor,
    VueTinyMCE,
    TinyEditor,
   'background-color': Sketch
  },
  mounted() {
        this.$nextTick(() => {
          console.log(this.$el);
            
        });
  },
 

  
  data() {
        return { 
          displayBGColorPicker:false,
          colors:'black',
          contentContainer: `Hi`,
          contentTitle: `<span class="edit-content-title" style="">15% OFF</span>`,
          contentSubtitle: `<span class="edit-content-subtitle" style="">YOUR PURCHASE</span>`,
          contentBody:  `<span class = 'edit-content-body' style="text-align: center;">
                        I agree to receive recurring automated marketing text messages (e.g. cart reminders) at the phone number provided. Consent is not a condition to purchase. Msg & data rates may apply. Msg frequency varies. Reply HELP for help and STOP to cancel
                        </span>`,
          img:'<img class="img" src="https://chalakh-bot-js.s3.us-east-2.amazonaws.com/bhg/images/womans-apparel.webp" alt="">',
          formFieldEmail: '<span class= "edit-email-field"> Your Email Address </span>',
          formButton: '<span class= "edit-form-button"> Submit </span>',
          apiKey,
          imageEditorConfig,
          textEditorConfig,
          formFieldEditorConfig, 
          updatedContent:this.value,

          
      };
  },
  created() {
        this.initComponent();
       
  },
  computed: {
     
        edited_content_title() {
          return this.$refs['content-title'].value;  
        },
        edited_content_subtitle() {
          return this.$refs['content-subtitle'].value;  
        },
        edited_content_body() {
          return this.$refs['content-body'].value;  
        },
        edited_email_field() {
          return this.$refs['email-field'].value;  
        },
        edited_form_button() {
          return this.$refs['form-button'].value;  
        },
        
    },
  methods: {
        initComponent() {
          //console.log(this.dfreeBodyConfig, getTinymce());    
        },
        // target is element user clicked on
        // currentTarget is element the event handler is attached
        showOrHideBGColorPicker($event) {
          this.displayBGColorPicker = true;
          let targetClassName = $event.target.className;
         // console.log($event.target);
          const classNames = ['edit-content-title', 'edit-content-subtitle', 'edit-content-body', 'body-container','edit-email-field', 'edit-form-button'];
          const className = classNames.find(v => targetClassName.includes(v));
          //console.log(className, targetClassName);
          switch(className) {
              case 'edit-content-title': 
              case 'edit-content-subtitle':
              case 'edit-content-body': break;
              case 'body-container': 
              
              case 'edit-email-field':
              case 'edit-form-button':
                 
                  break;
          }
         // $event.target.style.backgroundColor = 'red';

        },
        updateBackgroundColor(color) {
          console.log(color);
            this.colors = color;
            if(color.rgba.a == 1) {
                this.colorValue = color.hex;
            }
            else {
                this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
            }
        },
        saveChanges() {
          console.log(this.edited_form_button);
        }

    },
  watch: {
        img : function() {
         
          console.log(this.img);

        },
        contentTitle: function() 
          {
            // var myContent = this.Editor.activeEditor.getContent();

            console.log(this.contentTitle);
          },
          contentSubtitle: function() 
          {
            console.log(this.contentSubtitle);
           
          },
          contentBody: function() 
          {

            console.log(this.contentBody);
           
          },
          formFieldEmail: function() 
          {

            console.log(this.formFieldEmail);
           
          },
          formButton: function() 
          {

            console.log(this.formButton);
           
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
    width:700px;
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
  margin-top: 4rem;
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
span.edit-email-field {
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .375rem .75rem;
  line-height: 1.5;
  cursor: pointer;
  border: none;
  border-bottom: 1px solid #9c9999;
  text-align: center;
  background-color: #fff;
  margin: auto;
  width: 60%;

}
span.edit-form-button {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 1.0rem;
  width: 60%;
  height: 40px;
  box-shadow: 0 1px 4px rgb(57 73 76 / 35%);
  margin-bottom: 0;
  background-color: white;
  color: black;
  border-radius: 12px;
  font-size: 1.0rem;
  font-weight: 500;
  border: 1px solid #cccccc;

}
.editor:hover {
  border: 1px solid #cccccc;
  background-color: bisque;
}


</style>
