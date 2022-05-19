import { useEffect, useState, ChangeEvent, useCallback, useMemo } from 'react'

import './App.css';
import { CircularProgress, Grid } from '@material-ui/core'
import { Pagination } from '@mui/material'
import { IPhoto } from './api/photo.types'
import Photo from './components/photo'
import { PhotosProviderApi } from './api/photo.api'
import FilterSelect from './components/filter_select'

const PAGE_COUNT = 12

function App() {
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[]>([])
  const [page, setPage] = useState(1)
  const [albumIds, setAlbumIds] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  useEffect(() => {
    async function getPhotos() {
      const res = await PhotosProviderApi.getPhotos()
      setPhotos(res)
      setAlbumIds(Array.from(new Set(res.map(photo => photo.albumId))))
    }
    void getPhotos()
  }, [])

  useEffect(() => {
    if (activeCategory) {
      setFilteredPhotos(photos.filter(photo => photo.albumId === activeCategory))
    } else {
      setFilteredPhotos(photos)
    }
  }, [activeCategory, photos])

  const paginationClickHandler = useCallback((event: ChangeEvent<unknown>, page: number): void => {
    setPage(page)
  }, [])

  const paginationCount = useMemo(() => Math.ceil(filteredPhotos.length / PAGE_COUNT), [filteredPhotos.length])

  const handleRemoveBtnClick = useCallback((index: number) => {
    filteredPhotos.splice(index, 1)
    setFilteredPhotos([...filteredPhotos])
  }, [filteredPhotos])

  return (
    <div className="App">
      {
        photos.length === 0 ? (
          <Grid container alignItems='center' justifyContent='center'>
            Loading photos
            <CircularProgress />
          </Grid>
        ) : (
          <>
           <FilterSelect activeCategory={activeCategory} options={albumIds} setActiveCategory={setActiveCategory} />
            <Grid container spacing={2}>
              {
                filteredPhotos.slice(((page - 1) * PAGE_COUNT), page * PAGE_COUNT).map((photo, index) => (
                  <Grid item xs={3} key={photo.id}>
                    <Photo
                      photo={photo}
                      removeHandler={() => handleRemoveBtnClick(index + (page - 1) * PAGE_COUNT)}
                    />
                  </Grid>
                ))
              }
            </Grid>
            <Pagination
              count={paginationCount}
              onChange={paginationClickHandler}
            />
          </>
        )
      }
    </div>
  );
}

export default App;
