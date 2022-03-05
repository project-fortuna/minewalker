import React, { ReactNode } from 'react';

const Modal = (props: {
  isOpen: boolean;
  onClose?: Function;
  children: ReactNode;
  allowBackgroundInteraction?: boolean;
}) => {
  return props.isOpen ? (
    !props.allowBackgroundInteraction ? (
      <div className="fixed flex justify-center items-center z-10 bg-black bg-opacity-25 inset-0 overflow-y-auto">
        {props.children}
      </div>
    ) : (
      <div className="fixed flex justify-center z-0 items-center inset-0 overflow-y-auto">
        {props.children}
      </div>
    )
  ) : (
    <></>
  );
};

export default Modal;
