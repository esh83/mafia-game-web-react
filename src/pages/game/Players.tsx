import Header from "../../components/Header";
import { useState } from "react";
import GameContainer from "../../components/GameContainer";
import { TrashIcon } from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { adddPlayers } from "../../app/features/playersSlice";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
function Players() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const playersInStore = useAppSelector((state) => state.players.playerNames);
  function addPlayersToStore() {
    if (playerNames.length > 5) {
      dispatch(adddPlayers(playerNames));
      navigate("../game/roles");
    } else {
      setShowErrorAlert(true);
    }
  }
  const [playerNames, setPlayerNames] = useState<string[]>(playersInStore);
  const [nameInput, setNameInput] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameInput === "") {
      return;
    } else {
      setNameInput("");
      setPlayerNames((prev) => [...prev, nameInput]);
    }
  };
  const deleteitemHandler = (index: number) => {
    setPlayerNames((prev) =>
      prev.filter((_palyer, i) => {
        return i !== index;
      })
    );
  };
  return (
    <GameContainer>
      <Alert
        show={showErrorAlert}
        setShow={setShowErrorAlert}
        message="حداقل 6 بازیکن ثبت کنید !"
      />
      <Header
        title={`ثبت بازیکن ها (${playerNames.length})`}
        nextClickHandler={addPlayersToStore}
        prevUrl="/"
      />
      <form
        className="flex flex-row items-center mt-3"
        onSubmit={submitHandler}
      >
        <div className="ml-2">
          <button
            type="submit"
            className="bg-secondary-1 text-white rounded-md px-5 py-2 outline-none"
          >
            ثبت
          </button>
        </div>
        <div className="flex-grow">
          <input
            className="w-full p-2 bg-transparent outline-0 border-b-2 border-secondary-1 dark:text-white"
            placeholder="نام بازیکن ..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
      </form>
      <div className="flex flex-col space-y-5 mt-5">
        {playerNames.map((player, index) => {
          return (
            <div
              key={index}
              className="flex flex-row justify-between items-center flex-wrap border-b-[1px] border-gray-300 pb-4 "
            >
              <span className="text-sm overflow-hidden dark:text-white">
                {player}
              </span>
              <button onClick={() => deleteitemHandler(index)}>
                <TrashIcon className="w-5 h-5 text-red-700" />
              </button>
            </div>
          );
        })}
      </div>
    </GameContainer>
  );
}

export default Players;
