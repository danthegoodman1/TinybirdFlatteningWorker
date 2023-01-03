/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

import { flatten } from 'dansjsonutils/flatten'

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		console.log(request.headers)
		console.log('working')
		const oldRows = (await request.text()).split("\n")
		const newRows = []
		for (const row of oldRows) {
			newRows.push(JSON.stringify(flatten(JSON.parse(row))))
		}
		const { searchParams } = new URL(request.url)
		const res = await fetch(`${searchParams.get('tb_url')}`, {
			method: 'POST',
			body: newRows.join("\n"),
			headers: request.headers
		})

		let { readable, writable } = new TransformStream()

  	res.body!.pipeTo(writable)

		return new Response(readable, res)
	},
};
