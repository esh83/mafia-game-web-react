import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateArmourResault } from "../../../app/features/nightSlice";
import {
  deletePlayer,
  removeCanSaveMore,
  removeShield,
} from "../../../app/features/playersWithRole";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import GameContainer from "../../../components/GameContainer";
import NightHeader from "../../../components/NightHeader";
import { cityRolesArr, ROLES_ENUM } from "../../../Roles";

function Armour() {
  const deletedPlayerArr: string[] = [];
  const playersWithRole = useAppSelector(
    (state) => state.playerWithRoles.playersWithRoles
  );
  const nightData = useAppSelector((state) => state.night);

  const remainWant = useAppSelector(
    (state) => state.night.armourResault.remain
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function proccessNightInfo() {
    if (
      nightData.citySave.playerName !== "" &&
      nightData.citySave.playerName ===
        playersWithRole.filter(
          (role) => role.playerRole === ROLES_ENUM.DOCTOR
        )[0].playerName
    ) {
      dispatch(removeCanSaveMore(nightData.citySave.playerName));
    }
    if (
      nightData.mafiaSave.playerName !== "" &&
      nightData.mafiaSave.playerName ===
        playersWithRole.filter(
          (role) => role.playerRole === ROLES_ENUM.DOCTOR_LECTOR
        )[0].playerName
    ) {
      dispatch(removeCanSaveMore(nightData.mafiaSave.playerName));
    }

    if (
      nightData.mafiaShot.playerName !== "" &&
      nightData.citySave.playerName !== nightData.mafiaShot.playerName
    ) {
      if (nightData.mafiaShot.shield) {
        dispatch(removeShield());
      } else {
        dispatch(deletePlayer(nightData.mafiaShot.playerName));
        deletedPlayerArr.push(nightData.mafiaShot.playerName);
      }
    }

    if (
      nightData.sniperShot.playerName !== "" &&
      nightData.sniperShot.playerName !== nightData.citySave.playerName &&
      nightData.sniperShot.playerName !== nightData.mafiaSave.playerName
    ) {
      if (cityRolesArr.includes(nightData.sniperShot.playerRole)) {
        const sniperName = playersWithRole.filter(
          (role) => role.playerRole === ROLES_ENUM.SNIPER
        )[0].playerName;
        dispatch(deletePlayer(sniperName));
        deletedPlayerArr.push(sniperName);
      } else {
        dispatch(deletePlayer(nightData.sniperShot.playerName));
        deletedPlayerArr.push(nightData.sniperShot.playerName);
      }
    }

    navigate(
      `/game/manager?modal=true&armourWant=${nightData.armourResault.want}&deleted=${deletedPlayerArr}`
    );
  }
  useEffect(() => {
    if (playersWithRole.length < 1) {
      navigate("/game/start");
    }
    if (
      playersWithRole.filter((role) => role.playerRole === ROLES_ENUM.ARMOUR)
        .length < 1
    ) {
      proccessNightInfo();
    }
  }, []);
  const [armourResault, setArmourResault] = useState(false);
  const [doneProccess, setdoneProccess] = useState(false);

  useEffect(() => {
    if (doneProccess === true) {
      proccessNightInfo();
    }
  }, [doneProccess]);
  function addArmourResaultToStrore() {
    dispatch(updateArmourResault(armourResault));
    setdoneProccess(true);
  }

  return (
    <GameContainer>
      <NightHeader
        nextClickHandler={addArmourResaultToStrore}
        title="زره پوش استعلام میخواهد ؟"
        prevUrl=""
      />

      {playersWithRole.filter(
        (role) => role.playerRole === ROLES_ENUM.SNIPER
      )[0] && playersWithRole.filter(
        (role) => role.playerRole === ROLES_ENUM.ARMOUR
      )[0].deleted === true ? (
        <p className="text-center mt-3 dark:text-white">
          زره پوش از بازی حذف شده
        </p>
      ) : remainWant <= 0 ? (
        <p className="mt-5 text-center dark:text-white">
          زره پوش فرصت استعلام دیگری ندارد !
        </p>
      ) : (
        <div className="grid grid-cols-2 mt-5">
          <button
            className={`mx-2 p-3 ${
              armourResault
                ? "bg-primary-1 border-emerald-500"
                : "bg-primary-2 opacity-30 border-transparent "
            } border-4  text-white rounded`}
            onClick={() => setArmourResault(true)}
          >
            بله
          </button>
          <button
            className={`mx-2 p-3 ${
              !armourResault
                ? "bg-primary-1 border-emerald-500"
                : "bg-primary-2 opacity-30 border-transparent"
            } border-4  text-white rounded`}
            onClick={() => setArmourResault(false)}
          >
            خیر
          </button>
        </div>
      )}
    </GameContainer>
  );
}

export default Armour;
