import React, { useContext } from 'react'
import PageComponent from 'components/Page'
import { SaveContext } from 'contexts/Save'

const Page = ({ breadcrumbs, children, className, disableAutoSave }) => {
  const { saving } = useContext(SaveContext)
  return (
    <PageComponent
      isSaving={saving}
      breadcrumbs={breadcrumbs}
      className={className}
      disableAutoSave={disableAutoSave}
    >
      {children}
    </PageComponent>
  )
}

export default Page
