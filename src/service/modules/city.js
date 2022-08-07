import GlRequest from "../request/index";

export function getAllCityData() {
  return GlRequest.get({
    url: "/city/all",
  });
}
