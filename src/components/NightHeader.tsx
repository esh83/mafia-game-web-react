import {
  ChevronDoubleRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { resetArmour } from "../app/features/nightSlice";
import { useAppDispatch } from "../app/hook";

type HeaderProps = {
  title: string;
  nextClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  prevUrl: string;
};
function NightHeader({ title, nextClickHandler, prevUrl }: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-between items-center bg-gray-600 p-4 rounded-t-xl text-white shadow">
      <div>
        <button onClick={nextClickHandler} className="block">
          <span className="flex flex-row items-center">
            <ChevronDoubleRightIcon className="h-4 w-4 ml-1" />
            بعدی
          </span>
        </button>
      </div>
      <div>
        <h2 className="text-sm">{title}</h2>
      </div>
      <div>
        <Link to="/game/manager"
        >
          <span className="flex flex-row items-center">
            لغو شب
            <ExclamationCircleIcon className="h-5 w-5 mr-1" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default NightHeader;
