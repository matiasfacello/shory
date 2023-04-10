interface FieldProps {
  for: string;
  name: string;
  className?: string;
  required?: boolean;
}

const Label = (props: FieldProps) => {
  return (
    <label htmlFor={props.for} className={"font-bold " + props.className}>
      {props.name}
      {props.required && (
        <span className="font-bold italic text-red-300" title="Required">
          *
        </span>
      )}
    </label>
  );
};

export default Label;
