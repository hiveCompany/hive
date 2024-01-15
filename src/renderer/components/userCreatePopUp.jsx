import { useState } from "react";
import PopUp from "../hive_elements/pop_up";
import HiveButton from "../hive_elements/hive_button";
import api from "../api/api";

function UserCreatePopUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const createUser = api.users.useCreate();

  return (
    <PopUp id="UserCreate" title="צור משתמש">
      <form>
        <label htmlFor="map_name"> שם המשתמש </label>
        <br />
        <input
          type="text"
          name="map_name"
          onInput={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="map_name"> סיסמה </label>
        <br />
        <input
          type="text"
          name="map_name"
          onInput={(e) => setPassword(e.target.value)}
        />
        <br />
        <HiveButton
          onClick={() => {
            createUser({ user_name: name, password });
          }}
        >
          {" "}
          צור{" "}
        </HiveButton>
      </form>
    </PopUp>
  );
}

export default UserCreatePopUp;
