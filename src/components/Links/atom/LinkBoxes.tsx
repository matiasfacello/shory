import React from "react";

interface FieldProps {
  children: React.ReactNode;
  title: string;
  classBox?: string;
  classTitle?: string;
  classChildren?: string;
}

const LinkBoxes = (props: FieldProps) => {
  return (
    <div className={"flex w-full flex-col justify-center gap-4 py-4 " + props.classBox}>
      <p className={"p-1 text-center text-2xl font-bold " + props.classTitle}>{props.title}</p>
      <div className={"flex flex-wrap justify-center gap-6 " + props.classChildren}>{props.children}</div>
    </div>
  );
};

export default LinkBoxes;
