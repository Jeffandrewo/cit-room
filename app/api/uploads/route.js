import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'

export const GET = async (request) => {
  return NextResponse.json({
    success: true,
    message: "I LOVE SUSHI",
  });
};

export const POST = async (request) => {
  try {
    const contentType = request.header['content-type']
    
    if(contentType.incluedes('multipart/form-data')) {
      const chunks = []
      console.log('MUAGIII KAA')
      request.on('end', async() => {
        const data = Buffer.concat(chunks);
      })
    }
    return NextResponse.json({
      success: true,
      contents: imageFile
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    });
  }
};

export const DELETE = async (request) => {
  return NextResponse.json({
    success: true,
  });
};

export const PUT = async (request) => {
  return NextResponse.json({
    success: true,
  });
};

export const PATCH = async (request) => {
  return NextResponse.json({
    success: true,
  });
};
