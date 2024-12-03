import express from 'express';
import { mongo } from '../database/mongo.js';

const worksRouter = express.Router();

// Definir a rota POST para adicionar trabalhos
worksRouter.post('/', async (req, res) => {
    try {
        const { nomeCliente, cargaHoraria, valor, periodo, tipoServico } = req.body;

        // Validar os campos obrigatórios
        if (!nomeCliente || !cargaHoraria || !valor || !periodo || !tipoServico) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos são obrigatórios!',
            });
        }

        // Inserir no banco de dados
        const result = await mongo.db.collection('works').insertOne({
            nomeCliente,
            cargaHoraria,
            valor,
            periodo,
            tipoServico,
            criadoEm: new Date(),
        });

        res.status(201).json({
            success: true,
            message: 'Trabalho cadastrado com sucesso!',
            data: result,
        });
    } catch (error) {
        console.error('Erro ao salvar trabalho:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao salvar trabalho no banco de dados.',
        });
    }
});
worksRouter.get('/', async (req, res) => {
    try {
      const works = await mongo.db.collection('works').find({}).toArray();
  
      res.status(200).json({
        success: true,
        body: works,
      });
    } catch (error) {
      console.error('Erro ao buscar trabalhos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar trabalhos no banco de dados.',
      });
    }
  });
  
export default worksRouter;
