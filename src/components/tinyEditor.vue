<template>
    <editor
            :api-key='apiKey'
            :init="textEditorConfig"
            v-model="content"
            v-on:change="this.update"
            :initialValue="initialValue"
            inline>         
    </editor>
</template>
<script>

   // import tinyConfig from "./tinyConfig";
    import { apiKey, textEditorConfig } from './tinyConfig';
    export default {
        name: 'tiny-editor',
        components: {
            editor: () => import(/* webpackChunkName: "tinymce" */ "@tinymce/tinymce-vue"),
        },
        computed: {
            /*getTinyConfig: function () {
                console.log(this.content);
                return tinyConfig.getConfig(this.type);
            },
            getTinyKey: function () {

                return tinyConfig.getAPIKey();
            }*/
        },
        data: function () {
            console.log(this.value);
            return {
                content: this.value, // default to the passed value
                editor: false,
                apiKey,
                textEditorConfig,
                isTyping : false
                
            }
        },
        props: {
            value: {
                default: ''
            },
            readonly: {
                type: Boolean,
                required: false,
                default: false
            },
            type: {
                type: [Boolean, String],
                default: false
            },
            initialValue: {
               required: true,
            },

        },
        methods: {
            loaded: function (event, editor) {
              
            },
            update: function () {
                // pass updated content back to the parent
                console.log(this.content);
                this.$emit('input', this.content);
            }
        },
        watch: {
          content : function() {   
            console.log(this.content);
          },
          value : function (newValue){
            console.log('test');
                if(!this.isTyping){
                    if(this.editor !== null) {
                      console.log('setting value')
                        this.editor.setContent(newValue);
                    }
                    else {
                        console.log('editor null')
                        this.content = newValue;
                      }
                }
          },
        }
    }
    
</script>
