function doGet(req) {
    let authKey = req.parameter.authKey;
    if (authKey != 'your_auth_key') {
        return ContentService.createTextOutput(JSON.stringify({ 'message': 'Invalid authKey' })).setMimeType(ContentService.MimeType.JSON);
    }
    let doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName('All M&Ps');
    let values = sheet.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify({ data: values })).setMimeType(ContentService.MimeType.JSON);
} 