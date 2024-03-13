import Koa from "koa";
import dotenv from "dotenv";

dotenv.config();

function getConfig() {
  const PORT = process.env.PORT;
  if (!PORT) {
    throw new Error("PORT not found in environment");
  }

  const PEER_URL = process.env.PEER_URL;
  if (!PEER_URL) {
    throw new Error("PEER_URL not found in environment");
  }

  const NAME = process.env.NAME;
  if (!NAME) {
    throw new Error("NAME not found in environment");
  }

  return {
    PORT,
    PEER_URL,
    NAME,
  };
}

const config = getConfig();
const app = new Koa();

app.use(async (ctx) => {
  if (ctx.path === "/") {
    ctx.body = `Hello from ${config.NAME}`;
  } else if (ctx.path === "/d2d" && ctx.method === "GET") {
    try {
      const response = await fetch(`${config.PEER_URL}/name`);
      const name = await response.text();
      ctx.body = `Reached ${name} via ${config.NAME}`;
    } catch (error) {
      ctx.body = "Error while fetching data from peer";
    }
  } else if (ctx.path === "/name" && ctx.method === "GET") {
    ctx.body = config.NAME;
  } else {
    ctx.body = "Endpoint not found";
  }
});

app.listen(config.PORT, () => {
  console.log(`Server started with config: `, config);
});
