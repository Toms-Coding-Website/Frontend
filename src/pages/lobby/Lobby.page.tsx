import { useEffect, useState } from "react";
import { ICodeBlock } from "../../utils/types/types";
import PageContainer from "../../components/pageContainer/PageContainer";
import axios from "axios";
import { codeBlockLink } from "../../utils/constants/backendLinks";
import { Box, styled, Grid, Typography, useTheme } from "@mui/material";
import CodeBlockCard from "../../components/codeBlockCard/CodeBlockCard";

/*
Page Requirements:
- No Authentication Required

Page Design:
- Title: "Choose code block"
- A list of items (cards) each representing a coding task
    for example: "Async case", "Promise case", etc...
- Footer
*/

const FlexedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

const TransitionGridItem = styled(Grid)(() => ({
  transition: "all 0.4s ease-in-out",
}));

const LobbyPage = () => {
  const theme = useTheme();

  const [codeBlocks, setCodeBlocks] = useState<ICodeBlock[]>([]);

  //TODO - Temp data for testing, later codeblocks will come from DB.
  const tempCodeBlocksData: ICodeBlock[] = [
    {
      _id: "1",
      title: "Async Function",
      description:
        "Write an async function that fetches data from an API and logs the result.",
      hint: `
        // API to fetch from is : https://jsonplaceholder.typicode.com/todos/1
        const fetchData = () => {
          // Your fetch logic goes here (delete this line)
        }
        
        fetchData();
      `,
      solution: `
        // API to fetch from is : https://jsonplaceholder.typicode.com/todos/1
        const fetchData = () => {
          try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }

        fetchData();
      `,
    },
    {
      _id: "2",
      title: "Promise",
      description:
        "Create a simple promise that resolves after 2 seconds and logs a message.",
      hint: `
        // message the promise should log: Promise resolved after 2 seconds
        const myPromise = new Promise((resolve, reject) => {
          // Your promise logic goes here (delete this line)
        }
      `,
      solution: `
        const myPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('Promise resolved after 2 seconds');
          }, 2000);
        });
        
        myPromise.then((message) => {
          console.log(message);
        });
      `,
    },
    {
      _id: "3",
      title: "Array Map",
      description:
        "Use the array `map` method to square each number in an array of numbers.",
      hint: `
        const numbers = [1, 2, 3, 4, 5];
        const squaredNumbers = //Your code goes here
        console.log(squaredNumbers);
      `,
      solution: `
        const numbers = [1, 2, 3, 4, 5];
        const squaredNumbers = numbers.map(num => num * num);
        console.log(squaredNumbers);
      `,
    },
    {
      _id: "4",
      title: "Object Destructuring",
      description:
        "Use object destructuring to extract properties from an object and log them.",
      hint: `
        const person = {
          name: 'John',
          age: 30,
          job: 'Developer',
        };
        
        const { name, age, job } = // Your code goes here
      `,
      solution: `
        const person = {
          name: 'John',
          age: 30,
          job: 'Developer',
        };
        
        const { name, age, job } = person;
        console.log(name);
        console.log(age);
        console.log(job);
      `,
    },
    {
      _id: "5",
      title: "Array Filter",
      description: "Filter an array to get only the even numbers and log them.",
      hint: `
        const numbers = [1, 2, 3, 4, 5, 6];
        const evenNumbers = // Your code goes here
      `,
      solution: `
        const numbers = [1, 2, 3, 4, 5, 6];
        const evenNumbers = numbers.filter(num => num % 2 === 0);
        console.log(evenNumbers);
      `,
    },
  ];

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      const response = await axios.get(`${codeBlockLink}`);
      setCodeBlocks(response.data);
    };
    fetchCodeBlocks();
  }, []);

  //TODO - Change tempCodeBlocksData to codeBlocks when backend is connected.
  return (
    codeBlocks && (
      <PageContainer>
        <Typography
          sx={{
            color: theme.textColors.title,
            textAlign: "center",
            marginBottom: 2,
            fontSize: "2rem",
          }}
        >
          {"Choose Code Block:"}
        </Typography>
        <FlexedBox>
          <Grid
            container
            rowSpacing={6}
            columnSpacing={1}
            sx={{ maxWidth: "85rem", mb: 3 }}
          >
            {codeBlocks.map((codeBlock) => (
              <TransitionGridItem
                xs={12}
                sm={6}
                md={4}
                lg={3}
                item
                key={codeBlock.title}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CodeBlockCard {...codeBlock} />
              </TransitionGridItem>
            ))}
          </Grid>
        </FlexedBox>
      </PageContainer>
    )
  );
};

export default LobbyPage;
