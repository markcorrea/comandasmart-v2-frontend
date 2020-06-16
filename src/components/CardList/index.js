import React, {useState} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import {makeStyles} from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'

import {SpeedDial} from 'components'

import styles from './index.module.scss'

const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    marginBottom: '20px',
  },
  button: {
    border: 'solid thin blue',
    float: 'right',
  },
})

const CardList = ({className, rows, columns, titleColumn, onViewClick, onEditClick, onDeleteClick, hasCheckboxWithButtons}) => {
  const classes = useStyles()
  const [checked, setChecked] = useState(true)

  return (
    <>
      {rows.map((row, rowIndex) => (
        <Card key={`card_item_${rowIndex}`} className={clsx(classes.root, className)}>
          <CardActionArea>
            <CardContent>
              {hasCheckboxWithButtons && (
                <Checkbox
                  className={styles.checkbox}
                  checked={checked}
                  color='primary'
                  onChange={event => setChecked(event.target.checked)}
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              )}
              {titleColumn ? <div className={styles.title}>{row[titleColumn]}</div> : <div className={styles.emptyRow} />}
              {columns.map((column, columnIndex) => {
                const {key, value} = column
                if (key !== titleColumn) {
                  return (
                    <div key={`card_item_row_${rowIndex}_${columnIndex}`} className={styles.row}>
                      <div className={styles.name}>{value}</div>
                      <div className={styles.value}>{row[key]}</div>
                    </div>
                  )
                }
                return null
              })}
            </CardContent>
          </CardActionArea>
          <CardActions className={styles.buttons}>
            {onViewClick && (
              <Button className={clsx(styles.button, styles.view)} size='small' color='primary' onClick={() => onViewClick(row)}>
                <i className='far fa-eye' />
              </Button>
            )}
            {onEditClick && (
              <Button className={clsx(styles.button, styles.edit)} size='small' color='primary' onClick={() => onEditClick(row)}>
                <i className='far fa-edit' />
              </Button>
            )}
            {onDeleteClick && (
              <Button
                className={clsx(styles.button, styles.delete)}
                size='small'
                color='primary'
                onClick={() => onDeleteClick(row)}>
                <i className='fas fa-trash-alt' />
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
      <SpeedDial />
    </>
  )
}

CardList.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.array,
  columns: PropTypes.array,
  titleColumn: PropTypes.string,
  onViewClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  hasCheckboxWithButtons: PropTypes.array,
}

export default CardList
