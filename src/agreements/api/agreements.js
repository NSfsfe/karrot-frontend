// SPDX-FileCopyrightText: 2016-2022 2016 Nick Sellen, <hello@nicksellen.co.uk> et al.
//
// SPDX-License-Identifier: MIT

import axios from '@/base/api/axios'

export default {
  async create (data) {
    return (await axios.post('/api/agreements/', data)).data
  },

  async get (agreementId) {
    return (await axios.get(`/api/agreements/${agreementId}/`)).data
  },

  async list () {
    return (await axios.get('/api/agreements/')).data
  },

  async save (data) {
    const { id } = data
    return (await axios.patch(`/api/agreements/${id}/`, data)).data
  },

  async agree (id) {
    return (await axios.post(`/api/agreements/${id}/agree/`)).data
  },
}
