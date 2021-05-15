import React from "react";

type IconButtonProps = {
  icon: React.FC;
  href?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  href,
  className,
  ...props
}) => {
  const Icon = icon;
  return href ? (
    <a href={href} className={`icon-button ${className}`} target="_blank">
      <Icon />
    </a>
  ) : (
    <button className={`icon-button ${className}`} {...props}>
      <Icon />
    </button>
  );
};
