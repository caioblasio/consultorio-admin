import React from 'react'
import { Modal, Stack, TextField } from '@mui/material'
import {
  StyledModalContainer,
  StyledFormContainer,
  StyledTitle,
} from './styles'

const CreateModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalContainer elevation={3}>
        <Stack spacing={2}>
          <StyledTitle variant="h6" component="h2">
            Criar Paciente
          </StyledTitle>
          <StyledFormContainer>
            <Stack spacing={4}>
              <TextField label="Nome Completo" />
              <TextField label="Celular" />
              <TextField label="Email" />
              <TextField label="CPF" />
            </Stack>
          </StyledFormContainer>
        </Stack>
      </StyledModalContainer>
    </Modal>
  )
}

export default CreateModal
