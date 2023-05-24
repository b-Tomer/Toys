

import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy ,progressPrecent}) {
    if(!toys) return ''
  
    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-card" key={toy._id}>
                <ToyPreview toy={toy} progressPrecent={progressPrecent} />
                <div className="options">
                    <Link className="btn" to={`/toy/details/${toy._id}`}><i className="fa-solid fa-info"></i></Link>
                    <Link className="btn" to={`/toy/edit/${toy._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                    <button className="btn" onClick={() => { onRemoveToy(toy._id) }}><i className="fa-solid fa-trash-can"></i></button>
                </div>
            </li>)}
    </ul>
}