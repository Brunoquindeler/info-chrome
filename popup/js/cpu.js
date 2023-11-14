let table_cpu_info = document.querySelector("#table_cpu_info");
let btn_cpu_info = document.querySelector("#btn_cpu_info");
let state_cpu_info = false;
const context_cpu = "cpu";

class CPU {
    constructor(archName, modelName, processors) {
        this.archName = archName || "Indefinido";
        this.modelName = modelName || "Indefinido";
        this.processors = processors;
    };

    populateTable() {
        let general_cpu_info = document.querySelector("#general_cpu_info");
        if (general_cpu_info) {
            general_cpu_info.innerHTML += [
                '<tr>',
                '<td>Arquitetura: </td>',
                '<td>' + this.archName + '</td>',
                '</tr>',
                '<tr>',
                '<td>Modelo: </td>',
                '<td>' + this.modelName + '</td>',
                '</tr>',
                '<tr>',
                '<td>Número de processadores: </td>',
                '<td>' + this.processors?.length + '</td>',
                '</tr>',
            ].join("\n");
            return;
        };
    };
};

function showOrHideCPUInfo() {
    if (!state_cpu_info) {
        createTable(context_cpu);
        chrome.system.cpu.getInfo((cpuinfo) => {
            let cpu = new CPU(
                cpuinfo.archName,
                cpuinfo.modelName,
                cpuinfo.processors
            );
            cpu.populateTable();
        });
        table_cpu_info.style.display = "block";
        btn_cpu_info.textContent = "Esconder informações de CPU";
        state_cpu_info = true;
        return;
    }

    table_cpu_info.style.display = "none";
    table_cpu_info.innerHTML = "";
    btn_cpu_info.textContent = "Mostrar informações de CPU";
    state_cpu_info = false;
    return;
}

if (btn_cpu_info) {
    btn_cpu_info.onclick = function () {
        showOrHideCPUInfo();
    };
};
