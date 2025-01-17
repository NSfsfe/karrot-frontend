import ChangePhoto from './ChangePhoto'
import { usersMock } from '>/mockdata'
import cloneDeep from 'clone-deep'

import { mountWithDefaults, statusMocks, nextTicks } from '>/helpers'
import { configureCompat } from '@vue/compat'
jest.mock('vue', () => jest.requireActual('@vue/compat'))
configureCompat({ MODE: 3 })

describe('ChangePhoto', () => {
  beforeEach(() => jest.resetModules())
  let wrapper
  let user

  beforeEach(() => {
    user = cloneDeep(usersMock[0])
    wrapper = mountWithDefaults(ChangePhoto, { propsData: { value: user, status: statusMocks.default() } })
  })

  it('renders', () => {
    expect(wrapper.element.className).toBe('edit-box k-change-photo')
  })

  it('renders placeholder image', () => {
    // src contains the full path
    // location is set to 'localhost' by jest, but can be configured
    // https://jestjs.io/docs/en/configuration.html#testurl-string
    expect(wrapper.find('img').element.src).toBe('http://localhost/statics/add_a_photo.svg')
  })

  it('renders image from localhost in development/test', async () => {
    await wrapper.setProps({
      value: {
        ...user,
        photoUrls: { fullSize: '/media/foo.jpg' },
      },
    })
    await nextTicks(1)
    expect(wrapper.vm.photo).toBe('http://localhost:8080/media/foo.jpg')
  })

  it('emits a save event', async () => {
    wrapper.vm.save()
    expect(wrapper.emitted().save[0][0]).toEqual(null)
  })
})
