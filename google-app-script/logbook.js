function doGet(req) {
    let doc = SpreadsheetApp.getActiveSpreadsheet();
    let querySheetNames = req.parameter.querySheetNames;
    //get sheet names
    if (querySheetNames != null) {
        let sheets = doc.getSheets();
        let sheetNames = [];
        for (let i = 0; i < sheets.length; i++) {
            sheetNames.push(sheets[i].getName())
        }
        return ContentService.createTextOutput(JSON.stringify({ 'logbooks': sheetNames })).setMimeType(ContentService.MimeType.JSON);
    }
    //get sheet data
    let logbook = req.parameter.logbook;
    let sheet = doc.getSheetByName(logbook);
    let values = sheet.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify({ data: values })).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
    try {
        let data = JSON.parse(e.postData.contents);
        if (data.authKey != 'yourAuthKey') {
            return ContentService.createTextOutput(JSON.stringify({ 'message': 'wrong authKey' })).setMimeType(ContentService.MimeType.JSON);
        }
        const sheets = SpreadsheetApp.getActiveSpreadsheet()
        const sheet = sheets.getSheetByName(data.machine);
        sheet.appendRow(["'" + data.date, data.work, data.category, data.work_by])
        return ContentService.createTextOutput(JSON.stringify({ 'message': 'success' })).setMimeType(ContentService.MimeType.JSON);
    } catch {
        return ContentService.createTextOutput(JSON.stringify({ 'message': 'failed' })).setMimeType(ContentService.MimeType.JSON);
    }
}  