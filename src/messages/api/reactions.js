// SPDX-FileCopyrightText: 2016-2022 2016 Nick Sellen, <hello@nicksellen.co.uk> et al.
//
// SPDX-License-Identifier: MIT

import axios from '@/base/api/axios'

/**
 * Manage Emoji reactions of messages.
 */
export default {
  /**
   * Add a reaction to a message.
   * @param {string} messageId - id of the message
   * @param {string} name - emoji name
   */
  async create (messageId, name) {
    return (await axios.post(`/api/messages/${messageId}/reactions/`, { name })).data
  },

  /**
   * Remove a reaction from a message.
   * @param {string} messageId - id of the message
   * @param {string} name - emoji name
   */
  async remove (messageId, name) {
    return (await axios.delete(`/api/messages/${messageId}/reactions/${name}/`)).data
  },
}
