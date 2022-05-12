import React, { useState, useMemo } from 'react'
import useAsyncEffect from 'use-async-effect'
import { Stack } from '@mui/material'
import { BlockRounded } from '@mui/icons-material'

import Card from 'components/Card'
import { fetchAllActiveHolders } from 'api/database'
import PatientForm from './Form'
import PatientBlockModal from './BlockModal'
import { StyledButton } from './styles'

const PatientCard = ({ patient, isLoading, onEdit }) => {
  const [holders, setHolders] = useState([])
  const [open, setOpen] = useState(false)

  useAsyncEffect(async (isMounted) => {
    const allHolders = await fetchAllActiveHolders()
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

  const disabled = !patient?.isActive

  return (
    <>
      <Card title="Detalhes" color="info" isLoading={isLoading}>
        <Stack spacing={4}>
          <PatientForm
            data={patient}
            holders={allHolders}
            onSubmit={onEdit}
            disabled={disabled}
            mode="onBlur"
          />
          <StyledButton
            startIcon={<BlockRounded />}
            color="error"
            variant="outlined"
            onClick={() => setOpen(true)}
            disabled={disabled}
          >
            Desativar paciente
          </StyledButton>
        </Stack>
      </Card>
      <PatientBlockModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={async () => {
          setOpen(false)
          await onEdit({ ...patient, isActive: false })
        }}
      />
    </>
  )
}

export default PatientCard
