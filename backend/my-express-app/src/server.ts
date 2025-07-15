import 'dotenv/config';
import { app } from "./app";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});