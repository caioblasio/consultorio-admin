import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { BlockRounded } from '@mui/icons-material'

import Card from 'components/Card'
import HolderForm from 'pages/Holder/HolderCard/Form'
import { StyledButton } from './styles'
import HolderBlockModal from './BlockModal'

const HolderCard = ({ holder, isLoading, onEdit }) => {
  const [open, setOpen] = useState(false)

  const disabled = !holder?.isActive

  return (
    <>
      <Card title="Detalhes" color="info" isLoading={isLoading}>
        <Stack spacing={4}>
          <HolderForm data={holder} onSubmit={onEdit} disabled={disabled} />
          <StyledButton
            startIcon={<BlockRounded />}
            color="error"
            variant="outlined"
            onClick={() => setOpen(true)}
            disabled={disabled}
          >
            Desativar responsável
          </StyledButton>
        </Stack>
      </Card>
      <HolderBlockModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={async () => {
          setOpen(false)
          await onEdit({ ...holder, isActive: false })
        }}
      />
    </>
  )
}

export default HolderCard
