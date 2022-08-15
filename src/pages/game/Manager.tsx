import {
  MoonIcon,
  DocumentTextIcon,
  ViewGridIcon,
  ReplyIcon,
  DocumentDuplicateIcon,
  UserIcon,
  RefreshIcon,
  XIcon,
} from "@heroicons/react/solid";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  deletePlayer,
  restorePlayer,
} from "../../app/features/playersWithRole";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import GameContainer from "../../components/GameContainer";
import Modal from "../../components/Modal";
import { rolesData } from "../../Roles";
import { resetArmour, resetNight } from "../../app/features/nightSlice";

function Manager() {
  let [searchParams] = useSearchParams();

  const playersWithRole = useAppSelector(
    (state) => state.playerWithRoles.playersWithRoles
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [infoModal, setInfoModal] = useState(false);
  const [chanceModal, setChanceModal] = useState(false);
  const [messageModal, setMessageModal] = useState({
    showModal: false,
    modalMessage: "",
  });
  const [deletedOfNight, setDeletedOfNight] = useState<any>([]);
  const mafiaRoles = rolesData
    .filter((role) => role.city === false)
    .map((role) => role.roleType);
  const presentMafiasCount = playersWithRole
    .filter((role) => role.deleted === false)
    .filter((role) => mafiaRoles.includes(role.playerRole)).length;
  const cityRoles = rolesData
    .filter((role) => role.city === true)
    .map((role) => role.roleType);
  const presentCityCount = playersWithRole
    .filter((role) => role.deleted === false)
    .filter((role) => cityRoles.includes(role.playerRole)).length;

  useEffect(() => {
    const dlN =
      searchParams.get("deleted") !== "" ? searchParams.get("deleted") : [];

    setDeletedOfNight(dlN);
    const show = searchParams.get("modal") === "true" ? true : false;
    if (show) {
      dispatch(resetNight());
    }
    setInfoModal(show);
    if (playersWithRole.length < 1) {
      navigate("/game/start");
    }
  }, []);

  function deletePlayerByName(playerName: string, isCity: boolean) {
    dispatch(deletePlayer(playerName));
    if (isCity) {
      if (presentMafiasCount >= presentCityCount - 1) {
        setMessageModal({ modalMessage: "مافیا برنده شد", showModal: true });
      }
    } else {
      if (presentMafiasCount - 1 <= 0) {
        setMessageModal({ modalMessage: "شهر برنده شد", showModal: true });
      }
    }
  }

  function shuffleArr(array: any[]) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  const [randomBoolArray, setRandomBoolarray] = useState(
    shuffleArr([true, false])
  );
  useEffect(() => {
    setRandomBoolarray((prev) => shuffleArr(prev));
  }, [chanceModal]);
  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);

  return (
    <GameContainer>
      <AnimatePresence>
        {infoModal && (
          <Modal showModal={infoModal}>
            <div className="text-md text-center my-2 dark:text-gray-100">
              {presentCityCount <= presentMafiasCount ? (
                <p className="text-red-600 font-bold mb-2">مافیا برنده شد</p>
              ) : presentMafiasCount <= 0 ? (
                <p className="text-emerald-600 font-bold mb-2">شهر برنده شد</p>
              ) : null}
              {deletedOfNight && deletedOfNight?.length < 1 ? (
                <p>دیشب کشته ای نداشت !</p>
              ) : (
                <p>کشته / کشته های شب : {deletedOfNight?.toString()}</p>
              )}
              {searchParams.get("armourWant") === "true" ? (
                <p>زره پوش درخواست استعلام کرد</p>
              ) : (
                <p>زره پوش استعلام نخواست</p>
              )}
            </div>
            <button
              className="text-white bg-primary-2 rounded shadow py-2 px-5 mx-auto block mt-4"
              onClick={() => setInfoModal(false)}
            >
              اوکی
            </button>
          </Modal>
        )}

        {messageModal.showModal && (
          <Modal showModal={messageModal.showModal}>
            <p className="text-sm text-center my-2 dark:text-gray-100">
              {messageModal.modalMessage}
            </p>
            <button
              className="text-white bg-primary-2 rounded shadow py-2 px-5 mx-auto block mt-4"
              onClick={() =>
                setMessageModal((prev) => ({ ...prev, showModal: false }))
              }
            >
              اوکی
            </button>
          </Modal>
        )}

        {chanceModal && (
          <Modal showModal={chanceModal}>
            <div className="flex flex-row justify-center mb-10">
              <div
                onClick={() => setShowCard1(true)}
                className="cursor-pointer w-32 mx-5 h-56 flex items-center justify-center p-2 rounded border-2 border-primary-1"
              >
                {!showCard1 && (
                  <span className="font-bold text-2xl dark:text-white">1</span>
                )}
                {showCard1 && (
                  <p>
                    {randomBoolArray[0] ? (
                      <CheckCircleIcon className="w-10 h-10 text-emerald-500" />
                    ) : (
                      <XCircleIcon className="h-10 w-10 text-red-600" />
                    )}
                  </p>
                )}
              </div>
              <div
                onClick={() => setShowCard2(true)}
                className="cursor-pointer w-32 mx-5 h-56 flex items-center justify-center p-2 rounded border-2 border-primary-1"
              >
                {!showCard2 && (
                  <span className="font-bold text-2xl dark:text-white">2</span>
                )}
                {showCard2 && (
                  <p>
                    {randomBoolArray[1] ? (
                      <CheckCircleIcon className="w-10 h-10 text-emerald-500" />
                    ) : (
                      <XCircleIcon className="h-10 w-10 text-red-600" />
                    )}
                  </p>
                )}
              </div>
            </div>
            <button
              className="text-white bg-primary-2 rounded shadow py-2 px-5 mx-auto block mt-4"
              onClick={() => {
                setChanceModal(false);
                setShowCard1(false);
                setShowCard2(false);
              }}
            >
              بستن
            </button>
          </Modal>
        )}
      </AnimatePresence>

      <div className="flex flex-row flex-wrap">
        <Link
          to="/game/night/mafia-shot"
          className="flex my-2 items-center p-2 min-w-[80px] justify-center text-center bg-secondary-1 text-white rounded shadow-md mx-1"
        >
          شب
          <MoonIcon className="text-white h-4 w-4 mr-1" />
        </Link>

        <button
          onClick={() => setChanceModal(true)}
          className="flex my-2 items-center p-2 min-w-[80px] justify-center text-center bg-secondary-1 text-white rounded shadow-md mx-1"
        >
          قرعه مرگ
          <ViewGridIcon className="text-white h-4 w-4 mr-1" />
        </button>

        <button
          onClick={() => {
            dispatch(resetArmour());
            navigate("/game/start");
          }}
          className="flex my-2 items-center p-2 min-w-[80px] justify-center text-center bg-secondary-1 text-white rounded shadow-md mx-1"
        >
          شروع مجدد
          <RefreshIcon className="text-white h-4 w-4 mr-1" />
        </button>
      </div>

      <div className="">
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
                <button
                  onClick={() => deletePlayerByName(role.playerName, isCity)}
                >
                  <XIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            );
          })}
      </div>

      <div className="mt-8">
        {playersWithRole.filter((role) => role.deleted === true).length > 0 && (
          <p className="text-center relative text-gray-700 text-sm dark:text-gray-50">
            بازیکنان حذف شده
          </p>
        )}
        {playersWithRole
          .filter((role) => role.deleted === true)
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
                className="opacity-50 flex justify-between flex-row border bg-secondary-1 bg-opacity-50 border-secondary-2 p-2 my-2 rounded"
              >
                <span className="flex items-center select-none">
                  <UserIcon
                    className={`ml-2 w-5 h-5 ${
                      isCity ? "text-white" : "text-gray-900"
                    }`}
                  />
                  {role.playerName} : {roleName}
                </span>
                <button
                  onClick={() => dispatch(restorePlayer(role.playerName))}
                >
                  <ReplyIcon className="w-5 h-5 text-emerald-400" />
                </button>
              </div>
            );
          })}
      </div>
    </GameContainer>
  );
}

export default Manager;
