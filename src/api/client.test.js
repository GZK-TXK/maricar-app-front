import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { api, buildQuery, ApiError } from './client.js'

describe('buildQuery', () => {
    it('construye la query ignorando vacíos', () => {
        expect(buildQuery({ a: 1, b: '', c: null, d: undefined })).toBe('?a=1')
    })

    it('devuelve cadena vacía sin parámetros', () => {
        expect(buildQuery({})).toBe('')
    })
})

describe('api', () => {
    beforeEach(() => {
        global.fetch = vi.fn()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('devuelve data en respuesta ok', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ ok: true, data: [1, 2] }),
        })
        const res = await api.get('/cars')
        expect(res.data).toEqual([1, 2])
    })

    it('lanza ApiError cuando ok=false', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 401,
            json: async () => ({ ok: false, msg: 'No autorizado' }),
        })
        await expect(api.get('/auth/me')).rejects.toThrow('No autorizado')
    })

    it('lanza ApiError si falla la red', async () => {
        global.fetch.mockRejectedValue(new Error('network'))
        await expect(api.get('/cars')).rejects.toBeInstanceOf(ApiError)
    })
})