/**
 * Graph Reducer
 *
 * Creates a Redux reducer for populating the graph.
 */

// Action Types
import actionTypes from './actionTypes'
import hash from 'object-hash'

// Setup initial state with an fleet info object.
const initialState = {
  filter: 'P2P',
  selected: null,
  graph: null,
  patients: null,
  searchTerm: '',
  states: null
}

// Export the Device Reducer.
export default (state = initialState, action) => {
  const type = action.type
  switch (action.type) {
    case actionTypes.SELECT_FILTER: {
      const { filter } = action.payload
      return { ...state, filter, type }
    }
    case actionTypes.SEARCH: {
      const { term } = action.payload
      return { ...state, searchTerm: term, type }
    }
    case actionTypes.UPDATE_GRAPH: {
      const { graph } = action.payload
      return { ...state, graph, type }
    }
    case actionTypes.UPDATE_PATIENTS: {
      const { patients } = action.payload
      return { ...state, patients, patient: patients.byId[251], type } // `P1` in code
    }
    case actionTypes.UPDATE_LAST_REFRESHED: {
      const { lastRefreshed } = action.payload
      return { ...state, lastRefreshed, type }
    }
    case actionTypes.SELECT_PATIENT: {
      const { id, coords } = action.payload
      const { patients } = state
      const existingPatient = patients.byId[id]
      const patient = {
        ...patients.byId[id],
        coords
      }
      return existingPatient ? { ...state, patient, type } : {...state, type}
    }
    case actionTypes.UPDATE_STATES: {
      let states = action.payload.states.reduce((accumulator, currentValue) => {
        accumulator[currentValue] = hash(currentValue);
        return accumulator;
      },{});
      return {...state, states, type}
    }
    default:
      return state
  }
}
