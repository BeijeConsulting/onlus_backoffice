import { FC, BaseSyntheticEvent } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

//mui
import { Box } from "@mui/material";

//function component
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";

//style
import common from "../../../assets/styles/common.module.scss";
import style from "./editorSocial-Style.module.scss";

//route
import PAGES from "../../../router/pages";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import CustomSwitch from "../../../components/functional/customSwitch/CustomSwitch";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";

type social = {
  id?: number;
  name: string;
  icon?: JSX.Element;
  link: string;
  footerOn: boolean;
  homepageOn: boolean;
};

const EditorSocial: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (): void => {};

  const deleteSocial = (): void => {
    console.log("delete");
    navigate(PAGES.editSocial);
  };

  const editSocial = (e: BaseSyntheticEvent): void => {
    let newSocial: social = {
      id: location.state.data.id,
      name: e.target.form[0].value,
      icon: e.target.form[2].value,
      link: e.target.form[3].value,
      footerOn: e.target.form[5].checked,
      homepageOn: e.target.form[6].checked,
    };
    console.log(newSocial);
    navigate(PAGES.editSocial, {state: {open: true}});
  };

  const createSocial = (e: BaseSyntheticEvent): void => {
    let newSocial: social = {
      name: e.target.form[0].value,
      icon: e.target.form[2].value,
      link: e.target.form[3].value,
      footerOn: e.target.form[5].checked,
      homepageOn: e.target.form[6].checked,
    };
    console.log(newSocial);

    navigate(PAGES.editSocial, {state: {open: true}});
  };

  return (
    <form className={common.component}>
      <Box className={`${common.singleComponent}`}>
        <LabelText>
          <Box className={common.row}>
            <Box className={common.rowLeft}>
              <Title text="Social" textInfo="inserisci il social" />
              <CustomTextField
                defaultValue={
                  !!location?.state?.data?.name
                    ? location?.state?.data?.name
                    : ""
                }
                placeholder="nome social"
                error={false}
              />
              <Title text="Icona" textInfo="inserisci l'icona" />
              <ButtonAddFile callback={handleClick} />
            </Box>
            <Box className={common.rowRight}>
              <Title text="Link" textInfo="inserisci link" />
              <CustomTextField
                defaultValue={
                  !!location?.state?.data?.link
                    ? location?.state?.data?.link
                    : ""
                }
                placeholder="link"
                error={false}
              />
              <CustomSwitch
                defaultChecked={
                  !!location?.state?.data?.footerOn
                    ? location?.state?.data?.footerOn
                    : false
                }
                callback={handleClick}
                label={"Pubblica nel footer"}
              />
              <CustomSwitch
                defaultChecked={
                  !!location?.state?.data?.homepageOn
                    ? location?.state?.data?.homepageOn
                    : false
                }
                callback={handleClick}
                label={"Pubblica nella home"}
              />
            </Box>
          </Box>
        </LabelText>
      </Box>

      <Box className={style.buttonsContainer}>
        <ButtonGeneric
          callback={!!location?.state?.data?.id ? editSocial : createSocial}
          color={common.saveButtonColor}
        >
          Salva modifiche
        </ButtonGeneric>
        <ButtonGeneric callback={deleteSocial} color={common.secondaryColor}>
          Annulla modifiche
        </ButtonGeneric>
      </Box>
    </form>
  );
}

export default EditorSocial;