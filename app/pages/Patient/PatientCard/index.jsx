import React, { useState, useMemo, useEffect } from 'react'
import useAsyncEffect from 'use-async-effect'
import { useForm } from 'react-hook-form'
import Card from 'components/Card'
import { editPatient, fetchAllHolders } from 'api/database'
import PatientForm from './Form'

const PatientCard = ({ patient, isLoading, onSaving }) => {
  const [holders, setHolders] = useState([])

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: patient,
    mode: 'onChange',
  })

  useAsyncEffect(async (isMounted) => {
    const allHolders = await fetchAllHolders()
    if (!isMounted()) {
      return
    }

    setHolders(allHolders)
  }, [])

  const allHolders = useMemo(
    () =>
      holders.map(({ id, name, cpf }) => ({
        id,
        label: name,
        cpf,
      })),
    [holders]
  )

  useEffect(() => {
    reset(patient)
  }, [patient])

  const handleConfirm = async ({ holder, phone, ...rest }) => {
    const submitData = {
      ...rest,
      phone: phone.map(({ value }) => value),
      holderId: holder?.id,
    }

    await onSaving(() => editPatient(submitData))
  }

  return (
    <Card title="Detalhes" color="info" isLoading={isLoading}>
      <PatientForm
        data={patient}
        holders={allHolders}
        control={control}
        reset={reset}
        watch={watch}
        onDataChange={handleSubmit(handleConfirm)}
      />
    </Card>
  )
}

export default PatientCard
