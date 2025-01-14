import React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <div className={`dialog ${open ? "open" : ""}`}>
      <div className="dialog-overlay" onClick={() => onOpenChange(false)} />
      <div className="dialog-content">
        <button className="dialog-close" onClick={() => onOpenChange(false)}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;