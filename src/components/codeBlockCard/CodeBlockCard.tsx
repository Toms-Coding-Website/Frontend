import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICodeBlock } from "../../utils/types/types";
import DynamicButton from "../button/DynamicButton";

const CodeBlockCard = ({
  _id,
  codeBlock,
}: {
  _id: string;
  codeBlock: ICodeBlock;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const truncateText = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <Card
      key={_id}
      sx={{
        width: 300,
        height: 400,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        borderRadius: "16px",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease-in-out, transform 0.1s ease-in-out",
        "&:hover": {
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          transform: "scale(1.03)",
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ color: theme.textColors.title, fontWeight: "bold" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {codeBlock.title}
        </Typography>
        <Typography
          sx={{ color: theme.textColors.text }}
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {truncateText(codeBlock.description, 180)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <DynamicButton
          onClick={() => navigate(`/code/${codeBlock._id}`)}
          label="Start Coding"
          variant="contained"
          size="small"
        />
      </CardActions>
    </Card>
  );
};

export default CodeBlockCard;
