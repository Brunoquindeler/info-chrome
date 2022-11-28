let table_cpu_info = document.querySelector("#table_cpu_info");
let btn_cpu_info = document.querySelector("#btn_cpu_info");
let state_cpu_info = false
const context_cpu = "cpu"

class CPU {
    constructor(archName, modelName, processors) {
        this.archName = archName
        this.modelName = modelName
        this.processors = processors
    }

    showInfo() {
        table_cpu_info.innerHTML = [
            '<table border="1" id="general_cpu_info">',
            '<tbody>',
            '<tr>',
            '<td>Arquitetura: </td>',
            '<td colspan="2">'+this.archName+'</td>',
            '</tr>',
            '<tr>',
            '<td>Modelo: </td>',
            '<td colspan="2">'+this.modelName+'</td>',
            '</tr>',
            '<tr>',
            '<td>Número de processadores: </td>',
            '<td colspan="2">'+this.processors?.length+'</td>',
            '</tr>',
            '</tbody>',
            '</table>',        
        ].join("\n");
    }
}

function showOrHideCPUInfo() {
    if (!state_cpu_info) {
        chrome.system.cpu.getInfo((cpuinfo) => {
            let cpu = new CPU(
                cpuinfo.archName,
                cpuinfo.modelName, 
                cpuinfo.processors
            );
            cpu.showInfo()
        })
        table_cpu_info.style.display = "block"
        btn_cpu_info.textContent = "Esconder informações de CPU"
        state_cpu_info = true
        return
    }

    table_cpu_info.style.display = "none"
    table_cpu_info.innerHTML = ""
    btn_cpu_info.textContent = "Mostrar informações de CPU"
    state_cpu_info = false
    return
}

if (btn_cpu_info) {
    btn_cpu_info.onclick = function () {
        showOrHideCPUInfo();
    }
}
