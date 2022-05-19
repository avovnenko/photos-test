import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer'
  },
  cardActions: {
    marginTop: 'auto',
    justifyContent: 'center'
  },
  img: {
    width: 150,
    height: 150,
    margin: 'auto'
  },
  modalImg: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  closeBtn: {
    position: 'absolute',
    width: 40,
    height: 40,
    right: 10,
    top: 10
  }
})
