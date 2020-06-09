import React, {useState, useEffect} from 'react'
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

const Table = ({className, rows: defaultRows, columns, onViewClick, onEditClick, onDeleteClick, hasCheckboxWithButtons}) => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    const result = hasCheckboxWithButtons ? defaultRows.map(row => ({...row, checked: false})) : defaultRows
    setRows(result)
  }, [defaultRows, hasCheckboxWithButtons, setRows])

  const checkRow = (row, index) => {
    const newRow = {...row, checked: !row.checked}
    setRows(rows => {
      rows.splice(index, 1, newRow)
      return [...rows]
    })
  }

  const sortColumn = key => {
    const formatCell = cell => (typeof cell === 'string' ? cell.toLowerCase() : cell)

    const sorted = rows.sort((a, b) => {
      const rowA = formatCell(a[key])
      const rowB = formatCell(b[key])

      if (rowA > rowB) return 1
      if (rowA < rowB) return -1
      return 0
    })

    setRows([...sorted])
  }

  const toggleAll = () =>
    setRows(rows => {
      const hasUnchecked = rows.some(row => row.checked === false)
      return rows.map(row => ({...row, checked: hasUnchecked}))
    })

  return (
    <div className={clsx(styles.tableContainer, className)}>
      <table>
        <thead>
          <tr>
            {hasCheckboxWithButtons && <th></th>}
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
              <tr key={`table_row_${rowIndex}`}>
                {hasCheckboxWithButtons && (
                  <td>
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
                    <td className={clsx(cell.textAlign ? styles[cell.textAlign] : '')} key={`cell_${rowIndex}_${cellIndex}`}>
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
      {hasCheckboxWithButtons && (
        <div className={styles.buttons}>
          <Button onClick={toggleAll}>Select All</Button>
          {hasCheckboxWithButtons.map((button, index) => {
            const {label, onClick, classes} = button

            return (
              <Button
                key={`button_${index}`}
                classes={buttonClasses(classes)}
                onClick={() => onClick(rows.filter(row => row.checked))}>
                {label}
              </Button>
            )
          })}
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
  hasCheckboxWithButtons: PropTypes.array,
}

export default Table
