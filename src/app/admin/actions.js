"use server";

import { createClient } from '@supabase/supabase-js';
import { auth, currentUser } from '@clerk/nextjs/server';

const ADMIN_EMAIL = 'yogesharma914@gmail.com';

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

async function verifyAdmin() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const user = await currentUser();
  const allEmails = (user?.emailAddresses || []).map(e => e.emailAddress?.toLowerCase?.() || '');
  const primaryEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase?.() || '';
  const isAdmin = allEmails.includes(ADMIN_EMAIL) || primaryEmail === ADMIN_EMAIL;
  if (!isAdmin) {
    throw new Error('Access Denied');
  }
}

export async function deleteTestimonialAction(id) {
  try {
    await verifyAdmin();
    const supabaseAdmin = getAdminSupabase();
    const { error } = await supabaseAdmin
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('deleteTestimonialAction error:', error);
    return { success: false, error: error.message };
  }
}

export async function approveTestimonialAction(id) {
  try {
    await verifyAdmin();
    const supabaseAdmin = getAdminSupabase();
    const { error } = await supabaseAdmin
      .from('testimonials')
      .update({ approved: true })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('approveTestimonialAction error:', error);
    return { success: false, error: error.message };
  }
}

export async function updateTestimonialAction(id, updateData) {
  try {
    await verifyAdmin();
    const supabaseAdmin = getAdminSupabase();
    const { error } = await supabaseAdmin
      .from('testimonials')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('updateTestimonialAction error:', error);
    return { success: false, error: error.message };
  }
}
