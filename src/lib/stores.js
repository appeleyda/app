import { readable, writable } from "svelte/store";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://lqhfzntmcelbqeuyivzl.supabase.co';
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxaGZ6bnRtY2VsYnFldXlpdnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyMzU0NDgsImV4cCI6MjAxMjgxMTQ0OH0.RXba5ZgIjHBYys5FPcvXpdOJ2PKtDmbJZPAnifYf_gA';

export const self = writable();

export const trade = writable({});

export const supabase = readable(createClient(supabaseURL, supabasekey));