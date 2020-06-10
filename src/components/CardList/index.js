import React from 'react'
import clsx from 'clsx'

import {makeStyles} from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'

import styles from './index.module.scss'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    marginBottom: '20px',
  },
  button: {
    border: 'solid thin blue',
    float: 'right',
  },
})

const CardList = () => {
  const classes = useStyles()
  const [checked, setChecked] = React.useState(true)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Checkbox
            className={styles.checkbox}
            checked={checked}
            color='primary'
            onChange={event => setChecked(event.target.checked)}
            inputProps={{'aria-label': 'primary checkbox'}}
          />
          <div className={styles.title}>Frozen Yoghurt</div>
          <div className={styles.row}>
            <div className={styles.name}>Calories</div>
            <div className={styles.value}>159</div>
          </div>
          <div className={styles.row}>
            <div className={styles.name}>Fat (g)</div>
            <div className={styles.value}>5</div>
          </div>
          <div className={styles.row}>
            <div className={styles.name}>Carbs (g)</div>
            <div className={styles.value}>24</div>
          </div>
          <div className={styles.row}>
            <div className={styles.name}>Protein</div>
            <div className={styles.value}>4</div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.buttons}>
        <Button className={clsx(styles.button, styles.view)} size='small' color='primary'>
          <i className='far fa-eye' />
        </Button>
        <Button className={clsx(styles.button, styles.edit)} size='small' color='primary'>
          <i className='far fa-edit' />
        </Button>
        <Button className={clsx(styles.button, styles.delete)} size='small' color='primary'>
          <i className='fas fa-trash-alt' />
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardList
