import { api } from "./client.js"

export const contactApi = {
    send: (data) => api.post("/contact", data),
}