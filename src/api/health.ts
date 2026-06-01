export function createHealthResponse(routes: string[]): Response {
  return Response.json({
    ok: true,
    name: "citefold-worker",
    routes,
  });
}
