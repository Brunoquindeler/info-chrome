let table_memory_info = document.querySelector("#table_memory_info");
let btn_memory_info = document.querySelector("#btn_memory_info");
let state_memory_info = false
const context_memory = "memory"

class Memory {
    constructor(availableCapacity, capacity) {
        this.availableCapacity = availableCapacity
        this.capacity = capacity
    }

    showInfo() {
        table_memory_info.innerHTML = [
            '<table border="1" id="general_memory_info">',
            '<tbody>',
            '<tr>',
            '<td>Disponível: </td>',
            '<td colspan="2">'+formatBytes(this.availableCapacity)+'</td>',
            '</tr>',
            '<tr>',
            ' <td>Total: </td>',
            '<td colspan="2">'+formatBytes(this.capacity)+'</td>',
            '</tr>',
            '</tbody>',
            '</table>',
        ].join("\n");
    }
}

function showOrHideMemoryInfo() {
    if (!state_memory_info) {
        chrome.system.memory.getInfo((memoryinfo) => {
            let memory = new Memory(
                memoryinfo.availableCapacity,
                memoryinfo.capacity,
            );
            memory.showInfo()
        })
        table_memory_info.style.display = "block"
        btn_memory_info.textContent = "Esconder informações de memória"
        state_memory_info = true
        return
    }

    table_memory_info.style.display = "none"
    table_memory_info.innerHTML = ""
    btn_memory_info.textContent = "Mostrar informações de memória"
    state_memory_info = false
    return
}

if (btn_memory_info) {
    btn_memory_info.onclick = function () {
        showOrHideMemoryInfo();
    }
}
