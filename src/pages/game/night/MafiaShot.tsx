import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateMafiaShot } from "../../../app/features/nightSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import GameContainer from "../../../components/GameContainer";
import NightHeader from "../../../components/NightHeader";
import { ROLES_ENUM } from "../../../Roles";

function MafiaShot() {
  const playersWithRole = useAppSelector(
    (state) => state.playerWithRoles.playersWithRoles
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (playersWithRole.length < 1) {
      navigate("/game/start");
    }
  }, []);
  const [mafiaShot, setMafiaShot] = useState({
    playerName: "",
    playerRole: 0,
    shield: false,
  });
  function addMafiaShotToStore() {
    dispatch(updateMafiaShot(mafiaShot));
    navigate("/game/night/mafia-save")
  }
  return (
    <GameContainer>
      <NightHeader
        nextClickHandler={addMafiaShotToStore}
        title="شلیک مافیا"
        prevUrl="/game/manager"
      />
      <div className="flex flex-wrap justify-center">
        <div className="flex mx-2 my-2 relative items-center px-1 py-3 w-40 rounded border border-gray-200 dark:border-gray-700">
          <input
            id="no-action"
            type="radio"
            name="mafia-shot"
            value={`role-no-action`}
            onChange={() =>
              setMafiaShot({
                playerName: "",
                playerRole: 0,
                shield: false,
              })
            }
            checked={mafiaShot.playerName === ""}
            className="  ml-2 mr-2 text-blue-600 bg-gray-100 rounded border-gray-300 dark:bg-gray-700 "
          />
          <label
            htmlFor="no-action"
            className="absolute top-0 right-0 w-full h-full cursor-pointer"
          ></label>
          <label className=" ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
           شلیک نمیکند
          </label>
        </div>
        {playersWithRole.filter(role=>role.deleted===false).map((role) => {
          return (
            <div
              key={role.playerName}
              className="flex mx-2 my-2 relative items-center px-1 py-3 w-40 rounded border border-gray-200 dark:border-gray-700"
            >
              <input
                id={role.playerName}
                type="radio"
                name="mafia-shot"
                value={`role-${role.playerName}`}
                onChange={() =>
                  setMafiaShot({
                    playerName: role.playerName,
                    playerRole: role.playerRole,
                    shield:
                      role.playerRole === ROLES_ENUM.ARMOUR &&
                      role.shield === true
                        ? true
                        : false,
                  })
                }
                checked={mafiaShot.playerName === role.playerName}
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

export default MafiaShot;
