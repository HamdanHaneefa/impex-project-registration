/**
 * Google Apps Script for IFPD Meet 2026 Registration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Copy this entire code and paste it there
 * 4. Update CALLMEBOT_API_KEY below (see WHATSAPP_SETUP_INSTRUCTIONS.txt)
 * 5. Save the project
 * 6. Deploy as Web App
 * 
 * FEATURES:
 * - Saves registration to Google Sheets
 * - Sends confirmation email to participant automatically
 * - Sends WhatsApp message to participant automatically (via CallMeBot)
 */

// ==========================================
// CONFIGURATION - UPDATE THESE VALUES
// ==========================================
const ORGANIZER_EMAIL = 'develop.elamai@gmail.com';
const ORGANIZER_PHONE = '+91 97786 65499';

// CallMeBot API Key - Get yours by following WHATSAPP_SETUP_INSTRUCTIONS.txt
// To get API key: Save +34 644 31 95 72 in your phone, send "I allow callmebot to send me messages"
const CALLMEBOT_API_KEY = 'YOUR_API_KEY_HERE';  // ⚠️ REPLACE THIS with your actual API key

// Set to true to enable WhatsApp notifications, false to disable
const ENABLE_WHATSAPP = true;

// ==========================================
// MAIN FUNCTION - HANDLES REGISTRATION
// ==========================================
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
      console.log('✅ Email sent successfully');
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      // Don't fail the registration if email fails
    }
    
    // Send WhatsApp message to participant
    if (ENABLE_WHATSAPP && CALLMEBOT_API_KEY !== 'YOUR_API_KEY_HERE') {
      try {
        sendWhatsAppMessage(data);
        console.log('✅ WhatsApp message sent successfully');
      } catch (whatsappError) {
        console.error('❌ WhatsApp sending failed:', whatsappError);
        // Don't fail the registration if WhatsApp fails
      }
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

// ==========================================
// EMAIL CONFIRMATION FUNCTION
// ==========================================
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
    replyTo: 'Info@impextechnologies.in'
    // Removed 'from' parameter - Gmail will use develop.elamai@gmail.com automatically
  });
}

// ==========================================
// WHATSAPP MESSAGE FUNCTION (CallMeBot API)
// ==========================================
function sendWhatsAppMessage(data) {
  // Clean phone number - remove spaces and keep only digits and +
  const cleanPhone = data.phone.replace(/\s/g, '');
  
  // Create the message
  const message = `🎉 *Registration Confirmed!*

Dear ${data.fullName},

Your registration for *IFPD Meet 2026* is confirmed!

📅 *Event Details:*
Date: Saturday, 9 May 2026
Time: 10:00 AM – 3:00 PM
Venue: Mount Ridge International Convention Centre, Manjeri, Kerala

📍 Get Directions: https://maps.app.goo.gl/guRwj3hVagK21Yyu5

🎯 What to Expect:
• Live xSeries IFPD demos
• Keynote by Mr. Renjith Kesav
• Network with 100+ leaders
• Complimentary meals

Need help? Call ${ORGANIZER_PHONE}

See you at the event!
Team Impex`;

  // URL encode the message
  const encodedMessage = encodeURIComponent(message);
  
  // CallMeBot API endpoint
  const apiUrl = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodedMessage}&apikey=${CALLMEBOT_API_KEY}`;
  
  // Send the request
  const response = UrlFetchApp.fetch(apiUrl, {
    method: 'get',
    muteHttpExceptions: true
  });
  
  const responseCode = response.getResponseCode();
  
  if (responseCode !== 200) {
    throw new Error('WhatsApp API returned error: ' + responseCode);
  }
  
  return true;
}

// ==========================================
// TEST FUNCTION
// ==========================================
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'API is running',
      message: 'Use POST method to submit registration data',
      whatsappEnabled: ENABLE_WHATSAPP,
      whatsappConfigured: CALLMEBOT_API_KEY !== 'YOUR_API_KEY_HERE'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==========================================
// TEST WHATSAPP FUNCTION (Run this to test)
// ==========================================
function testWhatsApp() {
  const testData = {
    fullName: 'Test User',
    phone: '+91 97786 65499', // Your phone number
    email: 'test@example.com',
    institute: 'Test Institute',
    attendees: '1',
    food: 'Veg'
  };
  
  try {
    sendWhatsAppMessage(testData);
    console.log('✅ Test WhatsApp message sent successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}
