/* eslint-disable camelcase */
import express from "express";

import maps from "./api/maps.js";
import seats from "./api/seats.js";
import guests from "./api/guests.js";
import tags from "./api/tags.js";
import users from "./api/users.js";
import map_elements from "./api/map_elements.js";
import projects from "./api/projects.js";
import guest_groups from "./api/guest_groups.js";
import seat_belongs from "./api/seat_belongs.js";
import seats_groups from "./api/seats_groups.js";
import tag_belongs from "./api/tag_belongs.js";
import requests_belongs from "./api/requests_belongs.js";
import projectActions from "./api/actions.js";

const router = express.Router();

const actions = {
  maps,
  seats,
  guests,
  tags,
  map_elements,
  projects,
  guest_groups,
  seat_belongs,
  seats_groups,
  tag_belongs,
  requests_belongs,
  users,
  projectActions,
};

function getAllActions() {
  console.log(`a is: ${typeof actions}`);
  let actionsNames = [];
  Object.entries(actions).forEach(([key, value]) => {
    const categoryName = `${key}`;
    Object.entries(value).forEach(([key, value]) => {
      const actionName = key;
      let fildName;
      if (typeof value === "object") {
        Object.entries(value).forEach(([key]) => {
          fildName = `_${key}`;
        });
      } else {
        fildName = "";
      }
      actionsNames.push(`${categoryName}_${actionName}${fildName}`);
    });
    // console.log(`key is: ${key}, value is: ${value}`);
    // console.log("++++++++++++++++++++++++++++++++++");
  });
  console.log(actionsNames);
}

router.post("/", async (req, res) => {
  getAllActions();
  const { category, action } = req.body;
  try {
    if (!category || !action) {
      throw new Error("parameter misseng");
    }
    if (category.length === 0 || action.length === 0) {
      throw new Error("parameter misseng");
    }
    if (!actions[category]) {
      throw new Error("category dont exists");
    }
    if (!actions[category][action]) {
      throw new Error("action dont exists");
    }
    const respons = {
      data: await actions[category][action](req.body, req),
      msg: "ok",
    };
    res.json(respons);
  } catch (error) {
    res.status(500).json({ msg: false, data: error });
  }
});
router.get("/", async (req, res) => {
  const { category, action } = req.query;
  try {
    if (!category || !action) {
      throw new Error("parameter misseng");
    }
    if (category.length === 0 || action.length === 0) {
      throw new Error("parameter misseng");
    }
    if (!actions[category]) {
      throw new Error("category dont exists");
    }
    if (!actions[category][action]) {
      throw new Error("action dont exists");
    }
    const respons = {
      data: await actions[category][action](req.query, req),
      msg: "ok",
    };
    res.json(respons);
  } catch (error) {
    res.status(500).json({ msg: false, data: error });
  }
});
export default router;
