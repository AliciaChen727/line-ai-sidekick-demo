// Mock Service for fetching data from the "LINE backend"
export class LineApiService {
    // Returns performance data for recent broadcasts
    async getBroadcastStats() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return {
            broadcast_id: "B-2026-02-28",
            name: "春季專屬優惠推播",
            send_date: "2026-02-25",
            target_reach: 8930,
            delivered: 8850,
            open_rate: 0.12, // 12%
            ctr: 0.015,     // 1.5%
            status: "low",  // Categorized performance
            comparison: {
                open_rate: "-3%", // compared to previous
                ctr: "-0.5%"
            }
        };
    }

    // Returns user tag distribution
    async getUserTags() {
        await new Promise(resolve => setTimeout(resolve, 600));

        return {
            total_tagged: 5400,
            tags: [
                { name: "會員_Gold", count: 1200, percentage: 0.22 },
                { name: "近期無互動", count: 2500, percentage: 0.46 },
                { name: "對新品有興趣", count: 800, percentage: 0.15 },
                { name: "實體店常客", count: 900, percentage: 0.17 }
            ]
        };
    }

    async getMerchantStatus() {
        await new Promise(resolve => setTimeout(resolve, 400));
        return {
            account_level: "light",
            remaining_messages: 550,
            total_quota: 1000,
            features_used: ["broadcast", "rich_menu", "auto_reply"],
            features_unused: ["step_message", "coupon", "audience_retargeting"]
        };
    }
}

export const lineService = new LineApiService();
