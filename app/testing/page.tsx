import EditListForm from '@/components/Forms/EditList/EditListForm'
import NewListForm from '@/components/Forms/NewList/NewListForm'
import React from 'react'

const page = () => {
  return (
    <div>
        <NewListForm />
        <EditListForm />
    </div>
  )
}

export default page