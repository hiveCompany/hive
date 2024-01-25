/* eslint-disable react/prop-types */
import api from "../api/api";

function ActionBox({ categoryName, actionName, fildName }) {
  function renderFild() {
    if (fildName) return <li> {`שדה: ${fildName}`}</li>;
  }
  return (
    <div
      style={{
        backgroundColor: "blueviolet",
        margin: "10px",
        padding: "15px",
        borderRadius: "20px",
        fontSize: "15px",
      }}
    >
      <ul>
        <li> {`קטגוריה: ${categoryName}`}</li>
        <li> {`פעולה: ${actionName}`}</li>
        {renderFild()}
      </ul>
    </div>
  );
}

function CreatrUsersGroup() {
  const actions = api.actions.useData();

  function renderActions() {
    if (actions.data) {
      return actions.data.map((action) => {
        const { categoryName, actionName, fildName } = action;
        return (
          <ActionBox
            key={`${categoryName}_${actionName}_${fildName}`}
            categoryName={categoryName}
            actionName={actionName}
            fildName={fildName}
          />
        );
      });
    }
  }
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
        dir="rtl"
        style={{
          margin: "100px",
          backgroundColor: "greenyellow",
          padding: "15px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {renderActions()}
      </div>
    );
}

export default CreatrUsersGroup;
