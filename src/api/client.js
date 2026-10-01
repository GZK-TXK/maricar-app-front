const API_URL = import.meta.env.VITE_API_URLBASE

export class ApiError extends Error {
    constructor(message, status = 0) {
        super(message)
        this.name = "ApiError"
        this.status = status
    }
}

export const buildQuery = (params = {}) => {
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
            query.append(key, value)
        }
    })
    const qs = query.toString()
    return qs ? `?${qs}` : ""
}

const request = async (path, { method = "GET", body, headers = {}, raw = false } = {}) => {
    const options = {
        method,
        credentials: "include",
        headers: { ...headers },
    }

    if (body !== undefined) {
        if (raw) {
            options.body = body
        } else {
            options.headers["Content-Type"] = "application/json"
            options.body = JSON.stringify(body)
        }
    }

    let response
    try {
        response = await fetch(`${API_URL}${path}`, options)
    } catch {
        throw new ApiError("No se pudo conectar con el servidor", 0)
    }

    const data = await response.json().catch(() => ({}))

    if (!response.ok || data.ok === false) {
        throw new ApiError(data.msg || "Error en la petición", response.status)
    }

    return data
}

export const api = {
    get: (path) => request(path),
    post: (path, body) => request(path, { method: "POST", body }),
    put: (path, body) => request(path, { method: "PUT", body }),
    patch: (path, body) => request(path, { method: "PATCH", body }),
    delete: (path) => request(path, { method: "DELETE" }),
    postForm: (path, formData) => request(path, { method: "POST", body: formData, raw: true }),
    putForm: (path, formData) => request(path, { method: "PUT", body: formData, raw: true }),
}