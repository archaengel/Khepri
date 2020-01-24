import { users } from '../src/users';
import { issues } from '../src/issues';
import { projects } from '../src/projects';
import { connectDatabase } from '../src/database';

const seed = async (): Promise<void> => {
  try {
    const db = await connectDatabase();

    for (const user of users) {
      await db.users.insertOne(user);
    }

    for (const issue of issues) {
      await db.issues.insertOne(issue);
    }

    for (const project of projects) {
      await db.projects.insertOne(project);
    }

    console.log(`[seed]: success`);
  } catch (error) {
    throw console.error(
      'failed to seed database: ',
      error.message ? error.message : error
    );
  }
};

seed();
