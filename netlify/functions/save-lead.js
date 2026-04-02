exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' } };
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { name, email, phone, source, page, message, status, tourSlot } = JSON.parse(event.body);

    const SUPA_URL = process.env.SUPABASE_URL || 'https://fhkgpepkwibxbxsepetd.supabase.co';
    const SUPA_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_-AYsxYIUbR4xwygPEABQhQ_7YgR80gS';

    // 1. Save to Supabase
    await fetch(SUPA_URL + '/rest/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPA_KEY,
        'Authorization': 'Bearer ' + SUPA_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: name || '',
        email: email || '',
        phone: phone || '',
        source: source || 'iron65-campaign',
        message: (message || '') + (tourSlot ? ' | Tour: ' + tourSlot : '') + (page ? ' | Page: ' + page : ''),
        property: 'Iron65',
        client: 'rosalia',
        status: status || 'new'
      })
    }).catch(() => {});

    // 2. Send confirmation email to visitor
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (email && tourSlot && RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + RESEND_KEY },
        body: JSON.stringify({
          from: 'Iron65 <tours@iron65.com>',
          to: email,
          subject: 'Tour Confirmed \u2014 Iron65 Newark \u00B7 ' + tourSlot,
          html: '<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#080808;color:#f5f0e8;padding:0"><div style="background:#080808;padding:40px;text-align:center;border-bottom:2px solid #C8A96E"><div style="font-size:36px;color:#C8A96E;letter-spacing:4px;margin-bottom:4px">IRON 65</div><div style="font-size:12px;color:rgba(245,240,232,0.5);letter-spacing:2px">NEWARK \u00B7 NEW JERSEY</div></div><div style="padding:40px"><div style="font-size:22px;color:#C8A96E;margin-bottom:8px">Tour Confirmed, ' + (name || 'there') + '!</div><div style="font-size:14px;color:rgba(245,240,232,0.7);line-height:1.8;margin-bottom:32px">We are looking forward to showing you Iron65. Here are your booking details:</div><div style="background:#141210;border:1px solid rgba(200,169,110,0.2);padding:24px;margin-bottom:28px"><div style="margin-bottom:14px"><span style="color:#C8A96E;font-size:12px;letter-spacing:1px;text-transform:uppercase">DATE</span><br><span style="font-size:15px;color:#f5f0e8">' + tourSlot + '</span></div><div style="margin-bottom:14px"><span style="color:#C8A96E;font-size:12px;letter-spacing:1px;text-transform:uppercase">ADDRESS</span><br><span style="font-size:15px;color:#f5f0e8">65 McWhorter St, Newark NJ 07105</span></div><div style="margin-bottom:14px"><span style="color:#C8A96E;font-size:12px;letter-spacing:1px;text-transform:uppercase">UNIT</span><br><span style="font-size:15px;color:#f5f0e8">' + (message || 'To be confirmed') + '</span></div><div><span style="color:#C8A96E;font-size:12px;letter-spacing:1px;text-transform:uppercase">CONTACT</span><br><span style="font-size:15px;color:#f5f0e8">(908) 699-6500 \u00B7 ana@rosaliagroup.com</span></div></div><div style="font-size:13px;color:rgba(245,240,232,0.5);line-height:1.7;margin-bottom:28px">Ana Haynes will personally greet you for your tour. Please arrive a few minutes early. If you need to reschedule, call or text <strong style="color:#C8A96E">(908) 699-6500</strong> anytime.</div><div style="background:#C8A96E;padding:16px;text-align:center"><div style="font-size:12px;font-weight:bold;letter-spacing:2px;color:#000;text-transform:uppercase">We Can\'t Wait to See You</div></div></div><div style="padding:24px;text-align:center;border-top:1px solid rgba(200,169,110,0.15)"><div style="font-size:11px;color:rgba(245,240,232,0.3)">Iron65 \u00B7 65 McWhorter St, Newark NJ 07105 \u00B7 Powered by Rosalia Group</div></div></div>'
        })
      }).catch(() => {});

      // 3. Notify Ana
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + RESEND_KEY },
        body: JSON.stringify({
          from: 'Iron65 System <tours@iron65.com>',
          to: 'ana@rosaliagroup.com',
          subject: '\uD83C\uDFE0 New Tour Booked \u2014 ' + (name || '?') + ' \u00B7 ' + tourSlot,
          html: '<div style="font-family:Arial,sans-serif;padding:24px;max-width:500px"><h2 style="color:#C8A96E">New Tour Booked via Iron65 Campaign</h2><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px;font-weight:bold;width:120px">Name</td><td style="padding:8px">' + (name||'') + '</td></tr><tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">' + (email||'') + '</td></tr><tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">' + (phone||'Not provided') + '</td></tr><tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Tour Time</td><td style="padding:8px;color:#C8A96E;font-weight:bold">' + tourSlot + '</td></tr><tr><td style="padding:8px;font-weight:bold">Unit Interest</td><td style="padding:8px">' + (message||'Not specified') + '</td></tr><tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Source</td><td style="padding:8px">' + (source||'') + '</td></tr><tr><td style="padding:8px;font-weight:bold">Page</td><td style="padding:8px">' + (page||'') + '</td></tr></table></div>'
        })
      }).catch(() => {});
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: '{"ok":true}'
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
