import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const htmlFilePath = join(process.cwd(), "public", "budget.html");
    const htmlContent = readFileSync(htmlFilePath, "utf-8");

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error reading HTML file:", error);
    return new NextResponse("Error loading content", { status: 500 });
  }
}
