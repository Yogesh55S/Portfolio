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
    const { userId } = await auth();
    if (!userId) {
      throw new Error('You must be signed in to submit a testimonial.');
    }

    const supabaseAdmin = getAdminSupabase();
    const { error } = await supabaseAdmin
      .from('testimonials')
      .insert({
        ...data,
        approved: false,
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('submitTestimonialAction error:', error);
    return { success: false, error: error.message || 'Failed to submit.' };
  }
}
