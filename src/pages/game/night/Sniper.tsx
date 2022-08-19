import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateCitySave,
  updateMafiaSave,
  updateMafiaShot,
  updateSniperShot,
} from "../../../app/features/nightSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import GameContainer from "../../../components/GameContainer";
import NightHeader from "../../../components/NightHeader";
import { mafiaRolesArr, ROLES_ENUM } from "../../../Roles";

function Sniper() {
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
      playersWithRole.filter((role) => role.playerRole === ROLES_ENUM.SNIPER)
        .length < 1
    ) {
      navigate("/game/night/armour");
    }
  }, []);
  const [sniperShot, setSniperShot] = useState({
    playerName: "",
    playerRole: 0,
  });
  function addSniperShotToStore() {
    dispatch(updateSniperShot(sniperShot));
    navigate("/game/night/armour");
  }
  return (
    <GameContainer>
      <NightHeader
        nextClickHandler={addSniperShotToStore}
        title="شلیک تک تیر انداز"
        prevUrl="/game/night/detective"
      />

      {playersWithRole.filter(
        (role) => role.playerRole === ROLES_ENUM.SNIPER
      )[0] && playersWithRole.filter(
        (role) => role.playerRole === ROLES_ENUM.SNIPER
      )[0].deleted === true ? (
        <p className="text-center mt-3 dark:text-white">
           تک تیرانداز از بازی حذف شده
        </p>
      ) : (
        <div className="flex flex-wrap justify-center">
          <div className="flex mx-2 my-2 relative items-center px-1 py-3 w-40 rounded border border-gray-200 dark:border-gray-700">
            <input
              id="no-action"
              type="radio"
              name="sniper-shot"
              value={`role-no-action`}
              onChange={() =>
                setSniperShot({
                  playerName: "",
                  playerRole: 0,
                })
              }
              checked={sniperShot.playerName === ""}
              className="  ml-2 mr-2 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 "
            />
            <label
              htmlFor="no-action"
              className="absolute top-0 right-0 w-full h-full cursor-pointer"
            ></label>
            <label className=" ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
              شلیک نمیکند
            </label>
          </div>
          {playersWithRole
            .filter((role) => role.deleted === false)
            .map((role) => {
              return (
                <div
                  key={role.playerName}
                  className="flex mx-2 my-2 relative items-center px-1 py-3 w-40 rounded border border-gray-200 dark:border-gray-700"
                >
                  <input
                    id={role.playerName}
                    type="radio"
                    name="city-save"
                    value={`role-${role.playerName}`}
                    onChange={() =>
                      setSniperShot({
                        playerName: role.playerName,
                        playerRole: role.playerRole,
                      })
                    }
                    checked={sniperShot.playerName === role.playerName}
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

export default Sniper;
