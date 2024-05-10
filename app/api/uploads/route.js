import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { serverTimestamp } from "firebase/firestore";

export const GET = async (request) => {
  return NextResponse.json({
    success: true,
    message: "I LOVE SUSHI",
  });
};

export const POST = async (request) => {
  try {
    const data = await request.json();
    
    await addDoc(collection(db, 'posts'), {
      ...data,
      created_at: serverTimestamp()
    })
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
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
