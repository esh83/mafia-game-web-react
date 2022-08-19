import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateCitySave,
  updateMafiaSave,
  updateMafiaShot,
} from "../../../app/features/nightSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import GameContainer from "../../../components/GameContainer";
import NightHeader from "../../../components/NightHeader";
import { mafiaRolesArr, ROLES_ENUM } from "../../../Roles";

function CitySave() {
  const playersWithRole = useAppSelector(
    (state) => state.playerWithRoles.playersWithRoles
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (playersWithRole.length < 1) {
      navigate("/game/start");
    }
    if (
      playersWithRole.filter((role) => role.playerRole === ROLES_ENUM.DOCTOR)
        .length < 1
    ) {
      navigate("/game/night/detective");
    }
  }, []);
  const [citySave, setCitySave] = useState({
    playerName: "",
    playerRole: 0,
  });
  function addCitySaveToStore() {
    dispatch(updateCitySave(citySave));
    navigate("/game/night/detective");
  }
  return (
    <GameContainer>
      <NightHeader
        nextClickHandler={addCitySaveToStore}
        title="انتخاب پزشک"
        prevUrl="/game/night/mafia-save"
      />
      {playersWithRole.filter(
        (role) => role.playerRole === ROLES_ENUM.DOCTOR
      )[0] && playersWithRole.filter(
        (role) => role.playerRole === ROLES_ENUM.DOCTOR
      )[0].deleted === true ? (
        <p className="text-center mt-3 dark:text-white">پزشک از بازی حذف شده</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          <div className="flex mx-2 my-2 relative items-center px-1 py-3 w-40 rounded border border-gray-200 dark:border-gray-700">
            <input
              id="no-action"
              type="radio"
              name="city-shot"
              value={`role-no-action`}
              onChange={() =>
                setCitySave({
                  playerName: "",
                  playerRole: 0,
                })
              }
              checked={citySave.playerName === ""}
              className="  ml-2 mr-2 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 "
            />
            <label
              htmlFor="no-action"
              className="absolute top-0 right-0 w-full h-full cursor-pointer"
            ></label>
            <label className=" ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
              نجات نمی دهد
            </label>
          </div>
          {playersWithRole
            .filter((role) => role.deleted === false)
            .map((role) => {
              return (
                <div
                  key={role.playerName}
                  className={` ${
                    !role.canSaveMore && "opacity-50"
                  } flex mx-2 my-2 relative items-center px-1 py-3 w-40 rounded border border-gray-200 dark:border-gray-700`}
                >
                  <input
                    id={role.playerName}
                    disabled={!role.canSaveMore}
                    type="radio"
                    name="city-save"
                    value={`role-${role.playerName}`}
                    onChange={() =>
                      setCitySave({
                        playerName: role.playerName,
                        playerRole: role.playerRole,
                      })
                    }
                    checked={citySave.playerName === role.playerName}
                    className="  ml-2 mr-2 text-blue-600 bg-gray-100 rounded border-gray-300 0 dark:bg-gray-700 "
                  />
                  <label
                    htmlFor={role.playerName}
                    className="absolute top-0 right-0 w-full h-full cursor-pointer"
                  ></label>
                  <label className=" ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
                    {role.playerName}
                  </label>
                </div>
              );
            })}
        </div>
      )}
    </GameContainer>
  );
}

export default CitySave;
