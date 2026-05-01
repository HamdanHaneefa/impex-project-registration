import type { RegistrationData } from '@/types/registration';

/**
 * Submit registration to Microsoft Excel via Power Automate
 * Uses Power Automate HTTP webhook instead of Google Sheets
 */
export async function submitToExcel(data: RegistrationData): Promise<boolean> {
  const webhookUrl = import.meta.env.VITE_EXCEL_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.error('VITE_EXCEL_WEBHOOK_URL is not configured in .env file');
    throw new Error('Excel integration not configured');
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Power Automate returns a response, unlike Google Sheets no-cors
    const result = await response.json();
    console.log('Excel submission successful:', result);
    
    return true;
  } catch (error) {
    console.error('Excel submission failed:', error);
    throw error;
  }
}
