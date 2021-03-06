import React from 'react'
import PropTypes from 'prop-types'

import TablePagination from '@material-ui/core/TablePagination'
import {makeStyles} from '@material-ui/core/styles'

import {smallerFontSize, bigFontSize} from 'assets/styles/main.module.scss'

const useStyles = makeStyles({
  root: {
    fontSize: smallerFontSize,
  },
  caption: {
    fontSize: smallerFontSize,
  },
  menuItem: {
    fontSize: smallerFontSize,
  },
  selectIcon: {
    right: '-5px',
    fontSize: bigFontSize,
  },
})

const useNextIconStyles = makeStyles({
  root: {
    padding: '0',
    paddingLeft: '15px',
  },
  label: {
    '& .MuiSvgIcon-root': {
      fontSize: bigFontSize,
    },
  },
})

const useBackIconStyles = makeStyles({
  root: {
    padding: '0',
    paddingRight: '15px',
  },
  label: {
    '& .MuiSvgIcon-root': {
      fontSize: bigFontSize,
    },
  },
})

const formatOneBasedPage = page => page - 1

const formatZeroBasedPage = page => page + 1

const Pagination = ({count, page, onChangePage, loading}) => {
  const classes = useStyles()
  const nextIconClasses = useNextIconStyles()
  const backIconClasses = useBackIconStyles()

  return (
    <TablePagination
      component='div'
      classes={classes}
      count={count}
      page={formatOneBasedPage(page)}
      onChangePage={!loading ? (_, page) => onChangePage(formatZeroBasedPage(page)) : () => {}}
      rowsPerPage={50}
      rowsPerPageOptions={[50]}
      nextIconButtonProps={{classes: nextIconClasses, disabled: loading}}
      backIconButtonProps={{classes: backIconClasses, disabled: loading}}
    />
  )
}

Pagination.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  onChangeRowsPerPage: PropTypes.func,
  loading: PropTypes.bool,
}

export default Pagination
