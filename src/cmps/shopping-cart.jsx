import { useDispatch, useSelector } from 'react-redux'


import { showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { REMOVE_CAR_FROM_CART } from '../store/car.reducer.js'
import { checkout } from '../store/user.action.js'

export function ShoppingCart({ isCartShown, onCloseCart }) {
    const dispatch = useDispatch()

    const cart = useSelector((storeState) => storeState.carModule.shoppingCart)

    // TODO: get from storeState
    const user = userService.getLoggedinUser()

    function removeFromCart(carId) {
        console.log(`Todo: remove: ${carId} from cart`)
        dispatch({ type: REMOVE_CAR_FROM_CART, carId })
    }

    function getCartTotal() {
        return cart.reduce((acc, car) => acc + car.price, 0)
    }

    function onCheckout() {
        const amount = getCartTotal()
        checkout(-amount)
            .then(() => {
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
                onCloseCart && onCloseCart()
            })
            .catch(err => console.log('err:', err))
    }

    if (!isCartShown) return <span></span>
    const total = getCartTotal()
    return (
        <section className="cart" >
            <h5>Your Cart</h5>
            <ul>
                {
                    cart.map((car, idx) => <li key={idx}>
                        <button onClick={() => {
                            removeFromCart(car._id)
                        }}>x</button>
                        {car.vendor} | ${car.price}
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
