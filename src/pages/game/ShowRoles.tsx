import { InformationCircleIcon } from "@heroicons/react/solid";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPlayersWithRole } from "../../app/features/playersWithRole";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import GameContainer from "../../components/GameContainer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import { rolesData, ROLES_ENUM } from "../../Roles";

function ShowRoles() {
  const playerNames = useAppSelector((state) => state.players.playerNames);
  const roles = useAppSelector((state) => state.roles);
  const navigate = useNavigate();
  useEffect(() => {
    if (playerNames.length < 1) {
      navigate("/game/start");
    }
  }, []);

  const mafiaRolesId = rolesData
    .filter((role) => role.city === false)
    .map((role) => role.id);
  const cityRolesId = rolesData
    .filter((role) => role.city === true)
    .map((role) => role.id);
  const mafiaRolesCount = roles.roles.filter((role) =>
    mafiaRolesId.includes(role)
  ).length;
  const cityRolesCount = roles.roles.filter((role) =>
    cityRolesId.includes(role)
  ).length;

  const simpleMafiasCount = roles.mafiaCount - mafiaRolesCount;
  const simpleCityCount = roles.cityCount - cityRolesCount;
  const allRolesArray = rolesData
    .filter((item) => roles.roles.includes(item.id))
    .map((item) => item.roleType);

  for (let i = 0; i < simpleMafiasCount; i++) {
    allRolesArray.push(ROLES_ENUM.SIMPLE_MAFIA);
  }
  for (let i = 0; i < simpleCityCount; i++) {
    allRolesArray.push(ROLES_ENUM.SIMPLE_CITY);
  }

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  shuffleArray(allRolesArray);
  type playersWithRoleType = {
    playerName: string;
    playerRole: number;
    deleted : boolean
  }[];
  const playersWithRole: playersWithRoleType = [];
  if (playerNames.length === allRolesArray.length) {
    playerNames.forEach((player, index) => {
      playersWithRole.push({
        playerName: player,
        playerRole: allRolesArray[index],
        deleted : false
      });
    });
  } else {
    navigate("/game/start");
  }
  const variants = {
    opened: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setmodalTitle] = useState("");
  const [playersWithRoleCopy, setPlayersWithRoleCopy] =
    useState(playersWithRole);

  function openModal(role: number, index: number) {
    setShowModal(true);
    const roleName = rolesData.filter((i) => i.roleType === role)[0].roleName;
    setmodalTitle(roleName);
    setPlayersWithRoleCopy((prev) => prev.filter((item, i) => i !== index));
  }
  const dispatch = useAppDispatch();
  function addPlayersWithRoleToStore() {
    dispatch(addPlayersWithRole(playersWithRole));
    navigate("../game/manager");
  }
  return (
    <GameContainer>
      <Header
        title="نمایش نقش ها"
        nextClickHandler={addPlayersWithRoleToStore}
        prevUrl="/game/roles"
      />
      <AnimatePresence>
        {showModal && (
          <Modal showModal={showModal}>
            <h2 className="text-lg font-bold text-center pb-2 border-b dark:text-white">
              {modalTitle}
            </h2>
            <p className="text-sm text-center my-2 dark:text-gray-100 opacity-80">
              توضیحات به زودی ...
            </p>
            <button
              className="text-white bg-primary-2 rounded shadow py-2 px-5 mx-auto block mt-4"
              onClick={() => setShowModal(false)}
            >
              متوجه شدم
            </button>
          </Modal>
        )}
      </AnimatePresence>

      <div className="mt-3 grid grid-cols-2 md:grid-cols-3">
        {playersWithRoleCopy.length ? (
          playersWithRoleCopy.map((item, index) => {
            return (
              <div
                onClick={() => openModal(item.playerRole, index)}
                key={index}
                className="mx-2 my-2 border p-2 overflow-hidden cursor-pointer select-none dark:text-white"
              >
                {item.playerName}
              </div>
            );
          })
        ) : (
          <div className="flex flex-row items-center my-3 col-span-3">
            <InformationCircleIcon className="text-yellow-500 w-5 h-5 ml-1" />
            <p className="text-sm opacity-80 dark:text-white">
              صفحه بعد فقط باید توسط راوی دیده شود
            </p>
          </div>
        )}
      </div>
    </GameContainer>
  );
}

export default ShowRoles;
