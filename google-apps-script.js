/**
 * Google Apps Script for IFPD Meet 2026 Registration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Copy this entire code and paste it there
 * 4. Save the project
 * 5. Deploy as Web App (see GOOGLE_SHEETS_SETUP.md for details)
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Create timestamp
    const timestamp = new Date();
    
    // Prepare row data matching the sheet headers
    const rowData = [
      timestamp,
      data.fullName || '',
      data.phone || '',
      data.email || '',
      data.designation || '',
      data.institute || '',
      data.attendees || '',
      data.food || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration submitted successfully',
        timestamp: timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'API is running',
      message: 'Use POST method to submit registration data'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
