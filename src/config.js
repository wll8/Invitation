export default {
  dev: {
    baseApi: `http://localhost:9000`,
  },
  prod: {
    baseApi: `http://127.0.0.1:9000`,
  },
  test: {
    baseApi: `http://localhost:9000`,
  },
}[process.env.VUE_APP_ENV]
