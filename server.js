const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 7777;
const HOST = process.env.HOST || '0.0.0.0';
const DATA_FILE = path.join(__dirname, 'data', 'soccer_team.json');

// Auth Credentials
const AUTH_USER = 'coach';
const AUTH_PASS = 'redfalconsarethebest';
// Fixed session secret / token hash for persistent login across server restarts
const VALID_TOKEN = crypto.createHash('sha256').update(`${AUTH_USER}:${AUTH_PASS}:redfalcons_coach_v1`).digest('hex');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Initial default team data
const defaultData = {
  teamName: "The Red Falcons",
  teamColor: "#10b981",
  formation: "2-2-1", // 1 GK, 2 DEF, 2 MID, 1 FWD = 6 players
  matchDurationMinutes: 40,
  quartersCount: 4,
  snackDuty: "Selbie Family",
  teamCaptain: "",
  players: [
    { id: "p1", name: "Fynn", number: 7, preferredPos: "FWD", active: true, notes: "Fast dribbler, high energy" },
    { id: "p2", name: "Elliot", number: 10, preferredPos: "MID", active: true, notes: "Great playmaker, good passes" },
    { id: "p3", name: "Leo", number: 4, preferredPos: "DEF", active: true, notes: "Solid defender, good clearing" },
    { id: "p4", name: "Maya", number: 1, preferredPos: "GK", active: true, notes: "Loves playing goalie" },
    { id: "p5", name: "Sam", number: 8, preferredPos: "MID", active: true, notes: "Strong runner, covers ground" },
    { id: "p6", name: "Lucas", number: 3, preferredPos: "DEF", active: true, notes: "Stays back, protects goal" },
    { id: "p7", name: "Emma", number: 9, preferredPos: "FWD", active: true, notes: "Aggressive on attack" },
    { id: "p8", name: "Noah", number: 11, preferredPos: "MID", active: true, notes: "Good footwork" },
    { id: "p9", name: "Chloe", number: 5, preferredPos: "DEF", active: true, notes: "Team player, focused" },
    { id: "p10", name: "Oliver", number: 6, preferredPos: "GK", active: true, notes: "Wants to try goalie Q2" },
    { id: "p11", name: "Sophia", number: 12, preferredPos: "FWD", active: true, notes: "Quick striker" },
    { id: "p12", name: "Liam", number: 2, preferredPos: "DEF", active: true, notes: "Hustles on defense" }
  ],
  startingLineup: {
    GK: "p4",
    LB: "p3",
    RB: "p6",
    LM: "p2",
    RM: "p5",
    ST: "p1"
  },
  quarterLineups: {
    1: { GK: "p4", LB: "p3", RB: "p6", LM: "p2", RM: "p5", ST: "p1" },
    2: { GK: "p10", LB: "p9", RB: "p12", LM: "p8", RM: "p7", ST: "p11" },
    3: { GK: "p4", LB: "p6", RB: "p12", LM: "p2", RM: "p8", ST: "p1" },
    4: { GK: "p10", LB: "p3", RB: "p9", LM: "p5", RM: "p7", ST: "p11" }
  },
  matchState: {
    homeScore: 0,
    awayScore: 0,
    opponentName: "Wildcats",
    currentQuarter: 1,
    quarterSecondsElapsed: 0,
    isRunning: false,
    goals: [],
    substitutions: []
  }
};

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading data file, using defaults:', err);
  }
  return defaultData;
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving data:', err);
    return false;
  }
}

// In-memory team state initialized from disk
let teamData = loadData();

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach(cookie => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    list[name] = decodeURIComponent(value);
  });
  return list;
}

function isAuthenticated(req) {
  // Check Authorization header
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token === VALID_TOKEN) return true;
  }

  // Check Cookie
  const cookies = parseCookies(req);
  if (cookies['falcon_coach_token'] === VALID_TOKEN) {
    return true;
  }

  return false;
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Authentication Endpoints
  if (pathname === '/api/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { username, password } = JSON.parse(body);
        if (username === AUTH_USER && password === AUTH_PASS) {
          res.setHeader('Set-Cookie', `falcon_coach_token=${VALID_TOKEN}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, token: VALID_TOKEN, user: AUTH_USER }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Invalid username or password' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  if (pathname === '/api/auth/check' && req.method === 'GET') {
    const authed = isAuthenticated(req);
    res.writeHead(authed ? 200 : 401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ authenticated: authed, user: authed ? AUTH_USER : null }));
    return;
  }

  if (pathname === '/api/logout' && req.method === 'POST') {
    res.setHeader('Set-Cookie', 'falcon_coach_token=; Path=/; HttpOnly; Max-Age=0');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // Protected REST API Routes
  if (pathname.startsWith('/api/')) {
    if (!isAuthenticated(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized. Please log in.' }));
      return;
    }

    if (pathname === '/api/team' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(teamData));
      return;
    }

    if (pathname === '/api/team' && (req.method === 'POST' || req.method === 'PUT')) {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const update = JSON.parse(body);
          teamData = { ...teamData, ...update };
          saveData(teamData);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, data: teamData }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    if (pathname === '/api/reset' && req.method === 'POST') {
      teamData = JSON.parse(JSON.stringify(defaultData));
      saveData(teamData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: teamData }));
      return;
    }
  }

  // Static File Serving
  let filePath = path.join(__dirname, 'public', pathname === '/' ? 'index.html' : pathname);
  
  // Prevent directory traversal
  const publicDir = path.resolve(__dirname, 'public');
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(publicDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(resolvedPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(resolvedPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback to index.html for SPA routing
        fs.readFile(path.join(publicDir, 'index.html'), (err2, indexContent) => {
          if (err2) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`⚽ Youth Soccer Coach App is live at http://${HOST}:${PORT}`);
});
