import React, {useState, useCallback, useEffect, useMemo, memo} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import {Button} from 'components'

import Pagination from './Pagination'

import styles from './index.module.scss'

const buttonClasses = classes => ({
  root: {
    minWidth: '100px',
    float: 'right',
    marginLeft: '20px',
    ...(classes ? classes : {}),
  },
})

const Table = ({
  className,
  rows: defaultRows,
  columns,
  onViewClick,
  onEditClick,
  onDeleteClick,
  hasCheckbox,
  hasButtons,
  hasPagination,
  rowClickable,
  displayColumns,
  additionalRow,
  emptyTableMessage,
  loading,
}) => {
  const [rows, setRows] = useState([])
  const [sortingOrder, setSortingOrder] = useState('')

  useEffect(() => {
    setRows(() => (hasCheckbox ? defaultRows.map(row => ({...row, checked: false})) : defaultRows))
  }, [defaultRows, hasCheckbox, setRows])

  const checkRow = useCallback(
    (row, index) => {
      if (loading) return null
      const newRow = {...row, checked: !row.checked}
      setRows(rows => {
        rows.splice(index, 1, newRow)
        return [...rows]
      })
    },
    [setRows, loading]
  )

  const sortColumn = useCallback(
    key => {
      if (loading) return null
      const formatCell = cell => (typeof cell === 'string' ? cell.toLowerCase() : cell)

      const sort = (rowA, rowB) => {
        if (rowA > rowB) return 1
        if (rowA < rowB) return -1
        return 0
      }

      setRows(rows => {
        const sorted = rows.sort((a, b) => {
          const rowA = formatCell(a[key])
          const rowB = formatCell(b[key])

          return sortingOrder === 'asc' ? sort(rowA, rowB) : sort(rowB, rowA)
        })

        setSortingOrder(() => (sortingOrder === 'asc' ? 'desc' : 'asc'))

        return [...sorted]
      })
    },
    [setRows, sortingOrder, setSortingOrder, loading]
  )

  const toggleAll = useCallback(
    () =>
      setRows(rows => {
        const hasUnchecked = rows.some(row => row.checked === false)
        return rows.map(row => ({...row, checked: hasUnchecked}))
      }),
    [setRows]
  )

  const defineColspan = useMemo(() => {
    let count = columns.length
    if (onEditClick) count++
    if (onViewClick) count++
    if (onDeleteClick) count++
    if (hasCheckbox) count++
    return count.toString()
  }, [columns, hasCheckbox, onEditClick, onViewClick, onDeleteClick])

  const columnsToDisplay = useMemo(() => {
    if (displayColumns.length) {
      return columns.filter(column => displayColumns.some(displayColumn => displayColumn === column.key))
    }
    return columns
  }, [displayColumns, columns])

  const clickableRowFunction = useCallback(
    (row, rowIndex) => {
      if (loading) return null
      if (hasCheckbox) return {onClick: () => checkRow(row, rowIndex)}
      if (rowClickable) return {onClick: () => rowClickable(row)}
      return {}
    },
    [checkRow, hasCheckbox, rowClickable, loading]
  )

  return (
    <div className={clsx(styles.tableContainer, className)}>
      <table>
        <thead>
          <tr>
            {hasCheckbox && <th></th>}
            {columnsToDisplay.map((column, index) => (
              <th
                onClick={() => sortColumn(column.key)}
                className={clsx(column.textAlign ? styles[column.textAlign] : styles.right)}
                key={`column_${index}`}>
                {column.value}
              </th>
            ))}
            {onViewClick && <th>Visualizar</th>}
            {onEditClick && <th>Editar</th>}
            {onDeleteClick && <th>Excluir</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, rowIndex) => {
              return (
                <tr key={`table_row_${rowIndex}`} className={rowClickable || hasCheckbox ? styles.rowClickable : ''}>
                  {hasCheckbox && (
                    <td {...clickableRowFunction(row, rowIndex)}>
                      <input
                        type='checkbox'
                        name={`table_row_${rowIndex}`}
                        checked={row.checked}
                        onChange={() => checkRow(row, rowIndex)}
                      />
                    </td>
                  )}
                  {columnsToDisplay.map((cell, cellIndex) => {
                    return (
                      <td
                        className={clsx(cell.textAlign ? styles[cell.textAlign] : styles.right)}
                        key={`cell_${rowIndex}_${cellIndex}`}
                        {...clickableRowFunction(row, rowIndex)}>
                        {row[cell.key]}
                      </td>
                    )
                  })}
                  {onViewClick && (
                    <td className={styles.view} onClick={!loading ? () => onViewClick(row) : null}>
                      <i className='far fa-eye' />
                    </td>
                  )}
                  {onEditClick && (
                    <td className={styles.edit} onClick={!loading ? () => onEditClick(row) : null}>
                      <i className='far fa-edit' />
                    </td>
                  )}
                  {onDeleteClick && (
                    <td className={styles.delete} onClick={!loading ? () => onDeleteClick(row) : null}>
                      <i className='fas fa-trash-alt' />
                    </td>
                  )}
                </tr>
              )
            })
          ) : (
            <tr>
              <td className={styles.center} colSpan={defineColspan}>
                {emptyTableMessage}
              </td>
            </tr>
          )}
          {additionalRow && (
            <tr>
              <td colSpan={defineColspan}>{additionalRow}</td>
            </tr>
          )}
        </tbody>
      </table>
      {hasPagination && (
        <div className={styles.pagination}>
          <Pagination
            loading={loading}
            count={100}
            page={1}
            onChangePage={console.log}
            rowsPerPage={10}
            onChangeRowsPerPage={console.log}
          />
        </div>
      )}
      {(hasButtons || hasCheckbox) && (
        <div className={styles.buttons}>
          {hasCheckbox && (
            <Button disabled={loading} onClick={toggleAll}>
              Selecionar Tudo
            </Button>
          )}
          {hasButtons &&
            hasButtons.map((button, index) => {
              const {label, onClick, classes} = button
              const returnRows = hasCheckbox ? rows.filter(row => row.checked) : rows

              return (
                <Button
                  key={`button_${index}`}
                  classes={buttonClasses(classes)}
                  disabled={loading}
                  onClick={() => onClick(returnRows)}>
                  {label}
                </Button>
              )
            })}
          <div style={{clear: 'both'}} />
        </div>
      )}
    </div>
  )
}

Table.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.array,
  columns: PropTypes.array,
  onViewClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  withCheckbox: PropTypes.bool,
  hasCheckbox: PropTypes.bool,
  hasButtons: PropTypes.array,
  hasPagination: PropTypes.bool,
  rowClickable: PropTypes.func,
  displayColumns: PropTypes.array,
  additionalRow: PropTypes.any,
  emptyTableMessage: PropTypes.string,
  loading: PropTypes.bool,
}

Table.defaultProps = {
  hasCheckbox: false,
  displayColumns: [],
  additionalRow: null,
  emptyTableMessage: 'Não há itens cadastrados.',
  loading: false,
}

export default memo(Table)
