"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted || !show) return null;

  return createPortal(
    <div
      className={`modal modal-open transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0"
      } bg-black bg-opacity-50 dark:bg-opacity-80`}
      onClick={onClose}
    >
      <div
        className="modal-box relative max-h-[90vh] overflow-y-auto p-6 w-11/12 md:w-1/3 
                   bg-white dark:bg-gray-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2 
                     bg-gray-200 dark:bg-gray-700 dark:text-white border-none"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="space-y-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
