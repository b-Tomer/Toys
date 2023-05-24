import { ChartLabel } from '../cmps/chart-label.jsx'
import { ChartPrice } from '../cmps/chart-price.jsx'

export function Charts() {
    return (
        <div className='charts'>
            <h1>Lables:</h1>
            <ChartLabel />
            <h1>Prices:</h1>
            <ChartPrice />
        </div>
    )
}