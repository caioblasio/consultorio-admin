import React, { useState, useMemo } from 'react'
import { Stack } from '@mui/material'
import { BlockRounded } from '@mui/icons-material'

import Card from 'components/Card'
import PatientForm from './Form'
import PatientBlockModal from './BlockModal'
import { StyledButton } from './styles'

const PatientCard = ({ patient, holders, isLoading, onEdit }) => {
  const [open, setOpen] = useState(false)

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
