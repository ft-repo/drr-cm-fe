import axios from 'axios'
import { makeStore } from '@/lib/store'
import { resetCredential } from '@/store/features/authSlice'

const unauthorizedCode = [401]
const store = makeStore()

const BaseService = axios.create({
	timeout: 60000,
	baseURL: "/api/v1/",
})

BaseService.interceptors.request.use(
	(config) => {
		let accessToken

		if (!accessToken) {
			const { auth } = store.getState()
			accessToken = auth.credential.access_token
		}

		if (accessToken) {
			config.headers["Authorization"] = `Bearer ${accessToken}`
		}

		// CHECK IF EXIST
		if (process.env.NEXT_PUBLIC_API_KEY) {
			config.headers["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY
		}

		const base = (config.baseURL ?? '').replace(/\/+$/, '')
		const path = (config.url ?? '').replace(/^\/+/, '')
		console.log('[REQ]', `${base}/${path}`, config.params ?? {}, config.method)

		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

BaseService.interceptors.response.use(
	(response) => response,
	(error) => {
		const { response } = error

		if (response && unauthorizedCode.includes(response.status)) {
			store.dispatch(resetCredential())
		}

		return Promise.reject(error)
	},
)

export default BaseService
