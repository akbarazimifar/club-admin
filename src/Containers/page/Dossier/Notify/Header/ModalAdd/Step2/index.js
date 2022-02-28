import React from 'react'
import TextEditorQuill from '../../../../../../Common/Components/TextEditorQuill';
import { Box } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


export default function Index({ status, content, setContent }) {

    const handelChange = (value, type) => {
        setContent(prev => ({
            ...prev,
            [type]: value
        }))
    }

    return (
        <div>
            {
                status !== 'sms' && (
                    <Box width={'100%'} height={370}>
                        <TextEditorQuill answerDataEdit={content.html}>
                            {data => handelChange(data, 'html')}
                        </TextEditorQuill>
                    </Box>
                )
            }
            {
                status === 'sms' && (
                    <Box width={'100%'} height={370}>
                        <TextareaAutosize
                            style={{ width: '100%', minHeight: 300, resize: 'none' }}
                            rowsMax={4}
                            aria-label="maximum height"
                            placeholder="متن خود را وارد نمایید"
                            value={content.text}
                            onChange={(event) => handelChange(event.target.value, 'text')}
                        />
                    </Box>
                )
            }
        </div>
    )
}
