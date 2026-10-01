import { api } from "./client.js"

export const adminApi = {
    stats: () => api.get("/admin/stats"),
}