import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const roadmapCookie = cookieStore.get("roadmap");

    if (!roadmapCookie) {
      return NextResponse.json({ roadmap: null });
    }

    const roadmap = JSON.parse(roadmapCookie.value);
    return NextResponse.json({ roadmap });
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    return NextResponse.json({ roadmap: null });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = NextResponse.json({ success: true });
    
    response.cookies.set("roadmap", JSON.stringify(body), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error("Error saving roadmap:", error);
    return NextResponse.json(
      { error: "Failed to save roadmap" },
      { status: 500 }
    );
  }
}
