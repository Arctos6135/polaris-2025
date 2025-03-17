const dataRowsMap = {
  // Scouting
  "team": 1,
  "match": 2,
  "scout": 3,
  "alliance": 4,
  "type": 5,
  "id": 6,
  "auto score L1": 7,
  "auto score L2": 8,
  "auto score L3": 9,
  "auto score L4": 10,
  "auto net": 11,
  "auto processor": 12,
  "auto leave": 13,
  "score L1": 14,
  "score L2": 15,
  "score L3": 16,
  "score L4": 17, // q
  "net": 18,
  "processor": 19,
  "defense": 20,
  "endgame": 21,
  "driving": 22,
  "intake": 23,
  "precision": 24,
  "issues": 25,
  "comments": 26,
  "fouls": 27,

  // Pit Scouting
  "l1 scoring": 7,
  "l2 scoring": 8,
  "l3 scoring": 9,
  "l4 scoring": 10,
  "net scoring": 11,
  "processor scoring": 12,
  "deep climb": 13,
  "shallow climb": 14,
  "drivetrain": 15,
  "weight": 16,
  "length": 17,
  "width": 18,
  "intake type": 19,
  "retracted height": 20,
  "extended height": 21,
  "auto comments": 22,
  "general comments": 23,
  "fave colour": 24,
}

function doPost(request) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  const sheet = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const output = sheet.getSheetByName("App Output")
    const contents = JSON.parse(request.postData.contents);
    
    // write data
    contents.forEach((response) => {
      const lastRow = output.getLastRow() + 1;
      for (const col in response) {
        const colIdx = dataRowsMap[col];
        output.getRange(lastRow, colIdx).setValue(response[col]);
      }
    });
    // output.getRange(lastRow + 1, 3).setValue(request.postData.contents);
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
