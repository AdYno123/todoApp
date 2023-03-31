import React from 'react'
import { TodoSectionForm } from '../components/todo/TodoSectionForm'
import { ISections } from '../constants/models'
import TodoSectionList from '../components/todo/TodoSectionList'

interface IProps {
  sections: ISections[]
  LoadData: () => void
}
const Home: React.FC<IProps> = (props) => {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">rerender</h1>
      <TodoSectionForm LoadSection={props.LoadData} />
      <TodoSectionList LoadSection={props.LoadData} sections={props.sections} />
    </div>
  )
}

export default Home
