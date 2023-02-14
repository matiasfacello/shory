import React from "react";

interface FieldProps {
  children: React.ReactNode;
  className?: string;
}

const UserSettingsBox = (props: FieldProps) => {
  const className = props.className || "";
  return <div className={"my-4 flex justify-center " + className}>{props.children}</div>;
};

interface Title {
  title: string;
}

const Title = ({ title }: Title) => {
  return <h3 className="text-2xl font-bold text-white">{title}</h3>;
};

UserSettingsBox.Title = Title;

export default UserSettingsBox;
