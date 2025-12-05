'use client'

import { useEffect, useRef } from "react"
import MonacoEditor from '@monaco-editor/react';
import {
    registerCompletion,
    type CompletionRegistration,
    type Monaco,
    type StandaloneCodeEditor
} from "monacopilot"


export default function Editor() {
    const completionRef = useRef<CompletionRegistration | null>(null);

    const handleMount = (editor: StandaloneCodeEditor, monaco: Monaco) => {
        if (completionRef.current) {
            completionRef.current.deregister();
        }

        completionRef.current = registerCompletion(monaco, editor, {
            trigger: 'onTyping',
            endpoint: '/api/code-completion',
            language: 'javascript',
        })
    }

    useEffect(() => {
        return () => {
            if (completionRef.current) {
                completionRef.current.deregister();
                completionRef.current = null;
            }
        }
    }, []);

    return (
        <MonacoEditor
            height="600px"
            language="javascript"
            onMount={handleMount}
            theme="vs-dark"
            options={{
                suggest: {
                    preview: true,
                },
                quickSuggestions: {
                    other: true,
                    comments: false,
                    strings: false
                }
            }}
        />
    )
}