import React from "react";
import { Modal, Button } from "react-bootstrap";

const NewModal = (props) => {
  
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons ? (
          props.buttons.map((btn, index) => (
            <Button key={index} className={btn.className} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))
        ) : (
          <Button
            variant="primary"
            {...props}
            className="btn btn-primary"
            onClick={props.onSubmit}
          >
            {props.buttonName ? props.buttonName:(<>Save</>)}
          </Button>
        )}
        {props.buttons ? null : (
          <Button
            variant="primary"
            {...props}
            className="btn btn-warning  btn-secondary"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  
  );
};

export default NewModal;
