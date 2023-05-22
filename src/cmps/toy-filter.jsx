
import { useDispatch, useSelector } from "react-redux";
import { utilService } from "../services/util.service.js";
import { SORT_BY } from "../store/toy.reducer.js";
import { useEffect, useRef, useState } from "react";


export function ToyFilter({ onSearch, onSetFilter, onAddToy }) {
  const dispatch = useDispatch()
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [dropdownVisible, setDropdownVisible] = useState(false)
  // const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
  
  
  const options = [
    { label: 'On wheels', value: 'onWheels' },
    { label: 'Box game', value: 'boxGame' },
    { label: 'Art', value: 'art' },
    { label: 'Baby', value: 'baby' },
    { label: 'Doll', value: 'doll' },
    { label: 'Puzzle', value: 'puzzle' },
    { label: 'Outdoor', value: 'outdoor' },
    { label: 'Battery Powered', value: 'batteryPowered' }]
  const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter))

  useEffect(() => {
    onSetFilterDebounce.current(filterBy)
  }, [])

  function toggleDropdown(){
    setDropdownVisible((prevState) => !prevState)
  }


  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  }

  function onHandleSearch(ev) {
    const val = ev.target.value
    console.log(val);
    onSearch(val)
  }

  function onInStock({ target }) {
    let isAll = target.checked
if(isAll) onSetFilter({all:true})
else onSetFilter({all:false})

    // if (isAll) onSetFilterDebounce({ all: true })
    // else onSetFilterDebounce({ all: false })
  }

  function onSortBy(ev) {
    const value = ev.target.value
    console.log(value)
    dispatch({ type: SORT_BY, sortBy: value })
  }

  return (
    <section className="toy-filter fully">
    <p>Filters:</p>

    <select onChange={onSortBy} className="txt-input" name="sort" id="sort">
      <option value="title">Name</option>
      <option value="price">Price</option>
      <option value="createdAt">Created At</option>
    </select>
  
    <div className="dropdown-wrapper">
      <div className={`dropdown ${dropdownVisible ? 'open' : ''}`}>
        <div className="dropdown-toggle" onClick={toggleDropdown}>
          Select Categories
        </div>
        <div className="dropdown-options">
          {options.map((option) => (
            <div key={option.value}>
              <input
                type="checkbox"
                id={option.value}
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={handleOptionChange}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="lables">
      <div>
        <input type="checkbox" onChange={onInStock} id="all" />
        <label htmlFor="inStock">In stock</label>
      </div>
    </div>
    <input type="search" className="txt-input" placeholder="search" onChange={onHandleSearch} />
    <button className="btn" onClick={onAddToy}>
      Add Toy
    </button>
  </section>
  );
}
