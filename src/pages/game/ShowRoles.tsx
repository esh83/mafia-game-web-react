import { useAppSelector } from "../../app/hook";
import GameContainer from "../../components/GameContainer";
import Header from "../../components/Header";

function ShowRoles() {
  const x = useAppSelector((state) => state.roles);
  console.log(x);

  return (
    <GameContainer>
      <Header
        title="نمایش نقش ها"
        nextClickHandler={() => null}
        prevUrl="/game/roles"
      />
    </GameContainer>
  );
}

export default ShowRoles;
