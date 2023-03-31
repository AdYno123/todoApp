import React, { useEffect, useState } from 'react'
import { ISections, ITodo } from '../../constants/models'
import useApiCall, { HttpRequestType } from '../../constants/useApiCall'
import { RadioGroup } from '@headlessui/react'
import { toast } from 'react-toastify'
import { TodoForm } from './TodoForm'
import TodoLayout from './TodoLayout'
import { TodoFilter } from './TodoFilter'

interface IProps {
  sections: ISections[]
  LoadSection: () => void
}

const TodoList: React.FC<IProps> = (props) => {
  const httpProvider = useApiCall()

  let [isOpen, setIsOpen] = useState<boolean>(false)
  const [sectionId, setSectionId] = useState<number>(0)
  const [filterTitle, setFilterTitle] = useState<string>('')

  function closeModal() {
    setIsOpen(false)
  }

  function openModal(sectionId: number) {
    setSectionId(sectionId)
    setIsOpen(true)
  }
  /**
   * Delete section base on ID
   * @param sectionId ID of section on delete
   */
  const DeleteSection = (sectionId: number) => {
    httpProvider
      .sendRequest<ISections[]>(
        `/sections/${sectionId}`,
        HttpRequestType.Delete,
      )
      .then((responseData) => {
        if (responseData.success === true && responseData.data) {
          props.LoadSection()
          toast.success('Section was deleted successfully')
        } else {
          toast.error('Failed to delete section')
        }
      })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {props.sections.map((section, index) => (
        <div className="w-full px-4 py-16 text-white" key={index}>
          <div className="mx-auto w-full">
            <RadioGroup>
              <RadioGroup.Label as="h2" className="uppercase font-bold mb-1">
                {section.title}{' '}
              </RadioGroup.Label>
              <div className="mb-3 grid grid-cols-2 gap-4">
                <button
                  className="rounded-sm px-3 py-1 bg-red-600 text-red-100 hover:bg-red-700 duration-300 text-sm font-bold"
                  onClick={() => DeleteSection(section.id!)}>
                  Delete Section
                </button>
                <button
                  className="rounded-sm px-3  py-15 bg-green-600 text-green-100 hover:green-red-700 duration-300 text-sm font-bold"
                  onClick={() => openModal(section.id!)}>
                  ADD Todo
                </button>
              </div>
              {section.todos.length > 0 && (
                <span>
                  <TodoFilter setFilterTitle={setFilterTitle} />
                </span>
              )}
              <div className="space-y-2 mt-3">
                {filterTitle
                  ? section.todos
                      .filter((row) => row.title === filterTitle)
                      .map((todo) => (
                        <TodoLayout
                          key={todo.id}
                          todo={todo}
                          sectionId={section.id!}
                          LoadSection={props.LoadSection}
                        />
                      ))
                  : section.todos.map((todo, index) => (
                      <TodoLayout
                        key={index}
                        todo={todo}
                        sectionId={section.id!}
                        LoadSection={props.LoadSection}
                      />
                    ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      ))}
      <TodoForm
        closeModal={closeModal}
        isOpen={isOpen}
        sectionId={sectionId}
        LoadSection={props.LoadSection}
      />
    </div>
  )
}

export default TodoList
