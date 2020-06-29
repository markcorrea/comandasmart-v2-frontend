import React from 'react'
import PropTypes from 'prop-types'

import {CardList, Table} from 'components'

import useMediaQuery from 'utils/mediaQuery'

import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'
import styles from './index.module.scss'

const ResponsiveTable = ({cardDisplayColumns, tableDisplayColumns, ...props}) => {
  const mediaQueryMedium = useMediaQuery('min', mediaQueryMD)

  return (
    <>
      {mediaQueryMedium ? (
        <Table className={styles.table} displayColumns={cardDisplayColumns} {...props} />
      ) : (
        <div>
          <CardList displayColumns={tableDisplayColumns} {...props} />
        </div>
      )}
    </>
  )
}

ResponsiveTable.propTypes = {
  cardDisplayColumns: PropTypes.array,
  tableDisplayColumns: PropTypes.array,
}

export default ResponsiveTable
