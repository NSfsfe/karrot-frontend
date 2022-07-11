// SPDX-FileCopyrightText: 2016-2022 2016 Nick Sellen, <hello@nicksellen.co.uk> et al.
//
// SPDX-License-Identifier: MIT


import axios from '@/base/api/axios'

export default {
  async fetch () {
    return (await axios.get('/api/status/')).data
  },
}
