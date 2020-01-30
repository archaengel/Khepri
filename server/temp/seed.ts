import { prisma } from '../src/__generated__/prisma-client';

const seed = async (): Promise<void> => {
  try {
    const eleven = await prisma.createUser({
      name: '1134 1258'
    });
    const darth = await prisma.createUser({
      name: 'Darth Vader'
    });
    const sting = await prisma.createUser({
      name: 'Sting Da Blade'
    });

    const tradRack = await prisma.createProject({
      name: 'tradRack.io',
      issues: {
        create: [
          {
            title: 'User Story: Login',
            content:
              'As a user, I can log in to view a list of my active projects',
            author: { connect: { id: eleven.id } },
            status: 'backlog'
          },
          {
            title: 'User Story: Logout',
            content: 'As a user, I can log out',
            author: { connect: { id: eleven.id } },
            status: 'backlog'
          }
        ]
      },
      lead: { connect: { id: eleven.id } }
    });

    const deathStar = await prisma.createProject({
      name: 'Death Star',
      lead: { connect: { id: darth.id } },
      issues: {
        create: {
          title: 'User Story: Invulnerable',
          content:
            'As a user, I can deploy a death star base without worrying about rebel attacks.',
          author: { connect: { id: darth.id } },
          status: 'backlog',
          comments: {
            create: {
              content: 'Slight hiccup...',
              author: { connect: { id: darth.id } }
            }
          }
        }
      }
    });

    const mordorWalk = await prisma.createProject({
      name: 'Morder Walk',
      lead: { connect: { id: sting.id } },
      issues: {
        create: {
          title: 'User Story: I shine',
          content: 'As a user, I can make myself shine when danger is near',
          author: { connect: { id: sting.id } },
          status: 'backlog',
          comments: {
            create: {
              content: 'A fool with a tool is still a fool...',
              author: { connect: { id: sting.id } }
            }
          }
        }
      }
    });
  } catch (error) {
    throw console.error(
      'failed to seed database: ',
      error.message ? error.message : error
    );
  }
};

seed();
