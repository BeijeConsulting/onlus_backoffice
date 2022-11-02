import { FC,useState } from "react";

import {Modal,Box,Typography} from "@mui/material";

//style
import deleteStyle from './deleteModal.module.scss';
import style from '../../../assets/styles/common.module.scss';

//components
import ButtonGeneric from '../buttonGeneric/ButtonGeneric';

interface modalProps{
  open: boolean,
  closeCallback: Function,
  deleteCallback: Function
}
  
const DeleteModal: FC<modalProps> = (props) => {

  function closeModal(): void {
    props.closeCallback();
  }

  function deleteElement(): void{
    props.deleteCallback();
  }

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={deleteStyle.modal}>
        <Typography>
          Sei sicuro di voler eliminare il seguente elemento?
        </Typography>
        <Box className={deleteStyle.modalButtons}>
          <ButtonGeneric
            color={style.secondaryColor}
            callback={closeModal}
          >
            Elimina
          </ButtonGeneric>
          <ButtonGeneric color={style.ternaryColor} callback={closeModal}>
            Annulla
          </ButtonGeneric>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
