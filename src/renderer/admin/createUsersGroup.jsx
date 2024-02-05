/* eslint-disable react/prop-types */
import SelectionArea, { useSelection } from "hive-select";
import api from "../api/api";
import "../style/userGroups.css";

function Selection({ children }) {
  function onStart({ event, selection }) {
    if (!event.ctrlKey && !event.metaKey) {
      selection.clearSelection();
      document
        .querySelectorAll(".selected")
        .forEach((e) => e.classList.remove("selected"));
    }
  }
  function onMove({
    store: {
      changed: { added, removed },
    },
  }) {
    added.forEach((ele) => ele.classList.add("selected"));
    removed.forEach((ele) => ele.classList.remove("selected"));
  }
  return (
    <SelectionArea
      selectables=".selectable"
      onStart={onStart}
      onMove={onMove}
      behaviour={{ scrolling: { startScrollMargins: { x: 150, y: 0 } } }}
    >
      {children}
    </SelectionArea>
  );
}

function ActionBox({ categoryName, actionName, fildName }) {
  function renderFild() {
    if (fildName) return <li> {`שדה: ${fildName}`}</li>;
  }
  return (
    <div
      className="action_box selectable"
      onClick={(e) => e.stopPropagation()}
      style={{
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
function UserGroups() {
  const actions = api.actions.useData();
  const selection = useSelection();

  function onMouseDown(event) {
    if (
      !event.ctrlKey &&
      !event.metaKey &&
      document.querySelectorAll(".selected").length > 0
    ) {
      selection.clearSelection();
      document
        .querySelectorAll(".selected")
        .forEach((e) => e.classList.remove("selected"));
    }
  }

  function getActionsByCategory() {
    if (actions.data) {
      const categorys = {};
      actions.data.forEach((action) => {
        const { categoryName } = action;
        categorys[categoryName] = [];
      });
      actions.data.forEach((action) => {
        const { categoryName } = action;
        categorys[categoryName].push(action);
      });
      return categorys;
    }
  }

  function renderActions(categoryActions) {
    return categoryActions.map((action) => {
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
  function renderAllActions() {
    const actionsByCategory = getActionsByCategory();
    if (!actionsByCategory) return "loading";
    console.log(Object.keys(actionsByCategory));
    return Object.keys(actionsByCategory).map((category, index) => {
      return (
        <div key={index}>
          {" "}
          <h2>{category}</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {renderActions(actionsByCategory[category])}{" "}
          </div>
        </div>
      );
    });
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
          flexDirection: "column",
          userSelect: "none",
        }}
        onMouseDown={onMouseDown}
      >
        {renderAllActions()}
      </div>
    );
}
function CreatrUsersGroup() {
  return (
    <Selection>
      <UserGroups />
    </Selection>
  );
}

export default CreatrUsersGroup;
