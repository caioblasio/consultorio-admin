import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Card from 'components/Card'
import { editPatient } from 'api/database'
import PatientForm from './Form'

const PatientCard = ({ patient, isLoading }) => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: patient,
    mode: 'onChange',
  })

  useEffect(() => {
    reset(patient)
  }, [patient])

  const handleConfirm = async (newData) => {
    const submitData = {
      ...newData,
      ...(newData.phone
        ? { phone: newData.phone.map(({ value }) => value) }
        : {}),
    }

    await editPatient(submitData)
  }

  return (
    <Card title="Detalhes" color="info" isLoading={isLoading}>
      <PatientForm
        data={patient}
        control={control}
        reset={reset}
        watch={watch}
        onDataChange={handleSubmit(handleConfirm)}
      />
    </Card>
  )
}

export default PatientCard
