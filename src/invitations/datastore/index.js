// SPDX-FileCopyrightText: 2016-2022 2016 Nick Sellen, <hello@nicksellen.co.uk> et al.
//
// SPDX-License-Identifier: MIT




import invitations, { plugin } from '@/invitations/datastore/invitations'

export default {
  modules: {
    invitations,
  },
  plugins: [
    plugin,
  ],
}
