const express = require('express');
const server = express();

server.use(express.json());


    const Projects = [
        {
            "id": "1",
            "title": "API Rest com Node",
            "tasks": []
        }
    ];

// MiddleWares
    //Verifica se o projeto existe    
    function checkId(req, res, next) {
        const { id } = req.params;
        const project = Projects.find(p => p.id == id);
    
        
        if (!project) {
            return res.status(400).json({error : "Project does not exist"});
        }
        return next();
    }
    var numReq = 0;
    
    //Faz o log da aplicação
    function logAPI(req, res, next) {
        console.time('Request');
        numReq++;
        console.log(`${numReq} requests; ${req.method} has been call`);
        console.timeEnd('Request');

        next();
    }


// CRUD

    // Listar todos
    server.get('/projects',logAPI, (req,res) =>{
        return res.json(Projects);
    });

    // Listar todos
    server.post('/projects',logAPI, (req, res) => {
        const { id, title } = req.body;
      
        const project = {
          id,
          title,
          tasks: []
        };
      
        Projects.push(project);
      
        return res.json(Projects);
      });

    // Criar task
    server.post('/projects/:id/tasks',logAPI, checkId, (req, res) =>{
        const { id } = req.params;
        const { title } = req.body;

        const project = Projects.find(p => p.id == id);

        project.tasks.push(title);

        return res.json(project);
    });

    server.put('/projects/:id',logAPI, checkId, (req, res) =>{
        const { id } = req.params;
        const { title } = req.body;

        const project = Projects.find(p => p.id == id);

        project.title = title;

        return res.json(project);
    });
    // Deletar
    server.delete('/projects/:id',logAPI,checkId,(req, res) =>{
        const { id } = req.params;
        const project = Projects.find(p => p.id == id);
        Projects.splice(project, 1)
        return res.json(Projects)
    });

    server.listen(3000);