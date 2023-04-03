const { AsyncLocalStorage } = require("async_hooks");

const context = new AsyncLocalStorage();

if (!global.app){
    global.app = {};
}

global.app.context = context;