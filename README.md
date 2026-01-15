# SendPost Netlify Functions Example

A Netlify Functions example demonstrating how to send emails using the SendPost API.

## Prerequisites

- Node.js 18+
- Netlify account (free tier works)
- Netlify CLI
- SendPost Sub-Account API Key

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/sendpost/sendpost-netlify-functions-example.git
   cd sendpost-netlify-functions-example
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Netlify CLI (if not installed)**
   ```bash
   npm install -g netlify-cli
   ```

4. **Link to Netlify site**
   ```bash
   netlify link
   ```

5. **Set environment variables**
   ```bash
   netlify env:set SENDPOST_API_KEY your_api_key
   ```

6. **Run locally**
   ```bash
   npm run dev
   ```

7. **Test the API**
   ```bash
   curl -X POST http://localhost:8888/.netlify/functions/send-email \
     -H "Content-Type: application/json" \
     -d '{
       "to": "recipient@example.com",
       "subject": "Hello from Netlify Functions",
       "htmlBody": "<h1>Hello World!</h1><p>This email was sent from Netlify Functions.</p>"
     }'
   ```

8. **Deploy to production**
   ```bash
   npm run deploy
   ```

## Project Structure

```
netlify-functions/
├── netlify/
│   └── functions/
│       └── send-email.ts
├── package.json
├── netlify.toml
└── README.md
```

## API Endpoint

### POST /.netlify/functions/send-email
Send an email using SendPost.

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "htmlBody": "<h1>HTML content</h1>",
  "textBody": "Plain text content (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "msg_xxx"
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SENDPOST_API_KEY` | Your SendPost Sub-Account API Key |
| `SENDPOST_FROM_EMAIL` | Default sender email (optional) |
| `SENDPOST_FROM_NAME` | Default sender name (optional) |

## Documentation

- [SendPost Documentation](https://sendpost.io/docs)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [SendPost JavaScript SDK](https://github.com/sendpost/sendpost-js-sdk)

## License

MIT
