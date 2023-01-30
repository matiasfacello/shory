import { Icon } from "@iconify-icon/react";
import React from "react";

interface FieldProps {
  children: React.ReactNode;
  closeButton?: () => void;
  title: string;
  classBox?: string;
  classClose?: string;
  classTitle?: string;
  classChildren?: string;
}

const LinkBoxes = (props: FieldProps) => {
  return (
    <div className={"flex w-full flex-col justify-center gap-4 py-4 " + props.classBox}>
      {props.closeButton && <Icon icon="material-symbols:close" className={"-mb-6 block cursor-pointer self-end px-6 text-4xl " + props.classClose} onClick={props.closeButton} />}
      <p className={"p-1 text-center text-2xl font-bold " + props.classTitle}>{props.title}</p>
      <div className={"flex flex-wrap justify-center gap-6 " + props.classChildren}>{props.children}</div>
    </div>
  );
};

export default LinkBoxes;
