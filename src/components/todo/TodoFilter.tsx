import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ISections, ITodo } from '../../constants/models'
interface IProps {
  setFilterTitle: (value: string) => void
}

export const TodoFilter: React.FC<IProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodo>({})

  const onSubmit: SubmitHandler<ITodo> = (data) => {
    props.setFilterTitle(data.title)
  }

  return (
    <form
      className="mb-4 md:flex md:flex-wrap md:justify-between"
      onChange={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-4 md:w-1/2">
        <input
          type="text"
          className="border py-2 px-3 text-grey-darkest md:mr-2 text-black"
          placeholder="Write something for filtering"
          {...register('title', { required: true, maxLength: 80 })}
        />
      </div>
    </form>
  )
}
