import React, {useMemo, memo} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Pagination from './Pagination'

import styles from './index.module.scss'

const Table = ({className, rows, columns, onViewClick, onEditClick, onDeleteClick, withCheckbox}) => {
  useMemo(() => {
    if (withCheckbox) {
      return rows.map(row => ({...row, checked: false}))
    }
  }, [rows, withCheckbox])

  return (
    <div className={clsx(styles.tableContainer, className)}>
      <table>
        <thead>
          <tr>
            {withCheckbox && <th></th>}
            {columns.map((column, index) => (
              <th key={`column_${index}`}>{column.value}</th>
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
                {withCheckbox && (
                  <td>
                    <input type='checkbox' checked={row['checked']} />
                  </td>
                )}
                {columns.map((cell, cellIndex) => {
                  return <td key={`cell_${rowIndex}_${cellIndex}`}>{row[cell.key]}</td>
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
}

export default memo(Table)
