import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

function Manager() {
  const playersWithRole = useAppSelector(
    (state) => state.playerWithRoles.playersWithRoles
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (playersWithRole.length < 1) {
      navigate("/game/start");
    }
  }, []);

  return <div>Manager</div>;
}

export default Manager;
