export interface ServiceResponse<T> {
  message: string
  success: boolean
  data: T | null
}
export interface ISections {
  id?: number
  title: string
  todos: ITodo[]
}
export interface ITodo {
  title: string
  text: string
  deadline: string
  sectionId: string
  isDone: boolean
  id?: string
}
