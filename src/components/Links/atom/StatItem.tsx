import type { ClickType } from "click";

interface StatItem extends ClickType {
  className?: string;
  index: number;
}

const StatItem = (props: StatItem) => {
  const date = new Date(props.createdAt);
  const [day, hour] = date.toLocaleDateString("es-Ar", { hour: "2-digit", minute: "2-digit" }).split(",");

  return (
    <>
      <div className={"font-bold " + props.className}>
        <span className="mx-4">{props.index}</span>
        <span className="mx-4">{hour}</span>
        <span className="mx-4">{day}</span>
        <span className="mx-4">{props.ip}</span>
      </div>
    </>
  );
};

export default StatItem;
