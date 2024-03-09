import Icons from "../../Data/Icons";

const Marker = () => {
  return (
    <span className="select-none absolute -translate-x-1/2 -translate-y-1/2 text-red-500 text-[50px]">
      {Icons.map}
    </span>
  );
};

export default Marker;
