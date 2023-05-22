export const asyncStorageService = {
    query,
    get,
    post,
    put,
    remove,
}

const toys = [
    {
        _id: 't101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
    },
    {
        _id: 't102',
        name: 'Baking Doll',
        price: 25,
        labels: ['Doll', 'Battery Powered', 'Art', 'Baby'],
        createdAt: 1631031801012,
        inStock: true,
    },
    {
        _id: 't103',
        name: 'Flying buzz',
        price: 650,
        labels: ['Outdoor','Battery Powered', 'Baby'],
        createdAt: 1631031801015,
        inStock: false,
    },
    {
        _id: 't104',
        name: 'Magic game',
        price: 299,
        labels: ['On wheels', 'Art', 'Box game', 'Puzzle'],
        createdAt: 1631031801013,
        inStock: false,
    }
]

function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || toys
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity = { ...newEntity }
    newEntity._id = _makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}