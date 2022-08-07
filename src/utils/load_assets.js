// 在vite中拿动态的图片资源需要这样写
// 但是在webpack中只要用require()包裹就好了
export const getAssetURL = (image) => {
  // 参数一: 相对路径
  // 参数二: 当前路径的URL
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};
