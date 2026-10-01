import { api, buildQuery } from "./client.js"

export const carsApi = {
    list: (params = {}) => api.get(`/cars${buildQuery(params)}`),
    get: (id) => api.get(`/cars/${id}`),
    create: (formData) => api.postForm("/cars", formData),
    update: (id, formData) => api.putForm(`/cars/${id}`, formData),
    remove: (id) => api.delete(`/cars/${id}`),
}