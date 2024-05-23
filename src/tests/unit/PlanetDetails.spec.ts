import { mount } from '@vue/test-utils'
import PlanetDetails from '@/components/PlanetDetails.vue'
import { getFilmsByTitle } from '../../api/endpoints/star_wars_api'

jest.mock('@/api/endpoints/star_wars_api')

const mockGetFilmsByTitle = getFilmsByTitle as jest.Mock

describe('PlanetDetails.vue', () => {
  it('renders planet name and film titles', async () => {
    const planet = {
      name: 'Tatooine',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
      ],
    }
    mockGetFilmsByTitle.mockResolvedValue(['A New Hope', 'The Empire Strikes Back'])

    const wrapper = mount(PlanetDetails, {
      props: {
        planet,
      },
    })

    await mockGetFilmsByTitle()

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Tatooine')
    expect(wrapper.text()).toContain('A New Hope')
    expect(wrapper.text()).toContain('The Empire Strikes Back')
  })
})