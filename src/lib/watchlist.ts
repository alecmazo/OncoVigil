import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export const listWatch = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{ development_id: string }>`
      select development_id from watchlist
      where user_id = ${context.userId}
      order by created_at desc
    `;
  });

export const toggleWatch = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .middleware([authMiddleware])
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    const existing = await sql<{ id: number }>`
      select id from watchlist
      where user_id = ${context.userId} and development_id = ${id}
    `;
    if (existing[0]) {
      await sql`
        delete from watchlist
        where user_id = ${context.userId} and development_id = ${id}
      `;
      return { watching: false as const };
    }
    await sql`
      insert into watchlist (user_id, development_id)
      values (${context.userId}, ${id})
    `;
    return { watching: true as const };
  });
