import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable, SpeedDial} from 'components'

import {useStore} from 'store'

import useServices from 'services'

import styles from './index.module.scss'

export const columns = [
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
]

const CompanyList = () => {
  const {showMenu, loading, confirmationDialog} = useStore()
  const history = useHistory()

  const {getCompanies, deleteCompanyById} = useServices()

  const [companies, setCompanies] = useState({
    data: [],
    count: 0,
    page: 0,
    rowsPerPage: 0,
  })

  const speedDialButtons = useMemo(
    () => [
      {
        label: 'Nova Empresa',
        onClick: () => history.push(`/company/`),
      },
    ],
    [history]
  )

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchCompanies = async () => {
      const result = await getCompanies()
      if (result) setCompanies(result.data)
    }
    fetchCompanies()
  }, [getCompanies, setCompanies])

  const deleteCompany = useCallback(
    async id => {
      const result = await deleteCompanyById(id)
      if (result) setCompanies(result)
    },
    [deleteCompanyById, setCompanies]
  )
  return (
    <>
      <header className={styles.header}>
        <h1>Empresas</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={companies.data || []}
          titleColumn='name'
          onEditClick={row => history.push(`/company/${row.id}`)}
          rowClickable={row => history.push(`/company/${row.id}`)}
          onDeleteClick={row =>
            confirmationDialog({
              header: 'Excluir empresa',
              body: `Deseja realmente excluir ${row.name}?`,
              onConfirm: () => deleteCompany(row.id),
            })
          }
          emptyTableMessage='Não há empresas registradas.'
          loading={loading}
        />
      </Paper>
      <div className={styles.speedDialContainer}>
        <SpeedDial buttons={speedDialButtons} />
      </div>
    </>
  )
}

export default memo(CompanyList)
