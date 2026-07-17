import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

/* Static constants that never change at runtime */
const MONTHLY_STATIC = [
  { month: "Jan", checkout: 65, checkin: 52 },
  { month: "Feb", checkout: 59, checkin: 47 },
  { month: "Mar", checkout: 81, checkin: 68 },
  { month: "Apr", checkout: 45, checkin: 58 },
  { month: "May", checkout: 56, checkin: 44 },
  { month: "Jun", checkout: 80, checkin: 71 },
  { month: "Jul", checkout: 50, checkin: 39 },
];
const PIE_COLORS_STATIC = ["#22A567", "#4C7FB5", "#E9A22B", "#38BDF8", "#E4241F"];

function mockDataPersistence() {
  return {
    name: 'mock-data-persistence',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/saveData' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);

              // Format data as JS module exports
              const fileContent = `
export const CATS = ${JSON.stringify(data.categories, null, 2)};

export const FIELD_SCHEMAS = ${JSON.stringify(data.fieldSchemas, null, 2)};

export const STAFF_INIT = ${JSON.stringify(data.staff, null, 2)};

export const EQUIPMENT_INIT = ${JSON.stringify(data.equipment, null, 2)};

export const LOG_INIT = ${JSON.stringify(data.log, null, 2)};

/* Monthly checkout / check-in quantities — used by dashboard charts */
export const MONTHLY = ${JSON.stringify(MONTHLY_STATIC, null, 2)};

export const PIE_COLORS = ${JSON.stringify(PIE_COLORS_STATIC)};

export const PROJECTS_INIT = ${JSON.stringify(data.projects ?? [], null, 2)};
`;
              const filePath = path.resolve(__dirname, 'src/data/mockData.js');
              fs.writeFileSync(filePath, fileContent.trim() + '\n', 'utf8');

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error("Error saving mockData:", err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  }
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockDataPersistence()],
})
