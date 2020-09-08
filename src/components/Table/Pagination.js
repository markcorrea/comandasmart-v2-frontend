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

const Pagination = ({count, page, onChangePage, rowsPerPage, onChangeRowsPerPage, loading}) => {
  const classes = useStyles()
  const nextIconClasses = useNextIconStyles()
  const backIconClasses = useBackIconStyles()

  return (
    <TablePagination
      component='div'
      classes={classes}
      count={count}
      page={page}
      onChangePage={!loading ? (_, page) => onChangePage(page) : () => {}}
      rowsPerPage={rowsPerPage}
      nextIconButtonProps={{classes: nextIconClasses}}
      backIconButtonProps={{classes: backIconClasses}}
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
