import type { NextRequest } from 'next/server';
import {
  ApiResponse,
  getStatusDetailsFromQuery,
  HttpStatusCode,
  messages,
  sendResponse,
} from '@/util';

export default async function handler(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const delay = searchParams.get('delay') || '0';
  try {
    const { code, message } = getStatusDetailsFromQuery(searchParams.get('status'));
    return await sendResponse(
      {
        status: code,
        message,
        success: true,
        standard: message !== messages.nonStandard,
      },
      delay
    );
  } catch (error) {
    // assume bad request
    const res: ApiResponse = {
      status: HttpStatusCode.BAD_REQUEST,
      message: messages.invalid,
      success: false,
      standard: false,
    };

    // check if error is an unexpected error
    if (error instanceof Error && error.message !== messages.invalid) {
      res.status = HttpStatusCode.INTERNAL_SERVER_ERROR;
      res.message = messages.serverError;
    }

    return await sendResponse(res, delay);
  }
}

export const config = {
  runtime: 'edge',
};
