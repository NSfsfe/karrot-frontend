import { h } from 'vue'
import { storybookDefaults as defaults } from '>/helpers'
import { storiesOf } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import addHours from 'date-fns/addHours'
import * as factories from '>/enrichedFactories'

import NotificationItem from './NotificationItem'

const currentUser = factories.makeCurrentUser()
const group = factories.makeGroup({
  memberships: {
    [currentUser.id]: factories.makeMembership(),
  },
})
const place = factories.makePlace({
  group,
})

const notifications = [
  {
    type: 'user_became_editor',
    context: {
      group,
      user: factories.makeUser(),
    },
  },
  {
    type: 'you_became_editor',
    context: {
      group,
    },
  },
  {
    type: 'new_applicant',
    context: {
      group,
      user: factories.makeUser(),
      application: factories.makeApplication({
        group,
        createdAt: new Date('2018-07-23T19:28:09.875Z'),
      }),
    },
  },
  {
    type: 'application_accepted',
    context: {
      group,
      application: factories.makeApplication({
        group,
        status: 'accepted',
        decidedBy: currentUser,
        decidedAt: new Date('2018-09-17T19:28:09.875Z'),
      }),
    },
  },
  {
    type: 'application_declined',
    context: {
      group,
      application: factories.makeApplication({
        group,
        status: 'declined',
        decidedBy: currentUser,
        decidedAt: new Date('2018-09-17T19:28:09.875Z'),
      }),
    },
  },
  {
    type: 'feedback_possible',
    context: {
      group,
      activity: factories.makeActivity({
        place,
      }),
    },
  },
  {
    type: 'new_place',
    context: {
      group,
      place,
      user: factories.makeUser(),
    },
  },
  {
    type: 'new_member',
    context: {
      group,
      user: factories.makeUser(),
    },
  },
  {
    type: 'invitation_accepted',
    context: {
      group,
      user: factories.makeUser(),
    },
  },
  {
    type: 'activity_upcoming',
    expiresAt: addHours(new Date(), 2),
    context: {
      group,
      place,
      activity: factories.makeActivity({
        place,
      }),
    },
  },
  {
    type: 'activity_disabled',
    context: {
      group,
      place,
      activity: factories.makeActivity({
        place,
      }),
    },
  },
  {
    type: 'activity_enabled',
    context: {
      group,
      place,
      activity: factories.makeActivity({
        place,
      }),
    },
  },
  {
    type: 'activity_moved',
    context: {
      group,
      place,
      activity: factories.makeActivity({
        place,
      }),
    },
  },
  {
    type: 'conflict_resolution_created',
    context: {
      group,
      issue: factories.makeIssue(),
      user: factories.makeUser(),
    },
  },
  {
    type: 'conflict_resolution_created_about_you',
    context: {
      group,
      issue: factories.makeIssue(),
    },
  },
  {
    type: 'conflict_resolution_continued',
    context: {
      group,
      issue: factories.makeIssue(),
      user: factories.makeUser(),
    },
  },
  {
    type: 'conflict_resolution_continued_about_you',
    context: {
      group,
      issue: factories.makeIssue(),
    },
  },
  {
    type: 'conflict_resolution_decided',
    context: {
      group,
      issue: factories.makeIssue(),
      user: factories.makeUser(),
    },
  },
  {
    type: 'conflict_resolution_decided_about_you',
    context: {
      group,
      issue: factories.makeIssue(),
    },
  },
  {
    type: 'conflict_resolution_you_were_removed',
    context: {
      group,
    },
  },
  {
    type: 'voting_ends_soon',
    expiresAt: addHours(new Date(), 2),
    context: {
      group,
      issue: factories.makeIssue(),
    },
  },
].map(factories.makeNotification)

const on = {
  onOpen: action('open'),
}

const story = storiesOf('Notifications', module)

for (const notification of notifications) {
  story.add(notification.type, () => defaults({
    render: () => h(NotificationItem, {
      notification,
      ...on,
    }),
  }))
}
