import { readable, writable } from "svelte/store";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://mxpgrlipvxjpgycwsvdj.supabase.co';
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14cGdybGlwdnhqcGd5Y3dzdmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MDA0NjksImV4cCI6MjAxMTk3NjQ2OX0.93S8EHB1KUkV_Alj4sjevTjw6JHqtptaNptfEOu-CDI';

export const self = writable();

export const trade = writable({});

export const supabase = readable(createClient(supabaseURL, supabasekey));