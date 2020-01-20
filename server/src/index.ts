import express from 'express';
import { resolve } from 'path';

const nodeEnv = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('../client/build'));
app.get('*', (_req: any, res: any) => {
  res.sendFile(resolve(__dirname, '../client/build/index.html'));
});

app.listen(port, () => console.log(`[app]: Now listening on ${port}`));
