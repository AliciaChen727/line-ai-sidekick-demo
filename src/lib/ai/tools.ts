import { lineService } from '../services/lineService';

// Define the available tools the ReAct agent can call

export const tools = [
    {
        name: "get_broadcast_performance",
        description: "Fetches the performance metrics (CTR, Open Rate, Delivery) of the latest broadcast message. Call this when analyzing marketing effectiveness.",
        execute: async () => {
            return await lineService.getBroadcastStats();
        }
    },
    {
        name: "get_user_tags",
        description: "Fetches the current distribution of tags assigned to users in the Official Account Official Account. Useful for targeting specific audiences.",
        execute: async () => {
            return await lineService.getUserTags();
        }
    },
    {
        name: "get_merchant_status",
        description: "Checks the merchant's current account level, remaining message quota, and which LINE OA features they have or haven't used yet.",
        execute: async () => {
            return await lineService.getMerchantStatus();
        }
    },
    {
        name: "get_navigation_links",
        description: "Returns deep links to specific sections of the LINE OA Manager dashboard (e.g., broadcasts, auto-reply, rich menus).",
        execute: async () => {
            // Mock returning static links
            return {
                broadcast_setup: "/broadcast/create",
                rich_menu: "/richmenu/settings",
                audience_targeting: "/audience/create",
                auto_reply: "/autoreply/list"
            }
        }
    }
];

// Helper to execute a tool by name
export const executeTool = async (name: string) => {
    const tool = tools.find(t => t.name === name);
    if (!tool) throw new Error(`Tool ${name} not found`);
    return await tool.execute();
};
