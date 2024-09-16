import CodeEditor from "../../components/codeEditor/codeEditor";
import { useState, ChangeEvent, useEffect } from "react";

/*
Page Requirements:
- No Authentication Required
- First user to log in is assigned as the host(Mentor Tom).
- Second user to log in is assigned as the student.
- Only second user is able to edit the code, The mentor is in readonly mode.

Page Design:
- Navbar(Header)
- Code block editor
- Submit button
- Footer
 */

const CodePage = () => {
  const handleCodeSubmit = (code: string) => {
    // Implement your code validation logic here
    console.log("Submitted code:", code);
    // Example: You might want to send the code to a server or validate it on the client-side
  };

  return (
    <div>
      <h1>Code Editor</h1>
      <CodeEditor onSubmit={handleCodeSubmit} />
    </div>
  );
};

export default CodePage;
