import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const env = fs.readFileSync('.env', 'utf-8')
const SUPABASE_URL = env.match(/VITE_SUPABASE_URL=(.*)/)[1]
const SUPABASE_KEY = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1]

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function test() {
  console.log("Signing up test user...")
  const email = `test_${Date.now()}@gmail.com`
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'password123',
    options: {
      data: { full_name: 'Test User' }
    }
  })
  
  if (error) {
    console.error("Auth error:", error)
    return
  }
  
  console.log("Auth success. User ID:", data.user?.id)
  console.log("Session:", !!data.session)
  
  console.log("Checking profile...")
  const { data: profile, error: profErr } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()
    
  if (profErr) {
    console.error("Profile error:", profErr)
  } else {
    console.log("Profile found:", profile)
  }
}

test()
