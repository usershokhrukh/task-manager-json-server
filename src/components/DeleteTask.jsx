import React from 'react'

const DeleteTask = () => {
  return (
    <div className='delete-task'>
      <h2 className='delete-task__title'>Please confirm to delete that task</h2>
      <div className='delete-task__box'>
        <button className='delete-task__button delete-task__button-cancel'>Cancel</button>
        <button className='delete-task__button delete-task__button-yes'>I'm sure</button>
      </div>
    </div>
  )
}

export default DeleteTask