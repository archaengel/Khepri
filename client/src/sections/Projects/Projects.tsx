import React, { useEffect, useState } from 'react';
import { server } from '../../lib/api';

type ProjectsData = any[];

export const Projects = () => {
  const [projects, setProjects] = useState<ProjectsData>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await server.fetch();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  if (projects.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {projects.map((p: any) => {
          return <li>{p.name}</li>;
        })}
      </ul>
    </div>
  );
};
