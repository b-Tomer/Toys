


import { ToyFilter } from '../cmps/toy-filter.jsx'
import { ToyList } from '../cmps/toy-list.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'
import { FILTER_BY, PROGRESS, SET_IS_TODOS } from '../store/toy.reducer.js'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { addActivity } from '../store/user.action.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const userStyle = useSelector((storeState) => storeState.userModule.userStyle)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const isToys = useSelector((storeState) => storeState.toyModule.isToys)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)

  useEffect(() => {
    loadToys(filterBy,sortBy)
    checkIsToys()
    progressPrecent()
  }, [filterBy, sortBy])

  function checkIsToys() {
    if (toys.length === 0) dispatch({ type: SET_IS_TODOS, isToys: true })
    else dispatch({ type: SET_IS_TODOS, isToys: false })
    // loadToys(filterBy)
  }

  function onAddToy() {
    const toyToSave = toyService.getEmptyToy()
    const txt = prompt('What toy?')
    toyToSave.txt = txt
    saveToy(toyToSave)
      .then((savedToy) => {
        addActivity({
          txt: `Added a Toy (id:${savedToy._id})`,
       
        })
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
        checkIsToys()
      })
      .catch((err) => {
        showErrorMsg('Cannot add toy')
      })
  }

  function onEditToy(toy) {
    const price = +prompt('New price?')
    const toyToSave = { ...toy, price }
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch((err) => {
        showErrorMsg('Cannot update toy')
      })
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
   
        addActivity({
          txt: `Removed a Toy (id:${toyId})`,
   
        })
        showSuccessMsg('Toy removed')
        checkIsToys()
      })
      .catch((err) => {
        showErrorMsg('Cannot remove toy')
      })
  }

  function onSetFilter(filterToEdit) {
    dispatch({ type: FILTER_BY, filterToEdit })
  }

  function onSearch(val) {
    console.log(val)
    const filterToEdit = { search: val }
    dispatch({ type: FILTER_BY, filterToEdit })
  }


  function onChangePageIdx(diff) {
    const nextPageIdx = filterBy.pageIdx + diff
    console.log(filterBy.pageIdx);
    console.log(nextPageIdx);
    if (nextPageIdx >= 4) return
    if (nextPageIdx < 0) return
    dispatch({ type: FILTER_BY, filterToEdit : {...filterBy , pageIdx: nextPageIdx }})
}

  return (
    <section className='toy-index'>
      {/* <ToyFilter
        onSearch={onSearch}
        onSetFilter={onSetFilter}
        onAddToy={onAddToy}
      /> */}
      <h1 className='toy-title'>What toy today?</h1>
      {isLoading && <h3>Loading...</h3>}
      {isToys && <h3>No toys to show..</h3>}
      {/* <ToyList
        toys={toys}
        onRemoveToy={onRemoveToy}
        onEditToy={onEditToy}
        progressPrecent={progressPrecent}
      /> */}
          <section className='paging'>
                <button className='btn paging-txt' onClick={() => onChangePageIdx(-1)}>-</button>
                <span className='paging-txt'>{filterBy.pageIdx + 1}</span>
                <button className='btn paging-txt' onClick={() => onChangePageIdx(1)}>+</button>
            </section>
    </section>
  )
}
