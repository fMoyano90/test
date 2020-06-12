import { Router, Response } from "express";
import { New } from "../models/new.model";

const newRoutes = Router();

// OBTENER NOTICIAS
newRoutes.get("/", async (req: any, res: Response) => {
  const news = await New.find({ status: "ENABLED" }).sort({ created_at: -1 });

  res.json({
    ok: true,
    news,
  });
});

// EDITAR ESTADO PARA BORRAR DE VISTA (STATUS)
newRoutes.delete("/:id", async (req: any, res: Response) => {
  let id = req.params.id;
  let body = req.body;

  New.findByIdAndDelete(id, body)
    .then(async (newDB) => {
      res.json({
        ok: true,
        new: newDB,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});
export default newRoutes;
