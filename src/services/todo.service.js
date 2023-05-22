
import axios from 'axios'
import { asyncStorageService } from './async-storage.service.js'

const BASE_URL = '/api/todo/'

const STORAGE_KEY = 'todoDB'
const PAGE_SIZE = 3

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo
}


function query(filterBy = {}, sortBy) {
    return axios.get(BASE_URL).then(res => res.data)
    // return asyncStorageService.query(STORAGE_KEY)
        .then(todos => {
            // if (filterBy.all) return todos
            // if (filterBy.Active && filterBy.done) return todos
            // if (filterBy.Active) todos = todos.filter(todo => !todo.isDone)
            // if (filterBy.done) todos = todos.filter(todo => todo.isDone)
            // if (filterBy.search) {
            //     const regExp = new RegExp(filterBy.search, 'i')
            //     todos = todos.filter(todo => regExp.test(todo.txt))
            // }
            // if (sortBy === 'createdAt') todos = todos.sort((a, b) => a.createdAt - b.createdAt)
            // if (sortBy === 'title') todos = todos.sort((a, b) =>{
            //     console.log(a);
            //    if (a.txt.toUpperCase() < b.txt.toUpperCase()) return -1
            //    else return 1
            // } )

            // if (filterBy.pageIdx !== undefined) {
            //     let startIdx = filterBy.pageIdx * PAGE_SIZE
            //    let todosToDisplay = todos.slice(startIdx, startIdx + PAGE_SIZE)
            //     return todosToDisplay
            // }
            return todos
        })
}
function getById(todoId) {
    // return asyncStorageService.get(STORAGE_KEY, todoId)
    return axios.get(BASE_URL + todoId).then(res => res.data)

}
function remove(todoId) {
    // return Promise.reject('Not now!')
    // return asyncStorageService.remove(STORAGE_KEY, todoId)
    return axios.delete(BASE_URL + todoId).then(res => res.data)

}
function save(todo) {
    console.log('todo: ', todo )
    const method = todo._id ? 'put' : 'post'
    return axios[method](BASE_URL , todo)  
    // if (todo._id) {
    //     return asyncStorageService.put(STORAGE_KEY, todo)
    // } else {
    //     return asyncStorageService.post(STORAGE_KEY, todo)
    // }
}

function getEmptyTodo() {
    const timestamp = Date.now()
    return {
        txt: '', createdAt: moment(timestamp).fromNow(), creator: {}
    }
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


