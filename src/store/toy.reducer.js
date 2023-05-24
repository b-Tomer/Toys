export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SORT_BY = 'SORT_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const FILTER_BY = 'FILTER_BY'
export const SET_IS_TOYS = 'SET_IS_TOYS'


const initialState = {
    toys: [],
    isLoading: false,
    sortBy: null,
    isLoading: false,
    isToys: false,
    // filterBy:{pageIdx:0}
}

export function toyReducer(state = initialState, action) {
    // console.log('action', action)
    let toys
    let filterBy
    if (action.type === FILTER_BY) {

        console.log('action: ', action)
    }
    switch (action.type) {
        // Toys
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            toys = state.toys.filter(c => c._id !== action.toyId)
            return { ...state, toys }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }
        case SORT_BY:
            return { ...state, sortBy: action.sortBy }
        case FILTER_BY:
            filterBy = { ...state.filterBy, ...action.filterToEdit }
            return { ...state, filterBy }
        case SET_IS_TOYS:
            return { ...state, isToys: action.isToys }
        default:
            return state
    }
}