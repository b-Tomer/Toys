
import { asyncStorageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}


function query(filterBy = {}, sortBy = '') {
    return asyncStorageService.query(STORAGE_KEY)
        .then((toys) => {
            let toysToDisplay = toys
            if (filterBy.inStock) {
                toysToDisplay = toys.filter(toy => toy.inStock)
            }
            if (filterBy.search) {
                const regExp = new RegExp(filterBy.search, 'i')
                toysToDisplay = toys.filter(toy => regExp.test(toy.name))
                console.log('toysToDisplay: ', toysToDisplay )
            }
            if (sortBy === 'createdAt') toysToDisplay = toys.sort((a, b) => a.createdAt - b.createdAt)
            if (sortBy === 'price') toysToDisplay = toys.sort((a, b) => a.price - b.price)
            if (sortBy === 'name') toysToDisplay = toys.sort((a, b) => {
                if (a.name.toUpperCase() < b.name.toUpperCase()) return -1
                else return 1
            })
            return Promise.resolve(toysToDisplay)
            //     // if (filterBy.pageIdx !== undefined) {
            //     //     let startIdx = filterBy.pageIdx * PAGE_SIZE
            //     //     toysToDisplay = toys.slice(startIdx, startIdx + PAGE_SIZE)

            //     // }


        })

    // return httpService.get(BASE_URL, filterBy)
}
function getById(toyId) {
    // return httpService.get(BASE_URL + toyId)
    return asyncStorageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    return asyncStorageService.remove(STORAGE_KEY, toyId)
    // return Promise.reject('Not now!')
    // return httpService.delete(BASE_URL + toyId)
}
function save(toy) {

    const method = toy._id ? 'put' : 'post'
    return asyncStorageService[method](STORAGE_KEY, toy)



    // if (toy._id) {
    //     return httpService.put(BASE_URL, toy)
    // } else {

    //     return httpService.post(BASE_URL, toy)
    // }


}

function getEmptyToy() {
    return (
        {
            name: '',
            price: '',
            labels: ['Doll', 'Battery Powered', 'Baby'],
            createdAt: 1631031801071,
            inStock: true,
        }
    )
}

function getDefaultFilter() {
    return { txt: '', maxPrice: 0 }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


