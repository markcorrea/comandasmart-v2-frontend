import React from 'react'
import PropTypes from 'prop-types'

import {CardList, Table} from 'components'

import useMediaQuery from 'utils/mediaQuery'

import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'
import styles from './index.module.scss'

import {rows, columns} from './mock'

const ResponsiveTable = ({buttons}) => {
  const mediaQueryMedium = useMediaQuery('min', mediaQueryMD)

  return (
    <>
      {mediaQueryMedium ? (
        <Table
          className={styles.table}
          rows={rows.products}
          columns={columns}
          onViewClick={viewItem => console.log('view', viewItem)}
          onEditClick={editItem => console.log('edit', editItem)}
          onDeleteClick={deleteItem => console.log('delete', deleteItem)}
          hasCheckbox
          hasButtons={buttons}
          rowClickable={row => console.log('ROW CLICKABLE', row)}
        />
      ) : (
        <div>
          <CardList
            columns={columns}
            titleColumn='dessert'
            rows={rows.products}
            onViewClick={row => console.log('view', row)}
            onEditClick={row => console.log('edit', row)}
            onDeleteClick={row => console.log('delete', row)}
            hasCheckbox
            // hasButtons={buttons}
          />
        </div>
      )}
    </>
  )
}

ResponsiveTable.propTypes = {
  buttons: PropTypes.array.isRequired,
}

ResponsiveTable.defaultProps = {
  buttons: [],
}

export default ResponsiveTable
