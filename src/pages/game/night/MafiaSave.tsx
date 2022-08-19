import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateMafiaSave,
  updateMafiaShot,
} from "../../../app/features/nightSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import GameContainer from "../../../components/GameContainer";
import NightHeader from "../../../components/NightHeader";
import { mafiaRolesArr, ROLES_ENUM } from "../../../Roles";

function MafiaSave() {
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
      playersWithRole.filter(
        (role) => role.playerRole === ROLES_ENUM.DOCTOR_LECTOR
      ).length < 1 ||
      playersWithRole.filter(
        (role) => role.playerRole === ROLES_ENUM.DOCTOR_LECTOR
      )[0].deleted === true
    ) {
      navigate("/game/night/city-save");
    }
  }, []);
  const [mafiaSave, setMafiaSave] = useState({
    playerName: "",
    playerRole: 0,
  });
  function addMafiaSaveToStore() {
    dispatch(updateMafiaSave(mafiaSave));
    navigate("/game/night/city-save");
  }
  return (
    <GameContainer>
      <NightHeader
        nextClickHandler={addMafiaSaveToStore}
        title="انتخاب دکتر لکتر"
        prevUrl="/game/night/mafia-shot"
      />
      <div className="flex flex-wrap justify-center">
        <div className="flex mx-2 my-2 relative items-center px-1 py-3 w-40 rounded border border-gray-200 dark:border-gray-700">
          <input
            id="no-action"
          
            type="radio"
            name="mafia-shot"
            value={`role-no-action`}
            onChange={() =>
              setMafiaSave({
                playerName: "",
                playerRole: 0,
              })
            }
            checked={mafiaSave.playerName === ""}
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
          .filter((role) => mafiaRolesArr.includes(role.playerRole))
          .map((role) => {
            return (
              <div
                key={role.playerName}
                className={` ${!role.canSaveMore && 'opacity-50'} flex mx-2 my-2 relative items-center px-1 py-3 w-40 rounded border border-gray-200 dark:border-gray-700`}
              >
                <input
                  id={role.playerName}
                  disabled={!role.canSaveMore}
                  type="radio"
                  name="mafia-save"
                  value={`role-${role.playerName}`}
                  onChange={() =>
                    setMafiaSave({
                      playerName: role.playerName,
                      playerRole: role.playerRole,
                    })
                  }
                  checked={mafiaSave.playerName === role.playerName}
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
    </GameContainer>
  );
}

export default MafiaSave;
