import { api, buildQuery } from "./client.js"

export const reservationsApi = {
    create: (data) => api.post("/reservations", data),
    my: () => api.get("/reservations/my"),
    get: (id) => api.get(`/reservations/${id}`),
    bySession: (sessionId) => api.get(`/reservations/session/${sessionId}`),
    list: (params = {}) => api.get(`/reservations${buildQuery(params)}`),
    cancel: (id) => api.patch(`/reservations/${id}/cancel`),
}