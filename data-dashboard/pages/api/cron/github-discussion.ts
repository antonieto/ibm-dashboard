import { NextRequest, NextResponse } from "next/server";

export const config = {
	runtime: 'edge',
}

export default function handler(req: NextRequest, res: NextResponse) {
	return NextResponse.json({
		name: `Hello, from ${req.url} I'm now an Edge Function!`
	})
}
