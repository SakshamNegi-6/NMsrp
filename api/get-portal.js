export default function handler(req, res) {
    const { portal, password } = req.body;

    // 1. SECURE PASSWORDS (Server Side)
    const PASSWORDS = {
        staff: process.env.PASS_STAFF || "NMS-Staff-2025",
        train: process.env.PASS_TRAIN || "Train-Force-99",
        hr:    process.env.PASS_HR    || "HighCommand-Key",
        admin: process.env.PASS_ADMIN || "System-Root-Access"
    };

    // 2. THE SECRET PANELS CONTENT
    const CONTENT = {
        // === STAFF PANEL ===
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
                    <ul>
                        <li><strong>Professionalism:</strong> Always use proper SPaG.</li>
                        <li><strong>Activity:</strong> 4 hours/week minimum.</li>
                        <li><strong>Tickets:</strong> Respond within 12 hours.</li>
                        <li><strong>Respect:</strong> Do not argue in chat. Take it to DMs.</li>
                    </ul>
                </div>
            </div>

            <div id="s-cmd" class="tab-content">
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">3 Guys Hiring</span><span class="cmd-code">Do you need money💵?🍗 Three Guys is hiring cashiers...</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">Welcome</span><span class="cmd-code">:h 👋 Welcome to NMSRP! Join comms code 'NMSRP'.</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">Taxi Service</span><span class="cmd-code">:h 🚕 Taxi Service is active! Call 555-TAXI.</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">Shutdown</span><span class="cmd-code">:m ⛔️ Server Shutdown. Thanks for playing!</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
            </div>

            <div id="s-pol" class="tab-content">
                <div class="grid">
                    <div class="card" style="border-left: 4px solid var(--danger);">
                        <h3 style="color:var(--danger);">"Anti-Cringe" Policy</h3>
                        <p>Excessive swearing, "6-7" jokes, and the "🥀" emoji are prohibited.</p>
                    </div>
                    <div class="card">
                        <h3>Corruption Policy</h3>
                        <p>Using commands for personal gain (e.g. :tp to avoid arrest) = Instant Demotion.</p>
                    </div>
                </div>
            </div>
        `,

        // === TRAINER PANEL (INCLUDES EXAM) ===
        train: `
            <h2><i class="fas fa-graduation-cap"></i> Training Division</h2>
            <div class="tabs">
                <button class="tab-btn active" onclick="tab('secure-train', 't-proto', this)">Protocols</button>
                <button class="tab-btn" onclick="tab('secure-train', 't-exam', this)" style="border-color:var(--accent); color:white;">📝 Exam Questions</button>
                <button class="tab-btn" onclick="tab('secure-train', 't-grading', this)">Grading</button>
                <button class="tab-btn" onclick="tab('secure-train', 't-scripts', this)">Scripts</button>
            </div>

            <div id="t-proto" class="tab-content active">
                <div class="grid">
                    <div class="card">
                        <h3><i class="fas fa-lock"></i> Requirements</h3>
                        <ul>
                            <li><strong>Senior Administrator+</strong> to host.</li>
                            <li>Max <strong>2 Trainees</strong> per session.</li>
                            <li>Test Location: <strong>Sheriff Briefing Room</strong>.</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3><i class="fas fa-car"></i> R/A Protocol</h3>
                        <ul>
                            <li>Server must have <strong>10+ Players</strong>.</li>
                            <li>Trainer must use <strong>Staff Livery</strong> car.</li>
                            <li>Trainee drives. Supervise constantly.</li>
                            <li>Use "All" commands = <strong>Fail immediately</strong>.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="t-exam" class="tab-content">
                <div style="display:flex; flex-direction:column; gap:20px;">
                    <div class="card" style="border-left: 4px solid var(--accent);">
                        <h3 style="color:var(--accent);">1. Terminology</h3>
                        <ul style="line-height: 1.8; color: #e4e4e7;">
                            <li><strong>VDM & RDM:</strong> Define both. Give an example and the punishment for each.</li>
                            <li><strong>FRP (FailRP):</strong> Definition, Example, and Punishment.</li>
                            <li><strong>NLR (New Life Rule):</strong> Definition. How would you react if someone broke this?</li>
                            <li><strong>NITRP (No Intent To RP):</strong> Definition, Example, and Punishment.</li>
                            <li><strong>Acronyms:</strong> Define <strong>AA</strong> (Admin Abuse), <strong>MA</strong> (Major Abuse), <strong>COA</strong> (Corruption).</li>
                            <li><strong>Abuse:</strong> Define <strong>Tow Abuse</strong> and <strong>Tool Abuse</strong> with examples.</li>
                        </ul>
                    </div>

                    <div class="card" style="border-left: 4px solid var(--danger);">
                        <h3 style="color:var(--danger);">2. Scenarios</h3>
                        <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; margin-bottom:10px;">
                            <strong>Scenario A:</strong> Hospital Shooting (4 people) + LTAAP.<br>
                            <em style="color:#9ca3af;">Target: Mass RDM + LTAAP (Ban).</em>
                        </div>
                        <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; margin-bottom:10px;">
                            <strong>Scenario B:</strong> Arrest without "cuffs" chat + No Transport + Fleeing.<br>
                            <em style="color:#9ca3af;">Target: FRP/FailRP + Admin Abuse.</em>
                        </div>
                        <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
                            <strong>Scenario C:</strong> He said/She said (RDM accusation).<br>
                            <em style="color:#9ca3af;">Target: Check Logs. Remain Neutral. No proof = No punishment.</em>
                        </div>
                    </div>

                    <div class="card" style="border-left: 4px solid var(--gold);">
                        <h3 style="color:var(--gold);">3. Chain of Command</h3>
                        <p>Jr Mod &rarr; Mod/Sr Mod &rarr; Head Mod &rarr; Admin</p>
                    </div>
                </div>
            </div>

            <div id="t-grading" class="tab-content">
                <div class="grid">
                    <div class="cmd-box">
                        <div class="cmd-info"><span class="cmd-label">Test Result Template</span><span class="cmd-code">Questions: 0/10\nSPaG: 0/10\nProfessionalism: 0/10\nNote:\nPass / Fail:</span></div>
                        <i class="fas fa-copy btn-copy" onclick="copyText(this)"></i>
                    </div>
                    <div class="cmd-box">
                        <div class="cmd-info"><span class="cmd-label">R/A Result Template</span><span class="cmd-code">Driving: 0/10\nMod calls: 0/10 (Min 3)\nProfessionalism: 0/10\nNote:\nPass / Fail:</span></div>
                        <i class="fas fa-copy btn-copy" onclick="copyText(this)"></i>
                    </div>
                </div>
            </div>

            <div id="t-scripts" class="tab-content">
                <div class="cmd-box"><span class="cmd-code">Hello, I am [Name], your trainer. Any questions?</span><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
                <div class="cmd-box"><span class="cmd-code">Congrats! You passed Phase 1. Please wait here.</span><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
                <div class="cmd-box"><span class="cmd-code">Unfortunately, you have not passed. Re-apply in 24h.</span><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
            </div>
        `,

        // === HR PANEL ===
        hr: `
            <h2><i class="fas fa-gavel"></i> HR Management</h2>
            <div class="tabs">
                <button class="tab-btn active" onclick="tab('secure-hr', 'h-proto', this)">Protocols</button>
                <button class="tab-btn" onclick="tab('secure-hr', 'h-ops', this)">Operations</button>
                <button class="tab-btn" onclick="tab('secure-hr', 'h-disc', this)">Discipline</button>
                <button class="tab-btn" onclick="tab('secure-hr', 'h-promo', this)">Promotions</button>
            </div>

            <div id="h-proto" class="tab-content active">
                <div class="card">
                    <h3>Investigation Doctrine</h3>
                    <p>Gather Evidence. Remain Neutral. You are the standard.</p>
                </div>
                <div class="card">
                    <h3>Zero Tolerance</h3>
                    <ul>
                        <li><strong>Leaking:</strong> Instant Blacklist.</li>
                        <li><strong>Bias:</strong> Instant Removal.</li>
                    </ul>
                </div>
            </div>

            <div id="h-ops" class="tab-content">
                <div class="grid">
                    <div class="card">
                        <h3>SSU Protocols</h3>
                        <p>Host 1 SSU per week. Ping @Here 30 mins prior.</p>
                    </div>
                    <div class="card">
                        <h3>Managing LoAs</h3>
                        <p>Max 14 Days. Check for strike evasion.</p>
                    </div>
                </div>
            </div>

            <div id="h-disc" class="tab-content">
                <div class="grid">
                    <div class="card" style="border-top:4px solid var(--gold);"><h3>⚠️ Warning</h3><p>Wrong Uniform, Inactivity.</p></div>
                    <div class="card" style="border-top:4px solid var(--danger);"><h3>❌ Strike</h3><p>Disrespect, No SPaG (3x).</p></div>
                    <div class="card" style="border-top:4px solid #991b1b;"><h3>🚫 Termination</h3><p>Abuse, Severe Toxicity.</p></div>
                </div>
            </div>

            <div id="h-promo" class="tab-content">
                <div class="card">
                    <h3>Promotion Guidelines</h3>
                    <p>Check activity, tickets, and attitude. Verify logs on Melonly.</p>
                </div>
            </div>
        `,

        // === ADMIN PANEL ===
        admin: `
            <h2><i class="fas fa-database"></i> Admin Control</h2>
            <div class="grid" style="margin-bottom:40px;">
                <div class="card"><h3>Media Responses</h3><a href="#" style="color:var(--accent);">View Data &rarr;</a></div>
                <div class="card"><h3>IA Responses</h3><a href="#" style="color:var(--accent);">View Data &rarr;</a></div>
            </div>
            
            <div class="access-group">
                <div class="access-header" style="background: var(--r-founder);">FOUNDER</div>
                <div class="access-list">
                    <div class="access-row"><span class="access-name">F-01 | RealisticRoleplayer8</span><span class="badge allowed">ALLOWED</span></div>
                    <div class="access-row"><span class="access-name">F-02 | Fatblackmonki1</span><span class="badge allowed">ALLOWED</span></div>
                    <div class="access-row"><span class="access-name">F-03 | Ibrokethetown</span><span class="badge allowed">ALLOWED</span></div>
                </div>
            </div>

            <div class="access-group">
                <div class="access-header" style="background: var(--r-owner);">OWNER</div>
                <div class="access-list">
                    <div class="access-row"><span class="access-name">O | joecool822</span><span class="badge denied">DENIED</span></div>
                </div>
            </div>

            <div class="access-group">
                <div class="access-header" style="background: var(--r-coowner);">CO OWNER</div>
                <div class="access-list">
                    <div class="access-row"><span class="access-name">CO-05 | Roblox</span><span class="badge allowed">ALLOWED</span></div>
                    <div class="access-row"><span class="access-name">CO | Bentoki92</span><span class="badge allowed">ALLOWED</span></div>
                </div>
            </div>

            <div class="access-group">
                <div class="access-header" style="background: var(--r-asst);">ASSISTANT OWNER</div>
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
