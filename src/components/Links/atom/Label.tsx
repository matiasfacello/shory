interface FieldProps {
  for: string;
  name: string;
  className?: string;
}

const Label = (props: FieldProps) => {
  return (
    <label htmlFor={props.for} className={"font-bold " + props.className}>
      {props.name}
    </label>
  );
};

export default Label;
