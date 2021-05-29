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
      inline:true,
      menubar: false, // to hide the file menu ()
      toolbar:false, // to hide the default toolbar
      resize_img_proportional: false, // so original aspect ratio is not maintained and can be aletred
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
          inline:true,
          height: 500,
          width:700,
          menubar: false,
          entity_encoding : "raw",
          fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 60pt',
          plugins: 'casechange',
          toolbar: [
              'undo redo | formatselect | italic strikethrough weight casechange | forecolor backcolor | height width |\
              align',
             ' border border-radius | subscript superscript |fontselect | fontsizeselect font-weight lineheight |removeformat'
          ],
          init_instance_callback: function (editor) {
            editor.on('SetContent', function (e) {
             
              console.log(e.content);

            });
          }, 

          //https://www.tiny.cloud/docs/demo/custom-toolbar-menu-button/
          setup: function (editor) {
            /* Menu items are recreated when the menu is closed and opened, so we need
               a variable to store the toggle menu item state. */
            var toggleState = false;

            /* example, adding a toolbar menu button */
            editor.ui.registry.addMenuButton('weight', {
              icon: 'bold',
              fetch: function (callback) {
                var processFontWeight = function (fontWeight) {
                   let el = getTinymce().activeEditor.selection.getNode(); // will return the span
                   el.style.fontWeight = fontWeight;
                };
                var items = [
                  {
                    type: 'menuitem',
                    text: 'Light',
                    onAction: function () { 
                      processFontWeight("300");   
                    }
                  },
                  {
                    type: 'menuitem',
                    text: 'Normal',
                    onAction: function () {
                      processFontWeight("400");
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Bold',
                    onAction: function () {
                      processFontWeight("700");
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Extra Bold',
                    onAction: function () {
                      processFontWeight("800");
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Super Bold',
                    onAction: function () {
                      processFontWeight("900");
                    }
                  },
                ];
                callback(items);
              },   
            });

            editor.ui.registry.addMenuButton('border', {
              text: 'Border',
              
              fetch: function (callback) {
              
                var processBorder = function (border) {
                  let el = getTinymce().activeEditor.selection.getNode(); // will return the span
                  
                  switch(border.type) {
                    case 'all':     el.style.borderWidth = border.width; 
                                    el.style.borderStyle = border.style;
                                    el.style.borderColor = border.color;
                                   
                                    break;
                    case 'bottom':  el.style.borderWidth ='0px';
                                    el.style.borderBottomWidth = border.width; 
                                    el.style.borderBottomStyle = border.style;
                                    el.style.borderBottomColor = border.color;

                                    break;
                  }  
                };
                var items = [
                  {
                    type: 'menuitem',
                    text: 'No Border',
                    onAction: function () {
                      processBorder({"type": 'all', "width": "0px", "style": 'solid', "color": "#cccccc;"});
                    }
                  },
                  {
                    type: 'menuitem',
                    text: 'All Borders',
                    onAction: function () {
                      processBorder({"type": 'all', "width": "1px", "style": 'solid', "color": "#cccccc;"});
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Bottom Border',
                    onAction: function () {
                      processBorder({"type": 'bottom', "width": "1px", "style": 'solid', "color": "#cccccc;"});
                    }
            
                  }
                ];
                callback(items);
              }        
            });
            
            editor.ui.registry.addMenuButton('border-radius', {
              text: 'Border Radius',
             
              fetch: function (callback) {
                var processBorderRadius = function (borderRadius) {
                  let el = getTinymce().activeEditor.selection.getNode(); // will return the span
                  el.style.borderRadius = borderRadius;

                  /* technique to get need the entire html of the node - innerHTML does not provide that, 
                  creates duplicate styling and content node so add a container on the fly

                  let container = document.createElement('div');
                      container.appendChild(el.cloneNode(true)); // clone of the selected node  
                  console.log(container.innerHTML);
                  getTinymce().activeEditor.selection.setContent(container.innerHTML); */
     
                
                };
                var items = [
                  {
                    type: 'menuitem',
                    text: 'None',
                    onAction: function () {
                      //processBorderRadius("border-radius:none;");
                      processBorderRadius("0px");
                    }
                  },
                  {
                    type: 'menuitem',
                    text: 'Normal',
                    onAction: function () {
                      //processBorderRadius("border-radius:8px;");
                      processBorderRadius("8px");
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Very Round',
                    onAction: function () {
                      processBorderRadius("16px");
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Extremely Round',
                    onAction: function () {
                      processBorderRadius("50px");
                    }
            
                  }
                ];
                callback(items);
              }        
            });

            editor.ui.registry.addMenuButton('height', {
              text: 'Height',
              fetch: function (callback) {
            
                var processHeight = function (height) {
                   let el = getTinymce().activeEditor.selection.getNode(); // will return the span
                   el.style.height = height;
                };
                var items = [
                  {
                    type: 'menuitem',
                    text: 'Very Short',
                    onAction: function () {
                      processHeight("25px");
                    }
                  },
                  {
                    type: 'menuitem',
                    text: 'Short',
                    onAction: function () {
                      processHeight("30px");
                    }
                  },
                  {
                    type: 'menuitem',
                    text: 'Normal',
                    onAction: function () {
                      processHeight("35px");
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Tall',
                    onAction: function () {
                      processHeight("40px");
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Very Tall',
                    onAction: function () {
                      processHeight("45px");
                    }
            
                  }
                ];
                callback(items);
              }        
            });

            editor.ui.registry.addMenuButton('width', {
              text: 'Width',
              fetch: function (callback) {
              
                var processWidth = function (width) {
                  let el = getTinymce().activeEditor.selection.getNode(); // will return the span
                  el.style.width = width;
                };
                var items = [
                  {
                    type: 'menuitem',
                    text: 'Very Narrow',
                    onAction: function () {
                      processWidth("45%");
                    }
                  },
                  {
                    type: 'menuitem',
                    text: 'Narrow',
                    onAction: function () {
                      processWidth("55%");
                    }
                  },
                  {
                    type: 'menuitem',
                    text: 'Normal',
                    onAction: function () {
                      processWidth("60%");
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Wide',
                    onAction: function () {
                      processWidth("65%");
                    }
            
                  },
                  {
                    type: 'menuitem',
                    text: 'Very Wide',
                    onAction: function () {
                      processWidth("75%");
                    }
            
                  },
                ];
                callback(items);
              }        
            });
             /* example, adding a group toolbar button */
            editor.ui.registry.addGroupToolbarButton('align', {
              icon: 'align-left',
              tooltip: 'Alignment',
              items: 'alignleft aligncenter alignright alignjustify'
            });

        },
};

const apiKey =  "rso1c77gamhg1jssil5cuuob1j3zyz66ldpf94x3pxdkzhgc";

export { apiKey, getTinymce, imageEditorConfig,textEditorConfig,formFieldEditorConfig };