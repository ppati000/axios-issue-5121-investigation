import Koa from "koa";

const app = new Koa();
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

app.use(async (ctx) => {
    ctx.set("access-control-allow-origin", "*");
    ctx.set("access-control-allow-methods", "*");
    ctx.set("access-control-allow-headers", "*");

    ctx.req.on("close", () => {
       console.log(new Date(), "closed");
    });

    await sleep(2000);
    ctx.body = "OK";
    console.log(new Date(), "done");
});

app.listen(4000);