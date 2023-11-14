let table_storage_info = document.querySelector("#table_storage_info");
let btn_storage_info = document.querySelector("#btn_storage_info");
let state_storage_info = false;
const context_storage = "storage";

class Storage {
    constructor(name, id, capacity, type) {
        this.name = name || "Indefinido";
        this.id = id || "Indefinido";
        this.capacity = formatBytes(capacity);
        this.type = translateStorageUnitType(type);
    };

    async populateTable() {
        let general_storage_info = document.querySelector("#general_storage_info");
        if (general_storage_info) {
            general_storage_info.innerHTML += [
                '<tr>',
                '<td  rowspan="5">' + this.name + '</td>',
                '</tr>',
                '<tr>',
                '<td>ID: </td>',
                '<td>' + this.id + '</td>',
                '</tr>',
                '<tr>',
                '<td>Capacidade: </td>',
                '<td>' + this.capacity + '</td>',
                '</tr>',
                '<tr>',
                '<td>Tipo: </td>',
                '<td>' + this.type + '</td>',
                '</tr>',
            ].join("\n");
            return;
        };
    };
};

const storageInfoMock = [
    {name: "test1", id: "12345678910111213141512312312", capacity: 33333, type: "fixed"},
    {id: "12345678910111213141512312312", capacity: 33333, type: "fixed"},
    {name: "test3", capacity: 33333, type: "fixed"},
    {name: "test4", id: "12345678910111213141512312312", type: "fixed"},
    {name: "test5", id: "12345678910111213141512312312", capacity: 33333},
]

async function showOrHideStorageInfo() {
    if (!state_storage_info) {
        createTable(context_storage);
        let storageInfo = await chrome.system.storage.getInfo();
        storageInfo.forEach((element) => {
            let storage = new Storage(
                element.name,
                element.id,
                element.capacity,
                element.type
            )
            storage.populateTable();
        });

        table_storage_info.style.display = "block";
        btn_storage_info.textContent = "Esconder informações de armazenamento";
        state_storage_info = true;
        return;
    };

    table_storage_info.style.display = "none";
    table_storage_info.innerHTML = "";
    btn_storage_info.textContent = "Mostrar informações de armazenamento";
    state_storage_info = false;
    return;
}

if (btn_storage_info) {
    btn_storage_info.onclick = function () {
        showOrHideStorageInfo();
    };
};
