// src/components/CodeEditor.tsx
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  onSubmit: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onSubmit }) => {
  const [code, setCode] = useState<string>("");

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleSubmit = () => {
    onSubmit(code);
  };

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
        onChange={handleEditorChange}
      />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit
      </button>
    </div>
  );
};

export default CodeEditor;
