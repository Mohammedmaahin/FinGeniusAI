import { getAnalytics } from "../services/analytics.service.js";

export const analytics = async (req, res) => {
  const data = await getAnalytics(req.user.id);

  res.json({
    success: true,
    analytics: data,
  });
};