//import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SqureButton from "./components/buttons/SqureButton";
import { Folder_open, IconProjects } from "./components/icons/CustomIcons";
import Posts from "./components/examples/useTags/Posts";

function App() {
  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <SqureButton>But</SqureButton>
        {/* <IconProjects
          iconColor={"theme.palette.primary.500"}
          sx={{ width: "24px", height: "24px" }}
        /> */}
        <Folder_open
          iconColor={"theme.palette.primary.500"}
          sx={{ width: "124px", height: "124px" }}
        />
        <Posts />
      </ThemeProvider>
    </>
  );
}

export default App;
