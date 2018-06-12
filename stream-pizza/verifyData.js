const Store = require(data-store);

function storeKey(key) {
    const store = new Store({ path: keys.json});
    store.set('PublicKey', key);
    console.log(store.data);
}

function verifyData() {
    
}

module.exports = {storeKey, verifyData};