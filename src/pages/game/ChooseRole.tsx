import {ROLES_ENUM, rolesData } from "../../Roles";
import GameContainer from "../../components/GameContainer";
import Header from "../../components/Header";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import { addSelectedRoles } from "../../app/features/selectedRolesSlice";

function ChooseRole() {
  const dispatch = useAppDispatch();
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const navigate = useNavigate();
  const playersName = useAppSelector((state) => state.players.playerNames);
  const playersCount = playersName?.length;
  useEffect(() => {
    if (playersCount < 1) {
      navigate("/game/start");
    }
  }, []);

  const cityiInitialCount =
    playersCount % 2 === 0 ? playersCount / 2 + 1 : Math.ceil(playersCount / 2);
  const mafiaiInitialCount =
    playersCount % 2 === 0
      ? playersCount / 2 - 1
      : Math.floor(playersCount / 2);
  const [mafiaCount, setMafiaCount] = useState(mafiaiInitialCount);
  const [cityCount, setcityCount] = useState(cityiInitialCount);

  const addMafiaCount = () => {
    if (cityCount - 1 <= mafiaCount) return;
    setSelectedRoles([]);
    setMafiaCount((prev) => prev + 1);
    setcityCount((prev) => prev - 1);
  };
  const minusMafiaCount = () => {
    if (mafiaCount <= 1) return;
    setSelectedRoles([]);
    setMafiaCount((prev) => prev - 1);
    setcityCount((prev) => prev + 1);
  };
  const addCityCount = () => {
    if (mafiaCount <= 1) return;
    setSelectedRoles([]);
    setMafiaCount((prev) => prev - 1);
    setcityCount((prev) => prev + 1);
  };
  const minusCityCount = () => {
    if (cityCount - 1 <= mafiaCount) return;
    setSelectedRoles([]);
    setMafiaCount((prev) => prev + 1);
    setcityCount((prev) => prev - 1);
  };
  function addRolesToStore() {
    dispatch(addSelectedRoles({ roles: selectedRoles, mafiaCount, cityCount }));
    navigate("../game/showRoles");
  }
  return (
    <GameContainer>
      <Header
        title="انتخاب نقش ها"
        nextClickHandler={addRolesToStore}
        prevUrl="/game/start"
      />
      <div className="flex flex-row justify-evenly flex-wrap mt-4">
        <div className="flex flex-row items-center">
          <button onClick={addMafiaCount}>
            <PlusCircleIcon className="w-8 h-8 text-gray-600" />
          </button>
          <span className="mx-4 dark:text-white">{mafiaCount} مافیا</span>
          <button onClick={minusMafiaCount}>
            <MinusCircleIcon className="w-8 h-8 text-gray-500" />
          </button>
        </div>
        <div className="flex flex-row items-center">
          <button onClick={addCityCount}>
            <PlusCircleIcon className="w-8 h-8 text-gray-600" />
          </button>
          <span className="mx-4 dark:text-white">{cityCount} شهروند</span>
          <button onClick={minusCityCount}>
            <MinusCircleIcon className="w-8 h-8 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-row items-center my-3">
        <InformationCircleIcon className="text-yellow-500 w-5 h-5 ml-1" />
        <p className="text-sm opacity-80 dark:text-white">
          سایر نقش های باقی مانده به طور خودکار شهروند یا مافیای ساده درنظر
          گرفته میشود
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-primary-2 text-xl font-bold mb-2">
          نقش های شهروند
        </h2>
        <div className="flex felx-row flex-wrap">
          {rolesData
            ?.filter((role) => role.city === true)
            .filter((role) => role.roleType !== ROLES_ENUM.SIMPLE_CITY)
            .map((role) => {
              return (
                <RoleSelect
                  key={role.id}
                  id={role.id}
                  name={role.roleName}
                  selectedRoles={selectedRoles}
                  setSelectedRoles={setSelectedRoles}
                  mafiaCount={mafiaCount}
                  cityCount={cityCount}
                />
              );
            })}
        </div>
      </div>
      <div className="">
        <h2 className="text-primary-2 text-xl font-bold mb-2">نقش های مافیا</h2>
        <div className="flex felx-row flex-wrap">
          {rolesData
            ?.filter((role) => role.city === false)
            .filter((role) => role.roleType !== ROLES_ENUM.SIMPLE_MAFIA)
            .map((role) => {
              return (
                <RoleSelect
                  key={role.id}
                  id={role.id}
                  name={role.roleName}
                  selectedRoles={selectedRoles}
                  setSelectedRoles={setSelectedRoles}
                  mafiaCount={mafiaCount}
                  cityCount={cityCount}
                />
              );
            })}
        </div>
      </div>
    </GameContainer>
  );
}

type roloSelectType = {
  id: number;
  name: string;
  selectedRoles: number[];
  setSelectedRoles: React.Dispatch<React.SetStateAction<number[]>>;
  mafiaCount: number;
  cityCount: number;
};

const RoleSelect = ({
  id,
  name,
  selectedRoles,
  setSelectedRoles,
  mafiaCount,
  cityCount,
}: roloSelectType) => {
  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      const city = rolesData.filter((role) => role.id === id)[0].city;
      if (city) {
        const cityRoles = rolesData
          .filter((role) => role.city === true)
          .map((role) => role.id);
        const cityNumbers =
          selectedRoles.filter((role) => cityRoles.includes(role)).length + 1;

        if (cityCount >= cityNumbers) setSelectedRoles((prev) => [...prev, id]);
      } else {
        const mafiaRoles = rolesData
          .filter((role) => role.city === false)
          .map((role) => role.id);
        const mafiaNumbers =
          selectedRoles.filter((role) => mafiaRoles.includes(role)).length + 1;

        if (mafiaCount >= mafiaNumbers)
          setSelectedRoles((prev) => [...prev, id]);
      }
    } else {
      setSelectedRoles((prev) => prev.filter((role) => role !== id));
    }
  };

  return (
    <div className="flex mx-2 my-2 relative items-center px-1 py-3 w-32 rounded border border-gray-200 dark:border-gray-700">
      <input
        id={`role-${id}`}
        type="checkbox"
        value={id}
        onChange={(e) => handleChnage(e, id)}
        checked={selectedRoles.includes(id)}
        className="  ml-2 mr-2 text-blue-600 bg-gray-100 rounded border-gray-300 0 dark:bg-gray-700 "
      />
      <label
        htmlFor={`role-${id}`}
        className="absolute top-0 right-0 w-full h-full cursor-pointer"
      ></label>
      <label className=" ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
        {name}
      </label>
    </div>
  );
};

export default ChooseRole;
