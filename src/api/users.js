import { api, buildQuery } from "./client.js"

export const usersApi = {
    list: (params = {}) => api.get(`/users${buildQuery(params)}`),
    get: (id) => api.get(`/users/${id}`),
    create: (data) => api.post("/users", data),
    update: (id, data) => api.put(`/users/${id}`, data),
    remove: (id) => api.delete(`/users/${id}`),
}