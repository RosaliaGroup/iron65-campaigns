exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' } };
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const body = JSON.parse(event.body);
    const { name, email, phone, source, page, message, status } = body;

    const SUPA_URL = process.env.SUPABASE_URL || 'https://fhkgpepkwibxbxsepetd.supabase.co';
    const SUPA_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_-AYsxYIUbR4xwygPEABQhQ_7YgR80gS';

    const res = await fetch(
      SUPA_URL + '/rest/v1/leads',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPA_KEY,
          'Authorization': 'Bearer ' + SUPA_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ name, email, phone, source, page, message, status: status || 'new', role: 'user' })
      }
    );

    return {
      statusCode: res.ok ? 200 : 400,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: res.ok ? '{"ok":true}' : '{"error":"Failed to save lead"}'
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
