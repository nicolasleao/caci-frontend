interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    headers?: Record<string, string>
    body?: any,
    params?: Record<string, string>
}

const API_PROTOCOL = 'https'
const API_URL = 'localhost:8080/v1/storefront'
// const API_URL = 'https://napi.dexworks.com/v1/storefront'
const ITEMS_PER_PAGE = 10

class DexApi {
    tenantKey: string

    constructor(tenantKey: string) {
        this.tenantKey = tenantKey
    }

    protected async fetch(url: string, options: RequestOptions = {}) {
        const urlWithParams = `${url}${options.params ? new URLSearchParams(options.params).toString() : ''}`
        const response = await fetch(urlWithParams, {
            ...options,
            headers: {
                'tenant-key': this.tenantKey,
                ...options.headers
            }
        })
        return response.json()
    }

    protected getPagination(page: number) {
        return {
            limit: `${ITEMS_PER_PAGE}`,
            offset: `${(page - 1) * ITEMS_PER_PAGE}`
        }
    }
}

export class DexCatalogApi extends DexApi {
    constructor(tenantKey: string) {
        super(tenantKey)
    }

    public async getProducts(page: number, q?: string, order?: string) {
        const params: any = {
            ...this.getPagination(page),
        }
        if (q) params.q = q
        if (order) params.order = order
    
        return this.fetch(`${API_PROTOCOL}://${API_URL}/products`, {
            method: 'GET',
            params: {
                ...this.getPagination(page),
                ...params
            }
        })
    }

    public async getProduct(id: number) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/products/${id}`, {
            method: 'GET'
        })
    }

    public async getShippingOptions(cep: string) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/shipping-options`, {
            method: 'POST',
            body: {
                cepOrigem: '57036000',
                cepDestino: cep,
                totalPeso: 300,
                totalProd: 2500,
                comprimento: 25,
                altura: 20,
                largura: 30,
            }
        })
    }
}

export class DexAuthApi extends DexApi {
    constructor(tenantKey: string) {
        super(tenantKey)
    }

    public async getPublicKey() {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/auth/public-key`, {
            method: 'GET'
        })
    }

    public async register(name: string, email: string, password: string) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/auth/register`, {
            method: 'POST',
            body: {
                name,
                email,
                password
            }
        })
    }

    public async verify(code: string) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/auth/verify?code=${code}`, {
            method: 'GET'
        })
    }

    public async login(email: string, password: string) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/auth/login`, {
            method: 'POST',
            body: {
                name,
                email,
                password
            }
        })
    }

    public async refresh(refreshToken: string) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/auth/refresh`, {
            method: 'POST',
            body: {
                refreshToken
            }
        })
    }

    public async revoke(refreshToken: string) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/auth/revoke`, {
            method: 'POST',
            body: {
                refreshToken
            }
        })
    }

    public async resetPassword(email: string) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/auth/reset-password`, {
            method: 'POST',
            body: {
                email
            }
        })
    }

    public async changePassword(email: string, resetToken: string, password: string) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/auth/change-password`, {
            method: 'POST',
            body: {
                email,
                resetToken,
                password
            }
        })
    }

    public async me(token: string) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export interface Event {
    domain: string,
    current_url: string,
    name: string
    data: any
}

export class DexDataApi extends DexApi {
    constructor(tenantKey: string) {
        super(tenantKey)
    }

    public async collectData(data: any) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/data`, {
            method: 'POST',
            body: {
                ...data
            }
        })
    }

    public async logEvent(event: Event) {
        return this.fetch(`${API_PROTOCOL}://${API_URL}/data/event`, {
            method: 'POST',
            body: event
        })
    }
}