import { createDatastore, throws } from '>/helpers'
import { createRouteError } from '@/utils/datastore/helpers'
import { createRouter, createWebHashHistory } from 'vue-router'
import { maybeDispatchActions } from './routerPlugin'
import { flushPromises } from '@vue/test-utils'

jest.mock('@/router')

function makeTestModule () {
  return {
    actions: {
      beforeEnter: jest.fn(),
      afterLeave: jest.fn(),
      beforeEnterChild: jest.fn(),
      afterLeaveChild: jest.fn(),
    },
  }
}

function makeRouteErrorModule () {
  return {
    actions: {
      set: jest.fn(),
    },
  }
}

const component = {} // doesn't actually need a real component

describe('router plugin / beforeEnter & afterLeave meta options', () => {
  beforeEach(() => jest.resetModules())

  let datastore, router, test, routeError, returnValue
  beforeEach(() => {
    test = makeTestModule()
    routeError = makeRouteErrorModule()

    datastore = createDatastore(
      {
        routeError,
        test,
      },
    )

    const routes = [
      {
        name: 'route1',
        path: '/route1/:testId',
        meta: {
          beforeEnter: 'test/beforeEnter',
          afterLeave: 'test/afterLeave',
        },
        component,
        children: [
          {
            name: 'child',
            path: '/child/:childId',
            meta: {
              beforeEnter: 'test/beforeEnterChild',
              afterLeave: 'test/afterLeaveChild',
            },
            component,
          },
        ],
      },
      {
        name: 'route2',
        path: '/route2',
        component,
      },
    ]

    router = createRouter({ routes, history: createWebHashHistory() })
    router.afterEach(async (to, from) => {
      returnValue = await maybeDispatchActions(datastore, to, from)
    })
  })

  it('triggers beforeEnter action on route enter', async () => {
    router.push({ name: 'route1', params: { testId: '42' } })
    await flushPromises()
    expect(test.actions.beforeEnter.mock.calls.length).toBe(1)
    expect(test.actions.beforeEnter.mock.calls[0][1]).toHaveProperty('testId', 42)
    expect(test.actions.beforeEnter.mock.calls[0][1]).toHaveProperty('routeFrom')
    expect(test.actions.beforeEnter.mock.calls[0][1]).toHaveProperty('routeTo')
    expect(test.actions.afterLeave).not.toBeCalled()
    expect(routeError.actions.set).not.toBeCalled()
  })

  it('triggers afterLeave action on route leave', async () => {
    router.push({ name: 'route1', params: { testId: '42' } })
    await flushPromises()
    router.push({ name: 'route2' })
    await flushPromises()
    expect(test.actions.afterLeave).toBeCalled()
  })

  it('returns routeError if beforeEnter throws', async () => {
    test.actions.beforeEnter.mockImplementation(throws(createRouteError('message')))
    router.push({ name: 'route1', params: { testId: '42' } })
    await flushPromises()
    expect(test.actions.beforeEnter).toBeCalled()
    expect(returnValue.routeErrors).toEqual(['message'])
  })

  it('calls parent enter action first and leave action last', async () => {
    const callOrder = []
    test.actions.beforeEnter.mockImplementationOnce(() => callOrder.push('parentEnter'))
    test.actions.beforeEnterChild.mockImplementationOnce(() => callOrder.push('childEnter'))
    test.actions.afterLeave.mockImplementationOnce(() => callOrder.push('parentLeave'))
    test.actions.afterLeaveChild.mockImplementationOnce(() => callOrder.push('childLeave'))
    router.push({ name: 'child', params: { testId: '42', childId: '44' } })
    await flushPromises()
    router.push({ name: 'route2' })
    await flushPromises()
    expect(test.actions.beforeEnter.mock.calls[0][1]).toHaveProperty('testId', 42)
    expect(test.actions.beforeEnter.mock.calls[0][1]).toHaveProperty('childId', 44)
    expect(test.actions.beforeEnterChild.mock.calls[0][1]).toHaveProperty('testId', 42)
    expect(test.actions.beforeEnterChild.mock.calls[0][1]).toHaveProperty('childId', 44)
    expect(callOrder).toEqual(['parentEnter', 'childEnter', 'childLeave', 'parentLeave'])
  })
})
