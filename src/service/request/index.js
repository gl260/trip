import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

import useMainStore from "@/stores/modules/main";
const mainStore = useMainStore();

class GlRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });
    this.instance.interceptors.request.use(
      (config) => {
        mainStore.isLoading = true;
        return config;
      },
      (err) => {
        // 几乎没有请求失败的情况
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        mainStore.isLoading = false;
        return res;
      },
      (err) => {
        mainStore.isLoading = false;
        return err;
      }
    );
  }
  request(config) {
    // mainStore.isLoading = true;
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
          // mainStore.isLoading = false;
        })
        .catch((err) => {
          reject(err);
          // mainStore.isLoading = false;
        });
    });
  }
  get(config) {
    return this.request({ ...config, method: "get" });
  }
  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

export default new GlRequest(BASE_URL, TIMEOUT);
