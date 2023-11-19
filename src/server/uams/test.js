import uams from "./uams.js";

const mSys = new uams();

mSys.addOnStart(() => true);
mSys.addOnStop(() => console.log("stop"));
var newAction = mSys.createAction(function () {
  console.log("action");
});

newAction();
