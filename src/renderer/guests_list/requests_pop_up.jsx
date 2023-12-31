/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
import PopUp from "../hive_elements/pop_up";
import React, { useContext, useState } from "react";
import api from "../api/api";
import { useTable, useSortBy } from "react-table";
import RequestsCount from "../components/requestsCount";
import HiveButton from "../hive_elements/hive_button";
import RollingList from "../hive_elements/rolling_list";
import { RequestsCurrentGuestContest } from "./guests_table";

function RequestsTable({ data, columns }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        data,
        columns,
        getRowId(row, relativeIndex) {
          return data[relativeIndex].index_key;
        },
      },
      useSortBy
    );
  return (
    <table className="names_table" dir="rtl" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              // eslint-disable-next-line react/jsx-key
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
function PriorityCell({ value }) {
  return (
    <div style={{ padding: "2px", paddingLeft: "5px", paddingRight: "5px" }}>
      {" "}
      {`בקשה מספר ${value}`}{" "}
    </div>
  );
}
function RequestCell(props) {
  const tags = api.tags.useData();
  const add_request = api.requestsBelongs.useCreate();
  const [dropStatus, setDrop] = useState(false);
  const [requestsCurrentGuset] = useContext(RequestsCurrentGuestContest);
  const rowId = props.cell.row.id;

  function createItems() {
    if (tags.data) {
      const tags_array = Object.entries(tags.data);
      const items = [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [key, tag] of tags_array) {
        items.push({ name: tag.name, value: tag.id });
      }
      return items;
    }
  }

  function onItem(item) {
    const data = {
      guest_id: requestsCurrentGuset,
      tag_id: item.value,
      index_key: rowId,
    };
    // eslint-disable-next-line promise/catch-or-return, promise/always-return
    add_request(data).then(() => {
      setDrop(false);
    });
  }

  return (
    <div
      style={{ padding: "5px", outline: "none" }}
      onClick={() => setDrop(!dropStatus)}
      tabIndex={1}
      onBlur={() => setDrop(false)}
    >
      {/* <RequestBox request_id={requestId} tag_id={props.value} /> */}
      <RequestsCount value={props.value} />
      <div
        className="drop_down"
        style={{
          // position: 'relative'
          position: "absolute",
          left: "-50%",
          display: dropStatus ? "inline-block" : "none",
          cursor: "pointer",
          margin: 0,
        }}
      >
        {tags ? <RollingList items={createItems()} onItemClick={onItem} /> : ""}
      </div>
    </div>
  );
}
function DeleteCell() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="td_x"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          width: "19px",
          height: "19px",
        }}
      >
        {" "}
        &#10005;{" "}
      </div>
    </div>
  );
}
function RequestsPopUp() {
  const requests = api.requestsBelongs.useData();
  const tags = api.tags.useData();
  const add_request = api.requestsBelongs.useCreate();
  const [dropStatus, setDrop] = useState(false);
  const [requestsCurrentGuset, setRequestsCurrentGuset] = useContext(
    RequestsCurrentGuestContest
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "עדיפות",
        accessor: "index_key",
        Cell: PriorityCell,
      },
      {
        Header: "בקשה",
        accessor: "requests",
        Cell: RequestCell,
      },
      {
        Header: "x",
        accessor: "x",
        Cell: DeleteCell,
      },
    ],
    []
  );
  if (requests.data) {
    const requestsObject = {};
    const newRequestsObject = {};
    requests.data.forEach((request) => {
      requestsObject[request.guest] = {};
    });
    requests.data.forEach((request) => {
      requestsObject[request.guest][request.index_key] = [];
    });
    requests.data.forEach((request) => {
      requestsObject[request.guest][request.index_key].push(request);
    });
    requests.data.forEach((request) => {
      newRequestsObject[request.guest] = Object.entries(
        requestsObject[request.guest]
      ).map(([key, value]) => {
        return { index_key: key, requests: value };
      });
    });

    function createItems() {
      if (tags.data) {
        const tags_array = Object.entries(tags.data);
        const items = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [key, tag] of tags_array) {
          items.push({ name: tag.name, value: tag.id });
        }
        return items;
      }
    }

    function onItem(item) {
      const data = {
        guest_id: requestsCurrentGuset,
        tag_id: item.value,
      };
      // eslint-disable-next-line promise/catch-or-return, promise/always-return
      add_request(data).then(() => {
        setDrop(false);
      });
    }
    if (!requestsObject[requestsCurrentGuset]) {
      return (
        <PopUp status={requestsCurrentGuset} setState={setRequestsCurrentGuset}>
          <div>
            <HiveButton active> הוסף </HiveButton>
            <div
              className="drop_down"
              style={{
                // position: 'relative'
                position: "absolute",
                display: "inline-block",
                cursor: "pointer",
                margin: 0,
              }}
            >
              {tags ? (
                <RollingList items={createItems()} onItemClick={onItem} />
              ) : (
                ""
              )}
            </div>
          </div>
        </PopUp>
      );
    }
    if (!dropStatus) {
      return (
        <PopUp status={requestsCurrentGuset} setState={setRequestsCurrentGuset}>
          <div>
            <RequestsTable
              data={newRequestsObject[requestsCurrentGuset]}
              columns={columns}
            />
            <HiveButton onClick={() => setDrop(true)}> הוסף </HiveButton>
          </div>
        </PopUp>
      );
    }
    return (
      <PopUp status={requestsCurrentGuset} setState={setRequestsCurrentGuset}>
        <div>
          <RequestsTable
            data={newRequestsObject[requestsCurrentGuset]}
            columns={columns}
          />
          <HiveButton active> הוסף </HiveButton>
          <div
            className="drop_down"
            style={{
              // position: 'relative'
              position: "absolute",
              display: "inline-block",
              cursor: "pointer",
              margin: 0,
            }}
          >
            {tags ? (
              <RollingList items={createItems()} onItemClick={onItem} />
            ) : (
              ""
            )}
          </div>
        </div>
      </PopUp>
    );
  }
}

export default RequestsPopUp;
