# Shopify MCP Server

This is a TypeScript-based MCP server that acts as a connector to the Shopify Admin API. It allows AI agents to interact with Shopify stores to fetch data like products, orders, and shop details.

## Features

- **MCP Protocol Compliant**: Implements the MCP 0.1.0 protocol.
- **Shopify API Wrapper**: A simple and extensible client for the Shopify Admin API.
- **Pre-built Tools**: Includes tools for common Shopify tasks.
- **Extensible**: Easily add new tools to expand its capabilities.
- **Type-Safe**: Written in TypeScript for robust development.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- A Shopify store with Admin API access credentials (store URL and access token)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd shopify-mcp-server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your desired port number.

### Running the Server

1.  **Build the TypeScript code:**
    ```bash
    npm run build
    ```

2.  **Start the server:**
    ```bash
    npm start
    ```
    The server will be running at `http://localhost:3000` (or your configured port).

3.  **Development mode:**
    To run the server in development mode with automatic reloading, use:
    ```bash
    npm run dev
    ```

## Registering with an AI Client

To use this MCP server with an AI agent (like ChatGPT, Claude, or Cursor), you need to register it as a tool source. The process may vary slightly depending on the client, but it generally involves the following steps:

1.  **Expose your server:**
    Your MCP server needs to be accessible from the internet. You can use a tunneling service like [ngrok](https://ngrok.com/) to expose your local server.
    ```bash
    ngrok http 3000
    ```
    This will give you a public URL (e.g., `https://<unique-id>.ngrok.io`).

2.  **Provide the manifest URL:**
    In your AI client's settings, find the section for adding custom tools or MCP servers. You will need to provide the URL to your server's manifest file.
    ```
    https://<your-public-url>/mcp.json
    ```

3.  **Configure authentication:**
    When prompted, provide your Shopify store URL and Admin API access token. These credentials will be securely stored by the AI client and sent with each request to your MCP server.

## Extending with New Tools

Adding new tools to the server is straightforward:

1.  **Create a new tool file:**
    In the `src/tools` directory, create a new TypeScript file for your tool (e.g., `src/tools/myNewTool.ts`).

2.  **Implement the tool logic:**
    Your tool file should export a default function that takes `auth` and `args` as parameters.
    ```typescript
    // src/tools/myNewTool.ts
    import ShopifyClient from '../shopify/client';
    import { ShopifyAuth } from '../types';

    export default async function myNewTool(auth: ShopifyAuth, args: any) {
      // Your tool logic here
    }
    ```

3.  **Register the tool:**
    Open `src/tools/index.ts` and import your new tool. Then, add it to the exported object.
    ```typescript
    // src/tools/index.ts
    import myNewTool from './myNewTool';

    export default {
      // ... existing tools
      myNewTool,
    };
    ```

4.  **Update the manifest:**
    Finally, add your new tool to the `mcp.json` file.
    ```json
    {
      "name": "myNewTool",
      "description": "A description of what your new tool does.",
      "arguments": [
        {
          "name": "arg1",
          "description": "Description of the first argument.",
          "type": "string",
          "required": true
        }
      ]
    }
    ```

Once you've completed these steps, your new tool will be available to any AI client that has registered your MCP server.

## Using the GraphQL Tool

The `graphql` tool allows you to make arbitrary queries to the Shopify GraphQL Admin API.

**Example:**

```json
{
  "query": "query { shop { name } }"
}
```
