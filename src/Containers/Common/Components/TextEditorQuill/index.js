
import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as Editor from "ckeditor5-build-classic-base64-upload-adapter";

const CkEditor = ({ children, answerDataEdit }) => {
    const [state, setState] = useState(answerDataEdit ? answerDataEdit : "");

    useEffect(() => {
        children(state);
    }, [state])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        setState(answerDataEdit)
    },[answerDataEdit])

    return (
        <div className="App"
            style={{ height: "90%", overflow: "auto", zIndex: 10000 }}
        >
            <CKEditor
                style={{ height: "100%" }}
                editor={Editor}
                id={'editor'}
                data={state}
                // onReady={editor => {
                //     // You can store the "editor" and use when it is needed.
                //     console.log('Editor is ready to use!', editor);
                // }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setState(data)
                }}
                // onBlur={(event, editor) => {
                //     console.log('Blur.', editor);
                // }}
                // onFocus={(event, editor) => {
                //     console.log('Focus.', editor);
                // }}
                config={{
                    language: 'fa',
                }}
            />
        </div>
    );
}

export default CkEditor;



// import React, { useState, useEffect, useRef } from 'react';

// import SunEditor from "suneditor-react";
// import 'suneditor/dist/css/suneditor.min.css';




// export default function Index({ children, answerDataEdit }) {

//     const [state, setState] = useState(answerDataEdit ? answerDataEdit : "");
//     const editorRef = useRef();

//     useEffect(() => {
//         children(state);
//         // console.log(state);
//     }, [state])//eslint-disable-line react-hooks/exhaustive-deps

//     function handleCopy(e, clipboardData){
//         console.log(e, clipboardData)
//     }

//     return (
//         <>

//             <SunEditor
//                 onCopy={handleCopy} 
//                 ref={editorRef}
//                 setDefaultStyle='text-align:right'
//                 setContents={state}
//                 setOptions={{
//                     buttonList: [
//                         ['undo', 'redo'],
//                         ['font', 'fontSize', 'formatBlock'],
//                         ['paragraphStyle', 'blockquote'],
//                         ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
//                         ['fontColor', 'hiliteColor', 'textStyle'],
//                         ['removeFormat'],
//                         '/', // Line break
//                         ['outdent', 'indent'],
//                         ['align', 'horizontalRule', 'list', 'lineHeight'],
//                         ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
//                         /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
//                         ['showBlocks', 'codeView'],//'fullScreen',
//                         ['preview', 'print'],
//                         ['save', 'template']
//                     ]
//                 }
//                 }
//                 onChange={data => setState(data)}

//             />

//         </>
//     )
// }
