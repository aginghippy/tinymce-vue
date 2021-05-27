/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

//const getGlobal = (): any => (typeof window !== 'undefined' ? window : global);
var getGlobal = function () { return (typeof window !== 'undefined' ? window : global); };

/*const getTinymce = () => {
  const global = getGlobal();

  return global && global.tinymce ? global.tinymce : null;
}; */

var getTinymce = function () {
    var global = getGlobal();
    return global && global.tinymce ? global.tinymce : null;
};

const imageEditorConfig = {
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
}; 

const formFieldEditorConfig = {
  
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
};

const buttonFieldEditorConfig = {
  
        height: 500,
        width:600,
        menubar: false,
        fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 60pt',
        toolbar: [
            'undo redo | formatselect | bold italic| forecolor backcolor | \
             alignleft aligncenter alignright alignjustify',
            'weight | subscript superscript |fontselect | fontsizeselect font-weight |removeformat'
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
};

const  textEditorConfig = {
          forced_root_block : false,
          height: 500,
          width:700,
          menubar: false,
          fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 60pt',
          toolbar: [
              'undo redo | formatselect | bold italic strikethrough | forecolor backcolor | \
              align',
             'weight | border | subscript superscript |fontselect | fontsizeselect font-weight lineheight |removeformat'
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
              },
            
            });
            editor.ui.registry.addMenuButton('border', {
              text: 'Borders',
              fetch: function (callback) {
                var items = [
                  {
                    type: 'menuitem',
                    text: 'No Border',
                    onAction: function () {
                      let content = getTinymce().activeEditor.selection.getContent();
                   
                      editor.insertContent( '<span style ="border :none;">'  + content + '</span>' );
              
                    }
                  },
                  {
                    type: 'menuitem',
                    text: 'All Borders',
                    onAction: function () {
                      let content = getTinymce().activeEditor.selection.getContent();
                      
                       editor.insertContent( '<span style ="border :solid;">'  + content + '</span>' );
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Bottom Border',
                    onAction: function () {
                      let content = getTinymce().activeEditor.selection.getContent();
                     
                       editor.insertContent( '<span style ="border :none; border-bottom :solid">'  + content + '</span>' );
                    }
            
                  }
                ];
                callback(items);
              }
            
            });

             /* example, adding a group toolbar button */
            editor.ui.registry.addGroupToolbarButton('align', {
              icon: 'align-left',
              tooltip: 'Alignment',
              items: 'alignleft aligncenter alignright  alignjustify'
            });

        },
};

const apiKey =  "rso1c77gamhg1jssil5cuuob1j3zyz66ldpf94x3pxdkzhgc";

export { apiKey, getTinymce, imageEditorConfig,textEditorConfig,formFieldEditorConfig };