function doGet(req) {
    let getTitles = req.parameter.getTitles;
    //get titles
    if (getTitles != null) {
        let doc = SpreadsheetApp.getActiveSpreadsheet();
        //get sheet data
        let sheet = doc.getSheetByName('Articles');
        var lastRow = sheet.getLastRow();
        var range = sheet.getRange(1, 1, lastRow, 2);
        var values = range.getValues();
        return ContentService.createTextOutput(JSON.stringify({ articles: values })).setMimeType(ContentService.MimeType.JSON);
    } else {
        let doc = SpreadsheetApp.getActiveSpreadsheet();
        //get sheet data
        let id = req.parameter.id;
        let sheet = doc.getSheetByName('Articles');
        var range = sheet.getRange(parseInt(id) + 1, 1, 1, 4);
        var values = range.getValues();
        return ContentService.createTextOutput(JSON.stringify({ article: values })).setMimeType(ContentService.MimeType.JSON);
    }
}
function doPost(e) {
    try {
        let data = JSON.parse(e.postData.contents);
        if (data.authKey != 'your_auth_key') {
            return ContentService.createTextOutput(JSON.stringify({ 'message': 'Invalid authKey' })).setMimeType(ContentService.MimeType.JSON);
        }
        const updateRow = e.parameter.update;
        if (updateRow != null) {
            let doc = SpreadsheetApp.getActiveSpreadsheet();
            //get sheet data
            let sheet = doc.getSheetByName('Articles');
            sheet.getRange(parseInt(e.parameter.id) + 1, 1, 1, 4).setValues([[data.title, data.tags, data.body, "'" + data.date]]);
            return ContentService.createTextOutput(JSON.stringify({ 'message': 'success' })).setMimeType(ContentService.MimeType.JSON);
        }
        const sheets = SpreadsheetApp.getActiveSpreadsheet()
        const sheet = sheets.getSheetByName('Articles');
        sheet.appendRow([data.title, data.tags, data.body, "'" + data.date])
        return ContentService.createTextOutput(JSON.stringify({ 'message': 'success' })).setMimeType(ContentService.MimeType.JSON);
    } catch {
        return ContentService.createTextOutput(JSON.stringify({ 'message': 'failed' })).setMimeType(ContentService.MimeType.JSON);
    }
}  