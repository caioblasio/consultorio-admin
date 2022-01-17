import React, { useEffect, useState } from 'react'
import { Modal, Typography, Stack } from '@mui/material'
import TextField from 'components/TextField'
import {
  StyledModalContainer,
  StyledFormContainer,
  StyledTitle,
} from './styles'

const CreatePatientModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalContainer elevation={3}>
        <Stack spacing={2}>
          <StyledTitle variant="h6" component="h2">
            Criar Paciente
          </StyledTitle>
          <StyledFormContainer>
            <Stack spacing={4}>
              <TextField label="Nome Completo do Paciente" variant="outlined" />
              <TextField label="Celular" variant="outlined" />
              <TextField label="Email" variant="outlined" />
              <TextField label="CPF" variant="outlined" />
            </Stack>
          </StyledFormContainer>
        </Stack>
        
      </StyledModalContainer>
    </Modal>
  )
}

export default CreatePatientModal
