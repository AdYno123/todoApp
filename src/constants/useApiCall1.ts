import { useState, useMemo, useEffect } from 'react'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

type ApiResponse<T> = {
  response: T | null
  error: Error | null
  isLoading: boolean
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const useApiCalls = <T>(
  url: string,
  method: HttpMethod = 'GET',
  data: AxiosRequestConfig['data'] = null,
  headers: AxiosRequestConfig['headers'] = {},
): ApiResponse<T> => {
  const [response, setResponse] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const axiosInstance: AxiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: url,
      }),
    [url],
  )

  const fetchData = async () => {
    try {
      const result: AxiosResponse<T> = await axiosInstance({
        method,
        url,
        data,
        headers,
      })

      setResponse(result.data)
    } catch (err: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { response, error, isLoading }
}

export default useApiCalls
