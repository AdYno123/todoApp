import React from 'react'
import { RadioGroup } from '@headlessui/react'
import { IoMdCloudDone } from 'react-icons/io'
import { ITodo } from '../../constants/models'
import useApiCall, { HttpRequestType } from '../../constants/useApiCall'
import { toast } from 'react-toastify'

interface IProps {
  todo: ITodo
  sectionId: number
  LoadSection: () => void
}
const TodoLayout: React.FC<IProps> = (props) => {
  const httpProvider = useApiCall()

  /**
   * Delete section base on ID
   * @param sectionId ID of section on delete
   */
  const DeleteTodo = (sectionId: number, todoId: number) => {
    httpProvider
      .sendRequest<ITodo[]>(
        `/sections/${sectionId}/todos/${todoId}`,
        HttpRequestType.Delete,
      )
      .then((responseData) => {
        if (responseData.success === true && responseData.data) {
          props.LoadSection()
          toast.success('TODO was deleted successfully')
        } else {
          toast.error('Failed to delete todo')
        }
      })
  }

  /**
   * Delete section base on ID
   * @param sectionId ID of section on delete
   */
  const SetIsDoneTodo = (sectionId: number, todo: ITodo) => {
    let newSection: ITodo = { ...todo, isDone: !todo.isDone }
    httpProvider
      .sendRequest<ITodo[]>(
        `/sections/${sectionId}/todos/${todo.id}`,
        HttpRequestType.Put,
        newSection,
      )
      .then((responseData) => {
        if (responseData.success === true && responseData.data) {
          props.LoadSection()
          toast.success('status of the TODO has been changed')
        } else {
          toast.error('Failed to delete todo')
        }
      })
  }
  return (
    <RadioGroup.Option
      key={props.todo.id}
      value={props.todo}
      className={`bg-white relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`}>
      <>
        <div className="flex w-full items-center ">
          <div className="text-sm grid grid-rows-3  w-full">
            <RadioGroup.Label
              as="p"
              className={`font-medium text-gray-900 text-left`}>
              {props.todo.title}
            </RadioGroup.Label>
            <RadioGroup.Description
              as="span"
              className={`inline text-gray-500`}>
              <span>{props.todo.text}</span> <span>{props.todo.deadline}</span>
            </RadioGroup.Description>
            <span className="w-full  grid-cols-3">
              <button
                className="rounded-sm px-3 mx-3 py-1 bg-red-600 text-red-100 hover:bg-red-700 duration-300 text-sm font-bold"
                onClick={() => DeleteTodo(props.sectionId, +props.todo.id!)}>
                Delete Todo
              </button>
              <button
                className={`rounded-sm px-3 mx-3 py-1  ${
                  props.todo.isDone
                    ? 'bg-green-600 text-green-100 hover:green-red-700'
                    : 'bg-orange-600 text-orange-100 hover:orange-red-700'
                }  duration-300 text-sm font-bold`}
                onClick={() => SetIsDoneTodo(props.sectionId, props.todo)}>
                {!props.todo.isDone ? 'Waiting' : 'Solved'}
              </button>
              {props.todo.isDone && (
                <span className="text-black">
                  <IoMdCloudDone className="inline-block text-2xl" />
                </span>
              )}
            </span>
          </div>
        </div>
      </>
    </RadioGroup.Option>
  )
}

export default TodoLayout
