import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
type HeaderProps = {
  title: string;
  nextClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  prevUrl: string;
};
function Header({ title, nextClickHandler, prevUrl }: HeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center bg-secondary-2 p-4 rounded-t-xl text-white shadow">
      <div>
        <button onClick={nextClickHandler} className="block">
          <span className="flex flex-row items-center">
            <ChevronDoubleRightIcon className="h-4 w-4 ml-1" />
            بعدی
          </span>
        </button>
      </div>
      <div>
        <h2>{title}</h2>
      </div>
      <div>
        <Link to={prevUrl}>
          <span className="flex flex-row items-center">
            قبلی
            <ChevronDoubleLeftIcon className="h-4 w-4 mr-1" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
