import { FC } from "react";

import { Modal, Box, Typography } from "@mui/material";

//style
import deleteStyle from "./deleteModal.module.scss";
import style from "../../../assets/styles/common.module.scss";

//components
import ButtonGeneric from "../buttonGeneric/ButtonGeneric";

//i18n
import { useTranslation } from "react-i18next";

interface modalProps {
  open: boolean;
  closeCallback: Function;
  deleteCallback: Function;
  modalText?: string;
  deleteBtnText?: string;
  discardBtnText?: string;
}

const DeleteModal: FC<modalProps> = (props): JSX.Element => {
  const { t, i18n } = useTranslation();

  function closeModal(): void {
    props.closeCallback();
  }

  function deleteElement(): void {
    props.deleteCallback();
  }

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={deleteStyle.modal}>
        <Typography>{t(props.modalText)}</Typography>
        <Box className={deleteStyle.modalButtons}>
          <ButtonGeneric color={style.secondaryColor} callback={deleteElement}>
            {t(props.deleteBtnText)}
          </ButtonGeneric>
          <ButtonGeneric color={style.saveButtonColor} callback={closeModal}>
            {t(props.discardBtnText)}
          </ButtonGeneric>
        </Box>
      </Box>
    </Modal>
  );
};

DeleteModal.defaultProps = {
  modalText: "deleteModal.text",
  deleteBtnText: "deleteModal.deleteButton",
  discardBtnText: "deleteModal.DiscardChangesButton",
}

export default DeleteModal;
