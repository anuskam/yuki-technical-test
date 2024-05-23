import { mount } from '@vue/test-utils'
import SearchPlanet from '@/components/SearchPlanet.vue'
import { searchPlanet, getFilmsByTitle, getResidentsByName } from '../../api/endpoints/star_wars_api'

jest.mock('@/api/endpoints/star_wars_api')

const mockSearchPlanet = searchPlanet as jest.Mock;
const mockGetFilmsByTitle = getFilmsByTitle as jest.Mock;
const mockGetResidentsByName = getResidentsByName as jest.Mock;

describe('SearchPlanet.vue', () => {
  beforeEach(() => {
    mockSearchPlanet.mockResolvedValue([
      {
        name: 'Tatooine',
        climate: 'Arid',
        diameter: '10465',
        gravity: '1 standard',
        orbital_period: '304',
        population: '200000',
        residents: [],
        rotation_period: '23',
        surface_water: '1',
        terrain: 'Desert',
        films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
      },
    ]);
    mockGetFilmsByTitle.mockResolvedValue(['A New Hope', 'The Empire Strikes Back']);
    mockGetResidentsByName.mockResolvedValue(['Luke Skywalker', 'Anakin Skywalker']);
  });

  it('renders planet information, all film titles and all resident', async () => {
    const wrapper = mount(SearchPlanet)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Tatooine')
    expect(wrapper.text()).toContain('Arid')
    expect(wrapper.text()).toContain('Diameter: 10465')
    expect(wrapper.text()).toContain('Gravity: 1 standard')
    expect(wrapper.text()).toContain('Orbital period: 304')
    expect(wrapper.text()).toContain('Population: 200000')
    expect(wrapper.text()).toContain('Rotation period: 23')
    expect(wrapper.text()).toContain('Surface water: 1')
    expect(wrapper.text()).toContain('Terrain: Desert')
    expect(wrapper.text()).toContain('A New Hope')
    expect(wrapper.text()).toContain('The Empire Strikes Back')
    expect(wrapper.text()).toContain('Luke Skywalker')
    expect(wrapper.text()).toContain('Anakin Skywalker')
  })
})