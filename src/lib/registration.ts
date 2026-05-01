import type { RegistrationData } from '@/types/registration';
import { supabase } from './supabase';

interface SubmissionResult {
  sheetsSuccess: boolean;
  supabaseSuccess: boolean;
  errors: string[];
}

export async function submitRegistration(data: RegistrationData): Promise<SubmissionResult> {
  const result: SubmissionResult = {
    sheetsSuccess: false,
    supabaseSuccess: false,
    errors: []
  };

  // Submit to BOTH simultaneously for faster performance
  const [sheetsResult, supabaseResult] = await Promise.allSettled([
    submitToGoogleSheets(data),
    submitToSupabase(data)
  ]);

  // Check Google Sheets result
  if (sheetsResult.status === 'fulfilled') {
    result.sheetsSuccess = true;
    console.log('✅ Google Sheets: Success');
  } else {
    console.error('❌ Google Sheets: Failed', sheetsResult.reason);
    result.errors.push('Failed to save to primary storage');
  }

  // Check Supabase result
  if (supabaseResult.status === 'fulfilled') {
    result.supabaseSuccess = true;
    console.log('✅ Supabase: Success');
  } else {
    console.error('❌ Supabase: Failed', supabaseResult.reason);
    result.errors.push('Failed to save to backup storage');
  }

  // If both failed, throw error
  if (!result.sheetsSuccess && !result.supabaseSuccess) {
    throw new Error('Failed to save registration to both primary and backup storage');
  }

  // If only one failed, log warning but don't throw
  if (!result.sheetsSuccess || !result.supabaseSuccess) {
    console.warn('⚠️ Partial success:', result);
  }

  return result;
}

async function submitToGoogleSheets(data: RegistrationData): Promise<void> {
  const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
  
  if (!sheetsUrl) {
    throw new Error('Google Sheets URL not configured');
  }

  const response = await fetch(sheetsUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // With no-cors, we can't read response, assume success if no error thrown
  return;
}

async function submitToSupabase(data: RegistrationData): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { error } = await supabase
    .from('registrations')
    .insert([{
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      designation: data.designation,
      institute: data.institute,
      attendees: parseInt(data.attendees),
      food_preference: data.food,
      created_at: new Date().toISOString()
    }]);

  if (error) {
    throw error;
  }
}
