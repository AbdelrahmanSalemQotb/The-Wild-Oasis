import { HiArrowsUpDown } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import Select from "../Form/FormControls/Select";
import { Options } from "../Form/FormControls/SelectTypes";

function SortBy({
  options,
  mediaQuery = undefined,
  icon,
}: {
  options: Options;
  mediaQuery?: string;
  icon?: React.ReactNode;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sortBy") || "";

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <Select
      mediaQuery={mediaQuery}
      value={sort}
      options={options}
      icon={icon ?? <HiArrowsUpDown />}
      onChange={handleSelect}
    />
  );
}

export default SortBy;
