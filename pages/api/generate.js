import { fabric } from "fabric";
import canvasDimensions from "../../mbres/constants/dimensions";
import generatoreService from "../../mbres/utils/utils";

export default (req, res) => {
  try {
    const payload = req.body;
    const filename = (payload?.id || generatoreService.makeid(10)) + generatoreService.getDateHash();

    //importazione font custom
    fabric.nodeCanvas.registerFont("mbres/assets/fonts/LibreBaskerville-Regular.ttf", {
      family: "LibreBaskerville",
      weight: "regular",
      style: "normal",
    });
    fabric.nodeCanvas.registerFont("mbres/assets/fonts/LibreBaskerville-Bold.ttf", {
      family: "LibreBaskerville",
      weight: "bold",
      style: "normal",
    });
    fabric.nodeCanvas.registerFont("mbres/assets/fonts/LibreBaskerville-Italic.ttf", {
      family: "LibreBaskerville",
      weight: "regular",
      style: "italic",
    });

    var canvas = new fabric.StaticCanvas(null, { width: canvasDimensions.canvasWidth, height: canvasDimensions.canvasHeight });

    try {
      generatoreService.generateBackground(payload.tipologie, canvas, payload.tipologie);
    } catch (error) {
      console.error(error);
      res.statusCode = 400;
      res.json({ errore: "generate bottom" });
    }
    try {
      generatoreService.generateBottom(payload.anno, canvas, payload.tipologie);
    } catch (error) {
      console.error(error);
      res.statusCode = 400;
      res.json({ errore: "generate bottom" });
    }

    try {
      generatoreService.generateLogo(canvas, payload.tipologie);
    } catch (error) {
      console.error(error);
      res.statusCode = 400;
      res.json({ errore: "generate logo" });
    }

    try {
      generatoreService.generateTitle(payload.titolo, canvas, payload.tipologie);
    } catch (error) {
      console.error(error);
      res.statusCode = 400;
      res.json({ errore: "generate title" });
    }

    canvas.renderAll();
  } catch (err) {
    console.warn("Errore", err);
    res.statusCode = 500;
    res.json({ errore: "Errore main" });
  }
  res.statusCode = 200;
  res.json({ base64: canvas.toDataURL() });
};
