import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

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
