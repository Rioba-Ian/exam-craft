import type { FC, ReactNode } from "react";
import type { BtnVariant, TagVariant } from "../types";

interface TagProps {
  variant: TagVariant;
  children: ReactNode;
}

export const Tag: FC<TagProps> = ({ variant, children }) => (
  <span className={`tag tag-${variant}`}>{children}</span>
);

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  children: ReactNode;
}

export const Btn: FC<BtnProps> = ({ variant = "ghost", children, className = "", style, ...rest }) => (
  <button className={`btn btn-${variant} ${className}`} style={style} {...rest}>
    {children}
  </button>
);
