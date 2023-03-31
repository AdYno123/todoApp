import React from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ISections } from '../../constants/models'
import useApiCall, { HttpRequestType } from '../../constants/useApiCall'

interface IProps {
  LoadSection: () => void
}
/**
 * resolver
 * @param values
 * @returns
 */
const resolver: Resolver<ISections> = async (values) => {
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

export const TodoSectionForm: React.FC<IProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISections>({ resolver })
  const httpProvider = useApiCall()

  /**
   * Add new section
   */
  const AddSection = (sectionTitle: string) => {
    let newSection: ISections = {
      title: sectionTitle,
      todos: [],
    }
    httpProvider
      .sendRequest<ISections[]>('/sections', HttpRequestType.Post, newSection)
      .then((responseData) => {
        if (responseData.success === true && responseData.data) {
          props.LoadSection()
          toast.success('Section was add successfully')
        } else {
          toast.error('Data was not loaded')
        }
      })
  }

  const onSubmit: SubmitHandler<ISections> = (data) => {
    AddSection(data.title)
  }

  return (
    <div className="flex items-center  bg-teal-lighter">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4  md:mx-auto">
        <form
          className="mb-4 md:flex md:flex-wrap md:justify-between"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full mb-4  text-center">
            <label className="mb-2 uppercase tracking-wide font-bold text-lg text-grey-darkest">
              Add TODO Section
            </label>
            <input
              type="text"
              className="border py-2 px-3 text-grey-darkest md:mr-2"
              placeholder="Section Title"
              {...register('title', { required: true, maxLength: 80 })}
            />
          </div>
          <input
            type="submit"
            className="block bg-black hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4  rounded-lg w-full"
          />
        </form>
      </div>
    </div>
  )
}
