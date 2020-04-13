import {useMediaQuery} from '@material-ui/core'

export default (size, value) => useMediaQuery(`(${size}-width:${value}px)`)
