import React, { useState } from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ISections, ITodo } from '../../constants/models'
import useApiCall, { HttpRequestType } from '../../constants/useApiCall'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types'

interface IProps {
  sectionId: number
  isOpen: boolean
  closeModal: () => void
  LoadSection: () => void
}
/**
 * resolver
 * @param values
 * @returns
 */
const resolver: Resolver<ITodo> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  }
}

export const TodoForm: React.FC<IProps> = (props) => {
  const [date, setDate] = useState<DateValueType>({} as DateValueType)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodo>({ resolver })
  const httpProvider = useApiCall()

  /**
   * load section data
   */
  const AddTodo = (newTodoParam: ITodo) => {
    let newTodo: ITodo = {
      ...newTodoParam,
      sectionId: props.sectionId.toString(),
    }
    httpProvider
      .sendRequest<ISections[]>(
        `/sections/${props.sectionId}/todos`,
        HttpRequestType.Post,
        newTodo,
      )
      .then((responseData) => {
        if (responseData.success === true && responseData.data) {
          props.LoadSection()
          props.closeModal()
          toast.success('TODO was deleted add')
        } else {
          toast.error('Data was not loaded')
        }
      })
  }

  const onSubmit: SubmitHandler<ITodo> = (data) => {
    AddTodo(data)
  }

  const handleValueChange = (newValue: any) => {
    setDate(newValue)
  }

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <form className="mb-4 " onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col mb-4">
                    <label className="mb-2 uppercase tracking-wide font-bold text-lg text-grey-darkest">
                      Add TODO Section
                    </label>
                    <input
                      type="text"
                      className="border py-2 px-3 text-grey-darkest my-1 rounded-lg"
                      placeholder="Section Title"
                      {...register('title', { required: true, maxLength: 80 })}
                    />
                    <input
                      type="text"
                      className="border py-2 px-3 text-grey-darkest my-1 rounded-lg"
                      placeholder="Section text"
                      {...register('text', { required: true, maxLength: 80 })}
                    />
                    <input
                      type="datetime-local"
                      id="meeting-time"
                      min="2018-06-07T00:00"
                      max="2025-06-14T00:00"
                      className="border py-2 px-3 text-grey-darkest my-1 rounded-lg"
                      {...register('deadline', {
                        required: true,
                        maxLength: 80,
                      })}
                    />
                  </div>
                  <input
                    type="submit"
                    className="block bg-black hover:bg-teal-dark text-white font-bold w-full rounded-lg uppercase text-lg mx-auto p-4 "
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
