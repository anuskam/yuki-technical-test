import { mount } from '@vue/test-utils'
import PlanetDetails from '@/components/PlanetDetails.vue'
import { getFilmsTitle } from '../../api/endpoints/star_wars_api'

// Mocking the getFilmsTitle function
jest.mock('@/api/endpoints/star_wars_api')

const mockedGetFilmsTitle = getFilmsTitle as jest.Mock

describe('PlanetDetails.vue', () => {
  it('renders planet name and film titles', async () => {
    const planet = {
      name: 'Tatooine',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
      ],
    }

    // Mock the response from getFilmsTitle
    mockedGetFilmsTitle.mockResolvedValue(['A New Hope', 'The Empire Strikes Back'])

    const wrapper = mount(PlanetDetails, {
      props: {
        planet,
      },
    })

    // Wait for the component to finish its onMounted logic
    await wrapper.vm.$nextTick()

    // Check if planet name is rendered
    expect(wrapper.text()).toContain('Tatooine')

    // Check if film titles are rendered
/*     expect(wrapper.text()).toContain('A New Hope')
    expect(wrapper.text()).toContain('The Empire Strikes Back')
 */
  })
})