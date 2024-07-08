declare module "*.toml" {
	interface Content extends Record<string, any> {}
	const content: Content;
}

declare module "*.replit" {
	interface Content extends Record<string, any> {}
	const content: Content;
}
