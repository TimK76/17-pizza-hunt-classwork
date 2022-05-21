let db;

const request = indexedDB.open('pizza_hunt', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc)
request.onupgradeneeded=function(event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object store (table) called 'new_pizza', set it to have an auto-incrementing primary key of sorts
    db.createObjectStore('new_pizza', {autoIncrement: true });
};

request.onsuccess=function(event){
    // when db is created with its object store (from onupgradeneeded event above) or simply established a connection, save references to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadPizza() function to send all local db data to api
    if (navigator.onLine) {
        // we haven't created this yet, but we will soon, so let'c comment it out for now.
        // uploadPizza();
    }
};

request.onerror=function(event){
    // log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attmpt to submit a new pizza and there's no internet connection
function saveRecord(record){
    // open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // access the object store for 'new_pizza'
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // add record to your store with add method
    pizzaObjectStore.add(record);
}