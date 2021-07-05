import type { RequestHandler } from "@sveltejs/kit";
import { createRoom, Room } from "../../db";

export const post: RequestHandler<unknown, Pick<Room, "name">> = async ({
  body,
}) => ({ body: await createRoom(body.name) });
