declare module "bun" {
	interface Env {
		REPLIT_DB_URL: string;
		REPLIT_DEV_DOMAIN: string;
		REPLIT_ENVIRONMENT: string;
	}
}
