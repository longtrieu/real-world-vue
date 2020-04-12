import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  totalEvents: 0,
  event: {},
  perPage: 3,
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_EVENTS(state, totalEvents) {
    state.totalEvents = totalEvents
  },
  SET_EVENT(state, event) {
    state.event = event
  },
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        let notification = {
          type: 'success',
          message: 'Your event has been created successfully',
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        let notification = {
          type: 'error',
          message: 'There was an error creating event: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then((response) => {
        commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch((error) => {
        let notification = {
          type: 'error',
          message: 'There was an error fetching events: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id).then((response) => {
        commit('SET_EVENT', response.data)
        return response.data
      })
      // Don't catch this error here
      // .catch((error) => {
      //   let notification = {
      //     type: 'error',
      //     message:
      //       'There was an error fetch Event with Id ' +
      //       id +
      //       ': ' +
      //       error.message,
      //   }
      //   dispatch('notification/add', notification, { root: true })
      // })
    }
  },
}

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  },
}
