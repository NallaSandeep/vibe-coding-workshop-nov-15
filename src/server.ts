import express, { Request, Response } from 'express';
import { PORT } from './utils/env';
import mcpManifest from '../mcp.json';
import tools from './tools';
import { ShopifyAuth } from './types';

const app = express();
app.use(express.json());

// MCP Manifest Endpoint
app.get('/mcp.json', (req: Request, res: Response) => {
  res.json(mcpManifest);
});

// List Tools Endpoint
app.get('/', (req: Request, res: Response) => {
  res.json(Object.keys(tools));
});

// Tool Execution Endpoint
app.post('/:tool', async (req: Request, res: Response) => {
  const { tool } = req.params;
  const { auth, args } = req.body;

  console.log(`Executing tool: ${tool}`);

  if (!auth) {
    return res.status(401).json({ error: 'Authentication is required.' });
  }

  const toolFn = (tools as any)[tool];

  if (!toolFn) {
    return res.status(404).json({ error: `Tool not found: ${tool}` });
  }

  try {
    const result = await toolFn(auth as ShopifyAuth, args);
    res.json(result);
  } catch (error: any) {
    console.error(`Error executing tool ${tool}:`, error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Shopify MCP server listening on port ${PORT}`);
});
