import React from 'react'
import { Modal as MuiModal, IconButton, Stack, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import CloseIcon from '@mui/icons-material/Close'
import {
  StyledModalContainer,
  StyledChildrenContainer,
  StyledTitle,
  StyledCloseContainer,
} from './styles'

const Modal = ({ children, title, open = false, onClose, actions = [] }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <StyledModalContainer elevation={3}>
        <StyledCloseContainer>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </StyledCloseContainer>
        <Stack spacing={2}>
          <StyledTitle variant="h6" component="h2">
            {title}
          </StyledTitle>
          <StyledChildrenContainer>{children}</StyledChildrenContainer>
          {actions.length > 0 && (
            <Grid container alignItems="center" direction="row-reverse">
              {actions.map(({ label, onClick, isLoading = false }, index) => (
                <Grid item key={`action-${label}`}>
                  <LoadingButton
                    onClick={onClick}
                    variant={index === 0 ? 'contained' : undefined}
                    color={index === 0 ? 'primary' : undefined}
                    loading={isLoading}
                  >
                    {label}
                  </LoadingButton>
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </StyledModalContainer>
    </MuiModal>
  )
}

export default Modal
