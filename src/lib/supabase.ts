import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase-types";

const supabaseUrl = "https://npswviffhkzrqqlsbxia.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wc3d2aWZmaGt6cnFxbHNieGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5Njk5MjQsImV4cCI6MjA1NDU0NTkyNH0.lVfg1FoVxdpVxBKkvmSL9Lg6UIRfHpXMrgj3pSS5ftQ";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
