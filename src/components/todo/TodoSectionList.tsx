import React, { useEffect } from 'react'
import { ISections } from '../../constants/models'
import useApiCall from '../../constants/useApiCall'

interface IProps {}

const TodoList: React.FC<IProps> = (props) => {
  // const { response, error, isLoading } = useApiCall<ISections>(
  //   'https://6422c5ba001cb9fc202f6433.mockapi.io/api/sections',
  // )

  // useEffect(() => {
  //   console.log(response)
  // }, [response, error])

  return (
    <ul className="mt-4 space-y-2">
      {/* {props.sections.map((todo, index) => (
        <li
          key={todo.id}
          className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {todo.sectionTitle}
            </h3>
          </div>
        </li>
      ))} */}
    </ul>
  )
}

export default TodoList
