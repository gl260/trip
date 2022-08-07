import GlRequset from "../request/index";

export function getSearchTop() {
  return GlRequset.get({
    url: "/search/top",
  });
}
