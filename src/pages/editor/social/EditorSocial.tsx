import React, { FC, useEffect, useState } from "react";

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
//translation
import { useTranslation } from "react-i18next";

type social = {
  id?: number;
  name: string;
  icon?: any;
  link: string;
  footerOn: boolean;
  homepageOn: boolean;
};

const EditorSocial: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleClick = (): void => {};

  const deleteSocial = (): void => {
    console.log("delete");
    navigate(PAGES.editSocial);
  };
  console.log(location);

  const editSocial = (e: any): void => {
    let newSocial: social = {
      id: location.state.data.id,
      name: e.target.form[0].value,
      icon: e.target.form[2].value,
      link: e.target.form[3].value,
      footerOn: e.target.form[5].checked,
      homepageOn: e.target.form[6].checked,
    };
    console.log(newSocial);
    navigate(PAGES.editSocial, { state: { open: true } });
  };

  const createSocial = (e: any): void => {
    let newSocial: social = {
      name: e.target.form[0].value,
      icon: e.target.form[2].value,
      link: e.target.form[3].value,
      footerOn: e.target.form[5].checked,
      homepageOn: e.target.form[6].checked,
    };
    console.log(newSocial);

    navigate(PAGES.editSocial, { state: { open: true } });
  };

  return (
    <form className={common.component}>
      <Box className={`${common.singleComponent}`}>
        <LabelText>
          <Box className={common.row}>
            <Box className={common.rowLeft}>
              <Title
                text={t("social.editorSocial.socialSection.title")}
                textInfo={t("social.editorSocial.socialSection.info")}
              />
              <CustomTextField
                defaultValue={
                  !!location?.state?.data?.name
                    ? location?.state?.data?.name
                    : ""
                }
                placeholder={t(
                  "social.editorSocial.socialSection.placeholderSocial"
                )}
                error={false}
              />
              <Title
                text={t("social.editorSocial.iconSection.title")}
                textInfo={t("social.editorSocial.iconSection.info")}
              />
              <ButtonAddFile callback={handleClick} />
            </Box>
            <Box className={common.rowRight}>
              <Title
                text={t("social.editorSocial.linkSection.title")}
                textInfo={t("social.editorSocial.linkSection.info")}
              />
              <CustomTextField
                defaultValue={
                  !!location?.state?.data?.link
                    ? location?.state?.data?.link
                    : ""
                }
                placeholder={t(
                  "social.editorSocial.linkSection.placeholderLink"
                )}
                error={false}
              />
              <CustomSwitch
                defaultChecked={
                  !!location?.state?.data?.footerOn
                    ? location?.state?.data?.footerOn
                    : false
                }
                callback={handleClick}
                label={t("social.editorSocial.toggleFooter")}
              />
              <CustomSwitch
                defaultChecked={
                  !!location?.state?.data?.homepageOn
                    ? location?.state?.data?.homepageOn
                    : false
                }
                callback={handleClick}
                label={t("social.editorSocial.toggleHome")}
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
          {t("saveButton")}
        </ButtonGeneric>
        <ButtonGeneric callback={deleteSocial} color={common.secondaryColor}>
          {t("cancelButton")}
        </ButtonGeneric>
      </Box>
    </form>
  );
};

export default EditorSocial;
