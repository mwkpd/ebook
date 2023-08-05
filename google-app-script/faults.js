function doGet(req) {
    let authKey = req.parameter.authKey;
    if (authKey != 'your_auth_key') {
        return ContentService.createTextOutput(JSON.stringify({ 'message': 'Invalid authKey' })).setMimeType(ContentService.MimeType.JSON);
    }
    let doc = SpreadsheetApp.getActiveSpreadsheet();
    let querySheetNames = req.parameter.querySheetNames;
    //get sheet names
    if (querySheetNames != null) {
        let sheets = doc.getSheets();
        let sheetNames = [];
        for (let i = 0; i < sheets.length; i++) {
            sheetNames.push(sheets[i].getName())
        }
        return ContentService.createTextOutput(JSON.stringify({ sheetNames })).setMimeType(ContentService.MimeType.JSON);
    }
    //get sheet data
    let machine = req.parameter.machine;
    let sheet = doc.getSheetByName(machine);
    let values = sheet.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify({ data: values })).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
    try {
        let data = JSON.parse(e.postData.contents);
        if (data.authKey != 'your_auth_key') {
            return ContentService.createTextOutput(JSON.stringify({ 'message': 'wrong authKey' })).setMimeType(ContentService.MimeType.JSON);
        }
        const sheets = SpreadsheetApp.getActiveSpreadsheet()
        const sheet = sheets.getSheetByName(data.machine);
        lastRow = sheet.getLastRow();
        sheet.appendRow([lastRow, "'" + data.date, data.fault, data.sub_category, "'" + data.rectification_date, data.rectification, data.time, data.spares_used, data.remark])
        return ContentService.createTextOutput(JSON.stringify({ 'message': 'success' })).setMimeType(ContentService.MimeType.JSON);
    } catch {
        return ContentService.createTextOutput(JSON.stringify({ 'message': 'failed' })).setMimeType(ContentService.MimeType.JSON);
    }
}  