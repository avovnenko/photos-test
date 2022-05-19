import { FC, useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia, Dialog,
  IconButton,
  Typography
} from '@material-ui/core'
import { useStyles } from './styles'
import { IPhoto } from '../../api/photo.types'

interface PhotoProps {
  photo: IPhoto
  removeHandler: () => void
}

const Photo: FC<PhotoProps> = ({ photo, removeHandler }) => {
  const {
    thumbnailUrl,
    url,
    title
  } = photo
  const styles = useStyles()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const cardClickHandler = () => {
    setIsDialogOpen(true)
  }

  const closeDialogHandler = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <Card variant='outlined' className={styles.card}>
        <CardContent onClick={cardClickHandler}>
          <CardMedia
            component="img"
            alt="green iguana"
            className={styles.img}
            image={thumbnailUrl}
          />
          <Typography variant='body2'>
            {title}
          </Typography>
        </CardContent>
        <CardActions className={styles.cardActions}>
          <Button onClick={removeHandler} size="small" variant='contained'>Remove</Button>
        </CardActions>
      </Card>

      <Dialog
        open={isDialogOpen}
        onClose={closeDialogHandler}
      >
        <IconButton
          onClick={closeDialogHandler}
          className={styles.closeBtn}
        >
          X
        </IconButton>
        <img src={url} alt={title} className={styles.modalImg} />
      </Dialog>
    </>
  )
}

export default Photo
