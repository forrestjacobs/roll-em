import type { RequestHandler } from "@sveltejs/kit";
import { getRoom } from "../../db";

export const get: RequestHandler = async ({ params }) => {
  const room = await getRoom(params.id);
  return room === undefined ? undefined : { body: room };
};
