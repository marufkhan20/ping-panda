import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { HTTPException } from "hono/http-exception"
import { j } from "./__internals/j"

const authMiddleware = j.middleware(async ({ c, next }) => {
  const authHeader = c.req.header("Authorization")

  if (authHeader) {
    const apiKey = authHeader.split(" ")[1]

    const user = await db.user.findUnique({
      where: { apiKey },
    })

    if (user) {
      return next({ user })
    }
  }

  const auth = await currentUser()

  if (!auth) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  return next({ user })
})

export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure
export const privateProcedure = baseProcedure.use(authMiddleware)
