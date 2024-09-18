import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DynamicButton from "../button/DynamicButton";

const CodeBlockCard = ({
  _id,
  title,
  description,
}: {
  _id: string;
  title: string;
  description: string;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Helper function to truncate text if it exceeds a certain length
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
        height: 200,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.backgroundColors.codeBlock,
        borderRadius: "16px",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease-in-out, transform 0.1s ease-in-out",
        "&:hover": {
          boxShadow: "0 25px 40px rgba(0, 0, 0, 0.3)",
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
          {title}
        </Typography>
        <Typography
          sx={{ color: theme.textColors.text }}
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {truncateText(description, 95)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", padding: "1rem" }}>
        <DynamicButton
          onClick={() => navigate(`/code/${_id}`)}
          label="Start Coding"
          variant="contained"
          size="small"
        />
      </CardActions>
    </Card>
  );
};

export default CodeBlockCard;
