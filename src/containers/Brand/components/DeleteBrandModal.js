import React from "react";
import NewModal from "../../../components/UI/Modal";

const DeleteBrandModal = (props) => {
  const { show, handleClose, onSubmit, brandDelete } = props;
  const buttons = [
    {
      label: "No",
      className: "btn btn-primary",
      onClick: handleClose,
    },
    {
      label: "Yes",
      className: "btn btn-warning  btn-secondary",
      onClick: onSubmit,
    },
  ];
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle="Warning!!"
      buttons={buttons}
    >
      <span className="text-danger">
        Are you sure delete brand: {brandDelete.name}
      </span>
    </NewModal>
  );
};

export default DeleteBrandModal;
