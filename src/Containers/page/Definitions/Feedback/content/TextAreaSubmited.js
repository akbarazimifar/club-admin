import React, { useEffect } from 'react'

export default function TextAreaSubmited({ children }) {
    const [response, setResponse] = React.useState("");

    useEffect(() => {
        children(response)
    }, [response]) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <textarea
            unresize="true"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
        />
    )
}
