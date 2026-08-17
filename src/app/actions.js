"use server";

import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

function getAdminSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase admin credentials missing!');
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false
    }
  });
}

export async function submitTestimonialAction(data) {
  try {
    const { name, role, quote, initials, user_id } = data || {};

    if (!name || !name.trim() || !quote || !quote.trim()) {
      throw new Error('Name and review quote are required.');
    }

    const payload = {
      name: name.trim(),
      role: (role && role.trim()) || 'Client',
      quote: quote.trim(),
      initials: initials || name.trim().slice(0, 2).toUpperCase(),
      approved: false,
    };

    if (user_id) {
      payload.user_id = user_id;
    }

    const supabaseAdmin = getAdminSupabase();
    const { error } = await supabaseAdmin
      .from('testimonials')
      .insert(payload);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('submitTestimonialAction error:', error);
    return { success: false, error: error.message || 'Failed to submit.' };
  }
}
