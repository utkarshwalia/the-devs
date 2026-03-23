import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateRoadmap } from "@/lib/ai-roadmap";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { level, interests, timeCommitment, goals, learningStyle } = body;

    if (!level || !interests || !timeCommitment || !goals || !learningStyle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const roadmap = generateRoadmap(level, interests, timeCommitment, goals, learningStyle);

    const cookieStore = await cookies();
    const response = NextResponse.json({ success: true, roadmap });
    
    response.cookies.set("roadmap", JSON.stringify(roadmap), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
