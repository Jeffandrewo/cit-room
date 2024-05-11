import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import {
  collection,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";

export const GET = async (request) => {
  try {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, orderBy("created_at", "desc"));
    const querySnapshot = await getDocs(q);

    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};

export const POST = async (request) => {
  try {
    const data = await request.json();
    const postsCollection = collection(db, "posts");

    await addDoc(postsCollection, {
      ...data,
      created_at: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: "Successfully uploaded a post",
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