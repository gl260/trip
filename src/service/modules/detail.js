import GlRequest from "../request/index";

export function getDetailInfos(houseId) {
  return GlRequest.get({
    url: "/detail/infos",
    params: {
      houseId,
    },
  });
}
