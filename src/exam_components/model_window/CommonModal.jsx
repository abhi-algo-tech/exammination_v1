import React from "react";
import { Modal, Button } from "antd";
import ButtonComponent from "../button_component/ButtonComponent";

function CommonModal({
  title,
  isVisible,
  onClose,
  onOk,
  children,
  confirmLabel = "Confirm", // Default label for Confirm button
  cancelLabel = "Cancel", // Default label for Cancel button
}) {
  return (
    <Modal
      title={title}
      open={isVisible}
      onOk={onOk}
      onCancel={onClose}
      footer={
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <ButtonComponent
            bgColor="#F9A828"
            height="40px"
            width="186px"
            label={confirmLabel}
            labelColor="#FFF"
            fontWeight="700"
            onClick={onOk}
          />

          <ButtonComponent
            key="back"
            bgColor="rgba(7, 97, 125, 0.2)"
            height="40px"
            width="186px"
            label={cancelLabel}
            labelColor="#6E6E6E"
            fontWeight="700"
            onClick={onClose}
          />
        </div>
      }
    >
      {children}
    </Modal>
  );
}

export default CommonModal;
