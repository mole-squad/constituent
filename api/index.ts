import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

dotenv.config();

import app from './src/app';

mongoose.connect(process.env.MONGO_URI);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
