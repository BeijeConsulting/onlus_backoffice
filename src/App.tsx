//style
import style from "./assets/styles/common.module.scss";

//mui
import { StyledEngineProvider } from "@mui/material";
import Box from '@mui/material/Box';

//components
import LabelText from "./components/functional/labelText/LabelText";
import Title from "./components/functional/title/Title";
import CustomTextField from "./components/functional/textField/CustomTextField";

function App() {

  return (
    <StyledEngineProvider injectFirst>
      <Box className="style.App">
        <Box className={style.container}>
          <header></header>

          <Box className={style.content}>
            <nav></nav>

            <main>
              <Box className={style.component}>
                <Box className={style.doubleComponent}>
                  <Box className={style.left}>
                    
                    <LabelText>
                      <Title
                        text={"Nome sito"}
                        textInfo={"Inserisci il nome del sito"}
                      />
                      <CustomTextField error={false}></CustomTextField>
                      <CustomTextField error={false}></CustomTextField>
                      <CustomTextField error={true}></CustomTextField>
                      <CustomTextField error={false}></CustomTextField>

                    </LabelText>
                  </Box>
                  <Box className={style.right}>
                    
                  </Box>
                </Box>

                <Box className={style.singleComponent}>
                  
                </Box>

              </Box>
            </main>
          </Box>

          <footer></footer>
        </Box>
      </Box>
    </StyledEngineProvider>
  );
}

export default App;
