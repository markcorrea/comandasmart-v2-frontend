import React, {useState, useCallback, useEffect} from 'react'
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
  rowClickable,
}) => {
  const [rows, setRows] = useState([])
  const [sortingOrder, setSortingOrder] = useState('')

  useEffect(() => {
    setRows(() => (hasCheckbox ? defaultRows.map(row => ({...row, checked: false})) : defaultRows))
  }, [defaultRows, hasCheckbox, setRows])

  const checkRow = useCallback(
    (row, index) => {
      const newRow = {...row, checked: !row.checked}
      setRows(rows => {
        rows.splice(index, 1, newRow)
        return [...rows]
      })
    },
    [setRows]
  )

  const sortColumn = useCallback(
    key => {
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
    [setRows, sortingOrder, setSortingOrder]
  )

  const toggleAll = useCallback(
    () =>
      setRows(rows => {
        const hasUnchecked = rows.some(row => row.checked === false)
        return rows.map(row => ({...row, checked: hasUnchecked}))
      }),
    [setRows]
  )

  const clickableRowFunction = useCallback(
    (row, rowIndex) => {
      if (hasCheckbox) return {onClick: () => checkRow(row, rowIndex)}
      if (rowClickable) return {onClick: () => rowClickable(row)}
      return {}
    },
    [checkRow, hasCheckbox, rowClickable]
  )

  return (
    <div className={clsx(styles.tableContainer, className)}>
      <table>
        <thead>
          <tr>
            {hasCheckbox && <th></th>}
            {columns.map((column, index) => (
              <th
                onClick={() => sortColumn(column.key)}
                className={clsx(column.textAlign ? styles[column.textAlign] : '')}
                key={`column_${index}`}>
                {column.value}
              </th>
            ))}
            {onViewClick && <th>View</th>}
            {onEditClick && <th>Edit</th>}
            {onDeleteClick && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            return (
              <tr key={`table_row_${rowIndex}`} className={rowClickable ? styles.rowClickable : ''}>
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
                {columns.map((cell, cellIndex) => {
                  return (
                    <td
                      className={clsx(cell.textAlign ? styles[cell.textAlign] : '')}
                      key={`cell_${rowIndex}_${cellIndex}`}
                      {...clickableRowFunction(row, rowIndex)}>
                      {row[cell.key]}
                    </td>
                  )
                })}
                {onViewClick && (
                  <td className={styles.view} onClick={() => onViewClick(row)}>
                    <i className='far fa-eye' />
                  </td>
                )}
                {onEditClick && (
                  <td className={styles.edit} onClick={() => onEditClick(row)}>
                    <i className='far fa-edit' />
                  </td>
                )}
                {onDeleteClick && (
                  <td className={styles.delete} onClick={() => onDeleteClick(row)}>
                    <i className='fas fa-trash-alt' />
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Pagination count={100} page={1} onChangePage={console.log} rowsPerPage={10} onChangeRowsPerPage={console.log} />
      </div>
      {(hasButtons || hasCheckbox) && (
        <div className={styles.buttons}>
          {hasCheckbox && <Button onClick={toggleAll}>Select All</Button>}
          {hasButtons &&
            hasButtons.map((button, index) => {
              const {label, onClick, classes} = button
              const returnRows = hasCheckbox ? rows.filter(row => row.checked) : rows

              return (
                <Button key={`button_${index}`} classes={buttonClasses(classes)} onClick={() => onClick(returnRows)}>
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
  rowClickable: PropTypes.func,
}

Table.defaultProps = {
  hasCheckbox: false,
}

export default Table
