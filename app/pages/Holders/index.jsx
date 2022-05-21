import React, { useContext, useState, useMemo } from 'react'
import useAsyncEffect from 'use-async-effect'
import {
  fetchAllPatients,
  fetchAllHolders,
  createHolder,
  editHolder,
} from 'api/database'
import Breadcrumbs from 'containers/Breadcrumbs'
import { SaveContext } from 'contexts/Save'
import Page from 'containers/Page'
import { unformatCPF } from 'utils/cpf'
import Table from './Table'

const HoldersPage = () => {
  const { saving, onSaving } = useContext(SaveContext)
  const [holders, setHolders] = useState([])
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  useAsyncEffect(async (isMounted) => {
    const allHolders = await fetchAllHolders()
    const allPatients = await fetchAllPatients()
    if (!isMounted()) {
      return
    }

    const allHoldersWithPatient = allHolders.map((holder) => ({
      ...holder,
      patients: [
        ...allPatients.filter(({ holderId }) => holderId === holder.id),
      ],
    }))

    setHolders(allHoldersWithPatient)
    setPatients(allPatients)
    setLoading(false)
  }, [])

  const filteredHolders = useMemo(
    () =>
      holders.filter(
        ({ name, cpf, isActive }) =>
          (showAll || isActive) &&
          (name.toLowerCase().includes(search.toLowerCase()) ||
            unformatCPF(cpf).includes(search))
      ),
    [holders, showAll, search]
  )

  const onCreateHolder = async (holder) => {
    const createdHolder = await onSaving(() => createHolder(holder))
    const newHolders = [...holders, { ...createdHolder, patients: [] }]
    setHolders(newHolders)
  }

  const onEditHolder = async (holder) => {
    await onSaving(() => editHolder(holder))
    const holderIndex = holders.findIndex(({ id }) => id === holder.id)
    const newHolders = [...holders]
    newHolders[holderIndex] = {
      ...holder,
      patients: [...patients.filter(({ holderId }) => holderId === holder.id)],
    }
    setHolders(newHolders)
  }

  const onDeleteHolder = async (holder) => {
    const newHolder = { ...holder, isActive: false }
    await onSaving(() => editHolder(newHolder))
    const holderIndex = holders.findIndex(({ id }) => id === newHolder.id)
    const newHolders = [...holders]
    newHolders[holderIndex] = {
      ...newHolder,
      patients: [
        ...patients.filter(({ holderId }) => holderId === newHolder.id),
      ],
    }
    setHolders(newHolders)
  }

  return (
    <Page breadcrumbs={<Breadcrumbs current="Responsáveis" />}>
      <Table
        data={filteredHolders}
        isLoading={loading || saving}
        onCreate={onCreateHolder}
        onEdit={onEditHolder}
        onDelete={onDeleteHolder}
        searchValue={search}
        onSearchChange={(_, value) => setSearch(value)}
        showAllValue={showAll}
        onShowAllChange={(value) => setShowAll(value)}
      />
    </Page>
  )
}

export default HoldersPage
