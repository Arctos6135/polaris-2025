function doPost(request) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  const sheet = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const output = sheet.getSheetByName("App Output")
    JSON.parse(request.postData.contents).forEach((response) => {
      output.appendRow(response);
    });
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

//Probably need to change the ranges
function doGet() {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  const sheet = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const events = sheet.getSheetByName("Event Data");
    const teams = sheet.getRangeByName("GenTeamNumberList")
    const response = {
      success: true,
      matches: [],
      teams: [],
    };
    response.matches = events
      .getRange("B2:I1000")
      .getValues()
      .filter((lst) => lst[0] != "");
    response.teams = teams
      .getValues()
      .filter((lst) => lst[0] != "");

    return ContentService.createTextOutput(
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function columnToLetter(column) {
  let temp,
    letter = "";
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}
