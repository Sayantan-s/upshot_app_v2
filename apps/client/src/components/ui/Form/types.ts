import React from "react";
import { FieldError } from "react-hook-form";

export interface IErrorProps {
  error?: FieldError | string;
}
export interface ITextFieldProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    IErrorProps {}

export interface ITextAreaProps
  extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    IErrorProps {}

export interface IFileProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    IErrorProps {
  children: React.ReactNode;
  id: string;
  className: string;
}
