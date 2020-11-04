import activitiesAPI from '@/activities/api/activities'
import { useEvents } from '@/activities/data/useEvents'
import { permitCachedUsage } from '@/activities/data/useCached'
import { useCollection } from '@/activities/data/useCollection'

const api = {
  activities: activitiesAPI,
}

export function useActivities ({ groupId }) {
  permitCachedUsage()

  const { collection: activities, update, hasId, status } = useCollection({ groupId }, fetcher)

  async function fetcher ({ groupId }, { isValid }) {
    if (groupId) {
      const [{ results }, { results: feedbackPossibleResults }] = await Promise.all([
        api.activities.listByGroupId(groupId),
        api.activities.listFeedbackPossible(groupId),
      ])
      if (isValid()) {
        update([...results, ...feedbackPossibleResults])
      }
    }
  }

  const { on } = useEvents()

  on('activities:activity', activity => {
    if (hasId(activity.id)) {
      // TODO: this cannot get _new_ activities only existing ones... but only because the activity doesn't include the group id...
      update([activity])
    }
  })

  return {
    activities,
    status,
  }
}