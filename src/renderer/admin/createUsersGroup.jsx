import api from "../api/api";

function CreatrUsersGroup() {
  const actions = api.actions.useData();
  if (actions.isLoading)
    return (
      <div
        style={{
          backgroundColor: "blueviolet",
          borderRadius: "15px",
          borderBlockColor: "brown",
          padding: "15px",
          margin: "100px",
          fontSize: "40px",
          color: "red",
        }}
      >
        {"טוען"}
      </div>
    );
  if (actions.isError) {
    return (
      <div
        style={{
          backgroundColor: "blueviolet",
          borderRadius: "15px",
          borderBlockColor: "brown",
          padding: "15px",
          margin: "100px",
          fontSize: "40px",
          color: "red",
        }}
      >
        {"שגיאה"}
      </div>
    );
  }
  if (actions.isSuccess)
    return (
      <div
        style={{ margin: "100px", backgroundColor: "greenyellow" }}
      >{`${actions.data}`}</div>
    );
}

export default CreatrUsersGroup;
