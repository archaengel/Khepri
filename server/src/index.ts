import * as express from 'express';
import { resolve } from 'path';

const app = express();
const port = 3000;

app.use(express.static('../client/build'));
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../client/build/index.html'));
});

app.listen(port, () => console.log(`[app]: Now listening on ${port}`));
