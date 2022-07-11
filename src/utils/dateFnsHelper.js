// SPDX-FileCopyrightText: 2016-2022 2016 Nick Sellen, <hello@nicksellen.co.uk> et al.
//
// SPDX-License-Identifier: MIT


import Vue from 'vue'
import formatDistance from 'date-fns/formatDistance'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import en from 'date-fns/locale/en-US'
import { dateFnsLocale } from '@/locales/index'
import reactiveNow from '@/utils/reactiveNow'

export default new Vue({
  data: {
    locale: 'en',
    localeData: en,
  },
  watch: {
    async locale (locale) {
      const localeData = (await dateFnsLocale(locale)).default
      if (this.locale !== locale) return
      this.localeData = localeData
    },
  },
  methods: {
    formatDistanceStrict (dateA, dateB) {
      return formatDistanceStrict(dateA, dateB, {
        locale: this.localeData,
        roundingMethod: 'floor',
      })
    },
    formatDistanceToNow (date, options = {}) {
      const now = reactiveNow.value
      if (options.future) {
        if (date < now) date = now
      }
      else {
        if (date > now) date = now
      }
      const fn = options.strict ? formatDistanceStrict : formatDistance
      return fn(date, now, { locale: this.localeData, ...options })
    },
  },
})
