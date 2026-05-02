/**
 * Google Apps Script for IFPD Meet 2026 Registration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Copy this entire code and paste it there
 * 4. Save the project
 * 5. Deploy as Web App
 * 
 * FEATURES:
 * - Saves registration to Google Sheets
 * - Sends confirmation email to participant automatically
 * - Optional WhatsApp notification (requires WhatsApp Business API)
 */

// Configuration - UPDATE THESE VALUES
const ORGANIZER_EMAIL = 'Info@impextechnologies.in';
const ORGANIZER_PHONE = '+91 97786 65499';

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Create timestamp
    const timestamp = new Date();
    
    // Get the next row number
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;
    
    // Format phone column as plain text BEFORE writing data
    const phoneCell = sheet.getRange(nextRow, 3); // Column C (Phone Number)
    phoneCell.setNumberFormat('@'); // Plain text format
    
    // Prepare row data matching the sheet headers
    const rowData = [
      timestamp,
      data.fullName || '',
      data.phone || '',  // Will be stored as text now
      data.email || '',
      data.designation || '',
      data.institute || '',
      data.attendees || '',
      data.food || ''
    ];
    
    // Write the data to the sheet
    const range = sheet.getRange(nextRow, 1, 1, rowData.length);
    range.setValues([rowData]);
    
    // Send confirmation email to participant
    try {
      sendConfirmationEmail(data);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the registration if email fails
    }
    
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

function sendConfirmationEmail(data) {
  const subject = '✅ Registration Confirmed - IFPD Meet 2026';
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #E91E63 0%, #9C27B0 50%, #1E88E5 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #E91E63; }
        .button { display: inline-block; background: #E91E63; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to IFPD Meet 2026!</h1>
          <p>Your registration is confirmed</p>
        </div>
        <div class="content">
          <p>Dear ${data.fullName},</p>
          
          <p>Thank you for registering for <strong>IFPD Meet 2026</strong>! We're excited to have you join us for this exclusive event.</p>
          
          <div class="details">
            <h3 style="color: #E91E63; margin-top: 0;">📋 Your Registration Details</h3>
            <div class="detail-row">
              <span class="detail-label">Name:</span> ${data.fullName}
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span> ${data.phone}
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span> ${data.email}
            </div>
            <div class="detail-row">
              <span class="detail-label">Institute:</span> ${data.institute}
            </div>
            <div class="detail-row">
              <span class="detail-label">Attendees:</span> ${data.attendees}
            </div>
            <div class="detail-row">
              <span class="detail-label">Food Preference:</span> ${data.food}
            </div>
          </div>
          
          <div class="details">
            <h3 style="color: #1E88E5; margin-top: 0;">📅 Event Details</h3>
            <div class="detail-row">
              <span class="detail-label">Date:</span> Saturday, 9 May 2026
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span> 10:00 AM – 3:00 PM
            </div>
            <div class="detail-row">
              <span class="detail-label">Venue:</span> Mount Ridge International Convention Centre, Manjeri, Kerala
            </div>
          </div>
          
          <p><strong>What to Expect:</strong></p>
          <ul>
            <li>🎯 Live demonstrations of xSeries IFPD</li>
            <li>🎤 Keynote by Mr. Renjith Kesav</li>
            <li>🤝 Networking with 100+ education leaders</li>
            <li>🍽️ Complimentary meals and refreshments</li>
          </ul>
          
          <center>
            <a href="https://maps.app.goo.gl/guRwj3hVagK21Yyu5" class="button">📍 Get Directions</a>
          </center>
          
          <p><strong>Need Help?</strong></p>
          <p>Contact us:<br>
          📞 ${ORGANIZER_PHONE}<br>
          📧 ${ORGANIZER_EMAIL}<br>
          💬 <a href="https://wa.me/919778665499">WhatsApp Us</a></p>
          
          <p>See you at the event!</p>
          
          <p>Best regards,<br>
          <strong>Team Impex</strong></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Impex. All rights reserved.</p>
          <p>IFPD Meet 2026 | Organized by Impex</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const textBody = `
Registration Confirmed - IFPD Meet 2026

Dear ${data.fullName},

Thank you for registering for IFPD Meet 2026!

Your Registration Details:
- Name: ${data.fullName}
- Phone: ${data.phone}
- Email: ${data.email}
- Institute: ${data.institute}
- Attendees: ${data.attendees}
- Food Preference: ${data.food}

Event Details:
- Date: Saturday, 9 May 2026
- Time: 10:00 AM – 3:00 PM
- Venue: Mount Ridge International Convention Centre, Manjeri, Kerala

Get Directions: https://maps.app.goo.gl/guRwj3hVagK21Yyu5

Need Help?
Phone: ${ORGANIZER_PHONE}
Email: ${ORGANIZER_EMAIL}
WhatsApp: https://wa.me/919778665499

See you at the event!

Best regards,
Team Impex
  `;
  
  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: textBody,
    htmlBody: htmlBody,
    name: 'IFPD Meet 2026 - Impex',
    replyTo: ORGANIZER_EMAIL,
    from: ORGANIZER_EMAIL  // This will work if you add the email as an alias
  });
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
