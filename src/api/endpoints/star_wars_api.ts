import axios from 'axios'
import { API_BASE_URL, PLANETS } from '../constants'
import IPlanet from '../interfaces/IPlanet.interface'

export const getPlanets = async(): Promise<IPlanet[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${PLANETS}`)
    return response.data.results
  } catch (error: any) {
    return error.response.status
  }
}

export const getFilmsByTitle = async(filmUrls: string[]): Promise<string[]> => {
  try {
    const films = filmUrls.map(url => axios.get(url))
    const responses = await axios.all(films)
    return responses.map(response => response.data.title)
  } catch (error: any) {
    return error.response.status
  }
}

export const getResidentsByName = async(residentUrls: string[]): Promise<string[]> => {
  try {
    const residents = residentUrls.map(url => axios.get(url))
    const responses = await axios.all(residents)
    return responses.map(response => response.data.name)
  } catch (error: any) {
    return error.response.status
  }
}

export const searchPlanet = async(searchQuery: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${PLANETS}/?search=${searchQuery}`)
    return response.data.results
  } catch (error: any) {
    return error.response.status
  }
}