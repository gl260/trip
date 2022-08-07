import GlRequset from "../request/index";

export function getHotSuggest() {
  return GlRequset.get({
    url: "/home/hotSuggests",
  });
}

export function getHomecategories() {
  return GlRequset.get({
    url: "/home/categories",
  });
}

export function getHomeHouseList(currentPage) {
  return GlRequset.get({
    url: "/home/houselist",
    params: {
      page: currentPage,
    },
  });
}
