import { httpHandler } from "@/server";

// export const runtime = "edge"
export const runtime = "nodejs";

export { httpHandler as GET, httpHandler as POST };
