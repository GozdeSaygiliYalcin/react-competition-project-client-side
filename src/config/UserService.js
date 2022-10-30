import RestApis from "./RestApis";
const UserService = {
  online: RestApis.userservice + "/user/online",
  offline: RestApis.userservice + "/user/offline",
  getquestion: "http://34.69.208.110:9092/yarisma/getquestion",
  getresult: "http://34.69.208.110:9092/yarisma/getresult",
  active: "http://34.69.208.110:9092/yarisma/active",
  passive: "http://34.69.208.110:9092/yarisma/passive",
  answer: "http://34.69.208.110:9092/yarisma/answer",
};
export default UserService;
