export default function handler(req, res) {
    // Get the data sent from the website
    const { portal, password } = req.body;

    // Define passwords here (Secure on Server)
    // You can also use process.env.STAFF_PASS if you set up Environment Variables in Vercel
    const passwords = {
        staff: "NMS-Staff-2025",
        train: "Train-Force-99",
        hr:    "HighCommand-Key",
        admin: "System-Root-Access"
    };

    // Check credentials
    if (passwords[portal] === password) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false });
    }
}
