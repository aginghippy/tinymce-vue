<template>
    <editor
            :api-key='apiKey'
            :init="textEditorConfig"
            v-model="content"
            :initialValue="initialValue"
            inline>         
    </editor>
</template>
<script>

    import { apiKey, textEditorConfig } from './tinyConfig';
    export default {
        name: 'tiny-editor',
        components: {
            editor: () => import("@tinymce/tinymce-vue"),
        },
        computed: {
        },
        data: function () {
            return {
                content: this.value, // default to the passed value
                editor: false,
                apiKey,
                textEditorConfig,
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
                type: String,
                default: ''
            },
            initialValue: {
               required: true,
            },

        },
        methods: {
            loaded: function (event, editor) {
              
            },
            update: function () {
            }
        },
        watch: {
          content : function() {   
            console.log(this.content);
          },
          value : function (newValue){
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
