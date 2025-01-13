import { message } from 'antd'
import { AxiosError } from 'axios'

export const onError = (e: AxiosError) => message.error(e.message)
