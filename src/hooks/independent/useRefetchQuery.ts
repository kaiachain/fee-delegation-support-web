import { useQueryClient } from '@tanstack/react-query'

export type UseRefetchQueryReturn = {
  refetchQuery: (keys: string[]) => void
}

const useRefetchQuery = (): UseRefetchQueryReturn => {
  const queryClient = useQueryClient()
  const refetchQuery = (keys: string[]): void => {
    setTimeout(() => {
      keys.map((x) => {
        queryClient.refetchQueries([x])
      })
      // buffer to call a refetch query
    }, 500)
    setTimeout(() => {
      keys.map((x) => {
        queryClient.refetchQueries([x])
      })
      // buffer to call a refetch query
    }, 2500)
  }
  return { refetchQuery }
}

export default useRefetchQuery
