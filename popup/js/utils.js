// Ref: https://horadecodar.com.br/2022/07/22/converter-bytes-em-kb-mb-ou-gb-em-javascript/
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function translateStorageUnitType(type) {
    switch (type) {
        case "fixed":
            return "Fixo"
        case "removable":
            return "Removível"
        default:
            return "Desconhecido"
    }
}

// TODO: mudar todos os contextos parautilizar essa função
function createTable(context) {
    let general_info = document.querySelector('#general_'+context+'_info')
    let table_info = document.querySelector('#table_'+context+'_info');
    if (!general_info) {
        table_info.innerHTML = [
            '<table border="1" id="general_'+context+'_info">',
            '<tbody id="general_'+context+'_info_body">',
            '</tbody>',
            '</table>',        
        ].join("\n");
    }
}