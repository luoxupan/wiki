import "./Button.less";
import * as React from "react";

export function Button(props: any) {

  const { children, style, type, onClick } = props;
  const className = `crm-button ${type === 'primary' ? 'crm-button-primary' : ''}`;

  return (
    <button
      style={{ ...style }}
      className={className}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </button>
  );
}
