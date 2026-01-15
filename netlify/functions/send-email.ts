import { Handler } from '@netlify/functions';
import sendpost from 'sendpost-js-sdk';

const emailApi = new sendpost.EmailApi();

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { to, subject, htmlBody, textBody } = JSON.parse(event.body || '{}');

    if (!to || !subject || !htmlBody) {
      return {
        statusCode: 400,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields: to, subject, htmlBody',
        }),
      };
    }

    const apiKey = process.env.SENDPOST_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'SENDPOST_API_KEY not configured',
        }),
      };
    }

    const emailMessage = new sendpost.EmailMessage();
    emailMessage.from = {
      email: process.env.SENDPOST_FROM_EMAIL || 'hello@playwithsendpost.io',
      name: process.env.SENDPOST_FROM_NAME || 'SendPost',
    };
    emailMessage.to = [{ email: to }];
    emailMessage.subject = subject;
    emailMessage.htmlBody = htmlBody;
    emailMessage.textBody = textBody || htmlBody.replace(/<[^>]*>/g, '');
    emailMessage.trackOpens = true;
    emailMessage.trackClicks = true;

    const response = await emailApi.sendEmail(apiKey, { emailMessage });

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        messageId: response.messageId,
      }),
    };
  } catch (error: any) {
    console.error('SendPost error:', error);
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};
