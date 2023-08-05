function doPost(e) {
    try {
        let data = JSON.parse(e.postData.contents);
        const doc = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = doc.getSheetByName('Users');
        let username = data.username
        let password = data.password
        // let rowRange = sheet.getRange(2, 1, 1, sheet.getLastColumn());
        let values = sheet.getDataRange().getValues();
        if (values[1][3] == username && values[1][4] == password) {
            return ContentService.createTextOutput(JSON.stringify({
                'loggedIn': 'yes', 'authKey': 'your_auth_key'
            })).setMimeType(ContentService.MimeType.JSON);
        } else {
            return ContentService.createTextOutput(JSON.stringify({ 'message': 'Login failed! Wrong credentials' })).setMimeType(ContentService.MimeType.JSON);
        }
    }
    catch {
        return ContentService.createTextOutput(JSON.stringify({ 'message': 'Internal server error' })).setMimeType(ContentService.MimeType.JSON);
    }
}