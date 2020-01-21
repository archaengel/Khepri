import express from 'express';
import { resolve, join } from 'path';

const nodeEnv = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(resolve(__dirname, '..', '..', 'client', 'build')));
app.get('*', (_req: any, res: any) => {
  res.sendFile(resolve(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

app.listen(port, () => console.log(`[app]: Now listening on ${port}`));
