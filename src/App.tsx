//import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SqureButton from "./components/buttons/SqureButton";
import { Folder_open } from "./components/icons/CustomIcons";
import Posts from "./components/examples/useTags/Posts";
import EntityCrudAndSelect from "./components/entityCrudAndSelect/EntityCrudAndSelect";
import { categoryService } from "./service/apiService";
import { fileTypeService } from "./service/apiService";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

function App() {
  const theme = createTheme();

  const [category, setCategory] = useState("");
  const [fileType, setFileType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    //console.log("app");
  }, []);

  //console.log("category", JSON.stringify(category));
  return (
    <>
      <ThemeProvider theme={theme}>
        <SqureButton onClick={() => setSubmitted(true)}>But</SqureButton>
        <Folder_open
          iconColor={"theme.palette.primary.500"}
          sx={{ width: "124px", height: "124px" }}
        />
        <Posts />

        <Box sx={{ display: "flex", margin: "40px", width: "300px" }}>
          <EntityCrudAndSelect
            label="File type"
            name="fileType"
            required={true}
            submitted={submitted}
            selectedValue={fileType}
            setSelectedValue={setFileType}
            dataService={fileTypeService}
            placeholder="Select fileType"
          />
        </Box>
        <Box sx={{ display: "flex", margin: "40px", width: "300px" }}>
          <EntityCrudAndSelect
            label="Category"
            name="category"
            filteredFieldKey={"fileType"}
            filteredFieldValue={fileType}
            disabled={!fileType}
            submitted={submitted}
            selectedValue={category}
            setSelectedValue={setCategory}
            dataService={categoryService}
            placeholder="Select category"
            container50={true}
          />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
