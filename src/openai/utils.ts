const axiosSettings = {
  // Prevent axios from throwing an error on non-2xx~3xx statuses. It's more
  // ergonomical to handle status codes without wrapping a try/catch around it.
  validateStatus: () => true,
}

export default axiosSettings
