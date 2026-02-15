important: add security measures for my api route, specifically the chat, maybe internal rate limits, and some predefined prompts to just click so that it won't generate but just return something predefinied

add pulsoid monitor heart rate 
other data accessible with my watch like sleep or steps
_petalite on twitter
maybe do something like my spotify listening activity
try to graph it also

Basically chatgpt but customize it like having additional UI stuff and assets
- add some fun animations or graphics
- music activity, add vinyl, show now playing spinning, add some spotify stats like top artists, top songs, etc. and even recos

And AI tab (say like talk to me in english, bisaya, or tagalog)
Try to add a 2d or 3d of me

assets like this https://vt.tiktok.com/ZS5CH3KhX/ 

since spotify api used a lot, maybe just integrate to this or chika since its more fun and people will use it and have some fun data etc.

consolidated feats
- Yani's cells include, anime page (currently watching and/or recently watched, add section for like ratings and personal reco, maybe cards that can have some possibility for description for thoughts), music page (currently listening, top songs, artists, reco)

(same with contact page - try maybe use discovery page sa perplexity)

chats
add bisaya and tagalog chats make the topic actually appropriate for the language

Improve SEO and add to google search console 
ai meta sam3d for 3d generation from picture

some libraries
- threejs motionjs animejs
- accernity
- some ai chat api


Security Measures Added
1. 🛡️ IP-Based Rate Limiting (
lib/rate-limit.ts
)
Sliding window algorithm — tracks timestamps per IP, limits to 10 requests per minute
Automatic cleanup — periodically prunes stale entries to prevent memory leaks
Edge-compatible — works in Vercel Edge Runtime (no Node.js APIs needed)
Proper Retry-After and X-RateLimit-* headers in responses
2. 🌐 Origin/Referer Validation
Only allows requests from yanicells.dev, www.yanicells.dev, and localhost
Blocks direct API calls from external origins (e.g., someone curling your endpoint from their own site)
3. 📏 Input Validation
Message count cap: Max 30 messages per conversation (prevents history stuffing)
Message length cap: Max 2,000 characters per message (prevents prompt injection via massive inputs)
Payload size cap: Max ~100 KB total body size
Strict structure validation: Every message must have the correct role ("user" | "model") and parts array with text strings
4. 📦 Payload Size Protection
Checks both Content-Length header and actual body size after parsing
Returns 413 Payload Too Large for oversized requests
5. 🔧 Better Error Responses
All errors now return consistent JSON { error, message } format
Rate-limit responses include standard headers (Retry-After, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset)
Success responses also include rate-limit headers so the client can track their remaining quota
Note: The in-memory rate limiter is per-isolate in Edge Runtime. If you ever need stronger guarantees (e.g., shared state across instances), you could swap it for Upstash Redis with their @upstash/ratelimit package — but for a portfolio chatbot, the in-memory approach is more than sufficient.