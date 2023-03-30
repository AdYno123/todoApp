export interface ISections {
  id?: number
  sectionTitle: string
  todos: ITodo[]
}
export interface ITodo {
  title: string
  text: string
  deadline: string
  id: string
  sectionId: string
}
