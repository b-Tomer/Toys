
import { UPDATE_TOY } from '../store/toy.reducer.js'
import { saveToy } from '../store/toy.action.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


export function ToyPreview({ toy }) {

    const isInStockTxt = toy.inStock ? 'Buy now!' : 'SoldOut'

    return (

        <section className="toy-preview">
            <h4>{toy.name}</h4>

            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <h5>{isInStockTxt}</h5>
            <Link to={`/toy/${toy._id}`}>Details</Link> |
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>

        </section>
    )
}