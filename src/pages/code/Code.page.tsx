// src/pages/code/Code.page.tsx
import CodeEditor from "../../components/codeEditor/CodeEditor";
import { Typography, useTheme } from "@mui/material";
import PageContainer from "../../components/pageContainer/PageContainer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICodeBlock } from "../../utils/types/types";
import axios from "axios";
import { codeBlockLink } from "../../utils/constants/backendLinks";

/*
Page Requirements:
- No Authentication Required
- First user to log in is assigned as the host (Mentor Tom).
- Second user to log in is assigned as the student.
- Only second user is able to edit the code, The mentor is in readonly mode.

Page Design Missing:
- Footer
 */

const CodePage = () => {
  const theme = useTheme();
  const { codeBlockId } = useParams();
  const [codeBlock, setCodeBlock] = useState<ICodeBlock>();

  useEffect(() => {
    const fetchCodeBlock = async () => {
      const response = await axios.get(`${codeBlockLink}` + codeBlockId);
      setCodeBlock(response.data);
    };
    fetchCodeBlock();
  }, []);

  const handleCodeSubmit = (code: string) => {
    //TODO - Complete Submit check with backend API
    console.log("Submitted code:", code);
  };

  return (
    codeBlock && (
      <PageContainer>
        <Typography
          sx={{
            color: theme.textColors.title,
            marginBottom: theme.spacing(2),
            textAlign: "center",
            fontWeight: 700,
            fontSize: { xs: "1.3rem", sm: "1.75rem", md: "2rem", lg: "2.3rem" },
          }}
        >
          Assignment Title
        </Typography>
        <CodeEditor onSubmit={handleCodeSubmit} codeBlock={codeBlock} />
      </PageContainer>
    )
  );
};

export default CodePage;
