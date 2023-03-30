import { useState, useEffect, useMemo } from 'react'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

type ApiResponse<T> = {
  response: T | null
  error: Error | null
  isLoading: boolean
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const useApiCall = <T>(
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

  useEffect(() => {
    console.log('first')
    let unmounted = false

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result: AxiosResponse<T> = await axiosInstance({
          method,
          url,
          data,
          headers,
        })

        if (!unmounted) {
          setResponse(result.data)
        }
      } catch (error: any) {
        if (!unmounted) {
          setError(error)
        }
      } finally {
        if (!unmounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      unmounted = true
    }
  }, [axiosInstance, method, url, data, headers])

  return { response, error, isLoading }
}

export default useApiCall
