export default function handler(req, res) {
    const { portal, password } = req.body;

    // 1. SECURE PASSWORDS (Server Side - Change these here)
    const PASSWORDS = {
        staff: process.env.PASS_STAFF || "NMS-Staff-2025",
        train: process.env.PASS_TRAIN || "Train-Force-99",
        hr:    process.env.PASS_HR    || "HighCommand-Key",
        admin: process.env.PASS_ADMIN || "System-Root-Access"
    };

    // 2. THE SECRET PANELS (This HTML is hidden until login)
    const CONTENT = {
        // === STAFF PANEL ===
        staff: `
            <h2><i class="fas fa-laptop-code"></i> Staff Dashboard</h2>
            <a href="https://melon.ly/join/BBYBEP" target="_blank" class="btn-primary" style="width:100%; justify-content:center; margin-bottom:30px; background:linear-gradient(90deg, #10b981, #059669);">
                <i class="fas fa-external-link-alt"></i> LAUNCH MELONLY
            </a>
            <div class="tabs">
                <button class="tab-btn active" onclick="tab('secure-staff', 's-guide')">Handbook</button>
                <button class="tab-btn" onclick="tab('secure-staff', 's-cmd')">Commands</button>
                <button class="tab-btn" onclick="tab('secure-staff', 's-pol')">Policies</button>
            </div>
            
            <div id="s-guide" class="tab-content active">
                <div class="card">
                    <h3>Expectations</h3>
                    <ul>
                        <li><strong>Professionalism:</strong> Always use proper SPaG (Spelling, Punctuation, Grammar).</li>
                        <li><strong>Activity:</strong> Minimum 4 hours/week logged.</li>
                        <li><strong>Tickets:</strong> Respond within 12 hours.</li>
                        <li><strong>Respect:</strong> Do not argue in chat. Take it to DMs.</li>
                        <li><strong>Intervention:</strong> Do not interfere in active scenes unless a rule is broken.</li>
                    </ul>
                </div>
            </div>

            <div id="s-cmd" class="tab-content">
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">3 Guys Hiring</span><span class="cmd-code">Do you need money💵?🍗 Three Guys is hiring cashiers, come at the location for an interview📑.</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">Real Estate Ad</span><span class="cmd-code">Want to buy a house for your family🏠 ?come to the House Suburbs🏘️  and you will find the best house for you or for your family👩‍👩‍👧‍👧 .</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">Welcome</span><span class="cmd-code">:h 👋 Welcome to NMSRP! Join comms code 'NMSRP'.</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">Taxi Service</span><span class="cmd-code">:h 🚕 Taxi Service is active! Call 555-TAXI.</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
                <div class="cmd-box"><div class="cmd-info"><span class="cmd-label">Shutdown</span><span class="cmd-code">:m ⛔️ Server Shutdown. Thanks for playing!</span></div><i class="fas fa-copy btn-copy" onclick="copyText(this)"></i></div>
            </div>

            <div id="s-pol" class="tab-content">
                <div class="grid">
                    <div class="card" style="border-left: 4px solid var(--danger);">
                        <h3 style="color:var(--danger);">"Anti-Cringe" Policy</h3>
                        <p>Excessive swearing, "6-7" jokes, and the "🥀" emoji are prohibited. Immediate verbal warning.</p>
                    </div>
                    <div class="card">
                        <h3>Corruption Policy</h3>
                        <p>Using commands for personal gain (e.g. :tp to avoid arrest) = Instant Demotion.</p>
                    </div>
                </div>
            </div>
        `,

        // === TRAINER PANEL ===
        train: `
            <h2><i class="fas fa-graduation-cap"></i> Training Division</h2>
            <div class="tabs">
                <button class="tab-btn active" onclick="tab('secure-train', 't-proto')">Protocols</button>
                <button class="tab-btn" onclick="tab('secure-train', 't-grading')">Grading</button>
                <button class="tab-btn" onclick="tab('secure-train', 't-scripts')">Scripts</button>
            </div>

            <div id="t-proto" class="tab-content active">
                <div class="grid">
                    <div class="card">
                        <h3><i class="fas fa-lock"></i> Requirements</h3>
                        <ul>
                            <li>Must be <strong>Senior Administrator+</strong> to host.</li>
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
                            <li>If they use "All" commands -> <strong>Fail immediately</strong>.</li>
                        </ul>
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
                <button class="tab-btn active" onclick="tab('secure-hr', 'h-proto')">Protocols</button>
                <button class="tab-btn" onclick="tab('secure-hr', 'h-ops')">Operations</button>
                <button class="tab-btn" onclick="tab('secure-hr', 'h-disc')">Discipline</button>
                <button class="tab-btn" onclick="tab('secure-hr', 'h-promo')">Promotions</button>
            </div>

            <div id="h-proto" class="tab-content active">
                <div class="grid">
                    <div class="card">
                        <h3>Investigation Doctrine</h3>
                        <p>When investigating a staff member, follow these steps strictly:</p>
                        <ol style="margin-left: 20px; color:#d1d5db; line-height: 1.6;">
                            <li><strong>Gather Evidence:</strong> Do not strike based on hearsay. Check Melonly logs and ask for clips.</li>
                            <li><strong>Neutrality:</strong> If you are friends with the accused, hand the case to another HR.</li>
                            <li><strong>The Golden Rule:</strong> You are the standard. If you break a rule, the punishment is double.</li>
                        </ol>
                    </div>
                    <div class="card">
                        <h3>Zero Tolerance</h3>
                        <ul>
                            <li><strong>Leaking:</strong> Sharing staff chat screenshots = <strong>Blacklist</strong>.</li>
                            <li><strong>Bias:</strong> Protecting friends in tickets = <strong>Removal</strong>.</li>
                            <li><strong>Ghosting:</strong> Ignoring tickets while online = <strong>Strike</strong>.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="h-ops" class="tab-content">
                <div class="grid">
                    <div class="card">
                        <h3>SSU Protocols</h3>
                        <ul>
                            <li><strong>Requirement:</strong> Every HR must host at least <strong>1 SSU per week</strong>.</li>
                            <li><strong>Announcement:</strong> Must ping @Here in Discord 30 minutes before start.</li>
                            <li><strong>Duration:</strong> Must keep the server active for at least 45 minutes.</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>Managing LoAs</h3>
                        <p>When approving a Leave of Absence:</p>
                        <ul>
                            <li>Check if they are just avoiding a strike.</li>
                            <li>Max duration: <strong>14 Days</strong> (unless emergency).</li>
                            <li>Log the LoA in the #staff-management channel.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="h-disc" class="tab-content">
                <div class="grid">
                    <div class="card" style="border-top:4px solid var(--gold);"><h3>⚠️ Warning</h3><ul><li>Wrong Uniform</li><li>Off-duty Commands</li><li>Inactive 4+ Days</li></ul></div>
                    <div class="card" style="border-top:4px solid var(--danger);"><h3>❌ Strike</h3><ul><li>Disrespecting HR</li><li>No SPaG (3x)</li><li>Major Command Abuse</li></ul></div>
                    <div class="card" style="border-top:4px solid #991b1b;"><h3>🚫 Termination</h3><ul><li>Inactive 25+ Days</li><li>Admin Power Abuse</li><li>Severe Toxicity</li></ul></div>
                </div>
            </div>

            <div id="h-promo" class="tab-content">
                <div class="card">
                    <h3>Promotion Guidelines</h3>
                    <p>When considering a staff member for promotion:</p>
                    <ul>
                        <li><strong>Activity:</strong> Must have high activity for 2 weeks straight.</li>
                        <li><strong>Tickets:</strong> Must have handled 10+ tickets successfully.</li>
                        <li><strong>Attitude:</strong> Must be helpful, not just punitive.</li>
                        <li><strong>Logging:</strong> Check Melonly to ensure they log all actions.</li>
                    </ul>
                </div>
            </div>
        `,

        // === ADMIN PANEL ===
        admin: `
            <h2><i class="fas fa-database"></i> Admin Control</h2>
            <div class="grid" style="margin-bottom:40px;">
                <div class="card"><h3>Media Responses</h3><a href="https://docs.google.com/forms/d/1V3zrc4GofL62HK-bQ-8_E_xFPhkb2ryH72aQg6I3N64/edit#responses" target="_blank" style="color:var(--accent); font-weight:700;">View Data &rarr;</a></div>
                <div class="card"><h3>IA Responses</h3><a href="https://docs.google.com/forms/d/1fo6OkfPGr_fDlevecJxHuNA0Wg9HpBsTllbV7QPQNLY/edit#responses" target="_blank" style="color:var(--accent); font-weight:700;">View Data &rarr;</a></div>
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

    // 3. CHECK PASSWORDS & RETURN CONTENT
    if (password === PASSWORDS[portal]) {
        res.status(200).json({ success: true, html: CONTENT[portal] });
    } else {
        res.status(401).json({ success: false, error: "Access Denied" });
    }
}
