import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalTimeLine = (props) => {

    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    {...props}
                    className="btn btn-warning  btn-secondary"
                    onClick={props.handleClose}
                >
                    Back
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

export default ModalTimeLine;
