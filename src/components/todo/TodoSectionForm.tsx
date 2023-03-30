import React from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { ISections } from '../../constants/models'

interface IProps {
  // user: UserInfo | undefined;
  setSections: (param: ISections[]) => void
}

const resolver: Resolver<ISections> = async (values) => {
  return {
    values: values.sectionTitle ? values : {},
    errors: !values.sectionTitle
      ? {
          sectionTitle: {
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
  const onSubmit: SubmitHandler<ISections> = (data) => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Section Title"
        {...register('sectionTitle', { required: true, maxLength: 80 })}
      />
      {errors?.sectionTitle && <p>{errors.sectionTitle.message}</p>}

      <input type="submit" />
    </form>
  )
}
