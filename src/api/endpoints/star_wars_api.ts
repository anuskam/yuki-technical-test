import axios from 'axios'
import { API_BASE_URL, PLANETS, FILMS } from '../constants'
import IPlanet from '../interfaces/IPlanet.interface'

export const getPlanets = async(): Promise<IPlanet[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${PLANETS}`)
    return response.data.results
  } catch (error: any) {
    return error.response.status
  }
}

export const getFilms = async() => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${FILMS}`)
    console.log('FILMS', response.data.results)
    return response.data.results
  } catch (error: any) {
    return error.response.status
  }
}

export const getFilmsTitle = async(filmUrls: string[]): Promise<string[]> => {
  try {
    const films = filmUrls.map(url => axios.get(url))
    const responses = await axios.all(films)
    return responses.map(response => response.data.title)
  } catch (error: any) {
    return error.response.status
  }
}

export const searchPlanet = async(searchQuery: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${PLANETS}/?search=${searchQuery}`)
    console.log('response', response.data.results)
    return response.data.results
  } catch (error: any) {
    return error.response.status
  }
}