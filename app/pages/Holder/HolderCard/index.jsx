import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Card from 'components/Card'
import { editHolder } from 'api/database'
import HolderForm from 'pages/Holder/HolderCard/Form'

const HolderCard = ({ holder, isLoading, onSaving }) => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: holder,
    mode: 'onChange',
  })

  useEffect(() => {
    reset(holder)
  }, [holder])

  const handleConfirm = async (submitData) => {
    await onSaving(() => editHolder(submitData))
  }

  return (
    <Card title="Detalhes" color="info" isLoading={isLoading}>
      <HolderForm
        data={holder}
        control={control}
        reset={reset}
        onDataChange={handleSubmit(handleConfirm)}
      />
    </Card>
  )
}

export default HolderCard
