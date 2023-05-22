
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


function query(filterBy = {}) {
    return asyncStorageService.query(STORAGE_KEY)
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
    return axios[method](BASE_URL, toy)
    // if (toy._id) {
    //     return httpService.put(BASE_URL, toy)
    // } else {

    //     return httpService.post(BASE_URL, toy)
    // }
}

function getEmptyToy() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: 0 }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


