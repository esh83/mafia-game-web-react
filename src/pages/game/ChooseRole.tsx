import React from "react";
import GameContainer from "../../components/GameContainer";
import Header from "../../components/Header";

function ChooseRole() {
  return (
    <GameContainer>
      <Header title="انتخاب نقش ها" nextClickHandler={() => 0} prevUrl="../game/start" />
    </GameContainer>
  );
}

export default ChooseRole;
