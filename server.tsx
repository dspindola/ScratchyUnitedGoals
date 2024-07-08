import { cors } from "@elysiajs/cors";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import type { MatchedRoute } from "bun";
import { Elysia } from "elysia";
import logixlysia from "logixlysia";
import { Layout } from "./src/routes/_layout";

const app = new Elysia({
	name: "Logixlysia Example",
})
	.use(
		logixlysia({
			config: {
				ip: true,
				logFilePath: "./logs/example.log",
				customLogFormat:
					"🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip}",
				logFilter: {
					level: ["ERROR", "WARNING"],
					status: [500, 404],
					method: "GET",
				},
			},
		}),
	)
	.use(cors())
	.use(staticPlugin())
	.use(html())
	.decorate('router', () => new Bun.FileSystemRouter({
		dir: "src/routes",
		style: "nextjs",
		fileExtensions: [".tsx"]
	}))
	.get("/", ({ router, request }) => {
		return router().match(request) as MatchedRoute
	}, {
		async afterHandle(handler) {
			const response = handler.response as MatchedRoute;
			const page = await import(response.filePath);
			handler.response = <Layout> <page.Route /></Layout>
		}
	})

app.listen({
	port: 8080,
	hostname: "0.0.0.0",
});
