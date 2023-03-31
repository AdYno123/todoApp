import { RadioGroup } from '@headlessui/react'
import React from 'react'
import TodoLayout from '../components/todo/TodoLayout'
import { ISections } from '../constants/models'

interface IProps {
  sections: ISections[]
  LoadData: () => void
}
const DeactiveTodo: React.FC<IProps> = (props) => {
  return (
    <div className="container mx-auto">
      {props.sections.map((section, index) => (
        <RadioGroup key={index} className="my-5">
          <RadioGroup.Label
            as="h2"
            className="uppercase font-bold text-white mb-1">
            {section.title}{' '}
          </RadioGroup.Label>
          {section.todos
            .filter((todo) => todo.isDone === true)
            .map((todo, index) => (
              <div className="my-5">
                <TodoLayout
                  key={index}
                  todo={todo}
                  sectionId={section.id!}
                  LoadSection={props.LoadData}
                />
              </div>
            ))}
        </RadioGroup>
      ))}
    </div>
  )
}

export default DeactiveTodo
