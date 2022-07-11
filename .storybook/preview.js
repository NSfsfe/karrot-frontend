// SPDX-FileCopyrightText: 2016-2022 2016 Nick Sellen, <hello@nicksellen.co.uk> et al.
//
// SPDX-License-Identifier: MIT

// Vue config
import 'quasar/dist/quasar.styl'
import '../src/css/app.styl'

import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import configureQuasar from '>/configureQuasar'
import { RouterLinkStub, TransitionStub, TransitionGroupStub } from '@vue/test-utils'
import { IconPlugin } from '@/base/icons'

Vue.config.productionTip = false
Vue.config.devtools = true
configureQuasar(Vue)
Vue.use(Vuex) // Install Vuex
Vue.use(IconPlugin)
Vue.use(VueI18n)
Vue.use(VueRouter)

Vue.component('RouterLink', RouterLinkStub)
Vue.component('Transition', TransitionStub)
Vue.component('TransitionGroup', TransitionGroupStub)
Vue.directive('measure', {})
Vue.config.errorHandler = (err, vm, info) => {
  console.log(err, vm, info)
}

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

// Storybook config
import { create } from '@storybook/theming'

export const parameters = {
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Karrot Storybook',
      brandUrl: 'https://github.com/karrot-dev/karrot-frontend',
    }),
    storySort: (a, b) => a[1].kind.localeCompare(b[1].kind),
  }
}
