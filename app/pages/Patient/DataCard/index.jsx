import React from 'react'
import { useForm } from 'react-hook-form'
import Card from 'components/Card'
import PatientsForm from 'components/PatientsForm'
import { editPatient } from 'api/database'

const DataCard = ({ patient }) => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: patient,
    mode: 'onChange',
  })

  const handleConfirm = async (newData) => {
    const submitData = {
      ...newData,
      ...(newData.phone
        ? { phone: newData.phone.map(({ value }) => value) }
        : {}),
    }
    console.log(submitData)
    await editPatient(submitData)
  }

  return (
    <Card title="Detalhes" color="info">
      <PatientsForm
        data={patient}
        control={control}
        reset={reset}
        watch={watch}
        onDataChange={handleSubmit(handleConfirm)}
      />
    </Card>
  )
}

export default DataCard
