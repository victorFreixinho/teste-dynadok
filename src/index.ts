import { connectToDatabase } from './adapters/database/database';
import 'dotenv/config'

connectToDatabase().then(async () => {
    console.log("Connected to database.");
    const app = new (await import ('./App')).App();
    app.listen(3000);
}).catch((error) => {
console.error("Error connecting to database: ", error);
process.exit(1);
});
