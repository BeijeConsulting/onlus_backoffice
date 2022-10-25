import React from "react";
import logo from "./logo.svg";

//style
import style from "./assets/styles/common.module.scss";

import LabelText from "./components/functional/labelText/LabelText";

function App() {
  return (
    <div className="style.App">
      <div className={style.container}>
        <header></header>

        <div className={style.content}>
          <nav></nav>

          <main>
            <div className={style.component}>
              <div className={style.doubleComponent}>
                <div className={style.left}>
                  <LabelText text={"ciao"} textInfo={"bo"}></LabelText>
                </div>
                <div className={style.right}>
                  <LabelText text={"ciao"} textInfo={"bo"}></LabelText>
                </div>
              </div>

              <div className={style.singleComponent}></div>
            </div>
          </main>
        </div>

        <footer></footer>
      </div>
    </div>
  );
}

export default App;
