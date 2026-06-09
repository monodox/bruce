import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Initialize the Dynatrace MCP Server
const server = new Server(
  {
    name: "dynatrace-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_failing_traces",
        description: "Retrieve OpenTelemetry traces for agent runs that ended in errors.",
        inputSchema: {
          type: "object",
          properties: {
            timeframe: {
              type: "string",
              description: "Timeframe to query (e.g., 'last 15 minutes', 'last hour')",
            },
          },
        },
      },
      {
        name: "get_token_metrics",
        description: "Retrieve LLM token spend metrics for a specific agent.",
        inputSchema: {
          type: "object",
          properties: {
            agentId: {
              type: "string",
              description: "The ID of the agent to query",
            },
          },
          required: ["agentId"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  
  if (toolName === "get_failing_traces") {
    // In the future, this will connect to the Dynatrace API.
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ message: "Mock response: 3 failing traces found for Agent X." }),
        },
      ],
    };
  }
  
  if (toolName === "get_token_metrics") {
    // In the future, this will connect to the Dynatrace API.
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ message: "Mock response: 15,400 tokens spent by Agent X today." }),
        },
      ],
    };
  }

  throw new Error(`Tool not found: ${toolName}`);
});

// Start the server
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Dynatrace MCP Server running on stdio");
}

run().catch(console.error);
