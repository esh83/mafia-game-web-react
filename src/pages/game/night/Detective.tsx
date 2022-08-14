import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../app/hook";
import GameContainer from "../../../components/GameContainer";
import NightHeader from "../../../components/NightHeader";
import { rolesData, ROLES_ENUM } from "../../../Roles";

function Detective() {
  const playersWithRole = useAppSelector(
    (state) => state.playerWithRoles.playersWithRoles
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (playersWithRole.length < 1) {
      navigate("/game/start");
    }
    if (
      playersWithRole.filter((role) => role.playerRole === ROLES_ENUM.DETECTIVE)
        .length < 1 || playersWithRole.filter((role) => role.playerRole === ROLES_ENUM.DETECTIVE)[0].deleted === true
    ) {
       navigate("/game/night/sniper");
    }
  }, []);

  return (
    <GameContainer>
      <NightHeader
        nextClickHandler={() => navigate("/game/night/sniper")}
        title="استعلام کارگاه"
        prevUrl="/game/night/city-save"
      />

      {playersWithRole
        .filter((role) => role.deleted === false)
        .map((role) => {
          const roleName = rolesData.filter(
            (i) => i.roleType === role.playerRole
          )[0].roleName;
          const isCity = rolesData.filter(
            (i) => i.roleType === role.playerRole
          )[0].city;
          return (
            <div
              key={role.playerName}
              className="flex justify-between flex-row border bg-secondary-1 bg-opacity-50 border-secondary-2 p-2 my-2 rounded"
            >
              <span className="flex items-center select-none">
                <UserIcon
                  className={`ml-2 w-5 h-5 ${
                    isCity ? "text-white" : "text-gray-900"
                  }`}
                />
                {role.playerName} : {roleName}
              </span>
              <span>
                {isCity || role.playerRole === ROLES_ENUM.GODFATHER ? (
                  <ThumbDownIcon className="w-5 h-5 text-red-600" />
                ) : (
                  <ThumbUpIcon className="w-5 h-5 text-emerald-700" />
                )}
              </span>
            </div>
          );
        })}
    </GameContainer>
  );
}

export default Detective;
