import { createClient } from '@supabase/supabase-js'
import { PROJECT_URL, API_KEY } from '../config/env.js'

const supabaseUrl = 'https://lwmountdbyyczaayjpts.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3bW91bnRkYnl5Y3phYXlqcHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzE1NTMsImV4cCI6MjA2MDIwNzU1M30.Atc5whx_G1jIyq_U2kcOTQ67ySPuUDkqeKkzpFKAD6s'
export const supabase = createClient (supabaseUrl, supabaseKey)