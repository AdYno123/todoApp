import React, { useEffect, useState } from 'react'
import { TodoSectionForm } from '../components/todo/TodoSectionForm'
import { ISections } from '../constants/models'
import TodoSectionList from '../components/todo/TodoSectionList'
import useApiCall from '../constants/useApiCall'

const Home = () => {
  const [sections, setSections] = useState<ISections[]>([])

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">rerender</h1>
      <TodoSectionForm setSections={setSections} />
      <TodoSectionList />
    </div>
  )
}

export default Home
