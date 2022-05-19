import { IPhoto } from './photo.types'

class PhotosApi {
  private URL = 'http://jsonplaceholder.typicode.com/photos'

  async getPhotos() {
    const data = await fetch(this.URL)
    return await data.json() as IPhoto[]
  }
}

export const PhotosProviderApi = new PhotosApi()