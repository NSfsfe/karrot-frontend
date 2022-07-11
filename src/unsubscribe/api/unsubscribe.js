// SPDX-FileCopyrightText: 2016-2022 2016 Nick Sellen, <hello@nicksellen.co.uk> et al.
//
// SPDX-License-Identifier: MIT


import axios from '@/base/api/axios'

export default {
  async tokenUnsubscribe (token, data) {
    return (await axios.post(`/api/unsubscribe/${token}/`, data)).data
  },

  async unsubscribe (data) {
    return (await axios.post('/api/unsubscribe/', data)).data
  },
}
