

import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        toyService.getById(toyId)
            .then(toy => {
                setToy(toy)
            })
            .catch(err => {
                showErrorMsg('Cannot load toy')
            })
    }, [])

    // console.log(toy);

    if (!toy) return <h1>loadings....</h1>
    return toy && <div>
        <h3>Toy Details:</h3>
        <h5>Name: {toy.name}</h5>
        <h4>ID:{toy._id}</h4>
        <h4>Created At: {toy.createdAt}</h4>
        <h4>Labels: {toy.labels.join(', ')}</h4>
        <h4>In Stock: { toy.inStock  ? 'Last one, hurry up!' : 'SOLD OUT'}</h4>

        <Link className="btn" to="/toy">Back to List</Link>
    </div>

}

