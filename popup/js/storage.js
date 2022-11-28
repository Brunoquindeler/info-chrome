let table_storage_info = document.querySelector("#table_storage_info");
let btn_storage_info = document.querySelector("#btn_storage_info");
let state_storage_info = false
const context_storage = "storage"

class Storage {
    constructor(id, capacity, name, type) {
        this.id = id
        this.capacity = capacity
        this.name = name
        this.type = translateStorageUnitType(type)
    }

    populateTable() {
        let general_storage_info = document.querySelector("#general_storage_info")
        if (general_storage_info) {
            general_storage_info.innerHTML += [
                '<tr>',
                '<td rowspan="4">'+this.name+'</td>',
                '</tr>',
                '<tr>',
                '<td>ID: </td>',
                '<td cowspan="2">'+this.id+'</td>',
                '</tr>',
                '<tr>',
                '<td>Capacidade: </td>',
                '<td cowspan="2">'+formatBytes(this.capacity)+'</td>',
                '</tr>',
                '<tr>',
                '<td>Tipo: </td>',
                '<td cowspan="2">'+this.type+'</td>',
                '</tr>',        
            ].join("\n");
            return
        }
    }
}

async function showOrHideStorageInfo() {
    if (!state_storage_info) {
        createTable(context_storage)
        let storageInfo = await chrome.system.storage.getInfo();
        storageInfo.forEach((element) => {
            let storage = new Storage(
                element.id,
                element.capacity,
                element.name,
                element.type
            )
            storage.populateTable()
        });
        
        table_storage_info.style.display = "block"
        btn_storage_info.textContent = "Esconder informações de armazenamento"
        state_storage_info = true
        return
    }

    table_storage_info.style.display = "none"
    table_storage_info.innerHTML = ""
    btn_storage_info.textContent = "Mostrar informações de armazenamento"
    state_storage_info = false
    return
}

if (btn_storage_info) {
    btn_storage_info.onclick = function () {
        showOrHideStorageInfo();
    }
}
