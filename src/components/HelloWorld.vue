<template>
  <div class="optin-widget-container">

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
          <div class="email-field">
            <editor v-model= "formFieldEmail" :api-key="apiKey" :init="textEditorConfig" inline :initialValue="formFieldEmail"/>
          </div>
          <div class="">
            <editor class= "submit-button" v-model= "formButton" :api-key="apiKey" :init="textEditorConfig" inline :initialValue="formButton"/>
          </div>
        </div>
      </div>
  </div>
   
 
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import VueTinyMCE from './TinyMceVue'
import { apiKey, getTinymce, imageEditorConfig,textEditorConfig,formFieldEditorConfig } from './TinyMCE';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {

    Editor,
    VueTinyMCE
  },
  mounted() {
        this.$nextTick(() => {
          console.log(this.$el);
            
        });
  },
 

  
  data() {
        return { 
          contentContainer: `Hi`,
          contentTitle: `<span class="" style="">15% OFF</span>`,
          contentSubtitle: `<span class="" style="">YOUR PURCHASE</span>`,
          contentBody:  `<span id = 'content-body' style="text-align: center;">
                        I agree to receive recurring automated marketing text messages (e.g. cart reminders) at the phone number provided. Consent is not a condition to purchase. Msg & data rates may apply. Msg frequency varies. Reply HELP for help and STOP to cancel
                        </span>`,
          img:'<img class="img" src="https://chalakh-bot-js.s3.us-east-2.amazonaws.com/bhg/images/womans-apparel.webp" alt="">',
          formFieldEmail: '<span> Your Email Address </span>',
          formButton: '<span> Submit </span>',
          apiKey,
          imageEditorConfig,
          textEditorConfig,
          formFieldEditorConfig  
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
.email-field {
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
