
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
    getDefaultFilter,
    getLabelsData
}


function query(filterBy = {}, sortBy = '') {
    // return asyncStorageService.query(STORAGE_KEY)
    return httpService.get(BASE_URL, {filterBy ,sortBy})
}
function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
    // return asyncStorageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return asyncStorageService.remove(STORAGE_KEY, toyId)
    // return Promise.reject('Not now!')
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    // const method = toy._id ? 'put' : 'post'
    // return asyncStorageService[method](STORAGE_KEY, toy)
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {

        return httpService.post(BASE_URL, toy)
    }
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




function getLabelsData(){
    return {
        
    labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered'],
datasets: [
    {
        label: '# of Votes',
        data: [3, 1, 10, 9, 3, 8, 6, 9],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgb(212, 239, 144, 0.2)',
            'rgb(181, 181, 181, 0.2)',

        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgb(212, 239, 144, 1)',
            'rgb(181, 181, 181, 1)',

        ],
        borderWidth: 1,
    },
],
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


