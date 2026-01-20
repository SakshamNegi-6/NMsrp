export default function handler(req, res) {
    const { portal, password } = req.body;

    const PASSWORDS = {
        staff: process.env.PASS_STAFF || "NMS-Staff-2025",
        train: process.env.PASS_TRAIN || "Train-Force-99",
        hr:    process.env.PASS_HR    || "HighCommand-Key",
        admin: process.env.PASS_ADMIN || "System-Root-Access"
    };

    const CONTENT = {
        staff: `
            <h2><i class="fas fa-laptop-code"></i> Staff Dashboard</h2>
            <a href="https://melon.ly/join/BBYBEP" target="_blank" class="btn-primary" style="width:100%; justify-content:center; margin-bottom:30px; background:linear-gradient(90deg, #10b981, #059669);">
                <i class="fas fa-external-link-alt"></i> LAUNCH MELONLY
            </a>
            <div class="tabs">
                <button class="tab-btn active" onclick="tab('secure-staff', 's-guide', this)">Handbook</button>
                <button class="tab-btn" onclick="tab('secure-staff', 's-cmd', this)">Commands</button>
                <button class="tab-btn" onclick="tab('secure-staff', 's-pol', this)">Policies</button>
            </div>
            <div id="s-guide" class="tab-content active">
                <div class="card">
                    <h3>Expectations</h3>
                    <ul><li>Professionalism</li><li>4h/week</li><li>Tickets</li></ul>
                </div>
            </div>
            <div id="s-cmd" class="tab-content">
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">3 Guys Hiring</span><span class="cmd-code">Do you need money💵?🍗 Three Guys is hiring cashiers...</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
            </div>
            <div id="s-pol" class="tab-content">
                <div class="card" style="border-left: 4px solid var(--danger);"><h3>Anti-Cringe</h3><p>No swearing or bad emojis.</p></div>
            </div>
        `,

        train: `
            <h2><i class="fas fa-graduation-cap"></i> Training Division</h2>
            <div class="tabs">
                <button class="tab-btn active" onclick="tab('secure-train', 't-proto', this)">Protocols</button>
                <button class="tab-btn" onclick="tab('secure-train', 't-exam', this)" style="border-color:#0ea5e9; color:#0ea5e9;">📝 Exam Questions</button>
                <button class="tab-btn" onclick="tab('secure-train', 't-grading', this)">Grading</button>
                <button class="tab-btn" onclick="tab('secure-train', 't-scripts', this)">Scripts</button>
            </div>

            <div id="t-proto" class="tab-content active">
                <div class="grid">
                    <div class="card"><h3>Requirements</h3><ul><li>Senior Admin+</li><li>2 Trainees Max</li></ul></div>
                </div>
            </div>

            <div id="t-exam" class="tab-content">
                <div style="display:flex; flex-direction:column; gap:20px;">
                    <div class="card" style="border-left: 4px solid #0ea5e9;">
                        <h3 style="color:#0ea5e9;">1. Terminology</h3>
                        <ul style="line-height:1.8;">
                            <li><strong>VDM/RDM:</strong> Define, Example, Punishment.</li>
                            <li><strong>FRP:</strong> Define, Example, Punishment.</li>
                            <li><strong>NLR:</strong> Define, Reaction.</li>
                            <li><strong>NITRP:</strong> Define, Example, Punishment.</li>
                            <li><strong>AA, MA, COA:</strong> Define acronyms.</li>
                            <li><strong>Abuse:</strong> Tow and Tool abuse.</li>
                        </ul>
                    </div>
                    <div class="card" style="border-left: 4px solid #f43f5e;">
                        <h3 style="color:#f43f5e;">2. Scenarios</h3>
                        <p><strong>A. Hospital Shooting:</strong> Mass RDM + LTAAP.</p>
                        <p><strong>B. Improper Arrest:</strong> FRP + Admin Abuse.</p>
                        <p><strong>C. RDM Claim:</strong> Check logs, remain neutral.</p>
                    </div>
                    <div class="card" style="border-left: 4px solid #f59e0b;">
                        <h3 style="color:#f59e0b;">3. Chain of Command</h3>
                        <p>Jr Mod > Mod > Head Mod > Admin</p>
                    </div>
                </div>
            </div>

            <div id="t-grading" class="tab-content">
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">Result Template</span><span class="cmd-code">Questions: 0/10\nPass/Fail:</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
            </div>
            <div id="t-scripts" class="tab-content">
                <div class="cmd-box"><span class="cmd-code">Hello, I am [Name], your trainer.</span><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
            </div>
        `,

        hr: `
            <h2><i class="fas fa-gavel"></i> HR Management</h2>
            <div class="tabs">
                <button class="tab-btn active" onclick="tab('secure-hr', 'h-proto', this)">Protocols</button>
                <button class="tab-btn" onclick="tab('secure-hr', 'h-disc', this)">Discipline</button>
            </div>
            <div id="h-proto" class="tab-content active">
                <div class="card"><h3>Doctrine</h3><p>Evidence based. Neutral.</p></div>
            </div>
            <div id="h-disc" class="tab-content">
                <div class="card"><h3>Warning/Strike</h3><p>Follow guidelines.</p></div>
            </div>
        `,

        admin: `
            <h2><i class="fas fa-database"></i> Admin Control</h2>
            
            <div class="access-group">
                <div class="access-header" style="background: #ff4757; color:white;">FOUNDER</div>
                <div class="access-list">
                    <div class="access-row"><span class="access-name">F-01 | RealisticRoleplayer8</span><span class="badge allowed">ALLOWED</span></div>
                    <div class="access-row"><span class="access-name">F-02 | Fatblackmonki1</span><span class="badge denied">DENIED</span></div>
                    <div class="access-row"><span class="access-name">F-03 | Ibrokethetown</span><span class="badge allowed">ALLOWED</span></div>
                </div>
            </div>

            <div class="access-group">
                <div class="access-header" style="background: #ffa502; color:white;">OWNER</div>
                <div class="access-list">
                    <div class="access-row"><span class="access-name">O | joecool822</span><span class="badge denied">DENIED</span></div>
                </div>
            </div>

            <div class="access-group">
                <div class="access-header" style="background: #ffeaa7; color:black;">CO OWNER</div>
                <div class="access-list">
                    <div class="access-row"><span class="access-name">CO-05 | Roblox</span><span class="badge allowed">ALLOWED</span></div>
                    <div class="access-row"><span class="access-name">CO | Bentoki92</span><span class="badge allowed">ALLOWED</span></div>
                </div>
            </div>

            <div class="access-group">
                <div class="access-header" style="background: #3b82f6; color:white;">ASSISTANT OWNER</div>
                <div class="access-list">
                    <div class="access-row"><span class="access-name">AO | killepro98thomas</span><span class="badge allowed">ALLOWED</span></div>
                    <div class="access-row"><span class="access-name">AO | jehema3456</span><span class="badge denied">DENIED</span></div>
                    <div class="access-row"><span class="access-name">AO | Ch4os_4her</span><span class="badge denied">DENIED</span></div>
                </div>
            </div>
        `
    };

    if (password === PASSWORDS[portal]) {
        res.status(200).json({ success: true, html: CONTENT[portal] });
    } else {
        res.status(401).json({ success: false, error: "Access Denied" });
    }
}
